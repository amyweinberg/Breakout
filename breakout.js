const NUM_COLUMNS = 10;
const NUM_ROWS = 5


function initGame() {
    addGameBlocks()
    initPaddlePosition()
    initUserControls()
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


function getKeyCode(event) {
    let pressedKeyCode = event.keyCode;
    return pressedKeyCode;
    console.log(pressedKeyCode);
}; 

let paddleTimer = null;

const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39
const PADDLE_MOVE_STEP = 4
const PADDLE_INTERVAL = 4

function movePaddleHandler(event) {
    if(paddleTimer) {
        return
    }

    let pressedKeyCode = getKeyCode(event);
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
    let paddle = document.querySelector('.paddle')
    let left = parseInt(paddle.style.left)
    left = left + PADDLE_MOVE_STEP * moveDirection
    paddle.style.left = left
    console.log(left)
}


function stopMovingPaddleHandler (event) {
    let pressedKeyCode = getKeyCode(event);
    if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE) {
       return
    }

    clearInterval(paddleTimer);
    paddleTimer = null;
}

document.body.onload = initGame;

//check if left or right key is pressed (keydown)
//move paddle repeatedly left or right
//until keyup event