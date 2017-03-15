import React,{ Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PreviewList from "../components/Home/PreviewList";
import { listActions } from "./HomeRedux";
import { push } from "react-router-redux";


class Home extends Component {
    render(){
        return (
            <div>
                <h1>Home</h1>
                <PreviewList
                    {...this.props.list}
                    loadArticles={this.props.loadArticles}
                    push={this.props.push}
                />
            </div>

        )
    }
};

function mapStateToProps(state,ownProps){
    return {
        list:state.home.previewList
    }
}

function mapDispatchToProps(dispatch){
    return {
        loadArticles:listActions.loadArticles.bind(null,dispatch),
        push:bindActionCreators(push,dispatch)
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Home);
