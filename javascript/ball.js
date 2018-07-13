
class Ball {
    //Save model data
    constructor (x, y, vX, vY, container) {
        this.x = x
        this.y = y
        this.velocityX = vX
        this.velocityY = vY
        this.ballWidth = 15
        this.containerWidth = container.offsetWidth

        //Create the element
        this.el = document.createElement('div')
        this.el.classList.add('ball')
        this.el.style.left = this.x
        this.el.style.top = this.y
    
        //Add element to DOM
        container.appendChild(this.el)
    }

    get ballTop() {
        return this.y
    }

    get ballBottom() {
        let bottom = this.y + 15
        return bottom
    }
    get ballLeft() {
        return this.x
    }
    
    move() {
        let containerWidth = this.containerWidth
        let ballWidth = this.ballWidth
        let x = this.x
        let y = this.y

        //Detect collision
        if(isVerticalCollision())
            this.velocityY *= -1    
        if(isHorizontalCollision())
            this.velocityX *= -1  

        //update the x and y model
        this.x += this.velocityX;
        this.y += this.velocityY;


        //update the DOM
        this.el.style.left = this.x
        this.el.style.top = this.y

        //some utilities for this function
        function isVerticalCollision() {
            return (y >= 585 || y <= 200)
        }
        function isHorizontalCollision() {
            return (x >= containerWidth - ballWidth  || x <= 0)
        }
    }

}

export default Ball
