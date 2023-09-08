import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import Card from "./Card";

const CardTable = () => {
  const [cards, setCards] = useState([]);
  const [isDistributed, setIsDistributed] = useState(false);

  // Funzione per distribuire le carte
  const distributeCards = () => {
    const cardList = ["card1", "card2", "card3", "card4"]; // Sostituisci con i nomi delle tue carte
    setCards(cardList);
    setIsDistributed(true);
  };

  // Configurazione delle animazioni per le carte
  const cardTransitions = useTransition(cards, {
    from: { opacity: 0, transform: "translateY(-100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
  });

  return (
    <div className="card-table">
      <button onClick={distributeCards}>Distribuisci carte</button>
      <div className="card-container">
        {isDistributed &&
          cardTransitions((style, card) => (
            <animated.div style={style}>
              <Card card={card} />
            </animated.div>
          ))}
      </div>
    </div>
  );
};

export default CardTable;