import * as React from "react";
import { useStaticQuery } from "gatsby";
import "./index.scss";
import Header from "../component/header";
import SystemComponents from "../component/statuslist";
import SystemWidget from "../component/statuswidget";
import TimelineWidget from "../component/timeline";
import IncidentsList from "../component/statusupdates";
import Footer from "../component/footer";
import SEO from "../component/seo";
import AppWrapper from "../component/wrapper";

const IndexPage = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        keywords
                    }
                }
            }
        `
    );
    return (
        <>
            <SEO title={`${site.siteMetadata.title}'s status`} />
            <AppWrapper>
                <div className="application">
                    <Header status={"operational"} />
                    <SystemComponents />
                    {/* <SystemWidget /> */}
                    {/* <TimelineWidget /> */}
                    <IncidentsList />
                </div>
                <Footer />
            </AppWrapper>
        </>
    );
};

export default IndexPage;
