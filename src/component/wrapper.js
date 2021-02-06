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
const UPDATE_STORE = "UPDATE_STORE";

function reducer(state = initialState, action) {
    let counter;
    const last_checked = new Date().toLocaleTimeString();

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

            return {
                ...state,
                counter,
                last_checked,
            };
        case UPDATE_STORE:
            return { ...state, last_checked };
        default:
            return state;
    }
}

const createStore = () => reduxCreateStore(reducer);

const AppWrapper = ({ children }) => {
    return <Provider store={createStore()}>{children}</Provider>;
};

export default AppWrapper;
