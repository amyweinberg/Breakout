/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascript/breakout.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/ball.js":
/*!****************************!*\
  !*** ./javascript/ball.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const MIN_X = 0
const MIN_Y = 0

class Ball {
    //Save model data
    constructor (x, y, vX, vY, container) {
        this.x = x
        this.y = y
        this.velocityX = vX
        this.velocityY = vY
        this.width = 15
        this.collisionHandlers = []

        //Create the element
        this.el = document.createElement('div')
        this.el.classList.add('ball')
        this.el.style.left = this.x
        this.el.style.top = this.y
        this.container = container

        //Add element to DOM
        container.appendChild(this.el)

        this.maxX = this.container.offsetWidth - this.el.offsetWidth
        this.maxY = this.container.offsetHeight - this.el.offsetHeight
    }

    get top() {
        return this.y
    }

    get bottom() {
        let bottom = this.y + this.height
        return bottom
    }
    get left() {
        return this.x
    }

    get height() {
        return this.el.offsetHeight
    }
   

    move(obstacles) {
        let ballWidth = this.width
        console.log(obstacles)
        
        let targetX = this.x + this.velocityX
        let targetY = this.y + this.velocityY
        var self = this

        function getCollision(obstacles, x, y) {
            //return an object like 
            //{obstacle, x, y, velocityX, velocityY}
            
            //check for collisions on walls and ceilings
            if(x >= self.maxX){
                return {
                    obstacle: null,
                    x: self.maxX,
                    y: y,
                    velocityY: self.velocityY,
                    velocityX: self.velocityX * -1
                }
            }
            else if(targetX <= MIN_X){
                return {
                    obstacle: null,
                    x: MIN_X,
                    y: y,
                    velocityY: self.velocityY,
                    velocityX: self.velocityX * -1
                }
            }
            if(targetY >= self.maxY) {
                return {
                    obstacle: null,
                    x: x,
                    y: self.maxY,
                    velocityY: self.velocityY * -1,
                    velocityX: self.velocityX
                }
            }
            else if (targetY <= MIN_Y){
                return {
                    obstacle: null,
                    x: x,
                    y: MIN_Y,
                    velocityY: self.velocityY * -1,
                    velocityX: self.velocityX
                }
            }

            //check for obstacles
             //detect blocks
        let ballLeft = x
        let ballRight = x + self.height
        let ballTop = y
        let ballBottom = y + self.height

        for(let i = 0; i < obstacles.length; i++) {
            
            let block = obstacles[i]
            let blockLeft = block.left
            let blockRight = block.right
            let blockTop = block.top
            let blockBottom = block.bottom

            //Are we overlapping?
            // console.log(ballLeft, ballRight, ballTop, blockTop, blockLeft, blockRight)
            if( (ballRight >= blockLeft && ballLeft <= blockRight) && 
                (ballBottom >= blockTop && ballTop <= blockBottom)
               ) {
                    //simulation
                    let simX = self.x
                    let simY = self.y
                    let stepX = self.velocityX / 10
                    let stepY = self.velocityY / 10
                    
                    for(let step = 0; step < 10; step++) {
                        simX += stepX
                        simY += stepY
                        let simBallLeft = Math.floor(simX)
                        let simBallTop = Math.floor(simY)
                        if( simBallLeft >= blockLeft && 
                            simBallLeft + self.width <= blockRight && 
                            (simBallTop === blockBottom || simBallTop + self.height === blockTop)){
                                //todo: bottom or top collision
                                console.log('top/bottom collision')
                                return {
                                    obstacle: block,
                                    x: simBallLeft,
                                    y: simBallTop,
                                    velocityY: self.velocityY * -1,
                                    velocityX: self.velocityX
                                }
                            }
                        
                        if( simBallTop >= blockTop && 
                            simBallTop <= blockBottom && 
                            (simBallLeft + self.width === blockLeft  || simBallLeft  === blockRight)) {
                                //right/left collision
                                return {
                                    obstacle: block,
                                    x: simBallLeft,
                                    y: simBallTop,
                                    velocityY: self.velocityY,
                                    velocityX: self.velocityX * -1
                                }
                            }
                        
                    }
                }
            }        
        return null
    }
        

        //update the model
        let collision = getCollision(obstacles, targetX, targetY)
        
        if(collision) {
            // console.log(collision, targetX, targetY)
            this.x = collision.x
            this.y = collision.y
            this.velocityX = collision.velocityX
            this.velocityY = collision.velocityY
            if(collision.obstacle){
                this.triggerCollision(collision)
            }
        } else {
            this.x = targetX
            this.y = targetY
        }
        
        //update the DOM
        this.el.style.left = this.x
        this.el.style.top = this.y
    

    }

    triggerCollision(collisionData) {
        this.collisionHandlers.forEach((fn)=>{
            fn(collisionData)
        })
    }

    onCollision(fn){
        this.collisionHandlers.push(fn)
    }

    remove() {
        this.el.remove()
    }

}

/* harmony default export */ __webpack_exports__["default"] = (Ball);


