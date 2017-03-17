import React ,{ Component , PropTypes } from "react";
import {  Button ,
          Dialog ,
          CellsTitle,
          Form,
          FormCell,
          CellBody,
          TextArea,
          Toptips
} from "react-weui";


class CommentItem extends  Component {
    static propTypes = {
        id:PropTypes.number,
        userName:PropTypes.string,
        text:PropTypes.string,
        date:PropTypes.string,
        likeCount:PropTypes.number,
        addLikeCount:PropTypes.func,
        hadAddLike:PropTypes.bool,
        cancelAddLike:PropTypes.func
    }

    render(){
        let {
            id,
            userName,
            text,
            date,
            likeCount,
            addLikeCount,
            hadAddLike,
            cancelAddLike
        }=this.props;

        return (
            <li className="cf">
                <span>{userName + "说："}</span>
                <span style={{marginRight:"20px"}}>{text}</span>
                <span>{`${likeCount}个人赞过他 `}</span>
                {
                    hadAddLike ?
                    (<button onClick={() => { cancelAddLike(id)}}>取消点赞</button>) :
                    (<button onClick={() => { addLikeCount(id)}}>我也赞他</button>)
                }
                <span style={{float:"right"}}>{date}</span>
            </li>
        )
    }
};

class CommentForm extends  Component {
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


    static propTypes = {
        submitComment:PropTypes.func
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



    render (){
        return (
            <div className="comment-form">
                <CellsTitle>发表评论</CellsTitle>
                <Form>
                    <FormCell>
                        <CellBody>
                            <TextArea
                                placeholder="Enter your comments"
                                rows="3"
                                maxlength="200"
                                value={this.state.commentText}
                                onChange={this.handleCommentTextChange}>
                            </TextArea>
                        </CellBody>
                    </FormCell>
                </Form>
                <div>
                    <Button size="small" onClick={this.handlePublishComment}>发表</Button>
                </div>
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

    componentWillUnMount(){
        this.topTipTimer && clearTimeout(this.topTipTimer);
    }
};

class Comment extends Component {
    static propTypes = {
        loadCommentList:PropTypes.func,
        submitComment:PropTypes.func,
        commentList:PropTypes.arrayOf(PropTypes.object),
        addLikeCount:PropTypes.func,
        cancelAddLike:PropTypes.func
    }

    render(){
        let {
            commentList,
            submitComment,
            addLikeCount,
            cancelAddLike
        }=this.props;

        let isEmpty=commentList && commentList.length ? false : true;

        return (
            <div className="comment-list">
                <h1>用户评论</h1>
                {
                    !isEmpty ?
                    <ul>
                        {
                            commentList.map((item,index) => {
                                return (
                                    <CommentItem
                                        key={index+1}
                                        {...item}
                                        addLikeCount={addLikeCount}
                                        cancelAddLike={cancelAddLike}
                                    />
                                )
                            })
                        }
                    </ul>  :
                    <div>暂时没有用户评论！</div>
                }
                <CommentForm submitComment={submitComment}/>
            </div>
            )


    }

    componentDidMount(){
        this.props.loadCommentList();
    }

};


export default Comment;