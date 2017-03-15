import React ,{ Component , PropTypes } from "react";
import Preview from "./Preview";

class PreviewList extends Component {
    static propTypes = {
        loading:PropTypes.bool,
        error:PropTypes.bool,
        articleList:PropTypes.arrayOf(PropTypes.object),
        loadArticles:PropTypes.func
    };

    render(){
        const {
            loading,
            error,
            articleList,
            push
        }=this.props;


        if(error){
            return <p className="message">Oops,something is wrong!</p>
        }

        if(loading){
            return <p className="message">Loading......</p>
        }
        return(
            <div>
                {
                    articleList.map(item => {
                        return (<Preview {...item} key={item.id} push={push}></Preview>)
                    })
                }
            </div>
        )


    }

    componentDidMount(){
        this.props.loadArticles();
    }
}

export default PreviewList;