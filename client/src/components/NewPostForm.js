import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getPosts } from '../redux/actions/post.actions'
import { isEmpty, timeStampParser } from './utils'


export default function NewPostForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [picture, setPicture] = useState(null)
    const [file, setFile] = useState()
    const userData = useSelector((state)=> state.userReducer)
    const errors = useSelector((state)=> state.errorReducer.postError)
    const dispatch = useDispatch()

    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const handlePost = () => {
        async () => {
            if (message || picture) {
                const data = new FormData()
                data.append("posterId", userData._id)
                data.append("message", message)
                if (file) data.append("file", file)

                await dispatch(addPost(data))
                dispatch(getPosts())
                cancelPost()
                
            } else {
                alert("veuillez entrer un texte")
            }
        }
    }

    const cancelPost = () => {
        setMessage("")
        setPicture("")
        setFile("")
    }

    useEffect(() => {
        if (!isEmpty(userData))
        setIsLoading(false)
    }, [userData,message])

  return (
    <div>
        {isLoading ? (
            <i className='fas fa-spinner fa-pulse'></i>
        ) : (
            <>
                <div>
                    <h3>
                        {userData.name}
                    </h3>
                    <img src={userData.picture} alt="user-img"/>
                </div>

                <div className='post-form'>
                    <textarea name='message' id='message'
                    placeholder='décrivez votre deck'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    />

                    {message || picture > 20 ? (
                        <li>
                            <span>{timeStampParser(date.now())}</span>
                            <div className='content'>
                                <p>{message}</p>
                                <img src={picture} alt=""/>
                                
                            </div>
                        </li>
                    ) : null}

                    <div className='footer-form'>
                        {!isEmpty(errors.format) && <p>{errors.format}</p>}
                        {!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}

                        <div className='boutonSend'>
                            {message || picture > 20 ? (
                                <button onClick={cancelPost}>Annuler</button>
                            ): null}

                            <button onClick={handlePost}>Envoyer</button>
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}
