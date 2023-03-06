const circleTabs = document.querySelectorAll(' .circle')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const closeButton = document.querySelector('#close')
const overlay = document.querySelector('.overlay')
const scoreUpdate = document.querySelector('#score')
const modalScore = document.querySelector('.scoreEnd')
const endText = document.querySelector('#endText')
const audioClick = new Audio('mixkit-game-click-1114.mp3')
const audioEnd = new Audio('failfare-86009.mp3')
let score = 0
let speed = 1000
let active = 0
let timer
let miss = 0

const getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const playSound = () => {
  audioClick.play()
}
const playSoundEnd = () => {
  audioEnd.play()
}

const clickCircle = (i) => {
  if (i === active && !(miss === 3)) {
    score += 2
    scoreUpdate.textContent = score
    playSound()
  } else {
    return endGame()
  }
  miss = 0
  score += 2
  scoreUpdate.textContent = score
  console.log(i)
}
const enableCircles = () => {
  circleTabs.forEach(circle => {
    circle.style.pointerEvents = 'auto'
  })
}

const gameSystem = () => {
  if (miss > 3) {
    return endGame()
  }

  startButton.classList.add('hidden')
  endButton.classList.remove('hidden')

  enableCircles()

  const nextActive = pickNew(active)

  circleTabs[nextActive].classList.toggle('active')
  circleTabs[active].classList.remove('active')

  active = nextActive

  timer = setTimeout(gameSystem, speed)

  speed -= 5
  miss++

  function pickNew (active) {
    const nextActive = getRndInt(0, 3)
    if (nextActive !== active
    ) {
      return nextActive
    }
    return pickNew(active)
  }
}

const endGame = () => {
  modalScore.textContent = score
  endButton.classList.remove('hidden')
  startButton.classList.add('hidden')
  overlay.style.visibility = 'visible'
  clearTimeout(timer)

  if (score === 0) {
    endText.textContent = 'You are not a right person for this'
  } else if (score === 0 || score < 25) {
    endText.textContent = 'Try to be quick, You gotta save the planet'
  } else if (score > 25 || score < 45) {
    endText.textContent = 'You can do it, try more'
  } else if (score > 45 || score < 80) {
    endText.textContent = 'You are almost there, gotta catch em all'
  } else {
    endText.textContent = 'Insane!!! You are a savior of this planet.'
  }
  console.log('game ended')
  playSoundEnd()
}
const resetGame = () => {
  window.location.reload()
}
circleTabs.forEach((circle, i) => { circle.addEventListener('click', () => clickCircle(i)) })

startButton.addEventListener('click', gameSystem)
endButton.addEventListener('click', endGame)
closeButton.addEventListener('click', resetGame)
