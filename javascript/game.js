import Ball from "./ball.js"
import Paddle from "./paddle.js"
import GameBlock from "./gameblock.js"

const NUM_COLUMNS = 10
const NUM_ROWS = 5
const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39
const MIN_LEFT_POSITION = 0
const MAX_LEFT_POSITION = 880
const Y_BALL_START_POSITION = 201
const PADDLE_LENGTH = 120

let blockConfig = []
for (let row = 1; row <=NUM_ROWS; row++) {
    for (let col = 1; col <=NUM_COLUMNS; col++) {
        blockConfig.push({
            row: row,
            col: col
        })
    }
}


function getRandomBallVelocities(totalVelocity) {
    let x, y
    let getRandomFactor = function () {
        //what is a good const name for 0.7 and 0.3???
        return Math.random() * 0.4 + 0.3
    }
    
    let xTotalVelocity = Math.floor(getRandomFactor() * totalVelocity)
    let yTotalVelocity = totalVelocity-xTotalVelocity
    
    return {
        x: xTotalVelocity,
        y: yTotalVelocity
    }
}

class Game {
    constructor(container){
         //Game elements
        this.container = container
        this.balls = []
        this.paddles = []
        this.blocks = []
        this.eventHandlers = []
        this.gameEndListeners = []
        this.animationFrame = null
    }

    onGameEnd(fn) {
        this.gameEndListeners.push(fn)
    }

    init() {
        const xStartPosition = function () {
            return Math.floor(Math.random() * (MAX_LEFT_POSITION - MIN_LEFT_POSITION) + MIN_LEFT_POSITION)
        }
        const FIRST_BALL_START_POSITION = {
            x: xStartPosition(),
            y: Y_BALL_START_POSITION,
        }

        this.container.innerHTML = `<div>
                                        <div class="flex-container header-row">
                                            <div> 
                                                Score: &nbsp;<span id="score"> 30</span> 
                                            </div>
                                            <div >
                                                Speed: <span id="speed">On</span>
                                            </div>
                                            <div>
                                                Sound: <span id="sound">On</span>
                                            </div>
                                            <div id="hearts">
                                                <img src="images/heart.svg" width="30" height="30">
                                                <img src="images/heart.svg" width="30" height="30">
                                                <img src="images/heart.svg" width="30" height="30">
                                            </div>
                                        </div>
                                        <div id="gameContainer" class="grid"></div>
                                        
                                    </div>`
        
    

        let self = this
        addGameBlocks(blockConfig)
        addBalls()
        addPaddles()
        initUserControls()
        animateFrames()   

        //ends the game
        function endGame() {
            self.gameEndListeners.forEach(function(fn){
                fn()
            })
        }
        
        function addGameBlocks(blockData){
            let blockContainer = document.getElementById('gameContainer')
            
            blockData.forEach((data)=>{
                let block = new GameBlock(data.row, data.col, blockContainer)
                self.blocks.push(block)
            })
        }

        document.querySelectorAll('.box-item').forEach((block)=>{
            block.addEventListener('click', ()=>{endGame()})
        })
        

        function initUserControls(){
            document.addEventListener('keydown', movePaddleHandler)
            document.addEventListener('keyup', stopMovingPaddleHandler)
            self.eventHandlers.push({
                eventName: 'keydown',
                handler: movePaddleHandler
            })
            self.eventHandlers.push({
                eventName: 'keyup',
                handler: stopMovingPaddleHandler
            })
        }

        function movePaddleHandler(event, paddles) {
            let pressedKeyCode = event.keyCode;
            if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE){
                return
            }
            let isRight = pressedKeyCode === RIGHT_KEY_CODE
            if(isRight) {
                self.paddles.forEach(function(paddle){
                    paddle.movePaddleRight()
                })
            } else {
                self.paddles.forEach(function(paddle){
                    paddle.movePaddleLeft()
                })
            }
        }

        function stopMovingPaddleHandler (event, paddles) {
            let pressedKeyCode = event.keyCode;
            if(pressedKeyCode !== LEFT_KEY_CODE && pressedKeyCode !== RIGHT_KEY_CODE) {
            return
            } else {
                self.paddles.forEach(function(paddle){
                    paddle.stop()
                })
            }
        }

        function animateFrames() {
            self.animateFrame = requestAnimationFrame(animateFrames)
            self.balls.forEach(function(ball){
                let collision = ball.move(self.blocks.concat(self.paddles))
                // let collision = ball.move(self.paddles)

                if(collision) {
                    //get rid of that object
                }
                // detectCollision(ball)
                detectGameOver(ball)
            })
            self.paddles.forEach(function(paddle){
                paddle.move()
            })
        }

        function detectGameOver(ball) {
            let y = ball.bottom
            if(y >= 615) {
                endGame()
            }
        }
    


        function isVerticalCollision(ball) {
           
            let paddleXleft = self.paddles[0].left
            let paddleXright = paddleXleft + PADDLE_LENGTH                
            
            //detect ball hit paddle
            let hitPaddle = (y >= 581 && paddleXleft <= x && x <=paddleXright)
                
            //hit a brick?
            let hitBrick = y <= 200
            
            //hit the ceiling?
            let hitCeiling = false
            

            return hitPaddle || hitBrick || hitCeiling


        }

      
        
        function isHorizontalCollision(ball) {
            let x = ball.left
            return (x >= self.container.offsetWidth - ball.width  || x <= 0)
        }
       
        function addBalls() {
            let gameContainer = document.getElementById('gameContainer');
            let ballVelocity = getRandomBallVelocities(10)
            let ball = new Ball(FIRST_BALL_START_POSITION.x, FIRST_BALL_START_POSITION.y, ballVelocity.x, ballVelocity.y, gameContainer)
            ball.onCollision(onCollision)
            self.balls.push(ball)
            
        }

        function onCollision(collisionData){
            let obstacle = collisionData.obstacle
            if(!obstacle.indestructable && obstacle.remove) {
                obstacle.remove()
                self.blocks = self.blocks.filter((block)=>{
                    return block !== obstacle
                })
            }
                
        }

        function addPaddles(){
            let gameContainer = document.getElementById('gameContainer');
            self.paddles.push(new Paddle(400, gameContainer))
        }

    }

    remove() {
        this.balls.forEach(function(ball){
            ball.remove()
        })
         this.paddles.forEach(function(paddle){
            paddle.remove()
        })
         this.blocks.forEach(function(block){
            block.remove()
        })
        this.eventHandlers.forEach(function(handlerData){
            document.removeEventListener(handlerData.eventName, handlerData.handler)
        })

        this.balls = []
        this.paddles = []
        this.eventHandlers = []

        window.cancelAnimationFrame(this.animateFrame)
        

        //todo - clear scores and other state
    }
}

export default Game





