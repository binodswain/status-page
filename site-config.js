module.exports = {
    services: [
        {
            label: "api",
            text: "API",
        },
        {
            label: "CDN",
            text: "CDN",
        },
        {
            label: "github-page",
            text: "GitHub Pages",
        },
        {
            label: "website",
            text: "Website",
        },
    ],
    status: {
        operational: {
            text: "Service is operational.",
            label: "Operational",
        },
        degraded: {
            text: "Service has degraded performance.",
            label: "Performance Issues",
        },
        down: {
            text: "Service is down.",
            label: "Down",
        },
        unknown: {
            text: "Service status is unknown.",
            label: "Unknown",
        },
    },
    banner_status: {
        operational: {
            text: "All services are operational.",
            label: "Operational",
        },
        degraded: {
            text: "Some services have degraded performance.",
            label: "Performance Issues",
        },
    },
};
