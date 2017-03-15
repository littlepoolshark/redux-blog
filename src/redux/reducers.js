import { combineReducers } from "redux";
import previewList from "../views/HomeRedux";
import articleDetail from "../views/DetailRedux";

export default {
    home:previewList,
    detail:articleDetail
};