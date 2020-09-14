var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

function nextSequence() {
    level++;
    $('h1').text("level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var colorIndex = randomNumber;
    var randomChosenColor = buttonColors[colorIndex];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); // this.id is also valid
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(userChosenColor);
    // console.log(buttonClickedAudio);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    var buttonGenerateAudio = new Audio("sounds/" + name + ".mp3");
    buttonGenerateAudio.play();
    // console.log(buttonGenerateAudio);
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(document).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
        $('h1').text("level " + level);
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            // console.log("success");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $('h1').text("Game Over - Press ANY button to start");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
