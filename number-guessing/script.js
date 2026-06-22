//Basic Number Guessing Game Ver 1 

const myinput = document.getElementById('myinput');
const myguess = document.getElementById('myguess');
const myreset = document.getElementById('myreset');
const msg = document.getElementById('msg');
const secret = document.getElementById('secret');

let secretnumber = Math.floor(Math.random() * 10) + 1; //the guessed number

//Guess where the thing actually functions 
myguess.onclick = function(){
    if(myinput.value === ""){
        msg.textContent = "Please enter a number";
        return;
    }
    let guessinput = Number(myinput.value) 

    if(guessinput === secretnumber){ //basic if else structure to make sure the program works i guess ?!
        msg.textContent = "Oh You got it thats nice !!";
        secret.textContent = `SecretNumber = ${secretnumber}`
    }
    else if(guessinput > secretnumber){
        msg.textContent = "Oh no you got it wrong its too high";
    }
    else if(guessinput < secretnumber){
        msg.textContent = "Oh no its too low";
    }
    else{
        msg.textContent = "Enter the correct value";
    }
}
myreset.onclick = function(){ //reset function to make sir
    myinput.value = "";
    secretnumber = Math.floor(Math.random() * 10) + 1;
    msg.textContent = "Game Reset start guessing again..."
    secret.textContent = "";
}