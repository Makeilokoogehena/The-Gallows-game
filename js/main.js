const vegetablesButton = document.querySelector(".menu-main__link_first");
const countriesButton = document.querySelector(".menu-main__link_second");
const fruitsButton = document.querySelector(".menu-main__link_third");
const mainMenu = document.querySelector(".menu-main");
const gameMenu = document.querySelector(".game-menu");
const gameMenuWrapperTitle = document.querySelector(
  ".game-menu__wrapper-title"
);
const cellList = document.querySelector(".cell");
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
    "Switzerland",
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

const createGameTitle = (item) => {
  const title = document.createElement("h1");
  title.classList.add("game-menu__title");
  title.innerHTML = `Topic: ${item}`;
  return title;
};

function openGameMenu() {
  mainMenu.style.display = "none";
  gameMenu.style.display = "block";
}

function onClickTopicsButton(e) {
  openGameMenu();
  const title = e.target.innerHTML;
  const titleMarkup = createGameTitle(title);
  gameMenuWrapperTitle.appendChild(titleMarkup);
  //
  const titleKeyToLowerCase = gameVocabulary[title.toLowerCase()];
  const randomWord = getRandomElement(titleKeyToLowerCase);
  console.log(randomWord);
  generateCellsFromArrayElement(randomWord);
}

//

vegetablesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
countriesButton?.addEventListener("click", (e) => onClickTopicsButton(e));
fruitsButton?.addEventListener("click", (e) => onClickTopicsButton(e));

// game page

function getRandomElement(array) {
  const randomValueArray = array[Math.floor(Math.random() * array.length)];
  return randomValueArray.toUpperCase();
}

function generateCellsFromArrayElement(arrayElement) {
  const result = arrayElement.split("");
  result.forEach(() => {
    const cellItem = document.createElement("li");
    cellItem.classList.add("cell__item");
    cellList.appendChild(cellItem);
  });
}
