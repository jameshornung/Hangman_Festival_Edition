//Bands to be used in gameplay
var bands = [
{
	name: 'cage the elephant',
	image: '../images/cage.jpg',
	sound: 'examplepath',
	bio: 'text'
},
{
	name: 'willie nelson',
	image: '../images/findone.jpg',
	sound: 'examplepath',
	bio: 'text'
},
{
	name: 'nothing but thieves',
	image: 'findit',
	sound: 'findittoo',
	bio: 'text'
}];

//Global Variables
//==========================================================================
var wins = 0;
var losses = 0;
var currentWord;
var wordsPlayed = [];


//Functions
//==========================================================================

function getRandomWord(){
	x = Math.floor(Math.random() * bands.length);
	currentWord = bands[x].name;
	if(wordsPlayed.includes(currentWord)){
		getRandomWord();
	}
};

getRandomWord();
console.log(currentWord);