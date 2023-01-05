import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, getPosts } from '../redux/actions/post.actions'
import EditDeleteComment from './EditDeleteComment'
import { isEmpty, timeStampParser } from './utils'

export default function PostComment({post}) {
    const [text,setText] = useState("")
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const handleComment = (e) => {
        e.preventDefault()

        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.name))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""))
        }
    }
    
  return (
    <div>
      {post.comments.map((comment) => {
        return(
          <div>
            <img src={!isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if (user._id === comment.commenterId) return user.picture
                  else return null
                })
                .join("")
              }
              alt="commenter-pic"
            />

            <h3>{comment.commenterPseudo}</h3>
            <span>{timeStampParser(comment.timeStamp)}</span>
            <p>{comment.text}</p>
            <EditDeleteComment comment={comment} postId={post._id}/>
          </div>
        )
      })}

      {
        userData._id && (
          <form action='' onSubmit={{handleComment}}>
            <input type="text" name='text'
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="laisser un commentaire"
            />

            <br/>
            <input type="submit" value="envoyer" />
          </form>
        )
      }
    </div>
  )
}
