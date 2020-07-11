// random color generation

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

// Game start Commands


$(document).keypress(function () {
    if (!started) {


        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    if (started == true && level == 0) {
        $("#level-title").text("Press a Key to Start");
        started = false;
    };
})



//game pattern

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randN = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randN];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {


            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        wrongA();

    }

}





// user clicks


$(".btn").click(handler);

function handler() {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);



        makeSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
}


// Sound and Animate
// .
// .
// .
// .
// .
// .



function animatePress(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);

}

function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function wrongA() {

    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200)

    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}