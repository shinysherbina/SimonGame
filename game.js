// Variable initialization
// -----------------------

var gameSequence = [];
var userSequence = [];
var colours =["green","red","yellow","blue"];
var level =1;
var gameOn = 0;
var tempCounter=0;

// Audio sounds for each colour
var greenAudio = new Audio("./sounds/green.mp3");
var redAudio = new Audio("./sounds/red.mp3");
var yellowAudio = new Audio("./sounds/yellow.mp3");
var blueAudio = new Audio("./sounds/blue.mp3");
var wrongAudio = new Audio("./sounds/wrong.mp3");

// Function to generate random number
// ----------------------------------

function generateRandomNumber(){
    return Math.floor((Math.random()*4)) ;
}

// Function to make the button blink when user selects it
// ------------------------------------------------------

function pressButton(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

// Function to make the background red when the game is over
// ---------------------------------------------------------

function gameOver(){
    $("body").addClass("game-over");
}

// Function to reset the game
// --------------------------

function resetGame(){
    gameSequence = [];
    userSequence = [];
    gameOn = 0;
    tempCounter=0;
    level =1;
    $("#level-title").text("Game over.Please press a key to start");
}

// Function to increase the level
// ------------------------------

function increaseLevel(){
    $("#level-title").text("Level "+level++);
}

// Function to add a gameSequence
// ------------------------------
function addGameSequence(){
    var randomNumber = generateRandomNumber();
    var currentColour = colours[randomNumber];
    gameSequence.push(currentColour);
    userSequence = [];

    eval (currentColour+"Audio.play()");
    $("#"+currentColour).fadeOut(100).fadeIn(100);
    increaseLevel();

}


// Get User Sequence and check if it is right (Event listener)
//-------------------------------------------------------------

$(".btn").on("click",function(){
    pressButton(this.id);
    userSequence.push(this.id);

    // play Audio at runtime
    eval (this.id+"Audio.play()");

    // Check if the userSequence is same as the gameSequence
    for (let i=0; i<userSequence.length; i++){
        if(gameSequence[i] != userSequence[i]){
            wrongAudio.play();
            gameOver();
            resetGame();
            break;
        }
    }

    // If the sequence is right add gameSequence
    if (userSequence.length == gameSequence.length && gameOn !=0){
        setTimeout(function(){
            addGameSequence();
        },500);
    }
});


// Start the game when a key is pressed (Event listener)
//------------------------------------------------------

$(document).keydown(function(){
    if (gameOn == 0){
        gameOn =1;
        $("body").removeClass("game-over");
        setTimeout(function(){
            addGameSequence();
        },500);
    }
});

if(document.documentElement.clientWidth < 900){
    console.log("Inside");
    $("#level-title").text("Click on the screen to start "+level++);
    $(document).on("click",function(){
        if (gameOn == 0){
            gameOn =1;
            $("body").removeClass("game-over");
            setTimeout(function(){
                addGameSequence();
            },500);
        }
    });
}
