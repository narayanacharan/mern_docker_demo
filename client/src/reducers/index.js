import { combineReducers } from "redux";
import {
   bookCreateReducer,
   bookDeleteReducer,
   bookDetailsReducer,
   bookListReducer,
} from "./bookReducers";

export default combineReducers({
   bookList: bookListReducer,
   bookDetails: bookDetailsReducer,
   bookCreate: bookCreateReducer,
   bookDelete: bookDeleteReducer,
});
