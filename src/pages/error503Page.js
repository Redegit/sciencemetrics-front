"use client";

import { useEffect } from "react";
import Base from "./base";

export default function Error503() {
  useEffect(() => {
    const gameContainer = document.querySelector(".game-container");
    const resetButton = document.getElementById("reset-button");
    const numPairs = 8;
    let cardValues = [];
    let flippedCards = [];
    let matchesFound = 0;

    function initializeGame() {
      gameContainer.innerHTML = "";
      cardValues = [];
      flippedCards = [];
      matchesFound = 0;

      for (let i = 1; i <= numPairs; i++) {
        cardValues.push(i, i);
      }
      cardValues = shuffle(cardValues);

      cardValues.forEach((value, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.value = value;
        card.innerHTML = `<div class="card-front">?</div><div class="card-back">${value}</div>`;
        card.addEventListener("click", () => flipCard(card));
        gameContainer.appendChild(card);
      });
    }

    function flipCard(card) {
      if (
        flippedCards.length < 2 &&
        !card.classList.contains("flipped") &&
        !card.classList.contains("matched")
      ) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          checkForMatch();
        }
      }
    }

    function checkForMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchesFound++;

        if (matchesFound === numPairs) {
          setTimeout(() => alert("Поздравляем! Вы нашли все пары!"), 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
        }, 1000);
      }
      flippedCards = [];
    }

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    resetButton?.addEventListener("click", initializeGame);
    initializeGame();

    return () => {
      resetButton?.removeEventListener("click", initializeGame);
    };
  }, []);

  return (
    <Base>
      <div className="custom-container">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700"
        />
        <div className="conteier-error">
          <div className="text503">
            <h1>
              5
              <span>
                <i className="fas fa-cogs"></i>
              </span>
              3
            </h1>
          </div>
          <div>
            <div className="blockError">
              <h2 className="textOne">Сервис делает небольшую паузу...</h2>
              <p className="textTwo">
                Но это ненадолго! Сыграйте в игру и найдите все пары карт.
                Победа — ключ к возвращению на сайт!
              </p>
            </div>

            <div className="game-container"></div>
            <button id="reset-button" className="btn-home">
              Попробовать снова
            </button>
          </div>
        </div>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:700");
          @import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

          :root {
            --bg-color: #4a545d;
            --object-color: #528cce;
            --heading-color: #e7ebf2;
            --text-color: #ccc;
          }

          .custom-container {
            padding: 1px;
            height: 100vh;
          }

          .conteier-error {
            border-radius: 15px;
            background: var(--bg-color);
            font-family: "Montserrat", sans-serif;
            margin: 0;
            position: relative;
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
            text-align: center;
            overflow: hidden;
            padding: 10px;
          }

          .blockError {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          h1 {
            color: var(--heading-color);
            font-size: 14.5rem;
            letter-spacing: 0.1em;
            margin: 0.025em 0;
            text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
            white-space: nowrap;
            font-weight: 900;
          }

          h1 > span {
            color: var(--object-color);
            display: inline-block;
          }

          .textOne {
            color: var(--heading-color);
            margin-bottom: 0.4em;
            font-weight: 900;
          }

          .textTwo {
            color: var(--text-color);
            margin-top: 0;
            width: 500px;
            font-weight: 500;
          }

          .text503 {
            transform: rotate(-20deg);
            font-size: 14rem;
            display: flex;
            justify-content: center;
            text-align: center;
            align-items: center;
            height: 100%;
            padding-right: 2rem;
          }

          .game-container {
            display: grid;
            grid-template-columns: repeat(4, 100px);
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            margin: 2em 0;
          }

          .card {
            width: 100px;
            height: 100px;
            background-color: #ccc;
            border-radius: 8px;
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease;
            transform-style: preserve-3d;
          }

          .card.flipped {
            transform: rotateY(180deg);
          }

          .card.matched {
            background-color: #528cce;
            cursor: default;
          }

          .card-front,
          .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            backface-visibility: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
          }

          .card-front {
            background-color: var(--object-color);
            color: transparent;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3),
              0 6px 20px rgba(0, 0, 0, 0.2);
          }

          .card-back {
            background-color: var(--bg-color);
            color: var(--object-color);
            transform: rotateY(180deg);
          }

          .btn-home {
            padding: 0.75em 2em;
            background-color: #528cce;
            color: #ffffff;
            font-size: 1.2rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease, transform 0.3s ease;
            border: none;
            cursor: pointer;
          }

          .btn-home:hover {
            background-color: #3c6eac;
            transform: translateY(-2px);
          }

          .btn-home:active {
            background-color: #2b5083;
            transform: translateY(0);
          }

          @media (max-width: 1300px) {
            .conteier-error {
              flex-direction: column;
            }
            .text503 {
              transform: rotate(0deg);
              padding-right: 0;
              height: auto;
            }
          }

          @media (max-width: 790px) {
            h1 {
              font-size: 8.5rem;
            }

            .game-container {
              grid-template-columns: repeat(4, 0fr);
              grid-gap: 5px;
            }

            .card {
              width: 80px;
              height: 80px;
            }

            .textTwo {
              width: 90%;
              font-size: 1rem;
            }
          }

          @media (max-width: 482px) {
            h1 {
              font-size: 6.5rem;
            }

            .game-container {
              grid-template-columns: repeat(4, 0fr);
              grid-gap: 5px;
            }

            .card {
              width: 60px;
              height: 60px;
            }

            .textTwo {
              width: 90%;
              font-size: 1rem;
            }
            .btn-home {
              padding: 0.75em 2em;
              background-color: #528cce;
              color: #ffffff;
              font-size: 14px;
            }
          }
        `}</style>
      </div>
    </Base>
  );
}
