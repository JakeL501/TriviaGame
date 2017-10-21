var time, counter, currentTime;

/* stores tally-counts into array */
var tallyCount = [rightAnswers, wrongAnswers, unanswered];
var rightAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

/* Q&A object-array */
var questionBank = [{
        QobjectIndexer: 0,
        question: "What scene is a smashing scene with lovely acting?",
        answer: "Scene 24"
    },
    {
        QobjectIndexer: 1,
        question: "What word can the Knights of Ni not stand to hear?",
        answer: "It"
    },
    {
        QobjectIndexer: 2,
        question: "How do you know she is a witch?",
        answer: "If she weighs the same as a duck."
    },
    {
        QobjectIndexer: 3,
        question: "What do they call the enchanter who can cast fire without flint or tinder?",
        answer: "Tim?"
    },
    {
        QobjectIndexer: 4,
        question: "Who was the Knight who was not seen in the movie?",
        answer: "Sir Not Appearing In This Film"
    },
    {
        QobjectIndexer: 5,
        question: "What is the air-speed velocity of an unladen swallow?",
        answer: "African or European?"
    },
    {
        QobjectIndexer: 6,
        question: "What is your favorite color?",
        answer: "Blue"
    },
    {
        QobjectIndexer: 7,
        question: "How did Arthur become king?",
        answer: "The Lady in the Lake"
    },
    {
        QobjectIndexer: 8,
        question: "What quest did God Himself put upon the Knights of Camelot?",
        answer: "To seek the Holy Grail"
    },
    {
        QobjectIndexer: 9,
        question: "How much rejoicing was there after eating Robyn's minstrals?",
        answer: "Much Rejoicing"
    },
    {
        QobjectIndexer: 10,
        question: "How was the Black Beast Defeated?",
        answer: "The Animator suffered a fatal heart attack."
    },
]

/* incorrect-guesses object-array */
var wrongChoices = [
    ["Scene 25", "Scene 26", "Scene 28"],
    ["The", "Is", "New"],
    ["Throw her into a pond!", "Make her into a bridge!", "She turned you into a Newt!"],
    ["Tory?", "Todd?", "Tom?"],
    ["Sir Not Seen On Set", "Sir Not Appearing In This Movie", "Sir Not On The Movie Set"],
    ["African or American?", "African or Asian?", "None of these you twit!"],
    ["Blue. No yel-- Auuuuuuuugh!", "Orange", "I don't know that."],
    ["The Sword in the Stone", "By exploitin the workers", "Voted"],
    ["To seek the Holy Hand Granade", "To seek the killer rabbit", "To find the Castle Anthrax"],
    ["A lot of Rejoicing", "Some Rejoicing", "No Rejoicing"],
    ["They slayed the beast", "They ran away before it could lunge forward on them", "He wasn't defeated"],

]

/* randomize-choices */
function randomizeChoices(array) {
    for (var r = array.length - 1; r >= 0; r--) {
        var randomIndex = Math.floor(Math.random() * r + 1);
        var itemAtIndex = array[randomIndex];
        array[randomIndex] = array[r];
        array[r] = itemAtIndex;
    }
    return array;
}

/* question formBuilder */
function questionnaire(questionAnswerArray, choicesArray) {
    for (var i = 0; i < 11; i++) {
        choicesArray[i].push(questionAnswerArray[i].answer);
        $('.quiz-questions').append("<br><p class=" + "question" + i + ">" + questionAnswerArray[i].question + "</p>");
        choicesArray[i] = randomizeChoices(choicesArray[i]);
        console.log(choicesArray[i]);
        for (var c = 0; c < choicesArray[i].length; c++) {
            console.log(choicesArray[i][c]);
            $('.quiz-questions').append("<input type=" + "radio" + " name=" + "question" + i + " value=" + "\"" + choicesArray[i][c] + "\"" + " class=" + "question" + i + "> " + choicesArray[i][c] + "</input><br>");
        }
    }
}
questionnaire(questionBank, wrongChoices);

/* time-converter based on class example */
function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
}

//timer for questionBox
$(document).ready(function () {
    setTimeout(function () {
        time = 80;
        $(".timerDisplay").html("00:00");

        function clockView() {
            time--;
            currentTime = timeConverter(time);
            $(".timerDisplay").html(currentTime);
            console.log(time);

            if (time == 0) {
                for (var z = 0; z < questionBank.length; z++) {
                    if ($('.question' + z + ':checked').val() == questionBank[z].answer) {
                        rightAnswers++;
                    } else if ($('.question' + z + ':checked').val() == undefined) {
                        unanswered++;
                    } else {
                        wrongAnswers++;
                    }
                }
                $('.quiz-questions').empty();
                $('.quiz-questions').append("<p>You got " + rightAnswers + " answers right!</p>");
                $('.quiz-questions').append("<p>You got " + wrongAnswers + " answers wrong.</p>");
                $('.quiz-questions').append("<p>There are " + unanswered + " unanswered questions remaining.</p>");
                time = undefined;
                $(".timerDisplay").html(currentTime);
            }
        }
        counter = setInterval(clockView, 1000);
    })

    console.log(rightAnswers);
    console.log(wrongAnswers);
    console.log(unanswered);

})