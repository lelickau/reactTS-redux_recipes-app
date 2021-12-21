import { applyMiddleware, combineReducers, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import globalReducer from "./globalReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, composedEnhancer);