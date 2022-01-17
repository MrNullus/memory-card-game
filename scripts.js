// Data Initial
const cardsImgs = [
	{
		id: "img1",
		dataFramework: "aurelia",
		url: "img/aurelia.svg",
		alt: "Aurelia"
	},
	{	
		id: "img2",
		dataFramework: "vue",
		url: "img/vue.svg",
		alt: "Vue"
		
	},
	{
		id: "img3",
		dataFramework: "angular",
		url: "img/angular.svg",
		alt: "Angular"
	},
	{
		id: "img4",
		dataFramework: "ember",
		url: "img/ember.svg",
		alt: "Ember"
	},
	{
		id: "img5", 
		dataFramework: "backbone",
		url: "img/backbone.svg",
		alt: "Backbone"
		
	},
	{
		id: "img6",
		dataFramework: "react",
		url: "img/react.svg",
		alt: "React"	
	}
];

let boardGame = document.querySelector(".memory-game");

function displayForCard() {
	let memoryCardElement = cardsImgs.map((card) => {
	    return `
	    	<!-- single card -->
	        <div class="memory-card" data-framework="${card.dataFramework}">
	            <img class="front-face" id="${card.id}" src="${card.url}" alt="${card.alt}" />
	            <img class="back-face" src="img/js-badge.svg" alt="JS Badge" />
	        </div>
	        <!-- single card -->
	        <div class="memory-card" data-framework="${card.dataFramework}">
	            <img class="front-face" id="${card.id}" src="${card.url}" alt="${card.alt}" />
	            <img class="back-face" src="img/js-badge.svg" alt="JS Badge" />
	        </div>

	    `;
	}).join(" ");

	boardGame.innerHTML = memoryCardElement;
	// console.log(memoryCardElement);
}


displayForCard()

const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Functions
function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
	    // first click
	    hasFlippedCard = true;
	    firstCard = this;

		return;
	}

	// second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

// Events
cards.forEach(card => card.addEventListener("click", flipCard));

