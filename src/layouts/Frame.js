import React , { Component } from "react";
import Nav from "./Nav";
import DevTools from "../redux/DevTools";

class  Frame extends Component {
    render(){
        return(
            <div className="frame">
                <section className="header">
                    <Nav/>
                </section>
                <section className="container">
                    {this.props.children}
                </section>
            </div>
        )
    }
}
export default  Frame;