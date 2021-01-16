import { combineReducers } from "redux";
import { News } from "./News_reducer";

const rootReducer =  combineReducers({
  news: News,
});

export default rootReducer;