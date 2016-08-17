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
var bandPic;
var bandBio;

var notValid = document.getElementById('not-valid');
var wrongAnswer = document.getElementById('wrong-answer');
var correctAnswer = document.getElementById('correct-answer');
var winner = document.getElementById('victory');

$('#band-image').html(bandPic);

//Functions
//==========================================================================
function restartGame(){
	currentWord;
	currentWordArray = [];
	arrayOfDashes =[];
	originalDisplay;
	updatedDisplay;
	remainingGuesses = 8;
	lettersGuessed = [];
	letterGuessed;

	getRandomWord();
	$('#word-to-guess').html(originalDisplay);
	$('#instruction-text').html("Guess a Letter");
	$('#wins').html('Wins: ' + wins);
	$('#losses').html('Losses: ' + losses);
	$('#remaining-guesses').html('Guesses Remaining: ' + remainingGuesses);
	$('#letters-guessed').html('Letters Guessed: ' + lettersGuessed.join(' '));
}

//selects a random word and assigns it to the global currentWord variable
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

//update the display to show actual letter for letters guessed and dashes for letters remaining
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
					restartGame();
					wins++;
					$('#wins').html('Wins: ' + wins);
				}
			}
			else{
				incorrectGuess();
				$('#instruction-text').html('Incorrect guess.  Try again.');
				remainingGuesses--;
				$('#remaining-guesses').html('Guesses Remaining: ' + remainingGuesses);
				if(remainingGuesses === 0){
					losses++;
					restartGame();
					$('#losses').html('Losses: ' + losses);
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
