let init = $(function() {
    console.log('jquery');
});

const numColumns = 10;
const numRows = 5;


let createDivs = function() {
    let container = $('#container')
    for(let x=1; x<=numRows; x++) {
        for(let i=1; i<=numColumns; i++) {
            let newDiv = $('<div></div>')
                .addClass('box-item')
                .addClass('col' + i + ' ' + 'row' + x)
            container.append(newDiv)
        }
    }
};

createDivs();

init;


