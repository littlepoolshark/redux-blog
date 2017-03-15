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
            userName:"sam",
            date:"2017-03-12",
            text:commentText
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
        default:
            return state;
    }
};