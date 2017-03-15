import React ,{ Component , PropTypes } from "react";


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
    static propTypes = {
        submitComment:PropTypes.func
    }

    submitComment(){
        let commentText=document.getElementById("commentText");
        this.props.submitComment(commentText.value);
        commentText.value="";
    }

    render (){
        return (
            <div>
                <textarea name="" id="commentText" cols="30" rows="10" ref="commentText"></textarea>
                <div>
                    <button onClick={() => {
                        this.submitComment()
                    }}>发表</button>
                </div>
            </div>
        )
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
            <div className="comment-container">
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