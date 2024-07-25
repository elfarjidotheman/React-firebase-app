import { useEffect, useState } from 'react'
import Singlecard from './components/singlecard'
import './App.css'

  const cardImg = [

    {"src": "/img/helmet-1.png", match: false},
    {"src": "/img/potion-1.png", match: false},
    {"src": "/img/ring-1.png", match: false},
    {"src": "/img/scroll-1.png", match: false},
    {"src": "/img/shield-1.png", match: false},
    {"src": "/img/sword-1.png", match: false}
  ]

function App() {

  const [cards, setCards] = useState ([])
  const [turns, setTurns] = useState ([])
  const [choiceone, setChoiceone] = useState (null)
  const [choice2, setchoice2] = useState (null)
  const [desibel, setdesibel] = useState (false)

  // shuffle cards:
  const shuffleCards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id: Math.random()}))
    setChoiceone(null)
    setchoice2(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  
  // handle choice
  const handleChoice = (card) => {
    choiceone ? setchoice2(card) : setChoiceone(card)
  }

  // compaire cards
  useEffect (()=>{
    if (choiceone && choice2) {
      setdesibel(true)
      if ( choiceone.src === choice2.src ) {
        setCards(prevcard => {
          return prevcard.map(card => {
            if (card.src === choiceone.src) {
              return { ...card, match: true}
            } else {
                return card
            }
          })
        })
        restTurns()
      } else {
        setTimeout( () => restTurns() , 1000)
      }
    }
  }, [choiceone,choice2])

  console.log(cards)

  // restTurns()
  const restTurns = () => {
    setChoiceone(null)
    setchoice2(null)
    setTurns(prevTurne => prevTurne + 1)
    setdesibel(false)
  }
  // Auto starte
  useEffect(()=>{
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Singlecard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            fliped= { card === choiceone || card === choice2 || card.match}
            desibel = { desibel }
          />
        ))}
      </div>
      <p>
        Num Turns : {turns}
      </p>
    </div>
  );
}

export default App;
