import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { updateUser } from '../redux/actions/user.actions';
import uploadImg from './uploadImg';


export default function UserProfile() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [updateForm, setUpdateForm] = useState(false)

  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer)
  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateUser(userData._id, bio, name))
    setUpdateForm(false)
  }
  return (
    <div>
      <h1>Profil de { userData.name }</h1>

      <div>
        <h3>Photo de profil</h3>
        <img src={userData.picture} alt="user-pic"/>
        <uploadImg/>
        <p>{error.maxSize}</p>
        <p>{error.format}</p>
      </div>

      <h3>Bio</h3>
      <p>{userData.bio}</p>

      { updateForm === false && (
        <>
          <p onClick={() => setUpdateForm(!updateForm)}>Cliquez ici</p>
        </>
      )}

      {updateForm && (
        <>
          <input type="text" defaultValue={userData.name} onChange={(e)=>setName(e.target.value)}>
          </input>
          <textarea type="text" defaultValue={userData.bio} onChange={(e)=>setBio(e.target.value)}>
          </textarea>

          <button onClick={handleUpdate}>Valider les modifications</button>
        </>
      )}
    </div>


  )
}
