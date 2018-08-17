const PADDLE_VELOCITY = 7

class Paddle  {
    constructor (x,container) {
        this.x = x
        this.velocityX = 0
        this.el = document.createElement('div')
        this.el.classList.add('paddle')
        this.el.style.left = this.x

        container.appendChild(this.el)
    }

    move() {
        function isPaddleHorizontalCollision (paddle) {
            if(paddle.x >= 880 && paddle.velocityX > 0) {
                //collision right
                return true
            }
        
            if(paddle.x <= 0 && paddle.velocityX < 0){
                //collision left
                return true
            }
            return false
        }

        if(isPaddleHorizontalCollision(this)) {
            this.velocityX = 0
            return
        }

        this.x += this.velocityX

        //update DOM
        this.el.style.left = this.x
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

export default Paddle
