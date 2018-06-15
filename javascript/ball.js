
function Ball(x, y, vX, vY, container) {
    //Save model data
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


Ball.prototype.move = function() {

    //Detect collision
    if(this.isVerticalCollision())
        this.velocityY *= -1    
    if(this.isHorizontalCollision())
        this.velocityX *= -1  

    //update the x and y model
    this.x += this.velocityX;
    this.y += this.velocityY;


    //update the DOM
    this.el.style.left = this.x
    this.el.style.top = this.y

}

Ball.prototype.isVerticalCollision = function() {
    return (this.y >= 585 || this.y <= 200)
}

Ball.prototype.isHorizontalCollision = function() {
    return (this.x >= this.containerWidth- this.ballWidth  || this.x <= 0)
}