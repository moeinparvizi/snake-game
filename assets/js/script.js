// DOM 
const playboard = document.querySelector('.wrapper-play-board')

// variables
let foodY = 0, foodX = 0
let snakeY = 5, snakeX = 5

// create random position snake food (apple)
const randomFood = () => {
  // create random 1 to 30
  foodX = Math.random() * 30
  foodY = Math.random() * 30
  // create number to integer
  foodX = parseInt(foodX)
  foodY = parseInt(foodY)
}

// main function
const initGame = () => {
  randomFood()
  // create food in playboard
  let htmlMarkup = `<div class="play-board-food" style="grid-area: ${foodY} / ${foodX}"></div>`
  htmlMarkup += `<div class="play-board-snake" style="grid-area: ${snakeY} / ${snakeX}"></div>`
  playboard.innerHTML = htmlMarkup
}
initGame()
