import { combineReducers } from "redux";
import { todoReducer } from "./todoReducers/todoReducer";

const rootReducer = combineReducers({
    todoReducer
})

export default rootReducer;