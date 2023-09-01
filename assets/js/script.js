// DOM 
const playboard = document.querySelector('.wrapper-play-board')

// variables
let foodY = 0, foodX = 0
let snakeY = 5, snakeX = 5
let velocityX = 0, velocityY = 0

// create random position snake food (apple)
const randomFood = () => {
  // create random 1 to 30
  foodX = Math.random() * 30
  foodY = Math.random() * 30
  // create number to integer
  foodX = parseInt(foodX)
  foodY = parseInt(foodY)
}

// change direction of snake
const changeDirection = (e) => {
  // let snake = document.querySelector('.play-board-snake')
  switch (e.key) {
    case "ArrowUp":
      velocityX = 0
      velocityY = -1
      // snake.style.transform = 'rotate(90deg)'
      break;

    case "ArrowDown":
      velocityX = 0
      velocityY = 1
      break;

    case "ArrowLeft":
      velocityX = -1
      velocityY = 0
      break;

    case "ArrowRight":
      velocityX = 1
      velocityY = 0
      break;
  }
  initGame()
}

// main function
const initGame = () => {
  // create food in playboard
  let htmlMarkup = `<div class="play-board-food" style="grid-area: ${foodY} / ${foodX}"></div>`

  //eat foot
  if (snakeX == foodX && snakeY == foodY) {

    // change food position after eat an apple
    randomFood()
  }

  // update location of snake
  snakeY += velocityY
  snakeX += velocityX

  // create snake in map
  htmlMarkup += `<div class="play-board-snake" style="grid-area: ${snakeY} / ${snakeX}"></div>`

  // inner all Element in playboard
  playboard.innerHTML = htmlMarkup
}

// start with calling functions
randomFood()
// loop movement with setInterval
setInterval(initGame, 125)

// click to start
document.addEventListener('keydown', changeDirection)
