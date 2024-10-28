"use client";
import Win from "./components/win";
import Draw from "./components/draw";
import Lose from "./components/lose";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Home() {
  const [deck, setDeck] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerWins, setPlayerWins] = useState(null);
  const [dealerRevealed, setDealerRevealed] = useState(false);

  const buildDeck = useCallback(() => {
    const value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["C", "D", "H", "S"];
    let newDeck = [];

    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < value.length; j++) {
        newDeck.push(`${value[j]}-${types[i]}`);
      }
    }

    setDeck(newDeck);
    return newDeck;
  }, []);

  const shuffleDeck = useCallback((deck) => {
    let shuffledDeck = [...deck];
    for (let i = 0; i < shuffledDeck.length; i++) {
      let j = Math.floor(Math.random() * shuffledDeck.length);
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setShuffledDeck(shuffledDeck);
    return shuffledDeck;
  }, []);

  const calculatePoints = (cards) => {
    let points = 0;
    let aces = 0;

    cards.forEach((card) => {
      const value = card.split("-")[0];
      if (value === "A") {
        points += 11;
        aces += 1;
      } else if (["J", "Q", "K"].includes(value)) {
        points += 10;
      } else {
        points += parseInt(value);
      }
    });

    while (points > 21 && aces > 0) {
      points -= 10;
      aces -= 1;
    }

    return points;
  };

  const dealInitialCards = useCallback(() => {
    const playerInitialCards = [shuffledDeck.pop(), shuffledDeck.pop()];
    const dealerInitialCards = [shuffledDeck.pop(), shuffledDeck.pop()];

    setPlayerCards(playerInitialCards);
    setDealerCards(dealerInitialCards);
    setPlayerPoints(calculatePoints(playerInitialCards));
    setDealerPoints(calculatePoints(dealerInitialCards.slice(1))); // Hide dealer's first card
  }, [shuffledDeck]);

  const handleHit = () => {
    if (!gameOver) {
      const newCard = shuffledDeck.pop();
      const newPlayerCards = [...playerCards, newCard];
      setPlayerCards(newPlayerCards);
      const newPoints = calculatePoints(newPlayerCards);
      setPlayerPoints(newPoints);

      if (newPoints === 21) {
        setGameOver(true);
        setPlayerWins(true);
      } else if (newPoints > 21) {
        setGameOver(true);
        setPlayerWins(false);
      }
    }
  };

  const handleStay = () => {
    setDealerRevealed(true);
    setDealerPoints(calculatePoints(dealerCards)); // Show all dealer cards
    handleDealerTurn();
  };

  const handleDealerTurn = () => {
    let dealerNewCards = [...dealerCards];
    let dealerNewPoints = calculatePoints(dealerNewCards);

    const dealNextCard = () => {
      if (dealerNewPoints < 17) {
        const newCard = shuffledDeck.pop();
        dealerNewCards = [...dealerNewCards, newCard];
        dealerNewPoints = calculatePoints(dealerNewCards);
        setDealerCards(dealerNewCards);
        setDealerPoints(dealerNewPoints);

        setTimeout(dealNextCard, 1000); // Delay for animation effect
      } else {
        handleEndGame(dealerNewPoints);
      }
    };

    dealNextCard();
  };

  const handleEndGame = (dealerPoints) => {
    if (dealerPoints === 21) {
      setPlayerWins(false);
    } else if (dealerPoints > 21 || dealerPoints < playerPoints) {
      setPlayerWins(true);
    } else if (dealerPoints === playerPoints) {
      setPlayerWins(null); // Draw scenario
    } else {
      setPlayerWins(false);
    }

    setGameOver(true);
  };

  const handlePlayAgain = () => {
    const newDeck = buildDeck();
    shuffleDeck(newDeck);
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerPoints(0);
    setDealerPoints(0);
    setGameOver(false);
    setPlayerWins(null);
    setDealerRevealed(false);
  };

  useEffect(() => {
    const newDeck = buildDeck();
    shuffleDeck(newDeck);
  }, [buildDeck, shuffleDeck]);

  useEffect(() => {
    if (shuffledDeck.length > 0) {
      dealInitialCards();
    }
  }, [shuffledDeck, dealInitialCards]);

  return (
    <main className="m-5 p-2 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="flex py-4 items-center gap-20 w-fit">
          <h2 className="p-3 font-serif text-2xl">Dealer</h2>
          <p className="p-3 font-serif bg-red-800 rounded-full text-white text-2xl">
            Points: {dealerRevealed ? dealerPoints : calculatePoints(dealerCards.slice(1))}
          </p>
        </div>

        <div className="Dealer-cards flex gap-4">
          {dealerCards.map((card, index) => (
            <Image
              key={index}
              src={`/cards/${index === 0 && !dealerRevealed ? "BACK" : card}.png`}
              alt={card}
              width={150}
              height={40}
            />
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="text-center flex flex-col justify-center items-center bg-slate-300 p-10 w-72 my-4 rounded-3xl animate-pop">
          <p className="text-2xl font-bold mt-4">
            {playerWins === null ? <Draw /> : playerWins ? <Win /> : <Lose />}
          </p>
          <button onClick={handlePlayAgain} className="bg-blue-600 p-4 rounded-lg w-40 mt-4">
            Play Again
          </button>
        </div>
      )}

      <div className="flex flex-col justify-center items-center m-2">
        <div className="flex py-4 items-center gap-20 w-fit">
          <h2 className="p-3 font-serif text-2xl">You</h2>
          <p className="p-3 font-serif bg-blue-800 rounded-full text-white text-2xl">
            Points: {playerPoints}
          </p>
        </div>

        <div className="Your-cards flex gap-4">
          {playerCards.map((card, index) => (
            <Image key={index} src={`/cards/${card}.png`} alt={card} width={150} height={40} />
          ))}
        </div>
      </div>

      <div className="justify-center gap-16 my-8 items-center flex">
        <button onClick={handleHit} className="bg-green-600 p-4 rounded-lg w-40" disabled={gameOver}>
          Hit
        </button>
        <button onClick={handleStay} className="bg-red-600 p-4 rounded-lg w-40" disabled={gameOver}>
          Stay
        </button>
      </div>
    </main>
  );
}
