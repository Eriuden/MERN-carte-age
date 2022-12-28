import React from 'react'

export default function Card(card) {
  return (
    <div>
        <img src={card.imageurlen} alt= "image de carte" />
        <h2>{card.name}</h2>
        <h3>{card.clan}</h3>
    </div>
  )
}
