import React, {useState, useEffect, useContext} from 'react'
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
import { UidContext } from './appcontext'
import PostComment from './PostComment'


export default function Post({post}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = userData(null);
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [showComments, setShowComments] = userData(false);
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state)=> state.userReducer)
  const dispatch = useDispatch()
  const uid = useContext(UidContext)

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unLikePost(post._id, uid))
    setLiked(false)
  }

  const dislike = () => {
    dispatch(dislikePost(post._id, uid))
    setDisliked(true)
  }

  const undislike = () => {
    dispatch(unDisLikePost(post._id, uid))
    setDisliked(false)
  }

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id), textUpdate)
    }
    setIsUpdated(false)
  }

  const deleteQuote = () => dispatch(deletePost(post.id))

  //je garde ainsi car trop tard pour changer
  //mais il eut été préférable de diviser en plusieurs sous-composants
  //usuellement on n'a qu'un useEffect par page de code !

  useEffect(()=> {
    !isEmpty(userData[0]) && setIsLoading(false)
  }, [usersData]
  )

  useEffect(()=> {
    if (post.likers.includes(uid)) setLiked(true)
    else if(post.likers.includes(uid)) setDisliked(true)
    else setDisliked(false) && setLiked(false)
  })


  return (

    
    <div>

      <li key={post._id}>
  
        {isLoading ? (
          <i className='fas-fa-spinner fa-spin'></i>
        ) : (

          <>
            <img src={!isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if(user._id === post.posterId) return user.picture
                  else return null 
                })
                .join("")
              }
              alt="poster-pic"
            />

            <h3>
              {!isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.name 
                  else return null 
                })
                .join("")}
            </h3>

            <span>{dateParser(post.createdAt)}</span>

            {isUpdated === false && <p>{post.message}</p>}

            {isUpdated && (
              <div className='update-post'>
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <button onClick={updateItem}>
                  Valider les modifications
                </button>
              </div>
            )}

            {post.picture && (
              <img src={post.picture}/>
            )}

            <p>{post.message}</p>

            {
              post.picture && (
                <img src={post.picture} alt="card-pic"/>
              )
            }

            {userData._id === post.posterId &&(
                <div>
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <p>Modifier</p>
                  </div>
                  <button onClick={() => {
                    if (window.confirm('Voulez vous supprimer cet article ?')){
                      deleteQuote()
                    }
                  }}
                  >Supprimer</button>
                </div>
              )
            }

            <div className='card-footer'>
              <p onClick={() => setShowComments(!showComments)}>
                Afficher les commentaires
              </p>

              <span>{post.comments.length}</span>

              {uid === null && (
                <p>Vous devez être connecté pour liker ou disliker</p>
              )}

              {
                uid && liked === false && (
                  <button onClick={like}>J'aime</button>
                )
              }
              <span>{post.likers.length}</span>

              {
                uid && disliked === false && (
                  <button onClick={dislike}>Je n'aime pas</button>
                )
              }
              <span>{post.dislikers.length}</span>

              {
                uid && liked && (
                  <button onClick={unlike}>Retirer mon j'aime</button>
                )
              }

              {
                uid && liked && (
                  <button onClick={undislike}>Retirer mon j'aime pas</button>
                )
              }
            </div>

            {showComments && <PostComment post={post} />}
          </>

        )}
      </li>
    </div>
  )
}
