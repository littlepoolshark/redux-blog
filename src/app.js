import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { hashHistory,Router,Route,IndexRoute, } from "react-router";

import Frame from "./layouts/Frame";
import Home from "./views/Home";
import Detail from "./views/Detail";

const store=configureStore();
const history=syncHistoryWithStore(hashHistory,store);

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Frame}>
                    <IndexRoute component={Home}/>
                    <Route path="/detail" component={Detail}/>
                </Route>
            </Router>
        </Provider>
    )
,document.getElementById("root"));