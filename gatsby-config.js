module.exports = {
    pathPrefix: "/status-page",
    siteMetadata: {
        title: "status-page",
    },
    plugins: [
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "123",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        "gatsby-transformer-remark",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
    ],
};
