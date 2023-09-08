"use strict";

let guessArray = [
  "Penis",
  "Summer",
  "Airplane",
  "Metallica",
  "German Shepherd",
  "You are gay as Fuck",
  "Huge penis",
  "Winter sucks",
  "Hangman",
  "Calculator",
  "Waterbottle",
  "Computer",
  "Keyboard",
  "Headphones",
  "Chocolate",
  "Pizza",
  "Curtain",
  "Armchair",
  "Rubix Cube",
  "Challenge",
  "Alphabet",
  "Container",
  "Photography",
  "Bones",
  "Cloth",
  "Crate",
  "Couch",
  "Rope",
  "Screwdriver",
  "Chicken",
  "Beef",
  "Ostrich",
  "Tiger",
  "Owl",
  "Lion",
  "Zoo",
  "Power outlet",
  "Buffalo Soldier",
  "By the rivers of babylon",
  "Mirror",
  "Money",
  "Yo momma so fat",
  "This is a normal sentence",
];
const letterPressed = document.querySelector(".alphabet");
let image = document.querySelector(".image");
let footerText = document.querySelector(".footerText");
let allDivs = document.querySelectorAll("div");
let chosenWord;
let chosenWordLettersArray;
let blankArray = [];
let counterWrongGuesses = 0;
let gameActive = 0;
let playerSelectedLetter;

// Event Handler for letter pressed
letterPressed.addEventListener("click", function (cur, i, arr) {
  if (gameActive === 0) return;
  if (chosenWordLettersArray == null) alert("Please start a new game"); // Check if a word has been selected
  // Check if a letter class was pressed, not the container
  if (cur.target.className === "letter") {
    playerSelectedLetter = cur.target.textContent.toLowerCase();
    hideLetter();
    checkLetterInWord();
    guessLogic();
  }
  checkIfGameWon();
});

// Function to check if the selected letter exists in the chosen word
const checkLetterInWord = function () {
  if (chosenWordLettersArray.includes(playerSelectedLetter)) replaceLetter();
  else counterWrongGuesses++;
};

// Function to replace blanks with correct letter
const replaceLetter = function () {
  chosenWordLettersArray.forEach(function (cur, i, arr) {
    if (cur == playerSelectedLetter) {
      blankArray[i] = playerSelectedLetter;
      document.querySelector(".guessDiv").textContent = blankArray.join("").toUpperCase();
    }
  });
};

// Function to hide letter from alphabet list
const hideLetter = function () {
  document.getElementById(`${playerSelectedLetter.toUpperCase()}`).classList.add("hidden");
};

// Function containing logic when player guesses
let guessLogic = function () {
  if (counterWrongGuesses === 9) gameOver();
  image.src = `Hangman pics/${counterWrongGuesses}.png`;
};

// Function for choosing a word and displaying it
let randomiseWord = function (cur, i, arr) {
  if (gameActive === 0) return;
  else {
    // Selects a random entry from the word array
    chosenWord = guessArray[Math.floor(Math.random(guessArray) * guessArray.length)];
    // Splits the word/sentence up into letters and puts them to lower case
    chosenWordLettersArray = [chosenWord.split("")].flat().map(function (cur, i, arr) {
      return cur.toLowerCase();
    });
    blankArray = [];
    // Checks each letter for a space - Either pushes the space or a blank
    chosenWordLettersArray.forEach(function (cur, i, arr) {
      if (cur === " ") {
        blankArray.push(" ");
      } else {
        blankArray.push("_");
      }
    });
  }
  // Replaces placeholder text with the chosen word as blanks
  document.querySelector(".guessDiv").textContent = blankArray.join("");
};

// Function to check if the game is won
let checkIfGameWon = function () {
  if (!blankArray.includes("_")) {
    footerText.classList.remove("hidden");
    footerText.textContent = "POG! YOU WON!";
    gameActive = 0;
  }
};

// Function to reset the image
let imageReset = function () {
  image.src = `Hangman pics/0.png`;
};

// Game Over Function
let gameOver = function () {
  gameActive = 0;
  image.src = `Hangman pics/${counterWrongGuesses}.png`;
  footerText.textContent = "GAME OVER! YOU LOSE!";
  footerText.classList.remove("hidden");
};

// Function for resetting the letters
let restoreLetters = function () {
  allDivs.forEach(function (cur, i, arr) {
    cur.classList.remove("hidden");
  });
};

// Event Handler for the New Game button
document.querySelector(".buttonNewGame").addEventListener("click", function (cur, i, arr) {
  if (gameActive === 1) return;
  else {
    gameActive = 1;
    counterWrongGuesses = 0;
    footerText.classList.add("hidden");
    randomiseWord();
    restoreLetters();
    imageReset();
  }
});
