import { combineReducers } from "redux";

import previewList from "../components/Home/PreviewListRedux";

export default  combineReducers({previewList});

export * as listActions from "../components/Home/PreviewListRedux";

