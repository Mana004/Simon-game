var gamePattern = [];
var userClickedPattern=[];
var level =0;
var started= false;

var buttonColours=["red", "blue", "green", "yellow" ];

$(document).on("keypress", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", handleClick);

function handleClick(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    
    checkAnswer(userClickedPattern.length-1);
    

}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }



}

function nextSequence(){

    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate({ opacity: 0.3 }, 200)
    .animate({ opacity: 1 }, 200)
    .animate({ opacity: 0.3 }, 200)
    .animate({ opacity: 1 }, 200);

    playSound(randomChosenColour);

}


function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }















