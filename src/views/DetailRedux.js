import { combineReducers } from "redux";

import articleDetail from "../components/Detail/ArticleDetailRedux";
import comment from "../components/Detail/CommentRedux";

export * as listActions from "../components/Detail/ArticleDetailRedux";
export * as commentActions from "../components/Detail/CommentRedux";

export default  combineReducers({articleDetail,comment});


