import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "./utils";
import { Link } from "gatsby";
import { MdArrowBack } from "react-icons/md";
import SiteSettings from "./site-settings";
import "./header.scss";

const arrow_back_icon = <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>

const { useState, useEffect } = React;

const STATUS = {
    operational: {
        text: "All systems are operational",
    },
    degraded: {
        text: "Some systems have degraded performance",
    },
    down: {
        text: "All systems are down",
    },
};

const setStorage = (val) => localStorage.setItem("siteTheme", val);
const getStorage = () => localStorage.getItem("siteTheme");

const IndexPage = (props) => {
    const { status = "operational", service, showHomeLink } = props;
    const store = useSelector((state) => state);
    const [theme, setTheme] = useState("light");

    const {
        counter,
        last_checked,
        buildinfo_api,
        storedata_api,
        buildTime,
        banner_data,
    } = store;

    const dispatch = useDispatch();

    useInterval(() => {
        dispatch({
            type: "TICK_COUNTER",
        });
    }, 1000);

    const { text, label } = banner_data;

    // fetch built site data and update redux store.
    // reset counter
    const updateStore = () => {
        //fetch and update store
        const data_api = `${storedata_api}?fetched=${Date.now()}`;
        fetch(data_api)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "UPDATE_STORE",
                    payload: data,
                });
                dispatch({
                    type: "RESET_COUNTER",
                });
            });
    };

    // fetch updated data on load of the component.
    useEffect(() => {
        setTheme(getStorage() || "light");
        updateStore();
    }, []);

    if (counter == 3) {
        setTimeout(() => {
            // fetch build data
            const buildtime_api = `${buildinfo_api}?fetched=${Date.now()}`;
            fetch(buildtime_api)
                .then((res) => res.json())
                .then((data) => {
                    if (buildTime === data.time) {
                        dispatch({
                            type: "RESET_COUNTER",
                        });
                    } else {
                        updateStore();
                    }
                });
        }, 3000);
    }

    const toogleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            setStorage("dark");
        } else {
            setTheme("light");
            setStorage("light");
        }
    };

    const updateTheme = () => {
        if (window && window.document) {
            document.body.className = theme;
        }
    };

    useEffect(() => {
        updateTheme();
    }, [theme]);

    const isDark = theme === "dark";

    return (
        <>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="column large-6 small-12">
                            <div
                                style={{
                                    fontSize: 30,
                                }}
                            >
                                {service ? `${service} Service` : `Status Page`}
                            </div>

                            {showHomeLink ? (
                                <div className="back-home-link">
                                    {arrow_back_icon}
                                    <Link to={`/`} className="header-home-link">
                                        Back to home
                                    </Link>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="column large-6 small-12 service-status-counter">
                            <div className="row counter-settings">
                                <div style={{flex:1}}>
                                    <h2>Service status</h2>
                                    <div className="update-time">
                                        Last updated {last_checked} | Next update in{" "}
                                        {counter} sec.
                                    </div>
                                </div>

                                <SiteSettings />
                            </div>
                            <div className="row">
                                {/* <div className="column large-12">
                                    <button
                                        className="theme-btn"
                                        onClick={toogleTheme}
                                    >
                                        {isDark ? "light" : "dark"}
                                    </button>
                                </div> */}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="status-banner">
                    {service ? `${service} is ${status}` : text}
                </div>
            </div>
        </>
    );
};

export default IndexPage;
