const fs = require(`fs`);
const path = require("path");
const { Octokit } = require("@octokit/core");
var showdown = require("showdown"),
    converter = new showdown.Converter();
const {
    services,
    status: STATUSES,
    banner_status: BANNER_STATUS,
} = require("./site-config");

require("dotenv").config();

const addBuildhash = () => {
    const date = new Date();
    return date.getTime();
};

exports.onPreBootstrap = async () => {
    // fetch data and store in json file
    const token = process.env.REPO_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO;

    const isNetlify = process.env.NETLIFY;
    const isDev = process.env.MODE === "DEVELOPMENT";

    let buildinfo_api, storedata_api;

    if (isDev || isNetlify) {
        buildinfo_api = "/buildinfo.json";
        storedata_api = "/updatedata.json";
    } else {
        buildinfo_api = "/status-page/buildinfo.json";
        storedata_api = "/status-page/updatedata.json";
    }

    if (!token) {
        throw new Error("Setup a repository secret to update");
    }

    const octokit = new Octokit({ auth: token });
    const date = new Date();
    date.setDate(date.getDate() - 90);

    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner,
        repo,
        state: "all",
        since: date.toISOString(),
    });

    // console.log(JSON.stringify(response.data, null, 4));
    // filter issues related to the service mentioned in site-config

    const data = response.data
        .filter((issue) => {
            const { pull_request } = issue;
            return !pull_request;
        })
        .map((issue) => {
            const {
                id,
                title,
                state,
                created_at,
                updated_at,
                closed_at,
                body,
                labels,
            } = issue;

            return {
                id,
                title,
                state,
                created_at,
                updated_at,
                closed_at,
                labels: labels.map((l) => l.name),
                description_md: body,
                description: converter.makeHtml(body),
                isOpen: state === "open",
            };
        });

    // check for affected services
    let temp_status = "operational";
    const buildTime = addBuildhash();

    const initData = {
        buildinfo_api,
        storedata_api,
        issues: data,
        services: services.map((service) => {
            const update = {
                ...service,
                affected: data.some(
                    (d) => d.labels.includes(service.label) && d.isOpen
                ),
                status: STATUSES.operational,
                timeline: [],
            };

            data.forEach((d) => {
                if (d.labels.includes(service.label)) {
                    update.timeline.push(d.closed_at);
                }
            });

            if (update.affected) {
                const severity = Object.keys(STATUSES).map((status) => {
                    data.some((d) => d.labels.includes(status));
                });

                const { label = "unknown" } = STATUSES[severity[0]] || {};
                update.status = STATUSES[label];
                temp_status = "degraded";
            }

            return update;
        }),
        buildTime,
    };

    initData.banner_data = BANNER_STATUS[temp_status];

    const json = JSON.stringify(initData, null, 4);
    fs.writeFileSync("initdata.json", json);
    fs.writeFileSync("./public/updatedata.json", json);

    const buildjson = JSON.stringify({
        time: buildTime,
    });

    // fs.writeFileSync("buildinfo.json", buildjson);
    fs.writeFileSync("./public/buildinfo.json", buildjson);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const ServicepageTemplate = path.resolve(`./src/templates/service-page.js`);

    // Make post pages
    services.forEach(({ label, text }) => {
        createPage({
            path: `/${label}`,
            component: ServicepageTemplate,
            context: {
                label,
                text,
            }, // additional data can be passed via context
        });
    });
};
