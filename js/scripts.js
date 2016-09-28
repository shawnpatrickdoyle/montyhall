$( document ).ready(function() {
	var pick = 0;
	var lastBox = 0;
	var winner = 0;
	var switched = false;
	var games = 0;
	var playerWins = 0;
	var switchWins = 0;
	var playerWinPct = 0;
	var switchWinPct = 0;
	var goat = "<img src='images/goat.png' align='center'>";
	//navigation
	$("#explainer").click(
		function(){
			$(".explainer").hide();
			$(".offer").show();
		});
	$("#fastForward").click(
		function(){
			$(".greeting").hide();
			$(".gameChoice").show();
		});
	$("#greeting").click(
		function(){
			$(".greeting").hide();
			$(".explainer").show();
		});
	$("#offer").click(
		function(){
			$(".offer").hide();
			$(".gameChoice").show();
		});
	//prizes
	$("#ranch").click(
		function(){
			prize = "ranch";
			$(".prizeModal").hide();
			$(".ranch").show();
			$(".choiceModal").show();
		});
	$("#trans-am").click(
		function(){
			prize = "transam";
			$(".prizeModal").hide();
			$(".trans-am").show();
			$(".choiceModal").show();
			$(".gameChoice").show();
		});
	//choosing
	$("#curtain1").click(
		function(){
			pick=1;
			$(".doorPick").html(pick);
			$(".curtain").click(false);
		});
	$("#curtain2").click(
		function(){
			pick=2;
			$(".doorPick").html(pick);
			$(".curtain").click(false);
		});
	$("#curtain3").click(
		function(){
			pick=3;
			$(".doorPick").html(pick);
			$(".curtain").click(false);
		});
	//game play
	$("#door-reveal").click(
		function(){
			winner = chooseWinner();
			var reveal = revealBox(pick,winner);
			var zonkReveal = "#checkbox" + reveal;
			var zonkImage = "#curtain_prize_" + reveal;
			var otherBoxes = remainingArray(reveal);
			lastBox = remainingBox(otherBoxes,pick);
			$(zonkImage).html(goat);
			$(zonkReveal).prop('checked', false);
			$(".lastBox").html(lastBox);
			setTimeout(function() { $('#switchModal').modal('show'); }, 2000);
	});
	//switch
	$("#switch").click(
		function(){
				pick = lastBox;
				switched = true;
			}
	);
	//check winner
	$(".switchChoice").click(
			function(){
				var winStatus = false;
				games+=1;
				console.log("pick " + pick);
				console.log("winner " + winner);
				console.log("last Box" + lastBox);
				if (winner===pick){
					winStatus=true;
					playerWins+=1;
					console.log("Player:" + playerWins);
				}
				if (winner===lastBox){
					switchWins+=1;
					console.log("Switch:" + switchWins);
				}
				var final_curtain="#curtain_prize_" + pick;
				var prizeReveal="#checkbox" + pick;
				if (winStatus){
					var prizeImage="<img src='images/" + prize + ".png' align='center'>";
					$(final_curtain).html(prizeImage);
					$(prizeReveal).prop('checked',false);
				} else {
					$(final_curtain).html(goat);
					$(prizeReveal).prop('checked',false);
				}
				switchWinPct = ((switchWins/games)*100).toFixed(2);
				playerWinPct = ((playerWins/games)*100).toFixed(2);
				$("#playerWinPct").html(playerWinPct + "%");
				$("#switchWinPct").html(switchWinPct + "%");
				if (prize==="transam"){
					$(".winningPrize").html("1978 Pontiac Trans Am");
				} else {
					$(".winningPrize").html("lifetime's supply of Ranch dressing");
				}
				switch(true){
					case (winStatus===true && switched===false):
						$('#stayWin').show();
						break;
					case (winStatus===true && switched===true):
						$('#switchWin').show();
						break;
					case (winStatus===false && switched===false):
						$('#stayLoss').show();
						break;
					case (winStatus===false && switched===true):
						$('#switchLoss').show();
						break;
				}
				setTimeout(function() { $('#resultModal').modal('show'); }, 2000);
			}
		);
	//simulation
	$("#simStart").click(
			function(){
				var switchStatus = $("input[name='choice']:checked").val();
				var times = $("#iterations").val();
				if(times>100000){
					alert("Please have sympathy on the poor mother goats and choose a number less than 100,000.");
				} else {
					var results = simulation(times,switchStatus);
					var wins = results[0];
					var losses = results[1];
					var winningPct = ((wins/times)*100).toFixed(3);
					var message = "After " + times + " " + "simulations, here are your results.";
					$("#message").html(message);
					$("#simStart").html("Run it again");
					$("#simWins").html("Wins<br>" + wins);
					$("#simLosses").html("Losses<br>" + losses);
				}
			}
		);
}); //doc ready