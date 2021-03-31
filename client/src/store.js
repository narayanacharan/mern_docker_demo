import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const store = createStore(
   rootReducer,
   initialState,
   composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
