$( document ).ready(function() {
	var pick = 0;
	var lastBox = 0;
	var winner = 0;
	var switched = false;
	var winStatus = false;
	var games = 0;
	var playerWins = 0;
	var switchWins = 0;
	var playerWinPct = 0;
	var switchWinPct = 0;
	var goat = "<img src='images/goat.png' align='center' class='prizeShot'>";
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
			$(".curtain").addClass("unclickable");
		});
	$("#curtain2").click(
		function(){
			pick=2;
			$(".doorPick").html(pick);
			$(".curtain").addClass("unclickable");
		});
	$("#curtain3").click(
		function(){
			pick=3;
			$(".doorPick").html(pick);
			$(".curtain").addClass("unclickable");
		});
	//repick
	$("#pickAgain").click(
		function(){
			$(".doorPick").empty();
			$(".curtain").removeClass("unclickable");
		});
	//game play
	$("#door-reveal").click(
		function(){
			winner = chooseWinner();
			console.log("winner " + winner);
			console.log("pick " + pick);
			var reveal = revealBox(pick,winner);
			console.log("reveal " + reveal);
			var zonkReveal = "#checkbox" + reveal;
			var zonkImage = "#curtain_prize_" + reveal;
			var otherBoxes = remainingArray(reveal);
			console.log("other boxes " + otherBoxes);
			lastBox = switchMechanism(otherBoxes,pick,"true");
			$(zonkImage).html(goat);
			$(zonkReveal).prop('checked', false);
			$(".lastBox").html(lastBox);
			console.log("last Box" + lastBox);
			setTimeout(function() { $('#switchModal').modal('show'); }, 2000);
	});
	//switch
	$("#switch").click(
		function(){
				pick = lastBox;
				switched = true;
				console.log("switched to " + pick);
			}
	);
	//check winner
	$(".switchChoice").click(
			function(){
				games+=1;
				console.log("games " + games);
				console.log("winner " + winner);
				
				if (winner===pick){
					winStatus=true;
					playerWins+=1;
					console.log("Player:" + playerWins);
				}
				if (winner===lastBox){
					switchWins+=1;
					console.log("Switch:" + switchWins);
				}
				console.log("*****************");
				var final_curtain="#curtain_prize_" + pick;
				var prizeReveal="#checkbox" + pick;
				if (winStatus){
					var prizeImage="<img src='images/" + prize + ".png' align='center' class='prizeShot'>";
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
					$(".winningPrize").html("lifetime's supply of ranch dressing");
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
	//start new round
	$('#playAgain').click(
			function(){
				pick = 0;
				winStatus = false;
				lastBox = 0;
				winner = 0;
				switched = false;
				$(':checkbox').prop('checked',true);
				$('.curtain_prize').empty();
				$('#restartModal').modal('show');
				$(".curtain").removeClass("unclickable");
				$(".resultStatement").hide();
			}
		);
	//reset scores
	$('#reset').click(
			function(){
				pick = 0;
				winStatus = false;
				lastBox = 0;
				winner = 0;
				switched = false;
				games = 0;
				playerWins = 0;
				switchWins = 0;
				playerWinPct = 0;
				switchWinPct = 0;
				$(':checkbox').prop('checked',true);
				$('.curtain_prize').empty();
				$('#restartModal').modal('show');
				$(".curtain").removeClass("unclickable");
				$("#playerWinPct").html("No games yet");
				$(".resultStatement").hide();
				$("#switchWinPct").html("No games yet");
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