import { combineReducers } from "redux";
import { NewsList } from "./NewsReducer";

const rootReducer =  combineReducers({
  newsList: NewsList,
});

export default rootReducer;