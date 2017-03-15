import { LOCATION_CHANGE } from "react-router-redux";

const initialState={//store
    loading:true,
    error:false,
    articleDetail:{
        id:1,
        title:"",
        date:"",
        description:""
    }
};

const  LOAD_ARTICLES_DETAIL="LOAD_ARTICLES_DETAIL";
const  LOAD_ARTICLES_DETAIL_SUCCESS="LOAD_ARTICLES_DETAIL_SUCCESS";
const  LOAD_ARTICLES_DETAIL_ERROR="LOAD_ARTICLES_DETAIL_ERROR";

export function loadArticleDetail(dispatch,id){//action creator
    dispatch({
        type:LOAD_ARTICLES_DETAIL
    });
    fetch("../../../api/article"+id+".json").then(function(res){
        if(res.ok){
            res.json().then(function(obj){
                dispatch({
                    type:LOAD_ARTICLES_DETAIL_SUCCESS,
                    payload:{
                        articleDetail:obj
                    }
                })
            })
        }
    },function(err){
        dispatch({
            type:LOAD_ARTICLES_DETAIL_ERROR
        })
    })
}


function articleDetail(state=initialState,action){//reducer
    switch (action.type){
        case LOAD_ARTICLES_DETAIL:
            return {
                ...state,
                loading: true,
                error: false
            }
        case  LOAD_ARTICLES_DETAIL_SUCCESS:
            return {
                ...state,
                loading:false,
                error:false,
                articleDetail:action.payload.articleDetail
            }
        case LOAD_ARTICLES_DETAIL_ERROR:
            return {
                ...state,
                loading:false,
                error:true
            }
        case LOCATION_CHANGE:
            if(action.payload.pathname.indexOf("detail") > -1 && action.payload.state){
                return {
                    ...state,
                    articleDetail:{
                        ...state.articleDetail,
                        id:action.payload.state.id
                    }
                }
            }
            return state;

        default:
            return state;
    }
}

export default articleDetail;