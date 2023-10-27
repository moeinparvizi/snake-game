// DOM
const playboard = document.querySelector(".wrapper-play-board");
const scoreElement = document.querySelector(".wrapper-details-score");
const highScoreElement = document.querySelector(".wrapper-details-high-score");
const controls = document.querySelectorAll(".wrapper-controls>i");

// variables
let gameOver = false;
let foodY = 0,
  foodX = 0;
let snakeY = 5,
  snakeX = 5;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;

// getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score : ${highScore}`;

// create random position snake food (apple)
const randomFood = () => {
  // create random 1 to 30
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
  // console.log(foodX)

  // create number to integer
  foodX = parseInt(foodX);
  foodY = parseInt(foodY);
};

// handle if user game over
const handleGameOver = async () => {
  await clearInterval(setIntervalId);
  await Swal.fire({
    title: "your lose",
    background: "transparent",
    icon: "warning",
    confirmButtonText: "try again",
    timer: "10000",
    backdrop: "rgba(0,0,0,.7)",
    color: "#eee",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    timerProgressBar: true,
  });
  await location.reload();
};

// change direction of snake
const changeDirection = (e) => {
  // let snake = document.querySelector('.play-board-snake')

  // this section of code for not return to back velocityX and velocityY != 1 or -1
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }

  // initGame()
};

controls.forEach((val) => {
  // on each key click to passing key dataset value
  val.addEventListener("click", () =>
    changeDirection({
      key: val.dataset.key,
    }),
  );
});

// main function
const initGame = () => {
  // check if gameOver start another function
  if (gameOver) return handleGameOver();

  // create food in playboard
  let htmlMarkup = `<div class="play-board-food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  //eat foot
  if (snakeX == foodX && snakeY == foodY) {
    // change food position after eat an apple
    randomFood();

    // add to body
    snakeBody.push([foodX, foodY]);
    // console.log(snakeBody)

    // increase score
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score : ${score}`;
    highScoreElement.innerText = `High Score : ${highScore}`;
  }

  // shifting forward the values of the elemens in the snake body by one
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // setting first element of snake body to current snake position
  snakeBody[0] = [snakeX, snakeY];

  // update location of snake
  snakeY += velocityY;
  snakeX += velocityX;

  // checking if snake's head out of wall, fi so setting gameOver to true
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  // adding a div for each part of the snake's body
  for (let i = 0; i < snakeBody.length; i++) {
    // create snake in map
    htmlMarkup += `<div class="play-board-snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // checking if the snake head hit the body if so set gameOver to true
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  // inner all Element in playboard
  playboard.innerHTML = htmlMarkup;
};

// start with calling functions
randomFood();
// loop movement with setInterval
setIntervalId = setInterval(initGame, 125);

// click to start
document.addEventListener("keydown", changeDirection);
