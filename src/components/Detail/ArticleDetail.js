import React ,{ Component , PropTypes } from "react";

class ArticleDetail extends Component {
    static propTypes={
        currArticleId:PropTypes.number,
        title:PropTypes.string,
        date:PropTypes.string,
        description:PropTypes.string,
        loadArticleDetail:PropTypes.func
    }

    render(){
        let {
          title,
          date,
          description
        }=this.props.articleDetail;

        let {
            loading,
            error,
            currArticleId,
            nextArticleId,
            loadArticleDetail
        }=this.props;

        if(loading) {
            return (
                <div>loading......</div>
            )
        }

        if(error){
            return (
                <div>oop,something wrong with the app!!</div>
            )
        }

        return (
            <div>
                <h1>{title} <span style={{float:"right"}}>{date}</span></h1>
                <article>
                    {description}
                </article>
                <div style={{textAlign:"center",marginTop:"100px",cursor:"pointer"}} onClick={loadArticleDetail.bind(null,nextArticleId)}>下一篇</div>
            </div>
        )

    }

    componentDidMount(){
        this.props.loadArticleDetail(this.props.currArticleId);
    }

}

export default ArticleDetail;