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
const gameOverTitle = document.querySelector(".game-over__title");
const gameOverText = document.querySelector(".game-over__text");
const gameOverButton = document.querySelector(".game-over__link");
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
let errorCounter = 0;

//

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
  errorCounter = 0;
  clearCanvas();
}

vegetablesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
countriesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
fruitsButton?.addEventListener("click", (e) => onClickTopicsButton(e));
gameOverButton.addEventListener("click", (e) => onNewGameButtonClick(e));
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
    console.log(secretWord);
  });
}

letters.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    //

    fillGameCells(e);
    errorHandler(e);
    drawingPicture(e);
    gameOver();
    createGameOverTextContent(secretWord);
    disableLetter(e.target);
  });
});

function isCellsFilled() {
  const cellElements = document.querySelectorAll(".cell__item");
  const cellElementsArray = Array.from(cellElements);
  const isFilled = cellElementsArray.every((item) => item.innerText);
  return isFilled;
}

const disableLetter = (item) => {
  item.style.cssText += `opacity: 70%; pointer-events:none;`;
};

function fillGameCells(event) {
  const matchAllArray = findMatches(event);

  matchAllArray.forEach((subArray) => {
    const targetCell = document.getElementById(`${subArray.index}`);
    targetCell.innerHTML = subArray[0];
  });
}

function findMatches(event) {
  const letter = event.target.innerHTML;
  const regExp = new RegExp(`${letter}`, "g");
  const matchAll = secretWord.matchAll(regExp);

  const matchAllArray = Array.from(matchAll);
  return matchAllArray;
}

function errorHandler(event) {
  const matches = findMatches(event);
  if (matches.length === 0) {
    errorCounter++;
  }
}

//

function drawingPicture(e) {
  if (errorCounter === 1) {
    drawingByCoords([20, 30], [20, 200]);
  } else if (errorCounter === 2) {
    drawingByCoords([20, 200], [200, 200]);
  } else if (errorCounter === 3) {
    drawingByCoords([20, 30], [120, 30]);
  } else if (errorCounter === 4) {
    drawingByCoords([120, 30], [120, 50]);
  } else if (errorCounter === 5) {
    drawingOnePartByCoords();
  } else if (errorCounter === 6) {
    drawingByCoords([120, 82], [120, 140]);
  } else if (errorCounter === 7) {
    drawingByCoords([120, 96], [96, 116]);
  } else if (errorCounter === 8) {
    drawingByCoords([120, 96], [146, 116]);
  } else if (errorCounter === 9) {
    drawingByCoords([120, 140], [146, 160]);
  } else if (errorCounter === 10) {
    drawingByCoords([120, 140], [96, 160]);
  }
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

// game over page

function createGameOverTitle() {
  if (errorCounter === 10) {
    const titleYouLost = (gameOverTitle.innerHTML = "You lost :(");
    return titleYouLost;
  }
  const isFilled = isCellsFilled();
  if (isFilled) {
    console.log(isCellsFilled());
    gameOverTitle.innerHTML = "You win!";
  }
}

function createGameOverText(string) {
  gameOverText.innerHTML = `The word was ${string}`;
}

function createGameOverTextContent(string) {
  createGameOverTitle();
  createGameOverText(string);
}

function gameOver() {
  const isFilled = isCellsFilled();
  if (isFilled || errorCounter === 10) {
    gameMenu.style.cssText = "display:none";
    gameOverPage.style.cssText += `display: flex; align-items: center; flex-direction: column;`;
  }
}

function onNewGameButtonClick(e) {
  mainMenu.style.cssText += `display:block`;
  gameOverPage.style.cssText += `display:none`;
  cellList.innerHTML = "";
  secretWord = null;
  errorCounter = 0;
  clearCanvas();
  letters.forEach((item) => {
    item.style.cssText += `opacity: 1; pointer-events:auto;`;
  });
}

//

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
