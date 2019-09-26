$(document).ready(function () {

var triviaDatabase = [
    {
        question: "A is right",
        answers: [
            "first answer",
            "second answer",
            "third answer"
        ],
        correctAnswer: "0",
    },
    {
        question: "C is right",
        answers: [
            "first answer",
            "second answer",
            "third answer"
        ],
        correctAnswer: "2",
    },
    {
        question: "B is right",
        answers: [
            "first answer",
            "second answer",
            "third answer"
        ],
        correctAnswer: "1",
    },
    {
        question: "C is right",
        answers: [
            "first answer",
            "second answer",
            "third answer"
        ],
        correctAnswer: "2",
    },
    {
        question: "B is right",
        answers: [
            "first answer",
            "second answer",
            "third answer"
        ],
        correctAnswer: "1",
    }
]

var right = 0; //need to reset this after the result is presented //tried to only create it inside the function and it didn't work
var wrong = 0;
var time = 20; //maybe I have to reset it somewhere?
var intervalId;
var clockRunning = false;

var questionCount = 0; // replaces 'i' in for loops that no longer exist // maybe shouldn't go in ID's

//creating the html for the trivia
function generateHtml(){
    // run();
    $("#allQuestions").html('');//clear it for every question
    $("#score").html("");//this can go somewhere else to not run for every question
    // for(i=0; i<triviaDatabase.length; i++){ //not doing all of them at once, redo this
    //if(questionCount<triviaDatabase.length){//maybe do this check on the submit button
        var newQuestion = $("<h4>").append(triviaDatabase[questionCount].question);
        $("#allQuestions").append(newQuestion);
        var newAnswer = $('<div id=question' + questionCount + '>');

        for(j=0; j<3; j++){//replace 3 by a variable down the line
            
            newAnswer.append('<input type=radio name=answer' + questionCount + ' value=' + j + '>' + triviaDatabase[questionCount].answers[j]);
            console.log(triviaDatabase[questionCount].answers[j]);
            
            $("#allQuestions").append(newAnswer);
        }

        console.log(newQuestion);

        // questionCount++;

        console.log("questionCount genHtml: " + questionCount);

        //questionCount++; //maybe do that on submit too
    //}else{ //maybe do an end condition here. maybe it fits better somewhere else

    //}
    // }
}

//check if user answers are right
//calculateScore might be split on a count of right answers and a display of the final count
function calculateScore (){
    // for(i=0; i<triviaDatabase.length; i++){ // don't think I need that with only one question at a time
        var userAnswer = $('#question' + questionCount).children("input:checked").val();
        console.log("userAnswer: " + userAnswer);
        console.log("trivia[questionCount].answer: " + triviaDatabase[questionCount].correctAnswer);
        if(userAnswer === triviaDatabase[questionCount].correctAnswer){//could add .wrongAnswer to the triviaDatabase array to tell which ones were left in blank, don't think it's worth it
            right++;
            console.log("right: " + right);
        }else{
            wrong++;
        }
        console.log("questionCount calcScore: " + questionCount);
    // }
}

function finalScore(){
    $("#score").append('<p> You got ' + right + ' right answers! </p>')
    $("#score").append('<p> You got ' + wrong + ' wrong answers! </p>')
    right = 0;
    wrong = 0;
}

function run() {
    time = 20;//reset time every run
    if (!clockRunning) {// prevents multiple instances of the clock running at the same time
        clockRunning = true;
        $("#timeLeft").html("20");
        intervalId = setInterval(decrement, 1000);
    }
}

function decrement() {
    time--;
    $("#timeLeft").html(time);

    if (time === 0) {
        stop();
        finalScore();
    }
}

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
}

//start and submit buttons are going to bug out if pressed at the wrong time. need to hide them somehow

//start. set for timer now. might have to call function that makes the html trivia
$("#start").on("click", function () {//make a reset function and call it here? use a boolean to check? rename it between start/restart?
    $("#allQuestions").html("");
    generateHtml();
    //$("#submit").html('<button id=submitButton>Submit</button>'); //not working for some reason
    run(); // call run() from generateHtml?
});

// make a function to check and count "right" and just call it with .click
$("#submitButton").on("click", function () {
    stop();
    calculateScore(); //this should just update 'right' and 'wrong'
    if(questionCount < triviaDatabase.length-1){//do the check // was === at first
        run(); //so questions keep coming // call run from generateHtml?
        questionCount++; //moved to the generateHtml function // and then moved back
        generateHtml(); // update the question
    }else{
        finalScore(); //this should display the finalscore
    }

});

});

//got the base code to work as expected, need to add a restart option (probably reset everything on start button) and
//fix unwanted button behavior (submit working before first question is presented. add boolean?)
