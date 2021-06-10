"use strict";
/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "Correct Number!"; // Changes text in the browser

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 20;
//Changes the numbers in the browser

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value); //Logs 23
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
// document.querySelector(".number").textContent = secretNumber;

//Creating functions for D.R.Y.
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//Adding event listener
document.querySelector(".check").addEventListener("click", function () {
  //   console.log(document.querySelector(".guess").value);
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  //When there is no input
  if (!guess) {
    displayMessage("No number!");

    //When player wins
  } else if (guess === secretNumber) {
    displayMessage("Correct Number!");
    document.querySelector(".number").textContent = secretNumber;

    //MANIPULATING CSS STYLES
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    //IMPLEMENTING HIGHSCORES
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  }
  //No . for body as its not a class
  //backgroundColor written in camelCase

  ///////////////////////////////////////
  //First attempt simply to make it run
  //   //When guess is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too High!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }

  //   //When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too Low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;

  ///////////////////////////////////////
  //REFACTORING THE CODE - IMPLEMENTING D.R.Y.
  //My own attempt breaks high score function!!!
  // else if (guess != secretNumber && score > 1) {
  //   if (guess < secretNumber) {
  //     document.querySelector(".message").textContent = "Too Low!";
  //   } else if (guess > secretNumber) {
  //     document.querySelector(".message").textContent = "Too High!";
  //   }
  //   score--;
  //   document.querySelector(".score").textContent = score;
  // } else {
  //   document.querySelector(".message").textContent = "You lost the game!";
  //   document.querySelector(".score").textContent = 0;
  // }

  //Jonah Solution using Ternary Operator
  //When guess is different
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too High!" : "Too Low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You lost the game!");
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "red";
    }
  }
});

//In html the class name is "btn check" but we're only interested in the check part
//addEventListener "listens" for an event(mouse click, hover, etc.) and reacts to it
//Functions are just values so can be passed in as an argument
//When the event happens, the action takes place. When the button is clicked, the value is logged in the console.
//We don't call the function, JS calls it when the event happens
//typeof guess returns string so we add in Number() function

//CODING CHALLENGE- resetting the game
//Create again addEventListener (1)
//Restore initial values of score and Secretnumber (2)
//Restore initial message, number, score and guess input field conditions (3)
//Restore background color (#222) and number width (15rem)DONE (4)

document.querySelector(".again").addEventListener("click", function () {
  //(1)
  score = 20; //(2)
  document.querySelector(".score").textContent = score; //(2)
  secretNumber = Math.trunc(Math.random() * 20) + 1; //(2)
  document.querySelector(".number").textContent = "?"; //(3)
  document.querySelector(".guess").value = ""; //(3)
  displayMessage("Start guessing..."); //(3)
  document.querySelector("body").style.backgroundColor = "#222"; //(4)
  document.querySelector(".number").style.width = "15rem"; //(4)
});
