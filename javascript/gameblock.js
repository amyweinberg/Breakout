
console.log('gameblock module is working')
const COL_CLASS = "col"
const ROW_CLASS = "row"

class GameBlock {
    //Save model data
    constructor (row, col, container) {
        this.col = col,
        this.row = row

        this.el = document.createElement('div')
        this.el.classList.add("box-item", COL_CLASS + this.col, ROW_CLASS + this.row)


        container.appendChild(this.el)
    }

    



}




export default GameBlock