/***/ }),

/***/ "./javascript/breakout.js":
/*!********************************!*\
  !*** ./javascript/breakout.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./javascript/game.js");
/* harmony import */ var _welcome_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome.js */ "./javascript/welcome.js");
/* harmony import */ var _gameover_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameover.js */ "./javascript/gameover.js");





const VIEW_NAMES = {
    welcome: 'w',
    game: 'g',
    gameover: 'go'
}

let views = {}
let gameState = {
        currentView: VIEW_NAMES.welcome
    }

function render(data) {
    //clean up (call remove on the current view)
    for(var viewName in views) {
        if(views[viewName])
            views[viewName].remove()
    }

    //Render the appropriate view
    views[data.currentView].init()
}

function init() {
    let viewContainer = document.getElementById('view-container')
    
    let welcomeView = views[VIEW_NAMES.welcome] = new _welcome_js__WEBPACK_IMPORTED_MODULE_1__["default"](viewContainer)
    let gameView = views[VIEW_NAMES.game] = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](viewContainer)
    let gameoverView = views[VIEW_NAMES.gameover] = new _gameover_js__WEBPACK_IMPORTED_MODULE_2__["default"](viewContainer)

    //wire up events from views
    //when the start game button is pushed, change gameState and call render(gameState)
    welcomeView.onGameStart(function(){
        gameState.currentView = VIEW_NAMES.game
        render(gameState)
    })

     gameoverView.onGameStart(function(){
        console.log('clicked')
        gameState.currentView = VIEW_NAMES.game
        render(gameState)
    })

     gameView.onGameEnd(function(){
        gameState.currentView = VIEW_NAMES.gameover
        render(gameState)
    })
    

    render(gameState)
}

document.addEventListener("DOMContentLoaded", init);


/***/ }),

/***/ "./javascript/game.js":
/*!****************************!*\
  !*** ./javascript/game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ball_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball.js */ "./javascript/ball.js");
/* harmony import */ var _paddle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paddle.js */ "./javascript/paddle.js");
/* harmony import */ var _gameblock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameblock.js */ "./javascript/gameblock.js");




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
                let block = new _gameblock_js__WEBPACK_IMPORTED_MODULE_2__["default"](data.row, data.col, blockContainer)
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
            let ball = new _ball_js__WEBPACK_IMPORTED_MODULE_0__["default"](FIRST_BALL_START_POSITION.x, FIRST_BALL_START_POSITION.y, ballVelocity.x, ballVelocity.y, gameContainer)
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
            self.paddles.push(new _paddle_js__WEBPACK_IMPORTED_MODULE_1__["default"](400, gameContainer))
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

/* harmony default export */ __webpack_exports__["default"] = (Game);







/***/ }),

