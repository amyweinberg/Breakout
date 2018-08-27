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


export default Gameover