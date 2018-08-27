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

export default Ball
