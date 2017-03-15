import React , { Component } from "react";
import { Router,Route,IndexRoute,hashHistory } from "react-router";

import Frame from "../layouts/Frame";
import Home from "../views/Home";
import Detail from "../views/Detail";


const routes=(
	<Router history={hashHistory}>
		<Route path="/" component={Frame}>
			<IndexRoute component={<Home test="test"/>}/>
			<Route path="/detail/:id" component={Detail}/>
		</Route>
	</Router>
);

console.log(routes);

export default routes;