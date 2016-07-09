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


//Functions
//==========================================================================


//selects a random word and assigns it to the global currentWord variable
function getRandomWord(){
	x = Math.floor(Math.random() * bands.length);
	currentWord = bands[x].name;
	currentWordArray = currentWord.split('')
	if(wordsPlayed.includes(currentWord)){
		getRandomWord();
	}
};

//takes a word and replaces all the letters with dashes and stores in the originalDispaly variable
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

function updateDisplay(letter){
	for(i=0;i<currentWordArray.length;i++){
		if(currentWordArray[i] === letter){
			arrayOfDashes.splice(i, 1, letter);
		}
	}
	updatedDisplay = arrayOfDashes.join('');
}

getRandomWord();
console.log(currentWord);
displayAsDashes(currentWord);
console.log(originalDisplay);
updateDisplay('e');
console.log(updatedDisplay);
