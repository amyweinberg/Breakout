const numColumns = 10;
const numRows = 5


function addElements () { 
    console.log("my page loaded");
    for (let x = 1; x <=numRows; x++) {
        for (let i = 1; i <=numColumns; i++) {
        let node = document.createElement("div");
        node.classList.add("box-item", "col" + i, "row" + x);
        
        document.getElementById("myDiv").appendChild(node);
        };
    };
  };

  
document.body.onload = addElements();
// pull out document.getElementbyID