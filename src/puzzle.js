// Level 1-10: Numbers
// Level 20-30: Equations
// Level 30-40: Alphabets

// Speed: modulo of 10
// Increasing, decreasing, increasing or decreasing(rand)
// Return array of numbers, type, speed and increasing/decreasing

var _ = require("./underscore-min");

var level_types = {
  1: "numbers",
  2: "equations",
  3: "alphabet"
},
variation = {
  1: "increasing",
  2: "decreasing"
},
equation = {
  1: "+",
  2: "-"
},
praise = [
 "Good going",
 "Awesome",
 "Fantastic",
 "Good job",
 "Bravo",
 "You are killing it"
],
lose = [
  "Oh no",
  "Hmmm, nah!",
  "Who taught you!",
  "Seriously?",
  "You suck"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPuzzle(level) {

  var l = Math.ceil(level/10),
    type = level_types[l],
    speed = (level < 10)? level: (level % 10) + 1,
    puzzle = [];
    possible = "abcdefghijklmnopqrstuvwxyz";
 
  switch(type) {
    case "numbers":
      _.times(4, function() {
        puzzle.push(getRandomInt(1,10));
      });
      break;
    case "equations":
      _.times(4, function() {
        puzzle.push([getRandomInt(1,10), equation[getRandomInt(1, _.size(equation))], getRandomInt(1,10)]);
      });
      break;
    case "alphabet":
      _.times(4, function() {
        puzzle.push(possible.charAt(getRandomInt(0, _.size(possible))));
      });
      break;
    }

    return {
      speed: speed,
      variation: variation[getRandomInt(1, _.size(variation))],
      type: type,
      puzzle: puzzle
    }
}

function verifyPuzzle(alexa_input, user_input) {
  var ans;

  switch(alexa_input.type) {
    case "numbers":
    case "alphabet": 
      ans = alexa_input.puzzle.sort();
     case "equations":
      check(ans, user_input);
     /*
       _.each(alexa_input.puzzle, function(val) {
         _.each(val, function(v) {
           if(v === "+") {
             sum = true;
           }
           if(v === "-") {
             subtract = true;
           }
         });
         sum = subtract = false;
         if
       });
       */
     break;
   }
   if(alexa_input.variation === "decreasing") {
     ans.reverse();
   }
   return check(ans, user_input);
}

function check(ans, user_input) {
  //console.log(ans, user_input);
  if (_.isEqual(ans, user_input)) {
    return {
      "speak": praise[getRandomInt(0, praise.length - 1)],
      "correct": true
     };
   } else {
     return {
       "speak": lose[getRandomInt(0, lose.length - 1)],
       "correct": false
     };
   }
}

/*
console.log(verifyPuzzle({ speed: 2,
 variation: 'decreasing',
  type: 'alphabet',
   puzzle: [ 'n', 'e', 'y', 'q' ] }, ['y', 'q', 'n', 'e']));

console.log(verifyPuzzle(
  { speed: 2,
    variation: 'increasing',
    type: 'equations',
    puzzle: [ [ 5, '+', 1 ], [ 9, '-', 5 ], [ 5, '-', 4 ], [ 8, '+', 9 ] ] }),
    [6, 4, 1, 17]);
    */
