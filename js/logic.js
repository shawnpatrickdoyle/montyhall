//select under which box the prize is
function chooseWinner(){
    return Math.floor(Math.random() * 3) + 1;
    }

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
//get an array of remaining choices
function remainingArray(revealed){
	var boxes = [1,2,3];
	var revealedIndex = revealed-1;
	boxes.splice(revealedIndex,1);
	return boxes;
}

//switch option, will receive an array of the two remaining choices and current pick
function switchMechanism(array,pick,option){
	if(option==="true"){
		//find current pick, remove it, return remaning box
		var pickIndex = array.indexOf(pick);
		array.splice(pickIndex,1);
		return array[0];
	} else {
		return pick;
	}
}

function simulation(times,switchStatus){
	var wins = 0;
	var losses = 0;
	for (var i=1;i<=times;i++){
		//randomly select one of three as the winner
		var winner = chooseWinner();
		//randomly select one of three as the contestant pick
		var choice = chooseWinner();
		var revealed = revealBox(choice,winner);
		var remaining = remainingArray(revealed);
		//make the switch if sim asks for it
		choice = switchMechanism(remaining,choice,switchStatus);
		if(choice===winner){
			wins+=1;
		} else {
			losses+=1;
		}
	}
	return [wins,losses];
}

