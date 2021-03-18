let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')


$start.addEventListener('click',startGame)
$game.addEventListener('click',handleBoxClick)
$game.addEventListener('input',setGameTime)
let score = 0
let isGameStarted = false
function  show($element){
    $element.classList.remove('hide')
}
function  hide($element){
    $element.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled','true')
    show($timeHeader)
    hide($resultHeader)
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)

        if(time <= 0){
            clearInterval(interval)
            endGame()
        }
        else{
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)

    renderBox()
}

function  setGameScore() {
    $result.textContent = score.toString()
}

function  setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
}

function  endGame() {

    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}


function handleBoxClick(event) {
    if(isGameStarted){
        if(event.target.dataset.box) {
            score++
            renderBox()
        }
    }

}

function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30,100)
    let gameSize = $game.getBoundingClientRect()
    let top = getRandom(0,gameSize.height - boxSize)
    let left = getRandom(0,gameSize.width - boxSize)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`
    box.style.top = top+'px'
    box.style.left = left+'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box','true')
    $game.insertAdjacentElement("afterbegin", box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}
