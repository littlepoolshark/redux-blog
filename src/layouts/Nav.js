import React,{ Component } from "react";
import { Link } from "react-router";

class Nav extends Component {
    render(){
        return (
            <nav>
                <Link to="/">Home</Link>
            </nav>
        )
    }
}

export default Nav;