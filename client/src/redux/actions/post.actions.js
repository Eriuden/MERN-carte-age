import axios from "axios"

export const GET_POST = "GET_POST"
export const GET_ALL_POSTS= "GET_ALL_POSTS"
export const ADD_POST = "ADD_POST"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"
export const DISLIKE_POST = "DISLIKE_POST"
export const UNDISLIKE_POST = "UNDISLIKE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST= "DELETE_POST"

export const ADD_COMMENT= "ADD_COMMENT"
export const EDIT_COMMENT= "EDIT_COMMENT"
export const DELETE_COMMENT= " DELETE_COMMENT"

export const GET_TRENDS = "GET_TRENDS"

export const GET_POST_ERRORS = "GET_POST_ERRORS"

export const getPosts = (num) => {
    return (dispatch) => {
        return axios 
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
            const array = res.data.slice(0,num)
            dispatch({ type: GET_POST, payload: array})
            dispatch({ type: GET_ALL_POSTS, payload: res.data})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/post`, data)
        .then((res) => {
            if (res.data.errors) {
                dispatch ({ type: GET_POST_ERRORS, payload: res.data.errors})
            } else {
                dispatch({ type: GET_POST_ERRORS, payload: ""})
            }
        })
    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:{message}
        })
        .then((res) => {
            dispatch({type: UPDATE_POST, payload: {message, postId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/like-post`+ postId,
            data: {id: userId}
        })
        .then((res) => {
            dispatch({type: LIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const unLikePost = (postId, userId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post` + postId,
            data: {id: userId}
        })
        .then((res) => {
            dispatch({type: UNLIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const dislikePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/dislike-post`+ postId,
            data: {id: userId}
        })
        .then((res) => {
            dispatch({type: DISLIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const unDisLikePost = (postId, userId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post/undislike-post` + postId,
            data: {id: userId}
        })
        .then((res) => {
            dispatch({type: UNDISLIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const deletePost = (postId,message) => {
    return(dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:{message},
        })
        .then((res)=>{
            dispatch({type: DELETE_POST, payload: {postId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data: {commenterId, text, commenterPseudo}
        })
        .then((res) => {
            dispatch({type : ADD_COMMENT, payload: { postId}})
        })
        .catch((err) => window.alert(err))
    }
}

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data:{commentId, text},
        })
        .then((res) => {
            dispatch({type: EDIT_COMMENT, payload: {postId, commentId, text}})
        })
        .catch((err) => window.alert(err))
    } 
}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post*delete-post-comment/${postId}`,
            data:{commentId},
        })
        .then((res) => {
            dispatch({ type: DELETE_COMMENT, payload: { postId,commentId}})
        })
        .catch((err) => window.alert(err))
    }
}

