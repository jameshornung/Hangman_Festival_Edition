//Global Variables
//==========================================================================
var wins = 0;
var losses = 0;

//tracks all played words to prevent duplicates in a session
var wordsPlayed = [];

// variables to be reset for new gameplay
var currentWord;
var currentWordArray = [];
var arrayOfDashes =[];
var remainingGuesses = 8;
var lettersGuessed = [];

// empty variables needing a global scope
var originalDisplay;
var updatedDisplay;
var letterGuessed;
var bandPic;
var bandBio;

//Audio
var notValid = document.getElementById('not-valid');
var wrongAnswer = document.getElementById('wrong-answer');
var correctAnswer = document.getElementById('correct-answer');
var winner = document.getElementById('victory');

//Functions
//==========================================================================

//selects a random word and assigns it to currentWord variable
function getRandomWord(){
	x = Math.floor(Math.random() * bands.length);
	currentWord = bands[x].name;
	currentWordArray = currentWord.split('');
	bandBio = bands[x].bio;
	bandPic = "<img id='band-pic' src='" + bands[x].image + "'>";

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

//inserts guessed letter into the display
function updateDisplay(letter){
	for(i=0;i<currentWordArray.length;i++){
		if(currentWordArray[i] === letter){
			arrayOfDashes.splice(i, 1, letter);
		}
	}
	updatedDisplay = arrayOfDashes.join('');
	$('#word-to-guess').html(updatedDisplay);
}

function startGame(){
	currentWord;
	currentWordArray = [];
	arrayOfDashes =[];
	remainingGuesses = 8;
	lettersGuessed = [];

	// var originalDisplay;
	var updatedDisplay;
	var letterGuessed;

	getRandomWord();
	$('#word-to-guess').html(originalDisplay);
	$('#instruction-text').html("Guess a Letter");
	$('#wins').html('Wins: ' + wins);
	$('#losses').html('Losses: ' + losses);
	$('#remaining-guesses').html('Guesses Remaining: ' + remainingGuesses);
	$('#letters-guessed').html('Letters Guessed: ' + lettersGuessed.join(' '));
}

//Sound Effects----------------------------------
function notValidEntry(){
	notValid.play();
}

function incorrectGuess(){
	wrongAnswer.play();
}

function correctGuess(){
	correctAnswer.play();
}

function youWin(){
	winner.play();
}

//GAMEPLAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

startGame();

document.onkeyup = function(e){
	var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();
	var validLetters = /^[A-Z]+$/;
	
	
	if(letterGuessed.match(validLetters)){
		if(lettersGuessed.includes(letterGuessed)){
			$('#instruction-text').html("You have already guessed that letter, try again.");
			notValidEntry();
		}
		else{
			lettersGuessed.push(letterGuessed);
			$('#instruction-text').html('Correct!!! Guess another letter.');
			$('#letters-guessed').html('Letters Guessed: ' + lettersGuessed.join(' '));

			if(currentWordArray.includes(letterGuessed)){
				updateDisplay(letterGuessed);
				correctGuess();
				if(updatedDisplay === currentWord){
					$('#band-bio').html(bandBio);
					$('#band-image').html(bandPic);
					youWin();
					wins++;
					$('#wins').html('Wins: ' + wins);
					$('#instruction-text').html("Congratulations! You Win!");
					setTimeout(startGame, 5000);
				}
			}
			else{
				incorrectGuess();
				$('#instruction-text').html('Incorrect guess.  Try again.');
				remainingGuesses--;
				$('#remaining-guesses').html('Guesses Remaining: ' + remainingGuesses);
				if(remainingGuesses === 0){
					losses++;
					$('#instruction-text').html('The correct answer was ' + currentWord);
					$('#losses').html('Losses: ' + losses);
					setTimeout(startGame, 5000);
				}
			}

		}
	}
	else{
		$('#instruction-text').html("Please Select a Valid Letter");
		notValidEntry();
	}
};






// getRandomWord();
// console.log(currentWord);
// displayAsDashes(currentWord);
// console.log(originalDisplay);
// updateDisplay('e');
// console.log(updatedDisplay);
