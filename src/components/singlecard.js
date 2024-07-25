import React from 'react'
import './singlecard.css'

export default function singleCard( {card, handleChoice, fliped, desibel} ) {

  const handleClick = () => {
    if (!desibel){
      handleChoice(card)
    }
  }
  
  return (
    <div className="card">
        <div className={fliped ? "fliped" : ""}>
            <img className="front" src={card.src} alt='frontimg' />
            <img className="back" src="/img/cover.png" alt='backimg' onClick={handleClick} />
        </div>
    </div>
  )
}
