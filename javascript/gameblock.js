
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




export default GameBlock
