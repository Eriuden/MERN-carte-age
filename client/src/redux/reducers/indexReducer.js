import { combineReducers} from "redux"
import userReducer from "./user.reducer"
import errorReducer from  "./error.reducer"
import usersReducer from "./users.reducer"

const reducers = combineReducers({
    userReducer,
    usersReducer,
    errorReducer,
})

export default reducers