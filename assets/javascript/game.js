//Global Variables
//==========================================================================
var wins = 0;
var losses = 0;
var currentWord;
var currentWordArray = [];
var arrayOfDashes =[];
var originalDisplay;
var updatedDisplay;
var wordsPlayed = [];
var remainingGuesses = 8;
var lettersGuessed = [];
var letterGuessed;

//Functions
//==========================================================================


//selects a random word and assigns it to the global currentWord variable
function getRandomWord(){
	x = Math.floor(Math.random() * bands.length);
	currentWord = bands[x].name;
	currentWordArray = currentWord.split('');
	if(wordsPlayed.includes(currentWord)){
		getRandomWord();
	}
	else{
		displayAsDashes(currentWord)
	}
	wordsPlayed.push(currentWord);
};

//takes a word and replaces all the letters with dashes and stores in the originalDisplay variable
function displayAsDashes(word){
	for(i=0;i<currentWordArray.length;i++){
		if(currentWordArray[i] === ' '){
			x = ' ',
			arrayOfDashes.push(x);
		}
		else{
			x = '-'
			arrayOfDashes.push(x);
		}
		originalDisplay = arrayOfDashes.join('');
		
	}
};

//update the display to show actual letter for letters guessed and dashes for letters remaining
function updateDisplay(letter){
	for(i=0;i<currentWordArray.length;i++){
		if(currentWordArray[i] === letter){
			arrayOfDashes.splice(i, 1, letter);
		}
	}
	updatedDisplay = arrayOfDashes.join('');
	$('#array-box').html(updatedDisplay);
}

function startGame(){
	getRandomWord();
	$('#array-box').html(originalDisplay);
	$('#start-text').html("Guess a Letter");
	$('#wins').html('Wins: ' + wins);
	$('#losses').html('Losses: ' + losses);
	$('#remaining-guesses').html('Guesses Remaining: ' + remainingGuesses);
	$('#letters-guessed-box').html('Letters Guessed: ' + lettersGuessed.join(' '));
}


startGame();

document.onkeyup = function(e){
	var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();
	var validLetters = /^[A-Z]+$/;
	
	
	if(letterGuessed.match(validLetters)){
		if(lettersGuessed.includes(letterGuessed)){
			$('#start-text').html("You have already guessed that letter, try again.");
		}
		else{
			lettersGuessed.push(letterGuessed);
			$('#letters-guessed-box').html('Letters Guessed: ' + lettersGuessed.join(' '));

			if(currentWordArray.includes(letterGuessed)){
				updateDisplay(letterGuessed);
				if(updatedDisplay === currentWord){
					alert('you win!')
					wins++;
					$('#wins').html('Wins: ' + wins);
				}
			}
			else{
				remainingGuesses--;
				$('#remaining-guesses').html('Guesses Remaining: ' + remainingGuesses);
				if(remainingGuesses === 0){
					losses++;
					alert('you lose');
					$('#losses').html('Losses: ' + losses);
				}
			}

		}
	}
	else{
		$('#start-text').html("Please Select a Valid Letter");
	}
};






// getRandomWord();
// console.log(currentWord);
// displayAsDashes(currentWord);
// console.log(originalDisplay);
// updateDisplay('e');
// console.log(updatedDisplay);
