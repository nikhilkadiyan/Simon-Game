
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started=false;
//to keep track of levels
var level=0;

// detect when a keybord is pressed
$(document).keydown(function(){
    if(!started){
        //change the level title
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }

});

//code to detect the click on the button
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//function to check Answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }


}

// code to genereate a random no
function nextSequence(){
    userClickedPattern=[];
    //increase level
    level++;
    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
// code to play sound
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
//function to animate press
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}




