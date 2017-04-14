import React,{ Component } from "react";
import { connect } from "react-redux";
import { listActions , commentActions } from "./DetailRedux";
import ArticleDetail from "../components/Detail/ArticleDetail";
import Comment from "../components/Detail/Comment";
import Slider from '../components/UI/Slider/Slider';
import {
    Dialog ,
    Toptips
} from "react-weui";


class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDialogShow:false,
            isShowTopTip:false,
            commentText:"",
            topTipText:""
        }
        this.closeDialog=this.closeDialog.bind(this);
        this.handleCommentTextChange=this.handleCommentTextChange.bind(this);
        this.handlePublishComment=this.handlePublishComment.bind(this);
    }

    submitComment(){
        let commentText=this.state.commentText;
        this.props.submitComment(commentText);
        this.clearComment();
    }

    clearComment(){
        this.setState({
            commentText:""
        })
    }

    handleCommentTextChange(e){
        this.setState({
            commentText: e.target.value
        })
    }

    handlePublishComment(){
        let currCommentText=this.state.commentText;
        if(currCommentText){
            this.openDialog();
        }else {
            this.giveSomeWarn("评论不能为空哦！")
        }

    }

    openDialog(){
        this.setState({
            isDialogShow:true
        })
    }

    closeDialog(){
        this.setState({
            isDialogShow:false
        })
    }

    giveSomeWarn(warnText){
        this.setState({
                isShowTopTip:true,
                topTipText:warnText
        },() => {
        this.topTipTimer=setTimeout(()=>{
            this.setState({
                isShowTopTip:false,
                topTipText:""
            })
        },2000)
        })
    }


    render(){
        return (
            <div id="detail">
                <Slider/>
                <ArticleDetail
                    currArticleId={this.props.currArticleId}
                    nextArticleId={this.props.nextArticleId}
                    {...this.props.articleDetail}
                    loadArticleDetail={this.props.loadArticleDetail}
                />
                <Comment
                    commentList={this.props.commentList}
                    loadCommentList={this.props.loadCommentList}
                    addLikeCount={this.props.addLikeCount}
                    cancelAddLike={this.props.cancelAddLike}
                    submitComment={this.handlePublishComment}
                    handleCommentTextChange={this.handleCommentTextChange}
                    currCommentText={this.state.commentText}
                />
                <Dialog
                    show={this.state.isDialogShow}
                    title="提示"
                    type="ios"
                    buttons={[
                        {type:"default",label:"取消",onClick:this.closeDialog},
                        {type:"primary",label:"确定",onClick:() => {
                           this.closeDialog();
                           this.submitComment();
                        }}
                        ]}
                >
                    你确定要发表这条惊天动地的评论吗？
                </Dialog>
                <Toptips type="warn" show={this.state.isShowTopTip}>{this.state.topTipText}</Toptips>
            </div>
        )
    }

    componentWillUnmount(){
        this.topTipTimer && clearTimeout(this.topTipTimer)
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
        addLikeCount:commentActions.addLikeCount.bind(null,dispatch),
        cancelAddLike:commentActions.cancelAddLike.bind(null,dispatch),
        submitComment:commentActions.submitComment.bind(null,dispatch)
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Detail);
