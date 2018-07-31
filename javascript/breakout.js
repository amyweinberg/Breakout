import Ball from "./ball.js"
import Paddle from "./paddle.js"
import GameBlock from "./gameblock.js"

console.log('this is working')

const NUM_COLUMNS = 10
const NUM_ROWS = 5
const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39
const PADDLE_MOVE_STEP = 4
const PADDLE_INTERVAL = 4
const MIN_LEFT_POSITION = 0
const MAX_LEFT_POSITION = 880
const Y_BALL_START_POSITION = 201
const xStartPosition = function () {
    return Math.random() * (MAX_LEFT_POSITION - MIN_LEFT_POSITION) + MIN_LEFT_POSITION;
}
const FIRST_BALL_START_POSITION = {
    x: xStartPosition(),
    y: Y_BALL_START_POSITION,
}

const SECOND_BALL_START_POSITION = {
    x: xStartPosition(),
    y: Y_BALL_START_POSITION,
}

let blockConfig = []
for (let row = 1; row <=NUM_ROWS; row++) {
    for (let col = 1; col <=NUM_COLUMNS; col++) {
        blockConfig.push({
            row: row,
            col:col
        })
    }
}

function initGame() {
    addGameBlocks(blockConfig)
    initUserControls()
    animateFrames()
}


function initUserControls(){
    document.addEventListener('keydown', movePaddleHandler)
    document.addEventListener('keyup', stopMovingPaddleHandler)
}


function movePaddleHandler(event) {
    let pressedKeyCode = event.keyCode;
    if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE){
        return
    }
    let isRight = pressedKeyCode === RIGHT_KEY_CODE
    if(isRight) {
        paddle.movePaddleRight()
    } else {
        paddle.movePaddleLeft()
    }
}

function stopMovingPaddleHandler (event) {
    let pressedKeyCode = event.keyCode;
    if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE) {
       return
    } else {
        paddle.stop()
    }
}

function getRandomBallVelocities(totalVelocity) {
    let x, y
    let getRandomFactor = function () {
        //what is a good const name for 0.7 and 0.3???
        return Math.random() * (0.7 - 0.3) + 0.3
    }
    
    let xTotalVelocity = getRandomFactor() * totalVelocity
    let yTotalVelocity = getRandomFactor() * totalVelocity
    
    return {
        x: xTotalVelocity,
        y: yTotalVelocity
    }
}

let blockContainer = document.getElementById('blockContainer');
let gameBlocks = []


function addGameBlocks(blockData){
        blockData.forEach(function(data){
            let block = new GameBlock(data.row, data.col, blockContainer)
            gameBlocks.push(block)
        })
}

// function addGameBlocks(){
//     for (let row = 1; row <=NUM_ROWS; row++) {
//         for (let col = 1; col <= NUM_COLUMNS; col++) {
//         let block = new GameBlock(row, col, blockContainer)
//         gameBlocks.push(block)
//         };
//     };
// }

console.log(gameBlocks)

let firstBallVelocity = getRandomBallVelocities(10)
let secondBallVelocity = getRandomBallVelocities(10)
let firstBall = new Ball(FIRST_BALL_START_POSITION.x, FIRST_BALL_START_POSITION.y, firstBallVelocity.x, firstBallVelocity.y, blockContainer)
console.log(firstBall)
let secondBall = new Ball(SECOND_BALL_START_POSITION.x, SECOND_BALL_START_POSITION.y, secondBallVelocity.x, secondBallVelocity.y, blockContainer)
console.log(secondBall)
let paddle = new Paddle(400, 0, blockContainer)


function animateFrames() {
    requestAnimationFrame(animateFrames)
    firstBall.move()
    secondBall.move()
    paddle.move()
}

document.body.onload = initGame;





