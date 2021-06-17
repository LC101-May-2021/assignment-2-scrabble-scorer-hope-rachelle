// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(obj) {
  let letterPoints = {};
for (key in obj) {
  let eachLetter = obj[key];
  for (let i = 0; i<obj[key].length; i++) {
    letterPoints[eachLetter[i].toLowerCase()] = Number(key);
  }
}
return letterPoints;
}
let newPointStructure = transform(oldPointStructure);
console.log("letter a: ", newPointStructure.a);
console.log("letter q: ", newPointStructure.q);
console.log("letter z: ", newPointStructure.z);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word: ");
   return oldScrabbleScorer(word);
}
console.log(initialPrompt());

function simpleScore(word) {
let score = word.length;
return score;
}
//console.log(simpleScore("apple"));

function vowelBonusScore(word) {
  word = word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}
//console.log(vowelBonusScore("apple"));

function scrabbleScore(word){
 word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
}

const scoringAlgorithms = [
  {
    name: "Simple",
    description: "1 point per letter",
    scorerFunction: simpleScore(word)
  },
  {
    name: "VowelBonus",
    description: "consanants 1pt vowels 3pts",
    scorerFunction: vowelBonusScore(word)
  },
  {
    name: "Scrabble",
    description: "traditional",
    scorerFunction:scrabbleScore(word)
  }
];

function scorerPrompt() {
  let scoringOption = input.question(`Which scoring algorithm would you like to use?\n 0 - Simple: One point per letter\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Traditional scrabble point system\nEnter 0, 1, or 2: `);
  if (scoringOption == 0){
    console.log(`${scoringAlgorithms[0].name} Score for '${word}': ${scoringAlgorithms[0].scorerFunction}`)
  } else if (scoringOption == 1){
    console.log(`${scoringAlgorithms[1].name} Score for '${word}': ${scoringAlgorithms[1].scorerFunction}`)
  } else if (scoringOption == 2){
    console.log(`${scoringAlgorithms[2].name} Score for '${word}': \n${scoringAlgorithms[2].scorerFunction}`)
  }
  return scoringOption;
}



function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

