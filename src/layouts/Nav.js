import React,{ Component } from "react";
import { Link } from "react-router";

class Nav extends Component {
    render(){
        return (
            <nav id="navBar">
                <Link to="/">Home</Link>
            </nav>
        )
    }
}

export default Nav;