
class Ball {
    //Save model data
    constructor (x, y, vX, vY, container) {
        this.x = x
        this.y = y
        this.velocityX = vX
        this.velocityY = vY
        this.width = 15

        //Create the element
        this.el = document.createElement('div')
        this.el.classList.add('ball')
        this.el.style.left = this.x
        this.el.style.top = this.y
    
        //Add element to DOM
        container.appendChild(this.el)
    }

    get top() {
        return this.y
    }

    get bottom() {
        let bottom = this.y + 15
        return bottom
    }
    get left() {
        return this.x
    }
    verticalCollision(){
        this.velocityY *= -1
    }

    horizontalCollision(){
        this.velocityX *= -1
    }

    move() {
        let ballWidth = this.width
        let x = this.x
        let y = this.y

        //update the x and y model
        this.x += this.velocityX;
        this.y += this.velocityY;

        //update the DOM
        this.el.style.left = this.x
        this.el.style.top = this.y
    }

    remove() {
        this.el.remove()
    }

}

export default Ball
