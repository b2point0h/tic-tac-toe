(function(){	
	var playerOne = '#player1';
	var playerTwo = '#player2';
	var winner = "";
	// Set variables for start and end screens
	var startEnd = {
		start: "<div class='screen screen-start' id='start'>" + 
			   "<header><h1>Tic Tac Toe</h1>" + 
			   "<a href='#' class='button'>Play Game</a><br>" + 
			   "</header></div>",
		end: "<div class='screen screen-win' id='finish'>" + 
    		 "<header><h1>Tic Tac Toe</h1>" + 
    		 "<p class='message'></p>" + 
    		 "<a href='#' class='button'>New game</a>" + 
    		 "</header></div>"
	};// Append the start & finish screens to the body, then hide them
	$('body').append(startEnd.start);
	$('body').append(startEnd.end);
	$('#start, #finish').hide();

	// Load the starting screen on page load
	(function() {
		$('#start').show();
		$('.button').on('click', function(){
			$('#start, #finish').hide();
			$('#board').show();
			$(".box").each(function () {
				this.style.backgroundImage = "none";
				$(this).removeClass("box-filled-1");
				$(this).removeClass("box-filled-2");
			});
			//Remove any previously assigned active classes
			$('li.players').removeClass('active');
			//Randomly assign starting user to keep game fair
			var li = $("ul li");
			var rand = Math.floor(Math.random() * 2);
			li.eq(rand % li.length).addClass("active");
			playGame();
		});
	}());

	// Start the gameplay
	var playGame = function() {
		$('.box').each(function(){
			$(this).mouseenter(function(){ // Add the background image on hover
				if ( $(playerOne).hasClass("active")) {
					this.style.backgroundImage = "url('img/o.svg')";
				} else {
					this.style.backgroundImage = "url('img/x.svg')";
				}
			});
			$(this).mouseleave(function(){ // On mouseleave, remove the background image
				this.style.backgroundImage = "none";
			});
		});
		$('.box').click(function(){ // On click, check to see if user already placed piece down. If not, then add class box-filled, add background image, unbind the mouseleave function, fire nextTurn function to switch active class to next player. Check for win condition.
			if ($(playerOne).hasClass("active")) {
				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
					$(this).addClass('box-filled-1');
					this.style.backgroundImage = "url('img/o.svg')";
					$(this).unbind('mouseenter mouseleave');
					checkWin();
					nextTurn();
				}
			} else if ($('#player2').hasClass("active")) {
				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
					$(this).addClass('box-filled-2');
					this.style.backgroundImage = "url('img/x.svg')";
					$(this).unbind('mouseenter mouseleave');
					checkWin();
					nextTurn();
				}
			} else {
				console.log("No more turns!");
			}
			
		});	
	};

	var nextTurn = function() {
		if ( $(playerOne).hasClass('active') ) {
			$(playerOne).removeClass("active");
			$(playerTwo).addClass("active");
		} else {
			$(playerTwo).removeClass("active");
			$(playerOne).addClass("active");
		}
	};

	var checkWin = function() {
		// Create empty arrary of moves
		var winning = [];
		//Loop over boxes and add currently placed piece
		$('.box').each(function(){
			if ($(this).hasClass('box-filled-1')) {
				winning.push("player1");
			} else if ($(this).hasClass('box-filled-2')) {
				winning.push("player2");
			} else {
				winning.push("empty");
			}
		});	
		// Check the array to find winning combinations. If pieces match one in 8 possible combinations, set the winner to matching name
			if (winning[0] !== "empty" && winning[0] === winning[1] && winning[1] === winning[2]) {
				winner = winning[0];
				showWinner();
			} else if (winning[3] !== "empty" && winning[3] === winning[4] && winning[4] === winning[5]) {
				winner = winning[3];
				showWinner();
			} else if (winning[6] !== "empty" && winning[6] === winning[7] && winning[7] === winning[8]) {
				winner = winning[6];
				showWinner();
			} else if (winning[0] !== "empty" && winning[0] === winning[3] && winning[3] === winning[6]) {
				winner = winning[0];
				showWinner();
			} else if (winning[1] !== "empty" && winning[1] === winning[4] && winning[4] === winning[7]) {
				winner = winning[1];
				showWinner();
			} else if (winning[2] !== "empty" && winning[2] === winning[5] && winning[5] === winning[8]) {
				winner = winning[2];
				showWinner();
			} else if (winning[0] !== "empty" && winning[0] === winning[4] && winning[4] === winning[8]) {
				winner = winning[0];
				showWinner();
			} else if (winning[2] !== "empty" && winning[2] === winning[4] && winning[4] === winning[6]) {
				winner = winning[2];
				showWinner();
			} else if (winning.includes("empty") === false){
				winner = "Tie Game";
				showWinner();
			}
		console.log(winning);	
	};
	// Display appropriate winning screen based on who won, or if it was a tie.
	var showWinner = function() {
		if (winner === "player1") {
			$("#finish").removeClass("screen-win-two");
			$("#finish").removeClass("screen-win-tie");
			$(".message").html("Player 1 wins!");
			$("#finish").addClass("screen-win-one");
			$("#finish").show();
			$("#board").hide();
		} else if (winner === "player2") {
			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-tie");
			$(".message").html("Player 2 wins!");
			$("#finish").addClass("screen-win-two");
			$("#finish").show();
			$("#board").hide();
		} else if (winner === "Tie Game") {
			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-two");
			$(".message").html("It's a Tie!");
			$("#finish").addClass("screen-win-tie");
			$("#finish").show();
			$("#board").hide();
		}
	};
}());