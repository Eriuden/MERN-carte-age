import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../redux/actions/user.actions';

export default function uploadImg() {
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    const userData = useSelector((state)=> state.userReducer)

    const hadnlePicture = (e) => {
        e.preventDefault()
        const data = new FormData()

        data.append("name", userData.name)
        data.append("userId", userData._id)
        data.append("file", file)

        dispatch(uploadPicture(data,userData._id))
    }
  return (
    <form action='' onSubmit={handlePicture}>
        <label htmlFor='file'>Changer d'image</label>
        <input type="file" id='file' name='file'
        accept='.jpg, .jpeg, .png'
        onChange={(e)=> setFile(e.target.files[0])} />
        <br/>
        <input type="submit" value="envoyer" />
    </form>
  )
}
