import Ball from "./ball.js"
import Paddle from "./paddle.js"


const NUM_COLUMNS = 10;
const NUM_ROWS = 5
const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39
const PADDLE_MOVE_STEP = 4
const PADDLE_INTERVAL = 4
const MIN_LEFT_POSITION = 0
const MAX_LEFT_POSITION = 880
const BALL_START_POSITION = {
    x: 600,
    y: 201
}


function initGame() {
    addGameBlocks()
    initUserControls()
    animateFrames()
}

function initUserControls(){
    document.addEventListener('keydown', movePaddleHandler)
    document.addEventListener('keyup', stopMovingPaddleHandler)
}

function addGameBlocks () { 
    console.debug("adding game blocks");
    let blockContainer = document.getElementById('blockContainer');

    for (let x = 1; x <=NUM_ROWS; x++) {
        for (let i = 1; i <= NUM_COLUMNS; i++) {
        let gameBlock = document.createElement("div");
        gameBlock.classList.add("box-item", "col" + i, "row" + x);
        
        blockContainer.appendChild(gameBlock);
        };
    };
  };

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
    let minTotalVelocity = 0.3 * totalVelocity
    let maxTotalVelocity = 0.7 * totalVelocity

    x = Math.floor((Math.random() * maxTotalVelocity) + minTotalVelocity
    y = totalVelocity - x
  
    console.log(x, y)
    //TODO - calculate a random x,y such that x+y = 10
    return {
        x: x,
        y: y
    }
}

let blockContainer = document.getElementById('blockContainer');
let ballVelocity = getRandomBallVelocities(10)
let firstBall = new Ball(BALL_START_POSITION.x, BALL_START_POSITION.y, ballVelocity.x, ballVelocity.y, blockContainer)
let paddle = new Paddle(400, 0, blockContainer)


function animateFrames() {
    requestAnimationFrame(animateFrames)
    firstBall.move()
    paddle.move()
}

document.body.onload = initGame;





