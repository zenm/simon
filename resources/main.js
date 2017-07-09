function sayHello(string){
  console.log("Why, hello there, " + string);
}

// locations of sounds
var redSoundLoc ="./resources/audio/simonSound2.mp3";
var greenSoundLoc ="./resources/audio/simonSound4.mp3";
var blueSoundLoc = "./resources/audio/simonSound1.mp3";
var yellowSoundLoc = "./resources/audio/simonSound3.mp3";
var redAudio = new Audio(redSoundLoc);
var greenAudio = new Audio(greenSoundLoc);
var blueAudio = new Audio(blueSoundLoc);
var yellowAudio = new Audio(yellowSoundLoc);
var listOfButtons = ['red', 'blue', 'yellow', 'green'];
var recordOfUserMoves = [];
var computersPattern = [];
var roundNumber = 0;

// methods used to play all sounds
var playSound = {
  red : function() {
    redAudio.play();
  },
  blue : function() {
    blueAudio.play();
  },
  yellow : function () {
    yellowAudio.play();
  },
  green : function () {
    greenAudio.play();
  }
}

// used to show intro sequence of buttons when player clicks on 'on'
var elOnOff = document.querySelector('.switch input[name=turn-on-off]');
elOnOff.addEventListener('change', function(){
  if (this.checked) {
    playIntro();
  } else {
    turnOffSimon();
  }
});

// turn color buttons on
function turnOnButton(stringColor) {
  if (stringColor == "red") {
    elRed.classList.add('button-red-on');
  } else if (stringColor == "blue") {
    elBlue.classList.add('button-blue-on');
  } else if (stringColor == "yellow") {
    elYellow.classList.add('button-yellow-on');
  } else if (stringColor == "green") {
    elGreen.classList.add('button-green-on');
  }
}

// turns button off
function turnOffButton(stringColor) {
  if (stringColor == "red") {
    elRed.classList.remove('button-red-on');
  } else if (stringColor == "blue") {
    elBlue.classList.remove('button-blue-on');
  } else if (stringColor == "yellow") {
    elYellow.classList.remove('button-yellow-on');
  } else if (stringColor == "green") {
    elGreen.classList.remove('button-green-on');
  }
}

// turn on button 'light' for .25 seconds, and plays sound
function introButtonTiming(stringColor) {
    window.setTimeout(function() {
      turnOnButton(stringColor);
      playSound[stringColor]();
    }, 0);
    window.setTimeout(function() {
      turnOffButton(stringColor);
    }, 250);
}

// turn on button 'light' for .75 seconds, and plays sound
function playButton(stringColor) {
  window.setTimeout(function() {
    turnOnButton(stringColor);
    playSound[stringColor]();
  }, 0);
  window.setTimeout(function() {
    turnOffButton(stringColor);
  }, 1000);
}

// used to show what the game will look like when button is off.
function turnOffSimon(){
  setRoundCount("--");
  // disable colored buttons
}

// used to get and set the round count
var elRoundNumber = document.querySelector('.count-display').children[0];
function getRoundCount() {
  return elRoundNumber.textContent;
}

function setRoundCount(string) {
  return elRoundNumber.textContent = string;
}

function incrementRoundCount() {
  var roundCount = parseFloat(getRoundCount());
  roundCount++;
  roundNumber = roundCount;
  return setRoundCount(roundCount);
}

function playIntro() {
  var time = 0;
  for (var i = 0; i < listOfButtons.length; i++) {
    doIntroSetTimeOut(i, time);
    time += 250;
  }
  // set round count after a 1.1 second delay
  window.setTimeout(function(){
    setRoundCount(0);
  }, 1100);
}

// used to show that player has turned on the machine
function doIntroSetTimeOut(i, time){
  window.setTimeout(function() {
  introButtonTiming(listOfButtons[i]);
  }, time);
}

// used to add listners on each of the buttons to play a sound
var elRed = document.querySelector('.button-red');
elRed.addEventListener('mousedown', function() {
  playSound.red();
  capturePlayerMoves(this.id);
  doesUsersMoveMatch(computersPattern, getRoundCount());
});

var elGreen = document.querySelector('.button-green');
elGreen.addEventListener('mousedown', function() {
  playSound.green();
  capturePlayerMoves(this.id);
  doesUsersMoveMatch(computersPattern, getRoundCount());
});

var elBlue = document.querySelector('.button-blue');
elBlue.addEventListener('mousedown', function() {
  playSound.blue();
  capturePlayerMoves(this.id);
  doesUsersMoveMatch(computersPattern, getRoundCount());
});

var elYellow = document.querySelector('.button-yellow');
elYellow.addEventListener('mousedown', function() {
  playSound.yellow();
  capturePlayerMoves(this.id);
  doesUsersMoveMatch(computersPattern, getRoundCount());
});


elStart = document.querySelector('.start button');
elStart.addEventListener('click', function() {
  if (elOnOff.checked) {
  resetComputerPattern();
  resetPlayerMoves();
  setRoundCount("0");
  setComputerPattern(listOfButtons);
  // capture record of user buttons
  // round count turns to 1
  incrementRoundCount();
  // when I get the sequence right, then the round count increases, and I play the computer sequence
  playComputerSequence(computersPattern, getRoundCount());
  // 'light up the first of the buttons'
  sayHello("start hello");
  } // otherwise do nothing
});

// string - either yellow green blue or red
function capturePlayerMoves(string) {
  return recordOfUserMoves.push(string);
}

function showPlayerMoves() {
  return recordOfUserMoves;
}

function resetPlayerMoves() {
  return recordOfUserMoves = [];
}

// returns an arra of 20 random items.
function setComputerPattern (array){
  for (var i = 0; i < 20; i++) {
    var randomNum0to3 = Math.floor(Math.random()*4);
    computersPattern.push(array[randomNum0to3]);
  }
  return computersPattern;
}

function resetComputerPattern() {
  return computersPattern = [];
}

// used to play the computers moves on the board
function playComputerSequence (movesArray, roundCount) {
  var currentRound = parseFloat(roundCount);
  var currentArray = movesArray.slice(0, currentRound);
  var time = 500;
  for (var i = 0; i < currentArray.length; i++) {
    doComputerTimeOut(i, time);
    time+= 1250;
  }
}

function doComputerTimeOut (i, time){
  window.setTimeout(function() {
    playButton(computersPattern[i]);
  }, time);
}

function doesUsersMoveMatch(movesArray, roundCount) {
  var currentRound = parseFloat(roundCount);
  var computerCurrentArray = movesArray.slice(0, currentRound);
  var comparisonIndex = showPlayerMoves().length - 1;
  console.log(computerCurrentArray);
  console.log(computerCurrentArray[comparisonIndex]);
  console.log(recordOfUserMoves[comparisonIndex]);
  if (computerCurrentArray[comparisonIndex] == recordOfUserMoves[comparisonIndex]) {
    if (recordOfUserMoves.length == computerCurrentArray.length) {
      incrementRoundCount();
      resetPlayerMoves();
      playComputerSequence(computersPattern, getRoundCount());
    } else {
      sayHello("keep going");
    }

  } else {
    // showError
    // playback correct button for 1.5 seconds
    // playback sequence
    showError();
    sayHello("not the right move");
  }
}
// doesUsersMoveMatch(computersPattern, getRoundCount());




function showError () {
  setRoundCount("!!");
}
