const buttonVegetables = document.querySelector(".menu__link_first");
const buttonCountries = document.querySelector(".menu__link_second");
const buttonFruits = document.querySelector(".menu__link_third");

function onButtonVegetablesClick() {
  buttonVegetables.classList.add("menu__link_first-open");
  window.location.assign("gamepage.html");
}

function onButtonCountriesClick() {
  buttonCountries.classList.add("menu__link_second-open");
  window.location.assign("gamepage.html");
}

function onButtonFruitsClick() {
  buttonFruits.classList.add("menu__link_third-open");
  window.location.assign("gamepage.html");
}

buttonVegetables.addEventListener("click", onButtonVegetablesClick);
buttonCountries.addEventListener("click", onButtonCountriesClick);
buttonFruits.addEventListener("click", onButtonFruitsClick);
