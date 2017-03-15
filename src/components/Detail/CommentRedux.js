const initialState={
    loading:false,
    error:false,
    commentList:[]
};

const  LOAD_COMMENTLIST="LOAD_COMMENTLIST";
const  LOAD_COMMENTLIST_SUCCESS="LOAD_COMMENTLIST_SUCCESS";
const  LOAD_COMMENTLIST_ERROR="LOAD_COMMENTLIST_ERROR";
const  SUBMIT_COMMENT="SUBMIT_COMMENT";
const  SUBMIT_COMMENT_SUCCESS="SUBMIT_COMMENT_SUCCESS";
const  SUBMIT_COMMENT_ERROR="SUBMIT_COMMENT_ERROR";
const  ADD_LIKE_COUNT="ADD_LIKE_COUNT";
const  CANCEL_ADD_LIKE="CANCEL_ADD_LIKE";

export function loadCommentList(dispatch){//action creator
    dispatch({
        type:"LOAD_COMMENTLIST"
    });
    fetch("../../../api/commentList.json").then(function(res){
        if(res.ok){
            res.json().then(function(obj){
                dispatch({
                    type:LOAD_COMMENTLIST_SUCCESS,
                    payload:{
                        commentList:obj.list
                    }
                })
            })
        }
    },function(err){
        dispatch({
            type:LOAD_COMMENTLIST_ERROR
        })
    })
};

export function submitComment(dispatch,commentText){
    dispatch({
        type:SUBMIT_COMMENT_SUCCESS,
        payload:{
            id:new Date().getTime(),
            userName:"sam",
            date:"2017-03-12",
            text:commentText,
            likeCount:0
        }
    })
}


export function addLikeCount(dispatch,id){
    dispatch({
        type:ADD_LIKE_COUNT,
        payload:{
          id
        }
    })
}

export function cancelAddLike(dispatch,id){
    dispatch({
        type:CANCEL_ADD_LIKE,
        payload:{
            id
        }
    })
}

export  default  function commentList(state=initialState,action){
    switch(action.type){
        case LOAD_COMMENTLIST:
                return {
                    ...state,
                    loading:true,
                    error:false
                }
        case LOAD_COMMENTLIST_SUCCESS:
                return {
                    loading:false,
                    error:false,
                    commentList:action.payload.commentList.slice()
                }
        case LOAD_COMMENTLIST_ERROR:
                return {
                    ...state,
                    loading:false,
                    error:false
                }
        case SUBMIT_COMMENT_SUCCESS:
                return {
                    loading:false,
                    error:false,
                    commentList:[...state.commentList,action.payload]
                }
        case ADD_LIKE_COUNT:
            return {
                loading:false,
                error:false,
                commentList:state.commentList.map((item,index) => {
                    if(action.payload.id === item.id){
                        let newLikeCount=item.likeCount + 1;
                        return {
                            ...item,
                            likeCount:newLikeCount,
                            hadAddLike:true
                        }
                    }
                    return item;
                })
            }
        case CANCEL_ADD_LIKE:
            return {
                loading:false,
                error:false,
                commentList:state.commentList.map((item,index) => {
                    if(action.payload.id === item.id){
                        let newLikeCount=item.likeCount - 1;
                        return {
                            ...item,
                            likeCount:newLikeCount,
                            hadAddLike:false
                        }
                    }
                    return item;
                })
            }
        default:
            return state;
    }
};