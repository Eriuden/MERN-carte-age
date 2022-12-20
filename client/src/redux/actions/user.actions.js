import axios from "axios"

export const GET_USER = "GET_USER"
export const  UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const  UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"

export const GET_USER_ERRORS = "GET_USER_ERRORS"

export const  getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({type:GET_USER, payload: res.data})
            })
            .catch((err) => window.alert(err))
    }
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_USER_ERRORS, payload: res.data.errors})
                } else {
                    dispatch ({ type: GET_USER_ERRORS, payload:""})
                    return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch ({ type: UPLOAD_PICTURE, payload: res.data.picture})
                    })
                }
            })
            .catch((err) => window.alert(err))
    }
}

export const updateUser = (userId, name, bio) => {
    return (dispatch) => {
        return axios ({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}api/user` + userId,
            data: {name, bio}
        })
            .then((res) => {
                dispatch({type: UPDATE_USER, payload: name, bio})
            })
            .catch((err) => window.alert(err))
    }
}

export const deleteUser = (userId, name, email, password) => {
    return (dispatch) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: {name, email, password},
        })
        .catch((err) => window.alert(err))
    }
}

