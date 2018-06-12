const NUM_COLUMNS = 10;
const NUM_ROWS = 5
const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39
const PADDLE_MOVE_STEP = 4
const PADDLE_INTERVAL = 4
const MIN_LEFT_POSITION = 0
const MAX_LEFT_POSITION = 880
const BALL_START_POSITION = {
    x: 50,
    y: 201
}


function initGame() {
    addGameBlocks()
    initPaddlePosition()
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

function initPaddlePosition(){
    document.querySelector('.paddle').style.left=600
}

let paddleTimer = null;
let paddle = document.querySelector('.paddle')

function movePaddleHandler(event) {
    if(paddleTimer) {
        return
    }
    let pressedKeyCode = event.keyCode;
    if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE){
        return
    }
    let isRight = pressedKeyCode === RIGHT_KEY_CODE

    paddleTimer = setInterval(function(){
        movePaddle(isRight)
    }, PADDLE_INTERVAL);

    
}

function movePaddle(isRight=false) {
    let moveDirection = isRight ? 1 : -1    
    let left = parseInt(paddle.style.left)
    left = left + PADDLE_MOVE_STEP * moveDirection
    if(left >= MIN_LEFT_POSITION && left <= MAX_LEFT_POSITION) {
        paddle.style.left = left
        console.log(left)
    }
}

function stopMovingPaddleHandler (event) {
    let pressedKeyCode = event.keyCode;
    if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE) {
       return
    } else {
        stopMovingPaddle()
    }
}

function stopMovingPaddle () {
    clearInterval(paddleTimer);
    paddleTimer = null;
}

function Ball(x, y, vX, vY) {
    //Save model data
    this.x = x
    this.y = y
    this.velocityX = vX
    this.velocityY = vY

    //Create the element
    this.el = document.createElement('div')
    this.el.classList.add('ball')
    this.el.style.left = this.x
    this.el.style.top = this.y

    //Add element to DOM
    let blockContainer = document.getElementById('blockContainer');
    blockContainer.appendChild(this.el)
}


Ball.prototype.move = function() {

    //Detect collision
    if(isVerticalCollision(this))
        this.velocityY *= -1    
    if(isHorizontalCollision(this))
        this.velocityX *= -1  

    //update the x and y model
    this.x += this.velocityX;
    this.y += this.velocityY;


    //update the DOM
    this.el.style.left = this.x
    this.el.style.top = this.y
}

function isVerticalCollision (ball) {
    return ball.y >= 585 || ball.y <= 200
}

function isHorizontalCollision (ball) {
    return ball.x >= 985 || ball.x <= 0
}

function getRandomBallVelocities(totalSpeed) {
    let x = 5
    let y = 5
    //TODO - calculate a random x,y such that x+y = 10
    return {
        x: x,
        y: y
    }
}
let ballVelocity = getRandomBallVelocities()
let firstBall = new Ball(BALL_START_POSITION.x, BALL_START_POSITION.y, ballVelocity.x, ballVelocity.y)

function animateFrames() {
    requestAnimationFrame(animateFrames)
    firstBall.move()
    console.log(firstBall)
}

document.body.onload = initGame;
