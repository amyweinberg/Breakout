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


export default Welcome