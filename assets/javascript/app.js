$(document).ready(function () {

    var triviaDatabase = [
        {
            question: "Who is the strongest green hero?",
            answers: [
                "Shrek",
                "Hulk",
                "Green Lantern"
            ],
            correctAnswer: "0",
        },
        {
            question: "When asking for a favor, which phrasing should be used?",
            answers: [
                "Could you please?",
                "Do you mind?",
                "Would you kindly?"
            ],
            correctAnswer: "2",
        },
        {
            question: "What is the property of a Poring?",
            answers: [
                "Fire",
                "Water",
                "Wind"
            ],
            correctAnswer: "1",
        },
        {
            question: "Who is the Rickest Rick?",
            answers: [
                "J-22",
                "D-716",
                "C-137"
            ],
            correctAnswer: "2",
        },
        {
            question: "Fish are ___",
            answers: [
                "Food",
                "Friends",
                "Holograms"
            ],
            correctAnswer: "1",
        }
    ];

    var unanswered = 0;
    var right = 0;
    var wrong = 0;
    var time;
    var intervalId;
    var clockRunning = false;
    var questionCount = 0; // replaces 'i' in for loops that no longer exist // maybe shouldn't go in ID's

    function reset(){
        questionCount = 0;
        unanswered = 0;
        wrong = 0;
        right = 0;
        $("#allQuestions").html('');
        $("#score").html('');
        $("#timeLeft").html('');
    }

    function generateHtml() {
        $("#score").html('');
        var newQuestion = $("<h2>").append(triviaDatabase[questionCount].question);
        $("#allQuestions").html(newQuestion);
        var newAnswer = $('<div class=answerOption id=question' + questionCount + '>');

        for (j = 0; j < triviaDatabase[questionCount].answers.length; j++) {
            newAnswer.append('<input type=radio name=answer' + questionCount + ' value=' + j + '>' + triviaDatabase[questionCount].answers[j]);
            $("#allQuestions").append(newAnswer);
        }

        $("#instruction").html('Select the right answer and click Submit');

    }

    function calculateScore() {
        var userAnswer = $('#question' + questionCount).children("input:checked").val();
        if (userAnswer === triviaDatabase[questionCount].correctAnswer) {
            right++;
            $("#score").html('<h4>Correct answer!</h4>');
            runAnswer();
        }else if (typeof userAnswer === 'undefined') {
            unanswered++;
            $("#score").html('<h4>No answer selected</h4>');
            runAnswer();
        } else {
            wrong++;
            $("#score").html('<h4>Wrong answer!</h4>');
            runAnswer();
        }
        $("#allQuestions").html('');
    }

    function finalScore() {
        $("#score").html('');
        $("#score").append('<h4> You got ' + right + ' right answers!</h4>');
        $("#score").append('<h4> You got ' + wrong + ' wrong answers!</h4>');
        if(unanswered > 0){
            $("#score").append('<h4> You failed to answer ' + unanswered + ' questions!</h4>');
        }
        $("#instruction").html('Press Start to Begin the Quizz!');
        $("#timeLeft").html('');
        $("#start").html('Start');
    }

    function runQuestion() {
        time = 20;
        if (!clockRunning) {// prevents multiple instances of the clock running at the same time
            clockRunning = true;
            $("#timeLeft").html(time);
            intervalId = setInterval(decrementQuestion, 1000);
        }
    }

    function decrementQuestion() {
        time--;
        $("#timeLeft").html(time);

        if (time === 0) {
            stop();
            unanswered = triviaDatabase.length - (right + wrong);
            $("#submit").hide();
            finalScore();
            $("#allQuestions").html('');
        }
    }

    function runAnswer() {
        time = 1;
        if (!clockRunning) {
            clockRunning = true;
            //don't need to see that timer
            //$("#timeLeft").html(time);
            intervalId = setInterval(decrementAnswer, 1000);
        }
    }

    function decrementAnswer() {
        time--;
        //don't need to see that timer
        //$("#timeLeft").html(time);
        if (time === 0) {
            stop();
            questionCount++;
            if (questionCount < triviaDatabase.length) {
                $("#submit").show();
                generateHtml();
                runQuestion();
            } else {
                finalScore();
            };
        }
    }

    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }

    $("#start").on("click", function () {
        reset();
        generateHtml();
        runQuestion();
        $("#start").html('Restart');
        $("#submit").show();
    });

    $("#submit").on("click", function () {
        $("#submit").hide();
        $("#timeLeft").html('');
        stop();
        calculateScore();
    });

});
