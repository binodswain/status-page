import * as React from "react";
import { useSelector } from "react-redux";
import "./statusupdates.scss";
import { Link } from "gatsby";
import { services as SERVICES } from "../../../site-config";
import { VscIssues, VscIssueClosed } from "react-icons/vsc";
import { useState } from "react";

const SystemWidget = (props) => {
    const issues = useSelector((state) => state.issues || []);
    // console.log(`[SystemWidget store]`, issues);
    const { system, service } = props;
    const [filter, setFilter] = useState("ALL_ISSUES");

    const filteredIssues = issues.filter((issue) => {
        const { isOpen } = issue;

        if (filter === "ALL_ISSUES") {
            return true;
        } else if (filter === "OPEN_ISSUES") {
            return isOpen === true;
        } else if (filter === "CLOSED_ISSUES") {
            return isOpen === false;
        }
    });

    const serviceIssues = filteredIssues.filter((issue) => {
        const { labels = [] } = issue;

        if (system && !labels.includes(system)) {
            return false;
        }
        return true;
    });

    // if (service && !serviceIssues.length) {
    //     return null;
    // }

    console.log(`[serviceIssues]`, serviceIssues);

    return (
        <>
            <div className="incident-list-container">
                <div className="container">
                    <div className="section-header row">
                        <div className="column large-8 small-12">
                            <h3 className="section-title">
                                {service
                                    ? `Recent "${service}" related incidents`
                                    : "Recent incidents"}
                            </h3>
                        </div>

                        <div className="column large-4 small-12 align-filter">
                            <div className="button-list">
                                <button
                                    className={`button${
                                        filter === "ALL_ISSUES"
                                            ? " selected"
                                            : ""
                                    }`}
                                    onClick={() => setFilter("ALL_ISSUES")}
                                >
                                    All
                                </button>

                                <button
                                    className={`button${
                                        filter === "OPEN_ISSUES"
                                            ? " selected"
                                            : ""
                                    }`}
                                    onClick={() => setFilter("OPEN_ISSUES")}
                                >
                                    Open
                                </button>

                                <button
                                    className={`button${
                                        filter === "CLOSED_ISSUES"
                                            ? " selected"
                                            : ""
                                    }`}
                                    onClick={() => setFilter("CLOSED_ISSUES")}
                                >
                                    Closed
                                </button>
                            </div>
                        </div>
                    </div>
                    {serviceIssues.length ? (
                        <ul className="incident-list">
                            {serviceIssues.map((issue) => {
                                const {
                                    closed_at,
                                    created_at,
                                    description,
                                    id,
                                    labels = [],
                                    state,
                                    title,
                                    updated_at,
                                    isOpen,
                                } = issue;
                                const duration = "";

                                const isServiceIssue =
                                    system && !labels.includes(system);

                                if (isServiceIssue) {
                                    return null;
                                }

                                const icon = isOpen ? (
                                    <VscIssues size={`1.25em`} />
                                ) : (
                                    <VscIssueClosed size={`1.25em`} />
                                );
                                return (
                                    <li key={id} className="incident-item">
                                        <div className={`incident ${state}`}>
                                            <h3 className="incident-title">
                                                {icon}
                                                {title}
                                            </h3>
                                            <div className="incident-time">
                                                {new Date(
                                                    created_at
                                                ).toLocaleString()}
                                            </div>
                                            {/* <div className="incident-meta">
                                            {labels.length ? <ul className="incident-labels">
                                                {labels.map(label=>{
                                                    return <li className="incident-label" key={label}>
                                                        <Link to={`/${label}/`} className="service-link">
                                                            {label}
                                                        </Link>
                                                    </li>
                                                })}
                                            </ul> : null}
                                        </div> */}
                                            <div
                                                className="incident-description"
                                                dangerouslySetInnerHTML={{
                                                    __html: description,
                                                }}
                                            />
                                            {closed_at ? (
                                                <p className="incident-endtime">
                                                    <strong>Ended at</strong>{" "}
                                                    {new Date(
                                                        closed_at
                                                    ).toLocaleString()}
                                                </p>
                                            ) : null}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div>
                            {filter === "ALL_ISSUES"
                                ? "No incidents reported yet."
                                : "No incidents in this state."}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SystemWidget;
