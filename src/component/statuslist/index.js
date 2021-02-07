import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "gatsby";
import "./statuslist.scss";

const StatusRow = (props) => {
    const blocks = [
        "operational",
        "operational",
        "operational",
        "operational",
        "operational",
        "operational",
        "operational",
    ].map((block) => {
        return <div className={`block ${block}`}></div>;
    });

    const {
        service: { affected, label, text, timeline, status },
    } = props;

    return (
        <div className="row component-item">
            <div className="column large-6 small-6">
                <Link to={`/${label}/`} className="service-link">
                    {text}
                </Link>
            </div>
            {/* <div className="column large-1 small-6">90.00%</div>
            <div className="column large-6 small-6 status-block-list">
                {blocks}
            </div> */}
            <div
                className="column large-6 small-6"
                style={{
                    textAlign: "right",
                }}
                title={status.text}
            >
                <div className="status-wrapper"><span>{status.label}</span>
                <div className={`status-icon ${status.label.toLowerCase()}`}/></div>
            </div>
        </div>
    );
};

const SystemComponents = () => {
    const services = useSelector((state) => state.services);

    return (
        <>
            <div className="component-list-container">
                <div className="container">
                    <h3>System list</h3>
                    <ul className="component-list row">
                        {services.map((service) => {
                            return (
                                <li
                                    className="column large-6 small-12"
                                    key={service.label}
                                >
                                    <StatusRow service={service} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SystemComponents;
