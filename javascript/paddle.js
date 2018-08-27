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

export default Paddle
