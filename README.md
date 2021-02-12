# Status page

[![license](https://badgen.net/github/license/binodswain/status-page)](https://github.com/binodswain/status-page/blob/main/LICENSE)
![update and build site](https://github.com/binodswain/status-page/workflows/update%20and%20build%20site/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b6ba5bff-2254-4f51-adde-2e907e2d2765/deploy-status)](https://app.netlify.com/sites/binodswain-status/deploys)

**🚧 WIP 🚧**

a simple and fast status page built with Gatsby.

## Demo status site

gh-page: https://binodswain.github.io/status-page/

netlify: https://status-demo.binodswain.dev/

## TOC:

-   Getting started
-   Deploy site in
    -   gh-pages
    -   netlify
-   Configuration

    -   Service list
    -   SEO
    -   Poll duration

-   Miscellaneous
    -   environment variables

### Getting started 💻

This website is built to work best with github pages and netlify. Host completely free with Netlify or gh-pages.

### Deploy site in gh-pages

1.  fork this repository

2.  update repository secrets. these secrets will be required in the github action.

        a. REPO_TOKEN : a github auth token to fetch issue list and generate site data

        b. REPO_OWNER : repository owner

        c. REPO : repository name

    ![Screenshot 1](/assets/gh-page-setup.png?raw=true "repository secrets")

To test locally, create a `.env` file and add secrets in below format.

```
REPO_TOKEN = xxxxxxxxxxxxxxxxxxxxxxxxxxxx
REPO_OWNER = binodswain
REPO = status-page
```

3. Update `./site-config.js` according to your requirement and add those changes to repo.

4. Update GitHub Pages setting of repo to serve the static site from docs folder of default branch.

    ![Screenshot 1](/assets/site-secrets.png?raw=true "repository secrets")
    Note: Content of docs folder will be published. `build-path` script in package.json builds site with path-prefix and populates public folder.

### Deploy site in netlify

1.  fork this repository

2.  select "new site with git" option ➡ github ➡ forked repo.

3.  proceed with defail options. Click on "show advanced" and add below environment variables.

        a. REPO_TOKEN

        b. REPO_OWNER

        c. REPO

        d. NETLIFY

    ![Screenshot 2](/assets/netlify-setup-1.png?raw=true "netlify setup")
    ![Screenshot 3](/assets/netlify-setup-2.png?raw=true "netlify setup")

## License

MIT © [binodswain](https://github.com/binodswain)
