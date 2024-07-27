// Variables are storage of values
// Reusable name that represent a value 
let board;
let score = 0;
let rows = 4;
let columns = 4;

// Reusable tasks
function setGame() {
    board = [
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]; // Goal, we use the backend board to create a frontend board.

    // Loop to repeat the task inside it, until it fulfills the condition (in our context, until our board will have a tile with their proper colors)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            
            // Create and design a tile using div
            let tile = document.createElement("div");

            //each tile will have an invisible ID
            tile.id = r.toString() + "-" + c.toString();

            //number of the tile
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}
// updates the appearance of the tile (that should have tile number and background)
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
         tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

window.onload = function() {
    setGame();
}

function handleSlide(event){
	console.log(event.code); // event.code - is the pressed key in our keyboard
	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)){

		event.preventDefault();
		if (event.code == "ArrowLeft") {
			slideLeft();
		}
		else if(event.code == "ArrowRight"){
			slideRight();
		}
		else if(event.code == "ArrowUp"){
			slideUp();
		}
		else if(event.code == "ArrowDown"){
			slideDown();
		}
	}
}

function slideLeft(){
	for(let r=0; r<rows; r++){
		let row = board[r];
		row = slide(row);
		board[r] = row;

		for(let c = 0; c<columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

function filterZero(row){
	return row.filter(num => num != 0);
}
function slide(row){
	row = filterZero(row);
	for(let i = 0; i<row.length - 1; i++){
		if(row[i] == row[i+1]){
			row[i] *= 2;
			row[i+1] = 0;
		}
	}
	while(row.legnth < columns){
		row.push(0);
	}
	return row;
}


document.addEventListener("keydown", handleSlide);