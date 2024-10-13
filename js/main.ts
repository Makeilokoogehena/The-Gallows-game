import "../index.html";
import "../assets/css/styles.css";

const vegetablesButton = document.querySelector<HTMLLinkElement>(
  ".menu-main__link_first"
);
const countriesButton = document.querySelector<HTMLLinkElement>(
  ".menu-main__link_second"
);
const fruitsButton = document.querySelector<HTMLLinkElement>(
  ".menu-main__link_third"
);
const mainMenu = document.querySelector<HTMLDivElement>(".menu-main");
const gameMenu = document.querySelector<HTMLDivElement>(".game-menu");
const gameMenuWrapperTitle = document.querySelector<HTMLDivElement>(
  ".game-menu__wrapper-title"
);
const cellList = document.querySelector<HTMLUListElement>(".cell");
const letters = document.querySelectorAll<HTMLLinkElement>(".letters__link");
const canvas = document.getElementById("canvas") as HTMLCanvasElement | null; // сама
const gameOverPage = document.querySelector<HTMLDivElement>(".game-over");
const gameOverTitle =
  document.querySelector<HTMLHeadingElement>(".game-over__title");
const gameOverText =
  document.querySelector<HTMLParagraphElement>(".game-over__text");
const gameOverButton =
  document.querySelector<HTMLLinkElement>(".game-over__link");
const buttonBack = document.querySelector<HTMLLinkElement>(".back-button");

// const topicsArray = [
//   { option: "Vegetables", id: 1 },
//   { option: "Countries", id: 2 },
//   { option: "Fruits", id: 3 },
// ];
type GameVocabulary = {
  vegetables: string[];
  fruits: Array<string>;
  countries: string[];
};

type TopicTypes = "vegetables" | "fruits" | "countries";

const gameVocabulary: GameVocabulary = {
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
    "Romania",
    "Ecuador",
    "Aruba",
    "Hungary",
    "India",
    "Egypt",
    "Armenia",
    "Sweden",
  ],
};

let secretWord: null | string = null;
let errorCounter = 0;

//

const createGameTitle = (item: string): HTMLElement => {
  let title: null | HTMLElement = null;

  if (document.querySelector(".game-menu__title")) {
    title = document.querySelector(".game-menu__title") as HTMLElement;
    title.innerHTML = `Topic: ${item}`;
    return title;
  }

  title = document.createElement("h1");
  title.classList.add("game-menu__title");
  title.innerHTML = `Topic: ${item}`;
  return title;
};

function openGameMenu(): void {
  if (mainMenu) mainMenu.style.display = "none";
  if (gameMenu) gameMenu.style.display = "block";
}

function onClickTopicsButton(event: any): void {
  openGameMenu();
  const text = event.target.innerHTML;
  const titleMarkup = createGameTitle(text);
  gameMenuWrapperTitle?.appendChild(titleMarkup);
  //
  const key = text.toLowerCase().trim() as TopicTypes;

  const wordsArray = gameVocabulary[key];
  const randomWord = getRandomElement(wordsArray);
  generateCellsFromArrayElement(randomWord);
}

function onClickBackMainMenu(): void {
  if (gameMenu) gameMenu.style.display = "none";
  resetTheGame();
}

vegetablesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
countriesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
fruitsButton?.addEventListener("click", (e) => onClickTopicsButton(e));
gameOverButton?.addEventListener("click", onNewGameButtonClick);
buttonBack?.addEventListener("click", onClickBackMainMenu);

// game page

function getRandomElement(array: string[]): string {
  const randomValueArray = array[Math.floor(Math.random() * array.length)];
  return randomValueArray.toUpperCase();
}

function generateCellsFromArrayElement(string: string): void {
  const result = string.split("");
  result.forEach((_, index) => {
    const cellItem = document.createElement("li");
    cellItem.classList.add("cell__item");
    cellItem.setAttribute("id", `${index}`);
    cellList?.appendChild(cellItem);
    //
    secretWord = string;
    // console.log(secretWord);
  });
}

letters.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    //

    fillGameCells(e);
    errorHandler(e);
    drawingPicture();
    gameOver();
    createGameOverTextContent(`${secretWord}`);
    disableLetter(e.target);
  });
});

function isCellsFilled(): boolean {
  const cellElements = document.querySelectorAll(".cell__item");
  const cellElementsArray = Array.from(cellElements) as HTMLLIElement[];
  const isFilled = cellElementsArray.every((item) => item.innerText);
  return isFilled;
}

const disableLetter = (item: any): void => {
  item.style.cssText += `opacity: 70%; pointer-events:none;`;
};

function fillGameCells(event: any): void {
  const matchAllArray = findMatches(event);

  matchAllArray.forEach((subArray) => {
    const targetCell = document.getElementById(`${subArray.index}`);
    if (targetCell) targetCell.innerHTML = subArray[0];
  });
}

function findMatches(event: any): RegExpExecArray[] {
  const letter = event.target.innerHTML;
  const regExp = new RegExp(`${letter}`, "g");
  const matchAll = `${secretWord}`.matchAll(regExp);

  const matchAllArray = Array.from(matchAll);
  return matchAllArray;
}

function errorHandler(event: any): void {
  const matches = findMatches(event);
  if (matches.length === 0) {
    errorCounter++;
  }
}

//

function drawingPicture(): void {
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

const ctx = canvas?.getContext("2d");

type CoordsType = number[];
function drawingByCoords(moveTo: CoordsType, lineTo: CoordsType): void {
  if (!ctx) return;
  const [x, y] = moveTo;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(lineTo[0], lineTo[1]);
  ctx.stroke();
  ctx.closePath();
}

function drawingOnePartByCoords(): void {
  if (!ctx) return;
  const getRadians = (degrees: number): number => (Math.PI / 180) * degrees;

  ctx.beginPath();
  ctx.arc(120, 66, 16, 0, getRadians(360));
  ctx.stroke();
  ctx.closePath();
}

// game over page

function createGameOverTitle(): void {
  if (!gameOverTitle) return;

  const isFilled = isCellsFilled();
  if (isFilled) {
    gameOverTitle.innerHTML = "You win!";
    return;
  }

  if (errorCounter === 10) {
    gameOverTitle.innerHTML = "You lost :(";
  }
}

function createGameOverText(string: string): void {
  if (gameOverText) gameOverText.innerHTML = `The word was ${string}`;
}

function createGameOverTextContent(string: string): void {
  createGameOverTitle();
  createGameOverText(string);
}

function gameOver(): void {
  const isFilled = isCellsFilled();
  if (isFilled || errorCounter === 10) {
    if (gameMenu) gameMenu.style.cssText = "display:none";
    if (gameOverPage)
      gameOverPage.style.cssText += `display: flex; align-items: center; flex-direction: column;`;
  }
}

function onNewGameButtonClick(): void {
  if (gameOverPage) gameOverPage.style.cssText += `display:none`;
  resetTheGame();
}

//

function resetTheGame(): void {
  if (mainMenu) mainMenu.style.display = "block";
  if (cellList) cellList.innerHTML = "";
  secretWord = null;
  errorCounter = 0;
  clearCanvas();

  letters.forEach((item) => {
    item.style.cssText += `opacity: 1; pointer-events:auto;`;
  });
}

function clearCanvas(): void {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
