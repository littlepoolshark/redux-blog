import React ,{ Component , PropTypes } from "react";
import { Toast,Button } from "react-weui";

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
                <h1>{title} </h1>
                <h6>{date}</h6>
                <article>
                    {description}
                </article>
                <div className="next-article-bar" >
                    <Button onClick={loadArticleDetail.bind(null,nextArticleId)}>下一篇</Button>
                </div>
            </div>
        )

    }

    componentDidMount(){
        this.props.loadArticleDetail(this.props.currArticleId);
    }

}

export default ArticleDetail;