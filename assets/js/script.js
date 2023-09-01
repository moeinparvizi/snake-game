// DOM 
const playboard = document.querySelector('.wrapper-play-board')

// snke food (apple) location
// let foodX = 13
// let foodY = 10

// create random snake food
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
  let foodMarkup = `<div class="play-board-food" style="grid-area: ${foodY} / ${foodX}"></div>`
  playboard.innerHTML = foodMarkup
}
initGame()
