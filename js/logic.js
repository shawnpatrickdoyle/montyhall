//select under which box the prize is
function chooseWinner(){
    return Math.floor(Math.random() * 3) + 1;
    }
//get pick
var pick = 1;
//choosing which box to reveal
function revealBox(pick,winner){
	//create array with all options for reveal
	var boxes = [1,2,3];
	//convert pick to index of pick
	pick = pick - 1;
	//remove pick from options to reveal
	boxes.splice(pick,1);
	//two options for getting a box to reveal
	if (boxes.includes(winner)) {
		//first scenario, winner is still in play, remove it and return whatever is left
		var winningBox = boxes.indexOf(winner);
		boxes.splice(winningBox,1);
		return boxes[0];
	} else {
		//second scenario, winner is not in play (user has picked winner), return index of either of other two boxes
		var revealed = Math.floor(Math.random()*2);
		return boxes[revealed];
	}
}
//switch option, will receive an array of the two remaining choices and current pick
function switchMechanism(array,pick){
	if(true){
		//find current pick, remove it, return remaning box
		var pickIndex = array.indexOf(pick);
		array.splice(pickIndex,1);
		return array[0];
	} else {
		return pick;
	}
}
// reveal the winner
function showWinner(pick,winner){
	if (pick===winner){
		//add a mark to the win column
		//update overall percentage
		return "You won";

	} else {
	 	//add a mark to the loss column
		//update overall percentage
		return "You lost";
	}
}
//play the game
function playGame(box){
	var winner = chooseWinner();
	var pick = box;
	var boxes = [1,2,3];
	
}
