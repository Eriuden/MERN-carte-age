import React, { useState, useEffect, useContext} from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../redux/actions/post.actions'
import { UidContext } from './appcontext'

export default function EditDeleteComment({comment, postId}) {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()

    if (text) {
        dispatch(editComment(postId, comment._id, text))
        setText("")
        setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
  }

  useEffect(()=> {
    const checkAuthor = () => {
        if (uid === comment.commenterId) {
            setIsAuthor(true)
        }
    }
    checkAuthor()
  }, [uid, comment.commenterId])


  return (
    <div>
        
        {isAuthor && edit === false && (
            <form action='' onSubmit={handleEdit}>

                <label htmlFor='text' onClick={()=> setEdit(!edit)}>
                    Editer
                </label>

                <br/>

                <input type="text" name='text'
                    onChange={(e)=> setText(e.target.value)}
                    defaultValue={comment.text}
                />

                <br/>

                <span onClick={() => {
                    if (window.confirm("Voulez vous supprimer le commentaire")){
                        handleDelete()
                    }
                }}
                />

                <input type="submit" value="valider les modifications"/>
            </form>
        )}
    </div>
  )
}
