
var buttonColors = ["red","green","blue","yellow"];
var gameSequence=[];
var userClickedColors=[];
var start=false;
var level=0;
function nextSequence(){
   userClickedColors=[];
    level++;
    $("h1").text("level "+level);
var randomNumber=Math.floor(Math.random()*4);
var randomColor=buttonColors[randomNumber];
gameSequence.push(randomColor);
$("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playAudio(randomColor);
}


//on key click
$(document).on("keydown",function(){
    if(!start){
        nextSequence();
    }
     start=true;
     
});
//on button click
$(".btn").on("click",function(){
    var color= $("#"+this.id);

    color.addClass("pressed");
 
    setTimeout(function(){
        color.removeClass("pressed");
    },100);

userClickedColors.push(this.id);
playAudio(this.id);
checkCorrect(userClickedColors.length-1);

});

function checkCorrect(currentLevel){
    if(gameSequence[currentLevel]===userClickedColors[currentLevel]){
        if(gameSequence.length===userClickedColors.length){
            setTimeout(function(){
                    nextSequence();
            },100);

        }
        

    }
    else{
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100)
        $("h1").text("Game Over, Press Any Key to Restart ")
        startOver();
    }
}
function startOver(){
    level = 0;
    start=false;
    gameSequence=[];
}
function playAudio(audio){
    new Audio("sounds/"+audio+".mp3").play();
}