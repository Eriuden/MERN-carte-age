import React, {useContext, useState} from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { UidContext } from './appcontext'
import {squash as Hamburger} from "hamburger-react"
import Logout from './Logout'


export default function Header() {
    const [hamburger, setHamburger] = useState(false)
    const uid = useContext(UidContext)
        const userData = useSelector((state) => state.userReducer)
  return (
    <div>
        <div>
            <h1>
                Carte Age
            </h1>
        </div>

        <nav>
            <Link to ={"/"}>Acceuil</Link>
            { uid ? (
                <>
                    <Link to ={"/user-profile/:id"}>
                    <h5>Bienvenue {userData.name}</h5>
                    </Link>

                    <Logout/>
                </>
                
            ):(
                <>
                    <Link to ={"/connexion"}>Connexion</Link>
                    <Link to ={"/inscription"}>Inscription</Link>
                    
                    <Link to={"/postsPage"}>Profils de decks</Link>
                </>
            )}
        </nav>

        <h2 onClick={()=> setHamburger(!hamburger)}>
            <Hamburger/>
        </h2>

        {hamburger ? (
            <nav>
            <Link to ={"/"}>Acceuil</Link>
            { uid ? (
                <>
                    <Link to ={"/user-profile/:id"}>
                    <h5>Bienvenue {userData.name}</h5>
                    </Link>

                    <Logout/>
                </>        
            ):(
                <>
                    <Link to ={"/connexion"}>Connexion</Link>
                    <Link to ={"/inscription"}>Inscription</Link>
                    
                    <Link to={"/postsPage"}>Profils de decks</Link>
                </>
            )}
        </nav>
        ):""}
    </div>
  )
}
