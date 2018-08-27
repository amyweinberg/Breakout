//================ Welcome screen =========================
var view = {
    gameStartListeners: [],

    addEventListener: function(eventName, fn){
        //add a function to the list of shit to do
        if(eventName === "gameStart")
            gameStartListeners.push(fn)
    },

    startGame: function(){
        //do all the things you were told to do
        this.gameStartListeners.forEach(function(fn){
            fn()
        })
    },

    render: function(){
        var self = this
        //create a button
        this.el = document.createElement('button')
        
        //wait for click and call a function to do all the things
        this.el.addEventListener('click', function(){
            self.startGame()
        })

        
        setTimeout(function(){
            self.startGame()
        },3000)
        

    }
}

//================= Router ==============================
function startGame(){
    console.log(hi)
}

view.render()
view.addEventListener("gameStart", startGame)
document.addEventListener("DOMContentLoaded", render);

view.shitTodo.push(gameStart)

