function sayHello(string){
  console.log("Why, hello there, " + string);
}


// user behaviors

// when I press the slider to the on position then I see
// buttons light up around the circle
// and audio chimes around the circle
// and count display shows 0
// and I can activate the buttons





// when I press a button then I see it light up and I hear a sound
var elRed = document.querySelector('.button-red');
var redSound ="./resources/audio/simonSound4.mp3";
var redAudio = new Audio(redSound);
elRed.addEventListener('mousedown', function() {
  redAudio.play();
});

var elGreen = document.querySelector('.button-green');
var greenSound ="./resources/audio/simonSound2.mp3";
var greenAudio = new Audio(greenSound);
elGreen.addEventListener('mousedown', function() {
  greenAudio.play();
});

var elBlue = document.querySelector('.button-blue');
var blueSound = "./resources/audio/simonSound1.mp3";
var blueAudio = new Audio(blueSound);
elBlue.addEventListener('mousedown', function() {
  blueAudio.play();
});

var elYellow = document.querySelector('.button-yellow');
var yellowSound = "./resources/audio/simonSound3.mp3";
var yellowAudio = new Audio(yellowSound);
elYellow.addEventListener('mousedown', function() {
  yellowAudio.play();
});


// computer behaviors
// when turn on
// when strict
// when start
