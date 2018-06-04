const NUM_COLUMNS = 10;
const NUM_ROWS = 5


function initGame() {
    addGameBlocks()
    initPaddlePosition()
}

function addGameBlocks () { 
    console.log("adding game blocks");
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
    console.log('setting paddle position')
    document.querySelector('.paddle').style.left=600
}



function getKeyCode(event) {
    let pressedKeyCode = event.keyCode;
    return pressedKeyCode;
    console.log(pressedKeyCode);
}; 


function movePaddle(event) {

}

function movePaddleHandler(event) {
    //move left or right depending on keycode

    //get keycode
    let pressedKeyCode = event.keyCode;
    console.log(pressedKeyCode)

    let paddle = document.querySelector('.paddle')
    let left = parseInt(paddle.style.left.replace('px',''))

    console.log(left)

    if(pressedKeyCode === 37) {
        //move left
        //Get the current left position of paddle and subtract 20
        paddle.style.left = left - 20
    } else if(pressedKeyCode === 39) {
        //move right
        //Get the current left position of paddle and add 20
        paddle.style.left = left + 20
    }

    //if keycode is right, move right
}

document.addEventListener('keydown', movePaddleHandler);

// let paddle = document.querySelector('.paddle');
// //paddle.style.left = paddlePosition.toString() + 'px';

// if(pressedKeyCode !== 37 && pressedKeyCode !== 39) {
//     return;
// } else if(pressedKeyCode === 37) {

//     paddle.style.left = paddlePosition.toString() + 'px';
// } else if (pressedKeyCode === 39) {

//     paddle.style.left = paddlePosition.toString() + 'px';
// }
// document.addEventListener('load', initGame)
document.body.onload = initGame();