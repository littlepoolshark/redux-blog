import  { createStore,combineReducers,compose,applyMiddleware } from "redux";
import  { routerReducer,routerMiddleware } from "react-router-redux";
import  { hashHistory } from "react-router";

import ThunkMiddleware from "redux-thunk";
import createFetchMiddleware from "redux-composable-fetch";
import rootReducer from "./reducers";
import DevTools from "./DevTools";


const FetchMiddleware =createFetchMiddleware();

const enhancer=compose(
    applyMiddleware(ThunkMiddleware,routerMiddleware(hashHistory)),
    DevTools.instrument()
);

const reducer=combineReducers(Object.assign(
    {},
    rootReducer,
    {routing:routerReducer}
));

export default function configureStore(initialState){
    const store=createStore(reducer,initialState,enhancer);

    return store;
}