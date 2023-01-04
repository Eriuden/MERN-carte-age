import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../redux/actions/post.actions'
import { getPosts } from '../redux/actions/post.actions'
import { deletePost } from '../redux/actions/post.actions'
import { deleteComment } from '../redux/actions/post.actions'
import { addComment } from '../redux/actions/post.actions'
import { editComment } from '../redux/actions/post.actions'
import { dislikePost } from '../redux/actions/post.actions'
import { unDisLikePost } from '../redux/actions/post.actions'
import { likePost } from '../redux/actions/post.actions'
import { unLikePost } from '../redux/actions/post.actions'
import { dateParser, isEmpty } from './utils'


export default function post({post}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = userData(null);
  const [showComments, setShowComments] = userData(false);
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state)=> state.userReducer)
  const dispatch = useDispatch()

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id), textUpdate)
    }
    setIsUpdated(false)
  }

  useEffect(()=> {
    !isEmpty(userData[0]) && setIsLoading(false)
  }, [usersData])
  return (
    <div>post</div>
  )
}
