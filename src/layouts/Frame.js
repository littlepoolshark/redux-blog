import React , { Component } from "react";
import Home from "../views/Home";
import DevTools from "../redux/DevTools";

import {
    Tab,
    NavBarItem
} from "react-weui";

class  Frame extends Component {
    render(){
        return(
            <Tab type="navbar">
                <NavBarItem label="技术热文">
                    <Home/>
                </NavBarItem>
                <NavBarItem label="中国时代">
                    中国时代
                </NavBarItem>
                <NavBarItem label="发现更多">
                    发现更多
                </NavBarItem>
            </Tab>
        )
    }
}
export default  Frame;