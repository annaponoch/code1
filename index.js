//
let step = 0;
let moves = []
let cencelMoves = []
let a = NaN;
//
let undoButton = document.querySelector(".undo-btn");
let redoButton = document.querySelector(".redo-btn");
let restartButton = document.querySelector(".restart-btn");
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
restartButton.addEventListener("click", resetGame);
//
set_click();
if (localStorage.length == 0){save();}
else{
	moves = JSON.parse(localStorage.getItem("ticTacToeMoves"))[0],cencelMoves = JSON.parse(localStorage.getItem("ticTacToeMoves"))[1];
	doMove();
}
function click(event){
	
	cencelMoves = []

	if (event.target.className == "cell"){
		if(step%2 == 0){
			event.target.className = "cell r";
		}
		else{
			event.target.className = "cell ch"
		}
	step++;
	moves.push({class:event.target.className,id:event.target.id});
	
	checkButt();
	checkWinner();
	save();
	}
}

function checkWinner(){

	function addWinClass(arr,type ){
		arr.forEach(element => alls[element].className += ' win '+type);
	}
	
	let alls = document.querySelectorAll('[data-id]');

	arr = []
	//diagonal-right
	for(let i = 0;i<COLS_COUNT*ROWS_COUNT;i+=COLS_COUNT+1){arr.push(i);}
	win = arr.every(elem => alls[elem].className === alls[arr[0]].className && alls[elem].className !== "cell");
	if (win){addWinClass(arr,'diagonal-right');     endGame((alls[arr[0]].className).split(' ')[1]); }
	arr = []
	
	//vertical
	for(let i = 0;i < COLS_COUNT;i+=1){
		arr1=[]
		for(let z = i;z<COLS_COUNT*ROWS_COUNT;z+=COLS_COUNT){arr1.push(z);}
		arr.push(arr1);
	}
	arr.forEach(element => {win = element.every(elem => alls[elem].className === alls[element[0]].className && alls[elem].className !== "cell");if(win){addWinClass(element,'vertical');    endGame((alls[element[0]].className).split(' ')[1]);  }})
	arr = []

	//horizontal
	for(let i = 0;i < COLS_COUNT*ROWS_COUNT;i+=COLS_COUNT){
		arr1=[]
		for(let z = i;z<COLS_COUNT+i;z+=1){arr1.push(z);}
		arr.push(arr1);
	}
	arr.forEach(element => {win = element.every(elem => alls[elem].className === alls[element[0]].className && alls[elem].className !== "cell");if(win){addWinClass(element,'horizontal');   endGame((alls[element[0]].className).split(' ')[1]);  }})
	arr = []

	//diagonal-left'
	for(let i = COLS_COUNT-1;i<COLS_COUNT*ROWS_COUNT-1;i+=COLS_COUNT-1){arr.push(i);}
	win = arr.every(elem => alls[elem].className === alls[arr[0]].className && alls[elem].className !== "cell");
	if (win){addWinClass(arr,'diagonal-left');     endGame((alls[arr[0]].className).split(' ')[1]);  }

	//It's a draw!
	if(Array.from(alls).every(elem => elem.className !== "cell")){endGame("gg");}

}
function endGame(name) {
	a.forEach(e => e.querySelectorAll(".cell").forEach(elem => elem.removeEventListener("click", click)));
	document.querySelector(".won-title").classList.remove("hidden");
    if (name === "gg"){var winner = "It's a draw!";}
    else if (name === "r"){var winner = 'Toes won!';}
    else{var winner = 'Crosses won!';}
    document.querySelector(".won-message").textContent = winner;
    undoButton.disabled = true;
}

function checkButt(){
	if (moves.length != 0){undoButton.disabled = false;}
	else{undoButton.disabled = true;}
	if (cencelMoves.length != 0){redoButton.disabled = false;}
 	else{redoButton.disabled = true;}
}

function save(){
	localStorage.setItem("ticTacToeMoves", JSON.stringify([moves, cencelMoves]));
}

function doMove(){
	moves.forEach(e => document.getElementById(e['id']).className = e['class']);
	checkButt();
	checkWinner();
}

function resetGame(){
	document.querySelectorAll(".cell").forEach(e => { e.className = "cell"});
    undoButton.disabled = true;
	redoButton.disabled = true;
    document.querySelector(".won-title").classList.add("hidden");
	set_click();
	moves = []
	cencelMoves = []
	save();
}

function set_click(){
	a = document.querySelectorAll(".row");
	a.forEach(e => e.querySelectorAll(".cell").forEach(elem => elem.addEventListener("click", click)));
}

function undo(){
	step -= 1;
	var back = moves.pop();
	cencelMoves.push(back);
	document.getElementById(back['id']).className = "cell";
	save();
	checkButt();
}

function redo(){
	step += 1;
	let last = cencelMoves.pop();
	document.getElementById(last['id']).className = last['class'];
	moves.push(last);
	save();
	checkButt();
}