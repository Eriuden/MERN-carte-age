import { GET_ALL_POSTS , EDIT_COMMENT, UPDATE_POST, DELETE_COMMENT, DELETE_POST, LIKE_POST, DISLIKE_POST, UNLIKE_POST, UNDISLIKE_POST, UPDATE_POST } from "../actions/post.actions";

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return action.payload
        case LIKE_POST:
            return state.map((post,userId) => {
                if (post.id === action.payload.postId)
                    return {
                        ...post,
                        likers: [action.payload,userId, ...post.likers]
                    }
                return post 
            })
        case DISLIKE_POST:
            return state.map((post,userId) => {
                if (post.id === action.payload.postId)
                    return {
                        ...post,
                        dislikers: [action.payload,userId, ...post.dislikers]
                    }
                return post 
            })
        
        case UNLIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId)
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)
                    }
                return post 
            })

        case UNDISLIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId)
                    return {
                        ...post,
                        dislikers: post.dislikers.filter((id) => id !== action.payload.userId)
                    }
                return post 
            })
            
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                } else return post 
            })
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId)
        case EDIT_COMMENT:
            return state.map((post) => {
                if(post.id === action.payload.postId) {
                    return {
                        ...post,
                        comment: post.comment.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    Text: action.payload.text 
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else return post 
            })
        case DELETE_COMMENT:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comment.filter((comment) => comment._id !== action.payload.commentId)
                    }
                } else return post 
            })
        
            default:
                return state
    }
}