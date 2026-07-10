//Quiz App Ver 1

const questionCount = document.getElementById("questionCount");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextbtn = document.getElementById("nextbtn");
const output = document.getElementById("output");
const reset = document.getElementById("reset");


const questions = [
    {
        question: "How many elements are in the periodic table?",
        options: ["A.116","B.144","C.118","D.154"],
        answer: "C.118"
    },
    {
        question: "Which planet is closest to the sun?",
        options: ["A.Mercury","B.Venus","C.Earth","D.Mars"],
        answer: "A.Mercury"
    },
    {
        question: "How many bones do we have in an ear?",
        options: ["A.4","B.5","C.6","D.3"],
        answer: "D.3"
    },
    {
        question: "What is the chemical element with the symbol Fe?",
        options: ["A.Iron","B.Calcium","C.Carbon","D.Magnesium"],
        answer: "A.Iron"
    },
    {
        question: " What is the smallest unit of matter?",
        options: ["A.Iron","B.Atom","C.Calcium","D.Magneisum"],
        answer: "B.Atom"
    },
    {
        question: " Where is the strongest human muscle located?",
        options: ["A.Jaw","B.Skull","C.Elbow","D.Knee"],
        answer: "A.Jaw"
    }
]

let currentQuestion = 0;
let score = 0;

function showQuestion(){

    const current = questions[currentQuestion];
    question.textContent = current.question;
    questionCount.textContent =
    `Question ${currentQuestion + 1} / ${questions.length}`;

    options.forEach(function(button,index){

        let selectAnswer = current.options[index];
        let answer = current.answer;

        button.textContent = selectAnswer;

        button.onclick = function(){
            
            if(selectAnswer === answer){
                score++;
                output.textContent = `Correct! Score: ${score}`;
            }
            else{

                output.textContent = `No its wrong !!
                Correct Answer is: ${current.answer}`;

            }
        }
    });

}

showQuestion();

nextbtn.onclick = function(){
    currentQuestion++;

    if(currentQuestion < questions.length){
        showQuestion();
    }
    else{
        output.textContent = `Quiz Over!
        Final Score: ${score}/${questions.length}`;        
    }
   
}

reset.onclick = function(){

    currentQuestion = 0;
    score = 0;

    output.textContent = "";
    showQuestion();

}




