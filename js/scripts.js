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
	var simWins=0;
	var simLosses=0;
	var times=0;
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
	$("#addInstructions").click(function(){
		$(".bottomMonty").show();
		$("#choiceInstructions").show();
	});
	$("#curtain1").click(
		function(){
			pick=1;
			$(".doorPick").html(pick);
			$(".curtain").addClass("unclickable");
			$("#choiceInstructions").hide();
			$("#confirmModal").show();
			$('#restartModal').hide();
		});
	$("#curtain2").click(
		function(){
			pick=2;
			$(".doorPick").html(pick);
			$(".curtain").addClass("unclickable");
			$("#choiceInstructions").hide();
			$("#confirmModal").show();
			$('#restartModal').hide();
		});
	$("#curtain3").click(
		function(){
			pick=3;
			$(".doorPick").html(pick);
			$(".curtain").addClass("unclickable");
			$("#choiceInstructions").hide();
			$("#confirmModal").show();
			$('#restartModal').hide();
		});
	//repick
	$("#pickAgain").click(
		function(){
			$(".doorPick").empty();
			$(".curtain").removeClass("unclickable");
		});
	//trigger reveal
	$('#confirm').click(function(){
		$('#confirmModal').hide();
		$('#revealModal').show();
	});
	//game play	
	$("#door-reveal").click(
		function(){
			winner = chooseWinner();
			var reveal = revealBox(pick,winner);
			var zonkReveal = "#checkbox" + reveal;
			var zonkImage = "#curtain_prize_" + reveal;
			var otherBoxes = remainingArray(reveal);
			lastBox = switchMechanism(otherBoxes,pick,"true");
			$(zonkImage).html(goat);
			$(zonkReveal).prop('checked', false);
			$(".lastBox").html(lastBox);
			$('#revealModal').hide();
			setTimeout(function() { $('#switchModal').show(); }, 1000);
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
				games+=1;
				if (winner===pick){
					winStatus=true;
					playerWins+=1;
				}
				if (winner===lastBox){
					switchWins+=1;
				}
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
				$("#playerWinPct").html("<h4>" + playerWinPct + "%</h4>");
				$("#switchWinPct").html("<h4>" + switchWinPct + "%</h4>");
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
				$('#switchModal').hide();
				$('#resultsModal').show();
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
				$('#resultsModal').hide();
				$('#restartModal').show();
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
				$('#resultsModal').hide();
				$('#restartModal').show();
				$(".curtain").removeClass("unclickable");
				$("#playerWinPct").html("No games yet");
				$(".resultStatement").hide();
				$("#switchWinPct").html("No games yet");
			}
		);
	//simulation
	$("#reloadGame").click(
		function(){
			location.reload();
		});
	$("#simStart").click(
			function(){
				var switchStatus = $("input[name='choice']:checked").val();
				var iterations=$("#iterations").val();
				times+= parseInt(iterations);
				if(iterations>100000){
					alert("Please have sympathy on the poor mother goats and choose a number less than 100,000.");
				} else {
					var results = simulation(times,switchStatus);
					simWins+= results[0];
					simLosses+= results[1];
					var winningPct = ((simWins/(simWins+simLosses))*100).toFixed(3);
					var message = "<h3 class='simText'>After " + times + " " + "simulations, here are your results.</h3>";
					$("#message").html(message);
					$("#simStart").html("Run it again");
					$("#simWinsHeader").html("Wins");
					$("#simLossesHeader").html("Losses");
					$("#simWinPctHeader").html("Winning Pct.");
					$("#simWins").html(simWins);
					$("#simLosses").html(simLosses);
					$("#simWinPct").html(winningPct + "%");
					$('.tableResults').show();
					$('.more-info').show();
				}
			}
		);
	$("#resetSim").click(function(){
		simWins = 0;
		simLosses = 0;
				var switchStatus = $("input[name='choice']:checked").val();
				var iterations=$("#iterations").val();
				times+= parseInt(iterations);
				if(iterations>100000){
					alert("Please have sympathy on the poor mother goats and choose a number less than 100,000.");
				} else {
					var results = simulation(times,switchStatus);
					simWins+= results[0];
					simLosses+= results[1];
					var winningPct = ((simWins/(simWins+simLosses))*100).toFixed(3);
					var message = "<h3 class='simText'>After " + times + " " + "simulations, here are your results.</h3>";
					$("#message").html(message);
					$("#simStart").html("Run it again");
					$("#simWinsHeader").html("Wins");
					$("#simLossesHeader").html("Losses");
					$("#simWinPctHeader").html("Winning Pct.");
					$("#simWins").html(simWins);
					$("#simLosses").html(simLosses);
					$("#simWinPct").html(winningPct+ "%");
					$('.tableResults').show();
					$('.more-info').show();
				}
	});
}); //doc ready