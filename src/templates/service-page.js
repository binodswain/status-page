import React from "react";
import Header from "../component/header";
import IncidentsList from "../component/statusupdates";
import Footer from "../component/footer";
import AppWrapper from "../component/wrapper";

export default function Template({ pageContext }) {
    // console.log(pageContext);
    const { label, text } = pageContext;
    return (
        <AppWrapper>
            <Header service={text} showHomeLink />
            <IncidentsList system={label} service={text} />
            <Footer />
        </AppWrapper>
    );
}
