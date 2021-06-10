"use strict";

//Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting Conditions (are moved into init function)
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

//Variables were declared inside function locally and so were not accessible globally.
//Declare them globally first and assign them locally
//Multiple variables can be declared together
let scores, currentScore, activePlayer, playing;

const init = function () {
  //Below variables are better declared globablly
  // const scores = [0, 0];
  // let currentScore = 0;
  // let activePlayer = 0;
  // let playing = true;
  //And assigned locally
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //Because all images are dice-"number".png we can use temporal literals to connect the picture with the generate random number. GENIUS

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //Once again, temporal literals allow us dynamically change between the two players
    } else {
      //Switch to next player

      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle("player--active");
      // player1El.classList.toggle("player--active");
      // The above code is refactored into a global constant and called below
      switchPlayer();
    }
  }
});
//Toggle adds the class if its not already there and removes it if it is
//Very useful method

//Holding Score Functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //Brilliant line because activePlayer can only be 1 or 0 so can identify place in array
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if score >= 100 to finish game or...
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

//Resetting the game with the btnNew
//Reset player scores
//Reset current player scores
//Reset colors
//Reset to player 1

// btnNew.addEventListener("click", function () {
//   //Restart functionality
//   playing = true;
//   //Put current score back to zero
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   currentScore = 0;

//   //Reset to Player 1
//   activePlayer = 0;
//   scores[0] = 0;
//   scores[1] = 0;

//   //Jonah solution
//   // Put player scores back to 0
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   //Remove winning player styling
//   player0El.classList.remove("player--winner");
//   player1El.classList.remove("player--winner");
//   //Should also remove active class styking
//   player0El.classList.add("player--active");
//   player1El.classList.remove("player--active");
//   }

//You can tell javascript to add a class even if its already there without doing any harm.
//Similarly you can tell javascript to remove a class even if its not there without doing any harm
//We then combine all of the starting condition code into a function, init, and run it at two places. At the starting point and when the btnNew is clicked

btnNew.addEventListener("click", init);
