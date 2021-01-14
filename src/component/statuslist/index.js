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
        <>
            <div className="column large-3 small-6">
                <Link to={`/${label}/`} className="service-link">
                    {text}
                </Link>
            </div>
            <div className="column large-1 small-6">90.00%</div>
            <div className="column large-6 small-6 status-block-list">
                {blocks}
            </div>
            <div
                className="column large-2 small-6"
                style={{
                    textAlign: "right",
                }}
                title={status.text}
            >
                {status.label}
            </div>
        </>
    );
};

const SystemComponents = () => {
    const services = useSelector((state) => state.services);

    return (
        <>
            <div className="component-list-container">
                <div className="container">
                    <h3>System list</h3>
                    <ul className="component-list">
                        {services.map((service) => {
                            return (
                                <li
                                    className="component-item row"
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
