//Rock Paper Scissors game Ver 1  This is just the first version so spare me if its lengthy as hell i havent learnt functions yet

const myrockbtn1 = document.getElementById("myrockbtn1");  // shiiieeet this is one long code because of no functions
const mypaperbtn2 = document.getElementById("mypaperbtn2");
const myscissbtn3 = document.getElementById("myscissbtn3");
const myout1 = document.getElementById("myout1");
const myout2 = document.getElementById("myout2");
const myout3 = document.getElementById("myout3");
const scr = document.getElementById("scr");

const minNum = 0
const maxNum = 3
let userChoice;
let computerChoice;
let num;
let playerScore = 0;
let computerScore = 0;

myrockbtn1.onclick = function(){  // the rock button function that does stuff when u click rock !!
    num = Math.floor(Math.random() * maxNum) + minNum;  //Formula for those 3 numbers so we can assign the omputer choice too
    userChoice = "Rock";
    myout1.textContent = `User Choice: ${userChoice}`;
    switch (num) { //switch case for computer choice
        case 0:
            computerChoice = "Rock";
            break;
        
        case 1:
            computerChoice = "Paper";
            break;
        
        case 2:
            computerChoice = "Scissors";
            break;
        default:
            console.log("Something Went Wrong");
            break;
    }
    myout2.textContent = `Computer Choice: ${computerChoice}`
    if(userChoice === computerChoice){ //if else structure for win/lose/draw condition
        myout3.textContent = "🤝 Oh!! its a draw";
    }
    else if(userChoice === "Rock" && computerChoice === "Scissors"){
        myout3.textContent = "🎉 You Win !!"
        playerScore++;
    }
    else{
       myout3.textContent = "😔 You Lose !!"
       computerScore++;
    }
    scr.textContent = `😀 You: ${playerScore} | 💻 Computer: ${computerScore}`;
}
// just read the comments on the rock button and youll understand what the other button functions mean
mypaperbtn2.onclick = function(){
    num = Math.floor(Math.random() * maxNum) + minNum;
    userChoice = "Paper";
    myout1.textContent = `User Choice: ${userChoice}`;
    switch (num) {
        case 0:
            computerChoice = "Rock";
            break;
        
        case 1:
            computerChoice = "Paper";
            break;
        
        case 2:
            computerChoice = "Scissors";
            break;
        default:
            console.log("Something Went Wrong");
            break;
    }
    myout2.textContent = `Computer Choice: ${computerChoice}`
    if(userChoice === computerChoice){
        myout3.textContent = "🤝 Oh!! its a draw";
    }
    else if(userChoice === "Paper" && computerChoice === "Rock"){
        myout3.textContent = "🎉 You Win !!";
        playerScore++;
    }
    
    else{
       myout3.textContent = "😔 You Lose !!";
       computerScore++;
    }
    scr.textContent = `😀 You: ${playerScore} | 💻 Computer: ${computerScore}`;
}
//jus read the rock function bro
myscissbtn3.onclick = function(){
    num = Math.floor(Math.random() * maxNum) + minNum;
    userChoice = "Scissors";
    myout1.textContent = `User Choice: ${userChoice}`;
    switch (num) {
        case 0:
            computerChoice = "Rock";
            break;
        
        case 1:
            computerChoice = "Paper";
            break;
        
        case 2:
            computerChoice = "Scissors";
            break;
        default:
            console.log("Something Went Wrong");
            break;
    }
    myout2.textContent = `Computer Choice: ${computerChoice}`
    if(userChoice === computerChoice){
        myout3.textContent = "🤝 Oh!! its a draw";
    }
    else if(userChoice === "Scissors" && computerChoice === "Paper"){
        myout3.textContent = "🎉 You Win !!";
        playerScore++;
    }
    else{
       myout3.textContent = "😔 You Lose !!";
       computerScore++;
    }
    scr.textContent = `😀 You: ${playerScore} | 💻 Computer: ${computerScore}`;
}

