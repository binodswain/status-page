import * as React from "react";
import { useSelector } from "react-redux";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";

const SystemWidget = () => {
    const store = useSelector((state) => state);
    // console.log(`[timeline store]`, store);

    return (
        <>
            <div className="timeline-container">
                <div className="container">
                    <h3 className="section-title">Calendar history</h3>
                </div>
            </div>
        </>
    );
};

export default SystemWidget;
