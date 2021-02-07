import * as React from "react";
import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer-powered">
            <div className="container">
                <div className="footer">
                    Powered by{" "}
                    <a href="https://github.com/binodswain/status-page">
                        Status page
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
