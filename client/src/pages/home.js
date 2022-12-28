import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchData, getOneCard, getAllCards } from '../API/api'
import Card from '../components/card'

//All thanks to https://card-fight-vanguard-api.ue.r.appspot.com/

export default function Home() {

  const [cardsData, setCardsDatas] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://card-fight-vanguard-api.ue.r.appspot.com/api/v1/cards"
      )
      .then((res) => setCardsDatas(res.data.results))
  })
  return (
    <div>
      { cardsData
      .map((card) => (
        <Card card={card} key={card.id} />
      )) }

    </div>
  )
}
