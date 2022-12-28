import React from 'react'
import axios from 'axios'


//Ce sera la page pour chaque carte
//Il faudra relier au get card (et non cards) de l'api
//Il suffisait de directement mettre le result

export default function singleCardPage(card) {

    useEffect(() => {
        axios
          .get(
            "https://card-fight-vanguard-api.ue.r.appspot.com/api/v1/card"
          )
          .then((res.data.results))
      })
  return (
    <div>
        <img src={res.data.imageurlen} alt="image us"/>
        <h2>{res.data.name}</h2>
    </div>
  )
}
