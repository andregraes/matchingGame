/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", 
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-cube",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bomb",
];

// querySelectors area

var cardsContainer = document.querySelector('.deck');
var starsContainer = document.querySelector(".stars");
var qMoves = document.querySelector(".moves");
var qTimer = document.querySelector(".timer");
var qModalContainer = document.querySelector(".container-mymodal");
var qSpanTime = document.querySelector(".modal-span-time");
var qSpanStars = document.querySelector(".modal-span-stars");
var qPlayAgainBtn = document.querySelector(".playAgainBtn");
var qRestart = document.querySelector(".restart");

// variables area

var openedCards = [];
var matchedCards = [];
var starsStr = '<li><i class="fa fa-star"></i></li>';
var seconds = 0;
var moves = 0;
var firstCard; var secondCard;
var myTimer = null;

var playAgain = function () {
	init();
}

var cancelBtn = function() {
  qModalContainer.classList.add("myhidden")
}

var reloadBtn = function () {
	init()
}

// end of variables area

// functions area

function init(){
	reStart()
}

// it restarts all arrays, html elements and main variables to the inicial status (empty or zero)
function reStart() {
	clearInterval(myTimer); 
	openedCards = [];
 	matchedCards = [];
 	seconds = 0;
 	moves = 0;
 	myTimer = setInterval(timer, 1000);
  	cardsList = shuffle(icons.concat(icons));
	qMoves.innerHTML = moves;
 	qTimer.innerHTML = seconds;
 	cardsContainer.innerHTML = "";
 	starsContainer.innerHTML = starsStr + starsStr + starsStr;
 	qModalContainer.classList.add("myhidden");

// creates the deck 	
    
  	for (var i = 0; i < cardsList.length; i++) {
 		const card = document.createElement('li');
 		card.classList.add("card");
 		card.innerHTML = '<i class="' + cardsList[i] + '"></i>';
 		cardsContainer.appendChild(card);
 	
 		click(card);
  	}
}

function click(card) {

 	card.addEventListener("click", function() {
    	
	  	firstCard = openedCards[0];
 		secondCard = this;

 		if (openedCards.length === 1) {
 			card.classList.add("show", "open");
 			openedCards.push(this);
 			disable();

 			if (firstCard.innerHTML === secondCard.innerHTML) { //check if the first and second cards matches
 				
 				firstCard.classList.add('match', 'disable');
 				secondCard.classList.add('match', 'disable');
 				openedCards = [];
 				matchedCards.push(firstCard, secondCard);
 				console.log("match");
 				disable(); //a function that add/remove the "pointer-events:none" property from the classes list of the html element
 				
 			} else {
 				
 				setTimeout(function() { 
 					firstCard.classList.remove("show", "open");
	 				secondCard.classList.remove("show", "open");
	 				openedCards = [];
	 				console.log("no match");
	 				disable();
 				}, 500)
 			}

 			addMove(); //add one move each two cards fliped
 			rating(); //check the score os stars
 			endGame(); //check array.length. Game Over??


 		} else {
 			card.classList.add("show", "open");
 			openedCards.push(secondCard);

 		}
 	});
}

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

function addMove() {
	moves++;
	qMoves.innerHTML = moves;
}

function rating() {
	if ( 10 < moves && moves <= 15) {
		starsContainer.innerHTML = starsStr + starsStr;
	} else if (moves >= 16) {
		starsContainer.innerHTML = starsStr;
	} 
}

function timer() {
	seconds++;
	qTimer.innerHTML = seconds;
	
}

function endGame() {
	if (matchedCards.length === 16) {
    qModalContainer.classList.remove("myhidden");
		qSpanTime.innerHTML = seconds;
		qSpanStars.innerHTML = starsContainer.innerHTML;
		clearInterval(myTimer);
    qPLayAgainBtn.addEventListener("click", playAgain)
   }
}

function reload() {
	qRestart.addEventListener("click", reloadBtn)
}

function disable() {
	cardsContainer.classList.toggle("disable");	
}

init();


