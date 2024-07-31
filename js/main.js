const vegetablesButton = document.querySelector(".menu-main__link_first");
const countriesButton = document.querySelector(".menu-main__link_second");
const fruitsButton = document.querySelector(".menu-main__link_third");
const mainMenu = document.querySelector(".menu-main");
const gameMenu = document.querySelector(".game-menu");
const gameMenuWrapperTitle = document.querySelector(
  ".game-menu__wrapper-title"
);
const cellList = document.querySelector(".cell");
const letters = document.querySelectorAll(".letters__link");
const canvas = document.getElementById("canvas");
const gameOverPage = document.querySelector(".game-over");
const gameOverText = document.querySelector(".game-over__text");
const newGame = document.querySelector(".game-over__link");
const buttonBack = document.querySelector(".back-button");

const topicsArray = [
  { option: "Vegetables", id: 1 },
  { option: "Countries", id: 2 },
  { option: "Fruits", id: 3 },
];
const gameVocabulary = {
  vegetables: [
    "cabbage",
    "cucumber",
    "broccoli",
    "potatoes",
    "corn",
    "onion",
    "carrot",
    "radish",
    "pumpkin",
    "pepper",
    "tomato",
    "bean",
  ],
  fruits: [
    "plum",
    "pear",
    "grapes",
    "pineapple",
    "apple",
    "cherry",
    "strawberry",
    "kiwi",
    "apricot",
    "melon",
    "watermelon",
    "lemon",
    "pomegranate",
    "papaya",
    "raspberry",
    "banana",
  ],
  countries: [
    "Angola",
    "Turkey",
    "Spain",
    "Germany",
    "Canada",
    "Mexico",
    "Russia",
    "Ecuador",
    "Aruba",
    "Hungary",
    "India",
    "Egypt",
    "Armenia",
    "Sweden",
  ],
};

let secretWord = null;

const createGameTitle = (item) => {
  let title = null;

  if (document.querySelector(".game-menu__title")) {
    title = document.querySelector(".game-menu__title");
    title.innerHTML = `Topic: ${item}`;
    return title;
  }

  title = document.createElement("h1");
  title.classList.add("game-menu__title");
  title.innerHTML = `Topic: ${item}`;
  return title;
};

function openGameMenu() {
  mainMenu.style.display = "none";
  gameMenu.style.display = "block";
}

function onClickTopicsButton(event) {
  openGameMenu();
  const text = event.target.innerHTML;
  const titleMarkup = createGameTitle(text);
  gameMenuWrapperTitle.appendChild(titleMarkup);
  //
  const key = text.toLowerCase();
  const wordsArray = gameVocabulary[key];
  const randomWord = getRandomElement(wordsArray);
  generateCellsFromArrayElement(randomWord);
}

function onClickBackMainMenu() {
  mainMenu.style.display = "block";
  gameMenu.style.display = "none";
  cellList.innerHTML = "";
  secretWord = null;
}

vegetablesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
countriesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
fruitsButton?.addEventListener("click", (e) => onClickTopicsButton(e));
buttonBack.addEventListener("click", onClickBackMainMenu);

// game page

function getRandomElement(array) {
  const randomValueArray = array[Math.floor(Math.random() * array.length)];
  return randomValueArray.toUpperCase();
}

function generateCellsFromArrayElement(string) {
  const result = string.split("");
  result.forEach((_, index) => {
    const cellItem = document.createElement("li");
    cellItem.classList.add("cell__item");
    cellItem.setAttribute("id", index);
    cellList.appendChild(cellItem);
    //
    secretWord = string;
  });
}

letters.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    fillGameCells(e);
  });
});

function fillGameCells(event) {
  const letter = event.target.innerHTML;
  //
  const regExp = new RegExp(`${letter}`, "g");
  const matchesArray = secretWord.matchAll(regExp);
  matchesArray.forEach((subArray) => {
    const targetCell = document.getElementById(`${subArray.index}`);
    targetCell.innerHTML = subArray[0];
  });
}

// canvas drawing

const ctx = canvas.getContext("2d");

function drawingByCoords(moveTo, lineTo) {
  const [x, y] = moveTo;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(lineTo[0], lineTo[1]);
  ctx.stroke();
  ctx.closePath();
}

function drawingOnePartByCoords() {
  const getRadians = (degrees) => (Math.PI / 180) * degrees;
  ctx.beginPath();
  ctx.arc(120, 66, 16, 0, getRadians(360));
  ctx.stroke();
  ctx.closePath();
}

// ctx.moveTo(20, 30); ctx.lineTo(20, 200);
// ctx.moveTo(20, 200); ctx.lineTo(200, 200);
// ctx.moveTo(20, 30); ctx.lineTo(120, 30);
// ctx.moveTo(120, 30); ctx.lineTo(120, 50);
// ctx.moveTo(120, 82); ctx.lineTo(120, 140);
// ctx.moveTo(120, 96); ctx.lineTo(96, 116);
// ctx.moveTo(120, 96); ctx.lineTo(146, 116);
// ctx.moveTo(120, 140); ctx.lineTo(146, 160);
// ctx.moveTo(120, 140); ctx.lineTo(96, 160);

//

// game over page

function gameOver() {
  gameMenu.style.display = "none";
  gameOverPage.style = "block";
}
