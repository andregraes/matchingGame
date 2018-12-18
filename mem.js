/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardsContainer = document.querySelector('.deck');

var openedCards = [];
var matchedCards = [];


var starsContainer = document.querySelector(".stars");
starsStr = '<li><i class="fa fa-star"></i></li>';

init();

function init(){
	reStart()
}

function reStart() {
	//debugger;
 	openedCards = [];
 	matchedCards = [];
 	seconds = 0;
 	moves = 0;
 	shuffle(icons);
	document.querySelector(".moves").innerHTML = 0;
 	document.querySelector(".timer").innerHTML = 0;
 	cardsContainer.innerHTML = "";
 	starsContainer.innerHTML = starsStr + starsStr + starsStr;
 	document.querySelector(".container-mymodal").classList.toggle("myhidden");
 	for (var i = 0; i < icons.length; i++) {
 		const card = document.createElement('li');
 		card.classList.add("card");
 	card.innerHTML = '<i class="' + icons[i] + '"></i>';
 	cardsContainer.appendChild(card);
 	
 	click(card);
 	}
 	
 	timer();
}

function click(card) {

 	card.addEventListener("click", function() {
 		
		var firstCard = openedCards[0];
 		var secondCard = this;

 		if (openedCards.length === 1) {
 			card.classList.add("show", "open");
 			openedCards.push(this);
 			

 			if (firstCard.innerHTML === secondCard.innerHTML) {
 				
 				firstCard.classList.add('match', 'disable');
 				secondCard.classList.add('match', 'disable');
 				openedCards = [];
 				matchedCards.push(firstCard, secondCard);
 				console.log("match");
 				
 			} else {
 				
 				setTimeout(function() { 

	 				firstCard.classList.remove("show", "open");
	 				secondCard.classList.remove("show", "open");
	 				openedCards = [];
	 				console.log("no match");

 				}, 500)
 			}
 			addMove();
 			rating();
 			endGame();
 			

 		} else {
 			card.classList.add("show", "open");
 			openedCards.push(secondCard);
 		}


 	});
 }
//}


// Shuffle function from http://stackoverflow.com/a/2450976
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
}

var movesContainer = document.querySelector(".moves");
var moves = 0;
function addMove() {
	moves++;
	movesContainer.innerHTML = moves;
}

function rating() {
	if ( 10 < moves && moves <= 15) {
		starsContainer.innerHTML = starsStr + starsStr;
	} else if (moves >= 16) {
		starsContainer.innerHTML = starsStr;
	} 
}

var myTimer = setInterval(timer, 1000);
var seconds = 0;

function timer() {
	document.querySelector(".timer").innerHTML = seconds;
	seconds++;
}

function endGame() {
	if (matchedCards.length === 2) {
		clearInterval(myTimer);
		//alert("GAME OVER\n" + moves + " moves and " + seconds + " seconds!\n" + "WELL DONE!!" );
		var victory = document.querySelector(".container-mymodal");
		victory.classList.toggle("myhidden");
		document.querySelector(".modal-span-time").innerHTML = seconds - 1;
		document.querySelector(".modal-span-stars").innerHTML = starsContainer.innerHTML;
	}
}

const playAgainBtn = document.querySelector(".playAgainBtn");
playAgainBtn.addEventListener("click", init());

const cancelBtn = document.querySelector(".cancelBtn");
cancelBtn.addEventListener("click", () => {
	document.querySelector(".container-mymodal").classList.toggle("myhidden");
});







/*
 * set up the event listener for a card. If a card is clicked:
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */