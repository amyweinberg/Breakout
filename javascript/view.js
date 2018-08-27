class View {
    constructor (x, container) {
        //model data
        this.x = x

        //create the element
        this.el = document.createElement('div')

        //add CSS class


        //add element to the DOM
        container.appendChild(this.el)
    }
    //remove the DOM element
    remove() {
        this.el.remove()
}

//the view needs to make the element, apply the CSS class, remove the el, add event handlers, remove the event handlers