import React,{ Component } from "react";
import { connect } from "react-redux";
import { listActions , commentActions } from "./DetailRedux";
import ArticleDetail from "../components/Detail/ArticleDetail";
import Comment from "../components/Detail/Comment";


class Detail extends Component {
    render(){
        return (
            <div id="detail">
                <ArticleDetail
                    currArticleId={this.props.currArticleId}
                    nextArticleId={this.props.nextArticleId}
                    {...this.props.articleDetail}
                    loadArticleDetail={this.props.loadArticleDetail}
                />
                <Comment
                    commentList={this.props.commentList}
                    submitComment={this.props.submitComment}
                    loadCommentList={this.props.loadCommentList}
                    addLikeCount={this.props.addLikeCount}
                    cancelAddLike={this.props.cancelAddLike}
                />
            </div>
        )
    }
};

function mapStateToProps(state,ownProps){
    let currArticleId=state.detail.articleDetail.articleDetail.id;
    let nextArticleId=1;
    if(currArticleId + 1 > 4){
        nextArticleId=1;
    }else {
        nextArticleId =currArticleId + 1;
    }

    return {
        articleDetail:state.detail.articleDetail,
        currArticleId:currArticleId,
        nextArticleId:nextArticleId,
        commentList:state.detail.comment.commentList
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return {
        loadArticleDetail:listActions.loadArticleDetail.bind(null,dispatch),
        loadCommentList:commentActions.loadCommentList.bind(null,dispatch),
        submitComment:commentActions.submitComment.bind(null,dispatch),
        addLikeCount:commentActions.addLikeCount.bind(null,dispatch),
        cancelAddLike:commentActions.cancelAddLike.bind(null,dispatch)
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Detail);
