import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as ioUtil from '@actions/io/lib/io-util';

const DEFAULT_DEPLOY_BRANCH = 'main';

async function run() {
  try {
    const token = core.getInput('access-token', {required: true});

    if (!token) {
        core.setFailed(
          'No personal access token found. Please provide one by setting the `access-token` input for this action.',
        )
        return
    }

    let deployBranch = core.getInput('deploy-branch')
    if (!deployBranch) deployBranch = DEFAULT_DEPLOY_BRANCH;

    const workingDir = '.'
    console.log(`Installing your site's dependencies.`)
    await exec.exec(`npm ci`, [], {cwd: workingDir})
    console.log('Finished installing dependencies.')

    const buildScript = core.getInput('build-script');
    console.log('Ready to build your Gatsby site!')
    await exec.exec(buildScript, [], {cwd: workingDir})
    console.log('Finished building your site.')

    const cnameExists = await ioUtil.exists(`${workingDir}/CNAME`)
    if (cnameExists) {
      console.log('Copying CNAME')
      await io.cp(`${workingDir}/CNAME`, `${workingDir}/public/CNAME`, {force: true})
      console.log('Finished copying CNAME.')
    }

    const skipPublish = (core.getInput('skip-publish') || 'false').toUpperCase()
    if (skipPublish === 'TRUE') {
      console.log('Building completed successfully - skipping publish')
      return
    }

    const repo = `${github.context.repo.owner}/${github.context.repo.repo}`
    const repoURL = `https://${token}@github.com/${repo}.git`;

    


    if (DEFAULT_DEPLOY_BRANCH === 'main') {
        // Recursive must be true for directories
        // https://github.com/actions/toolkit/tree/main/packages/io
        await io.rmRF(`${workingDir}/docs`);

        const options = { recursive: true, force: false };
        await io.cp(`${workingDir}/public`, `${workingDir}/docs`, options);

        await exec.exec(`git init`, [], {cwd: `${workingDir}`})
        await exec.exec(`git config user.name`, [github.context.actor], {
            cwd: `${workingDir}`,
        })
        await exec.exec(`git config user.email`, [`${github.context.actor}@users.noreply.github.com`], {
            cwd: `${workingDir}`,
        })

        await exec.exec(`git add` , ['.'], {cwd: `${workingDir}/docs`});
        await exec.exec(`git status` , [], {cwd: `${workingDir}/docs`});

        const hasStagedChaged = await exec.exec(`git diff --name-only --cached` , [], {cwd: `${workingDir}/docs`});

        if (!hasStagedChaged) {
          console.log('No changes in site data. Skipping site update.')
          return;
        } else {
          console.log('Site data has changed.');
        }

        await exec.exec(`git commit`, ['-m', `deployed via Gatsby Action (${github.context.sha})`], {
            cwd: `${workingDir}/docs`,
        })

        await exec.exec(`git push`, ['-f', repoURL, `main`], {
            cwd: `${workingDir}/docs`,
        })
        
    } else {
        console.log(`Deploying to repo: ${repo} and branch: ${deployBranch}`);

        await exec.exec(`git init`, [], {cwd: `${workingDir}/public`})

        await exec.exec(`git config user.name`, [github.context.actor], {
            cwd: `${workingDir}/public`,
        })
        await exec.exec(`git config user.email`, [`${github.context.actor}@users.noreply.github.com`], {
            cwd: `${workingDir}/public`,
        })
        
        await exec.exec(`git add`, ['.'], {cwd: `${workingDir}/public`})
        await exec.exec(`git commit`, ['-m', `deployed via Gatsby Action (${github.context.sha})`], {
            cwd: `${workingDir}/public`,
        })

        await exec.exec(`git push`, ['-f', repoURL, `main:${deployBranch}`], {
            cwd: `${workingDir}/public`,
        })
    }
    
    console.log('Finished deploying your site.')
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}
run();