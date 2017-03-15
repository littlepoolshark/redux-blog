const initialState={//store
    loading:true,
    error:false,
    articleList:[]
};

const  LOAD_ARTICLES="LOAD_ARTICLES";
const  LOAD_ARTICLES_SUCCESS="LOAD_ARTICLES_SUCCESS";
const  LOAD_ARTICLES_ERROR="LOAD_ARTICLES_ERROR";

export function loadArticles(dispatch){//action creator
    dispatch({
        type:"LOAD_ARTICLES"
    });
    fetch("../../../api/articles.json").then(function(res){
        if(res.ok){
            res.json().then(function(obj){
                dispatch({
                    type:LOAD_ARTICLES_SUCCESS,
                    payload:{
                        articleList:obj.list
                    }
                })
            })
        }
    },function(err){
        dispatch({
            type:LOAD_ARTICLES_ERROR
        })
    })
}


function previewList(state=initialState,action){//reducer
    switch (action.type){
        case LOAD_ARTICLES:
            return {
                ...state,
                loading: true,
                error: false
            }
        case  LOAD_ARTICLES_SUCCESS:
            return {
                ...state,
                loading:false,
                error:false,
                articleList:action.payload.articleList
        }
        case LOAD_ARTICLES_ERROR:
            return {
                ...state,
                loading:false,
                error:true
            }
        default:
            return state;
    }
}

export default previewList;