$(document).on("keypress", startGame);

var colorList = ["green", "red", "yellow", "blue"];
var clickList = [];
var generatedList = [];
var level = 1;

function startGame() {
    level = 1;
    generatedList = [];

    $(".btn").on("click", function (event) {
        let eventColorClass = event.target.classList[1]

        makeSound(eventColorClass);

        buttonAnimation(eventColorClass);

        clickList.push("'" + jQuery.inArray(eventColorClass, colorList) + "'");

        checkAnswer();

    });

    newLevel();

    $(document).off("keypress");
}

function makeSound(key) {
    switch (key) {
        case "green":
            playSound(key);
            break;

        case "red":
            playSound(key);
            break;

        case "yellow":
            playSound(key);
            break;

        case "blue":
            playSound(key);
            break;

        default:
            alert("wrong key");
    }
}

function playSound(key) {
    var audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}

function buttonAnimation(key) {
    $("." + key).addClass("pressed");

    setTimeout(function () {
        $("." + key).removeClass("pressed");
    }, 100)
}

function newLevel() {
    $("h1").text("Level " + level);

    makeRandomColor();

    clickList = [];

    level++;
}

function makeRandomColor() {
    var randomNum = Math.floor(Math.random() * 4);

    var randomColorClass = colorList[randomNum];

    generatedList.push("'" + randomNum + "'");

    makeSound(randomColorClass);

    buttonAnimation(randomColorClass);

}

function checkAnswer() {
    if (clickList[clickList.length - 1] === generatedList[clickList.length - 1]) {
        if (clickList.length == generatedList.length) {
            setTimeout(newLevel, 1000);
        }
    } else {
        endGame();
    }
}

function endGame() {
    playSound("wrong");

    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);

    $(document).on("keypress", startGame);

    $(".btn").off("click");
}