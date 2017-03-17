import React ,{ Component , PropTypes } from "react";
import { Toast } from "react-weui";

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
                <Toast icon="loading" show={true}>加载中...</Toast>
            )
        }

        if(error){
            return (
                <div>oop,something wrong with the app!!</div>
            )
        }

        return (
            <div className="article-detail">
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