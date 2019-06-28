

// Variables

let card = document.querySelectorAll(".card");
let cards = [...card];
const stars = document.querySelectorAll(".fa-star");
let moves = document.querySelector(".moves");
const time = document.querySelector(".timer");
let deck = document.querySelector(".deck");
let count = 0;
let seconds = 00; minutes = 00; hours = 0;
let openCards = deck.querySelectorAll(".open");
let matchCards = document.getElementsByClassName("match");
let startNow;
let modal = document.getElementById("themodal");
let modalMessage = document.querySelector(".message");

// Shuffle function from http://stackoverflow.com/a/2450976

shuffle(cards);
cards.forEach(function(elem) {
    deck.append(elem);
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Run the Game!!!

clickedCard();
modalWindow();

// Listeners

function clickedCard() {
    for (let i = 0; i < cards.length; i++) {
    	cards[i].classList.remove("open", "show", "match", "unmatch");
        cards[i].addEventListener("click", function() {
            cards[i].classList.add("open", "show");
            openCards = deck.querySelectorAll(".open");
            for (let i = 0; i < openCards.length; i++) {
				if (openCards.length > 1) {
					startMoves();
	            	openCards[i].classList.remove("open");
		            if (openCards[0].type === openCards[1].type) {
		            	match();
	            	} else {
	            		unmatch();
	            	}
	            }
        	}
        });
        cards[i].addEventListener("click", modalWindow);
    }
};

// If cards match
function match() {
	openCards[0].classList.add("match", "disable");
	openCards[1].classList.add("match", "disable");
};

// If cards not match
function unmatch() {
	openCards[0].classList.add("unmatch");
	openCards[1].classList.add("unmatch");
	disable();
	setTimeout(function() {
		openCards[0].classList.remove("show", "unmatch");
		openCards[1].classList.remove("show", "unmatch");
		enable();
	}, 1200);
};

// Disable cards
function disable() {
    cards.forEach(function(card) {
    	card.classList.add("disable");
    });
};

// Enable cards and Disable cards that don´t match
function enable() {
	cards.forEach(function(card) {
		card.classList.remove("disable");
		for (let i = 0; i < matchCards.length; i++) {
			matchCards[i].classList.add("disable");
		}
	});
};

// Every 2 cards selected adjust the movement(increment the move counter and display it on the page)
function startMoves() {
	count = count + 1/2;
	moves.innerHTML = count;
	startTimer();
	// Adjusting stars depending on moves
	if (moves.innerHTML > 14 && moves.innerHTML <= 18) {
		stars[2].style.visibility = "hidden";
	} else if (moves.innerHTML > 18) {
		stars[1].style.visibility = "hidden";
	}
};

// The time begins once the first movement is made (selection 2 cards)
function startTimer() {
	if (moves.innerHTML == 1) {
		startNow = setInterval(function () {
			time.innerHTML = minutes + " Min(s) " + seconds + " Sec(s)";
			seconds++;
			if (seconds == 60) {
				seconds = 0;
				minutes++;
			} else if (minutes == 60) {
				minutes = 0;
				hours++;
			}
		}, 800);
	}
};

// A congratulatory message modal appears once the game is completed
function modalWindow() {
	if (matchCards.length == 16) {
		clearInterval(startNow);
		finalTime = time.innerHTML;
		// Showing the modal
		theModal.classList.add("show");
        //Declare StarRating variable
        const starRating = document.querySelector(".stars").innerHTML;
        //Declare moves
        moves = moves.innerHTML;
        //Showing move, rating, time on modal
        document.getElementById("finalMoves").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;
        document.getElementById("starRating").innerHTML = starRating;
     }
};

// Play Again function
function playAgain() {
    theModal.classList.remove("show");
	// Shuffle the cards 
	shuffle(cards);
    // Remove all classes
    for (let i = 0; i < cards.length; i++) {
    	cards.forEach.call(cards, function(item) {
    		deck.appendChild(item);
    	});
    	cards[i].classList.remove("show", "open", "match", "unmatch", "disable");
    };
    // Reset moves
    count = 0;
    moves.innerHTML = count;
    // Reset Start Rating
    for (let i= 0; i < stars.length; i++) {
    	stars[i].style.color = "#FFD700";
    	stars[i].style.visibility = "visible";
	};
	// Reset the Time
	seconds = 0;
	minutes = 0;
	hours = 0;
	time.innerHTML = "0 Min(s) 0 Sec(s)"
	clearInterval(startNow);
	window.location.reload(false);
}

