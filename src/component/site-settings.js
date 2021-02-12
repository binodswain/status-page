import * as React from "react";
import Overlay from "react-overlay-component";
const { useState, useEffect } = React;

const cog_icon = (
    <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            stroke-linecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        ></path>
        <path
            stroke-linecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
    </svg>
);

const check_icon = (
    <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            stroke-linecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
        ></path>
    </svg>
);
const configs = {
    animate: true,
    clickDismiss: false,
    // escapeDismiss: false,
    focusOutline: false,
};

export default function SiteSettings() {
    const setStorage = (val) => localStorage.setItem("siteTheme", val);
    const getStorage = () => localStorage.getItem("siteTheme");
    const setProfileStorage = (val) => localStorage.setItem("siteProfile", val);
    const getProfileStorage = () => localStorage.getItem("siteProfile");

    const [isOpen, setOverlay] = useState(false);
    const closeOverlay = () => setOverlay(false);

    const [theme, setTheme] = useState("");
    const [profile, setProfile] = useState("");

    // fetch updated data on load of the component.
    useEffect(() => {
        const th = getStorage() || "light";
        setTheme(th);
        const pr = getProfileStorage() || "flat";
        setProfile(pr);
        // updateProfile();
    }, []);

    const updateTheme = () => {
        if (window && window.document && theme) {
            const existingCls = document.body.className;
            const newCls = existingCls
                .split(" ")
                .filter((cls) => {
                    if (!cls || ["dark", "light"].indexOf(cls) >= 0) {
                        return false;
                    }
                    return true;
                })
                .concat([theme])
                .join(" ");
            document.body.className = newCls;
            setStorage(theme);
        }
    };

    const updateProfile = () => {
        if (window && window.document && profile) {
            document.documentElement.className = profile;
            setProfileStorage(profile);
        }
    };

    useEffect(() => {
        updateTheme();
    }, [theme]);

    useEffect(() => {
        updateProfile();
    }, [profile]);

    return (
        <div>
            <button
                className="icon btn"
                onClick={() => {
                    setOverlay(true);
                }}
            >
                {cog_icon}
            </button>

            <Overlay
                configs={configs}
                isOpen={isOpen}
                closeOverlay={closeOverlay}
            >
                <h2>Site settings</h2>
                <div className="settings-list">
                    <div className="row settings-option">
                        <div className="column large-6 small-12">
                            <div className="settings-text">Change theme</div>
                        </div>
                        <div className="column large-6 small-12">
                            <div className="radio-button-list">
                                {["light", "dark"].map((themeEle) => {
                                    const isSelected = themeEle === theme;
                                    return (
                                        <label
                                            htmlFor={`${themeEle}-theme`}
                                            onClick={() => setTheme(themeEle)}
                                            key={themeEle}
                                        >
                                            <input
                                                type="radio"
                                                name={themeEle}
                                                id={`${themeEle}-theme`}
                                                hidden
                                                checked={isSelected}
                                            />
                                            <div className="label-content">
                                                {themeEle}
                                                {isSelected ? check_icon : null}
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row settings-option">
                        <div className="column large-6 small-12">
                            <div className="settings-text">Change profile</div>
                        </div>
                        <div className="column large-6 small-12">
                            <div className="radio-button-list">
                                {["flat", "round"].map((profileEle) => {
                                    const isSelected = profileEle === profile;
                                    return (
                                        <label
                                            htmlFor={`${profileEle}-profile`}
                                            onClick={() =>
                                                setProfile(profileEle)
                                            }
                                            key={profileEle}
                                        >
                                            <input
                                                type="radio"
                                                name={profileEle}
                                                id={`${profileEle}-profile`}
                                                hidden
                                                checked={isSelected}
                                            />
                                            <div className="label-content">
                                                {profileEle}
                                                {isSelected ? check_icon : null}
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Overlay>
        </div>
    );
}