/***/ "./javascript/gameblock.js":
/*!*********************************!*\
  !*** ./javascript/gameblock.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

console.log('gameblock module is working')
const COL_CLASS = "col"
const ROW_CLASS = "row"

class GameBlock {
    //Save model data
    constructor (row, col, container) {
        this.col = col,
        this.row = row

        this.el = document.createElement('div')
        this.el.classList.add("box-item", "block", COL_CLASS + this.col, ROW_CLASS + this.row)


        container.appendChild(this.el)
    }

    get top() {
        return this.el.offsetTop
    }

    get bottom() {
        return this.el.offsetTop + this.el.offsetHeight
    }
    get left() {
        return this.el.offsetLeft
    }

    get right() {
        return this.el.offsetLeft + this.el.offsetWidth
    }


    remove() {
        this.el.remove()
    }



}




/* harmony default export */ __webpack_exports__["default"] = (GameBlock);


/***/ }),

/***/ "./javascript/gameover.js":
/*!********************************!*\
  !*** ./javascript/gameover.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
console.log('gameover is loading')

class Gameover {
    constructor (container) {
        this.container = container
        this.gameStartListeners = []
    }

    onGameStart(fn) {
        this.gameStartListeners.push(fn)
    }

    init() {
        this.remove()
        this.container.innerHTML = `<div class="gameover">
                                    <h2>GAME OVER</h2>
                                    <button class="playAgainButton" id="play-again-button">Play Again</button>
                                    `
        this.el = document.querySelector('.gameover')
        this.button = document.querySelector('#play-again-button')
    
        this.button.addEventListener('click', ()=>{
            this.startGame()
        })
    }

    startGame() {
            this.gameStartListeners.forEach(function(fn){
                fn()
            })
    }

    remove() {
        if(this.el)
            this.el.remove()
        if(this.button)
            this.button.remove()
    }

}


/* harmony default export */ __webpack_exports__["default"] = (Gameover);

/***/ }),

/***/ "./javascript/paddle.js":
/*!******************************!*\
  !*** ./javascript/paddle.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const PADDLE_VELOCITY = 7
const MIN_X = 0

class Paddle  {
    constructor (x,container) {
        this.x = x
        this.velocityX = 0
        this.el = document.createElement('div')
        this.el.classList.add('paddle')
        this.el.style.left = this.x
        this.container = container

        container.appendChild(this.el)

        this.maxX = this.container.offsetWidth - this.el.offsetWidth
    }

    get indestructable() {
        return true
    }

    move() {
        if(this.velocityX === 0)
            return

        let newX = this.x + this.velocityX

        if(newX >= this.maxX) {
            this.x = this.maxX
        } else if(newX <= MIN_X)
            this.x = MIN_X
        else
            this.x = newX

        
        //update DOM
        this.el.style.left = this.x
    }   

    get left() {
        return this.x
    }
    get top() {
        return this.el.offsetTop
    }
    get right() {
        return this.el.offsetLeft + this.el.offsetWidth
    }
    get bottom() {
        return this.el.offsetTop + this.el.offsetHeight
    }


    movePaddleRight() {
        this.velocityX = PADDLE_VELOCITY
    }

    movePaddleLeft() {
        this.velocityX = -PADDLE_VELOCITY
    }

    stop() {
        this.velocityX = 0
    }

    remove() {
        this.el.remove()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Paddle);


/***/ }),

/***/ "./javascript/welcome.js":
/*!*******************************!*\
  !*** ./javascript/welcome.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
console.log('welcome is loading')

class Welcome {
    constructor (container) {
        this.container = container
        this.gameStartListeners = []
    }

    onGameStart(fn) {
        this.gameStartListeners.push(fn)
    }

    init() {
        this.remove()
        this.container.innerHTML = `<div class="welcome">
                                    <h2>WELCOME TO BREAKOUT</h2>
                                    <button class="startButton" id="start-button">Start Game</button>
                                    </div>
                                    `
        this.el = document.querySelector('.welcome')
        this.button = document.querySelector('#start-button')


        this.button.addEventListener('click', ()=>{
            this.startGame()
        })
    }

    startGame() {
        this.gameStartListeners.forEach(function(fn){
            fn()
        })
    }

    remove() {
        if(this.el)
            this.el.remove()
        if(this.button)
            this.button.remove()
    }

}


/* harmony default export */ __webpack_exports__["default"] = (Welcome);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map