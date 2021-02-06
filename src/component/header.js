import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "./utils";
import "./header.scss";
import { time as buildTime } from "../../buildinfo.json";

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
    const { status = "operational", service } = props;
    const store = useSelector((state) => state);
    // console.log(`[store]`, store);
    const { counter, last_checked, buildinfo_api, storedata_api } = store;
    const dispatch = useDispatch();

    useInterval(() => {
        dispatch({
            type: "TICK_COUNTER",
        });
    }, 1000);

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
            });
    };

    if (counter == 3) {
        setTimeout(() => {
            // fetch build data
            const buildtime_api = `${buildinfo_api}?fetched=${Date.now()}`;
            fetch(buildtime_api)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
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
                        <div
                            className="column large-6 small-12"
                            style={{
                                fontSize: 30,
                            }}
                        >
                            {service ? `${service} Service` : `Status Page`}
                        </div>
                        <div
                            className="column large-6 small-12"
                            style={{
                                textAlign: "right",
                            }}
                        >
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
                    {service ? `${service} is ${status}` : STATUS[status].text}
                </div>
            </div>
        </>
    );
};

export default IndexPage;
