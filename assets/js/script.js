// DOM 
const playboard = document.querySelector('.wrapper-play-board')

// variables
let foodY = 0, foodX = 0
let snakeY = 5, snakeX = 5
let snakeBody = []
let velocityX = 0, velocityY = 0

// create random position snake food (apple)
const randomFood = () => {
  // create random 1 to 30
  foodX = Math.floor(Math.random() * 30) + 1
  foodY = Math.floor(Math.random() * 30) + 1
  console.log(foodX)
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

    // add to body
    snakeBody.push([foodX, foodY])
    console.log(snakeBody)
  }

  // shifting forward the values of the elemens in the snake body by one
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]
  }

  // setting first element of snake body to current snake position
  snakeBody[0] = [snakeX, snakeY]

  // update location of snake
  snakeY += velocityY
  snakeX += velocityX

  // adding a div for each part of the snake's body
  for (let i = 0; i < snakeBody.length; i++) {
    // create snake in map
    htmlMarkup += `<div class="play-board-snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
  }

  // inner all Element in playboard
  playboard.innerHTML = htmlMarkup
}

// start with calling functions
randomFood()
// loop movement with setInterval
setInterval(initGame, 125)

// click to start
document.addEventListener('keydown', changeDirection)
