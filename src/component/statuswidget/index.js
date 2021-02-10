import * as React from "react";
import { useSelector } from "react-redux";
import "./statuswidget.scss";

const WidgetItem = () => {
    return (
        <div>
            <div className="w-value">100%</div>
            <div className="w-label">Last 7 days</div>
        </div>
    );
};

const SystemWidget = () => {
    const store = useSelector((state) => state);

    return (
        <>
            <div className="widget-list-container">
                <div className="container">
                    <h3 className="section-title">Overall Uptime</h3>
                    <ul className="widget-list">
                        <li className="widget-item row">
                            <WidgetItem />
                        </li>
                        <li className="widget-item row">
                            <WidgetItem />
                        </li>
                        <li className="widget-item row">
                            <WidgetItem />
                        </li>
                        <li className="widget-item row">
                            <WidgetItem />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SystemWidget;
