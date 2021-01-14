import * as React from "react";
import { Provider, useDispatch } from "react-redux";
import { createStore as reduxCreateStore } from "redux";
import initData from "../../initdata.json";

const initialState = {
    ...initData,
    counter: 60,
    last_checked: new Date().toLocaleTimeString(),
};

const TOGGLE_DARKMODE = "TOGGLE_DARKMODE";
const TICK_COUNTER = "TICK_COUNTER";
const RESET_COUNTER = "RESET_COUNTER";

function reducer(state = initialState, action) {
    let counter, last_checked;

    switch (action.type) {
        case TOGGLE_DARKMODE:
            return { ...state, isDarkMode: action.isDarkMode };
        case TICK_COUNTER:
            const temp = state.counter;
            counter = temp === 0 ? 0 : temp - 1;
            return {
                ...state,
                counter,
            };
        case RESET_COUNTER:
            counter = 60;
            last_checked = new Date().toLocaleTimeString();
            return {
                ...state,
                counter,
                last_checked,
            };
        default:
            return state;
    }
}

const createStore = () => reduxCreateStore(reducer);

const AppWrapper = ({ children }) => {
    return <Provider store={createStore()}>{children}</Provider>;
};

export default AppWrapper;
