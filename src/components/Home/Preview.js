import React ,{ Component , PropTypes } from "react";
import "./Preview.css";

class Preview extends Component {
    static propTypes={
        title:PropTypes.string,
        date:PropTypes.string,
        description:PropTypes.string,
        push:PropTypes.func
    }

    handleNavigate(id,event){
        event.preventDefault();
        this.props.push({
            pathname:"detail",
            state:{
                id
            }
        });
    }

    render(){
        let {
            id,
            title,
            date,
            description
        }=this.props;

        return (
            <article className="article-preview-item">
                <h1 className="title" onClick={this.handleNavigate.bind(this,id)}>{title}</h1>
                <span className="date">{date}</span>
                <p className="des">{description}</p>
            </article>
        )
    }
}

export  default Preview;