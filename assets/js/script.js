// DOM 
const playboard = document.querySelector('.wrapper-play-board')

// snke food (apple) location
let foodX = 13
let foodY = 10

// main function

const initGame = () => {
  // create food in playboard
  let foodMarkup = `<div class="play-board-food" style="grid-area: ${foodY} / ${foodX}"></div>`
  playboard.innerHTML = foodMarkup
}
initGame()
