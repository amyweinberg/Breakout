let init = $(function() {
    console.log('jquery');
});

const numColumns = 10;
const numRows = 5;


let createDivs = function() {
    
    for(let x=1; x<=numRows; x++) {
        for(let i=1; i<=numColumns; i++) {
            let newDiv = $('<div></div>').insertBefore('.ball').addClass('box-item');
            newDiv.addClass('col' + i + ' ' + 'row' + x);
        }
    }
};

createDivs();

init;


