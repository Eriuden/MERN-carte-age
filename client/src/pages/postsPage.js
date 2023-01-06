import React, { useState, useEffect} from 'react'
import { getPosts } from '../redux/actions/post.actions'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/post'
import { isEmpty } from '../components/utils'

export default function postsPage() {
  const [loadPost, setLoadPost] = useState(true)
  const [count, setCount] = useState(10)
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.postReducer)

  const loadmore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight)
      {
        setLoadPost(true)
      }
  }
  
  useEffect(() => {
    if(loadPost) {
      dispatch(getPosts(count))
      setLoadPost(false)
      setCount(count + 10)
    }

    window.addEventListener("scroll", loadmore)
    return () => window.removeEventListener("scroll",loadmore)
  }, [loadPost, dispatch, count])

  /*Comme là c'est marqué de manière un peu confuse
  post est le nom donné à chaque itération
  mais c'est aussi le nom du paramètre du composant qu'on vient chopper
  La clé, c'est ce qui va lui permettre de boucler à chaque fois
  */ 
  return (
    <div>
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Post post={post} key={post._id} />
          })}
      </ul>
    </div>
  )
}
