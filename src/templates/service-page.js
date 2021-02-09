import React from "react";
import { useStaticQuery } from "gatsby";
import Header from "../component/header";
import IncidentsList from "../component/statusupdates";
import Footer from "../component/footer";
import AppWrapper from "../component/wrapper";
import SEO from "../component/seo";

export default function Template({ pageContext }) {
    // console.log(pageContext);
    const { label, text } = pageContext;

    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    return (
        <>
            <SEO title={`${text} status | ${site.siteMetadata.title}`} />
            <AppWrapper>
                <Header service={text} showHomeLink />
                <IncidentsList system={label} service={text} />
                <Footer />
            </AppWrapper>
        </>
    );
}
