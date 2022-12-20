import { GET_USER, UPDATE_USER, UPLOAD_PICTURE, DELETE_USER } from "../actions/user.actions";

const initialState = {}

export default function usersReducer(state = initialState,action){ 
    switch(action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload,
                bio: action.payload,
            }
        case DELETE_USER:
            return state.filter((user) => user._id !== action.payload.userId)
        default:
            return state
    }
}
