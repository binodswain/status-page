import * as React from "react";
import { useSelector } from "react-redux";
import "./statusupdates.scss";
import { Link } from "gatsby";
import { services as SERVICES } from "../../../site-config";

const SystemWidget = (props) => {
    const issues = useSelector((state) => state.issues || []);
    console.log(`[SystemWidget store]`, issues);
    const {
        system, service
    } = props;

    return (
        <>
            <div className="incident-list-container">
                <div className="container">
                    <h3 className="section-title">{service ? `Recent "${service}" related incidents`: 'Recent incidents'}</h3>
                    {issues.length ? (
                        <ul className="incident-list">
                            {issues.map((issue) => {
                                const {
                                    closed_at,
                                    created_at,
                                    description,
                                    id,
                                    labels = [],
                                    state,
                                    title,
                                    updated_at,
                                } = issue;
                                const duration = '';

                                if (system && !labels.includes(system)) {
                                    return null;
                                }

                                return <li key={id} >
                                    <div className={`incident ${state}`}>
                                        <h3 className="incident-title">{title}</h3>
                                        <div className="incident-time">{new Date(created_at).toLocaleString()}</div>
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
                                        <div className="incident-description" dangerouslySetInnerHTML={{__html: description}}/>
                                        {closed_at ? <p className="incident-endtime">
                                            <strong>Ended at</strong> {new Date(closed_at).toLocaleString()}
                                        </p>: null}
                                    </div>
                                </li>;
                            })}
                        </ul>
                    ) : (
                        <div>No incidents reported yet.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SystemWidget;
