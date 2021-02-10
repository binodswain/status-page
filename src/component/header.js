import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "./utils";
import { Link } from "gatsby";
import { MdArrowBack } from "react-icons/md";
import "./header.scss";

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

const IndexPage = (props) => {
    const { status = "operational", service, showHomeLink } = props;
    const store = useSelector((state) => state);

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
                                    <MdArrowBack
                                        style={{
                                            marginRight: "0.25em",
                                        }}
                                    />
                                    <Link to={`/`} className="header-home-link">
                                        Back to home
                                    </Link>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="column large-6 small-12 service-status-counter">
                            <h2>Service status</h2>
                            <div className="update-time">
                                Last updated {last_checked} | Next update in{" "}
                                {counter} sec.
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
