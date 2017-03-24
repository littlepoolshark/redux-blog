import React ,{ Component , PropTypes } from "react";
import {
          Button ,
          CellsTitle,
          Form,
          FormCell,
          CellBody,
          TextArea,
          Icon
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
                <div className="header">
                    <div className="avatar-wrapper">
                        <img src="../../src/img/react-logo.jpg" alt="" className="avatar"/>
                        <div>{userName}</div>
                    </div>
                   <div className="date">{date}</div>
                </div>
                <div className="body">{text}</div>
                <div className="footer">
                    <div className="likeCount-wrapper">
                        {
                            hadAddLike ?
                            (<Icon value="success" onClick={() => { cancelAddLike(id)}}/>) :
                            (<Icon value="success-circle" onClick={() => { addLikeCount(id)}}/>)
                        }
                        <span className="like-count">{likeCount}</span>
                    </div>
                </div>
            </li>
        )
    }
};

class CommentForm extends  Component {

    static propTypes = {
        submitComment:PropTypes.func,
        handleCommentTextChange:PropTypes.func,
        commentText:PropTypes.string
    }

    render (){
        return (
            <div className="comment-form">
                <CellsTitle>发表评论</CellsTitle>
                <Form>
                    <FormCell>
                        <CellBody>
                            <TextArea
                                placeholder="请输入你独到的见解!"
                                rows="3"
                                maxlength="200"
                                value={this.props.commentText}
                                onChange={this.props.handleCommentTextChange}>
                            </TextArea>
                        </CellBody>
                    </FormCell>
                </Form>
                <div>
                    <Button size="small" onClick={this.props.submitComment}>发表</Button>
                </div>
            </div>
        )
    }
};

class Comment extends Component {
    static propTypes = {
        loadCommentList:PropTypes.func,
        commentList:PropTypes.arrayOf(PropTypes.object),
        addLikeCount:PropTypes.func,
        cancelAddLike:PropTypes.func,
        submitComment:PropTypes.func,
        handleCommentTextChange:PropTypes.func,
        currCommentText:PropTypes.string
    }

    render(){
        let {
            commentList,
            submitComment,
            addLikeCount,
            cancelAddLike,
            handleCommentTextChange,
            currCommentText
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
                <CommentForm
                    submitComment={submitComment}
                    handleCommentTextChange={handleCommentTextChange}
                    commentText={currCommentText}
                />
            </div>
            )


    }

    componentDidMount(){
        this.props.loadCommentList();
    }

};


export default Comment;