import * as React from "react";
import "./index.scss";
import Header from "../component/header";
import SystemComponents from "../component/statuslist";
import SystemWidget from "../component/statuswidget";
import TimelineWidget from "../component/timeline";
import IncidentsList from "../component/statusupdates";
import Footer from "../component/footer";
import AppWrapper from "../component/wrapper";

const IndexPage = () => {
    return (
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
    );
};

export default IndexPage;
