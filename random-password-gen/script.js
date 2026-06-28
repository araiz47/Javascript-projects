//Random Password Generator Ver 1

const length = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const gen_btn = document.getElementById("gen_btn");
const reset = document.getElementById("reset");
const output = document.getElementById("output");



const generatePassword = function(){
    const upperChars = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const lowerChars = ("abcdefghijklmnopqrstuvwxyz");
    const numbersChars = ("0123456789");
    const symbolChars = ("!@#$%^&*()");
    let allowedChars = "";
    let password = "";
    
    if(length.value === ""){
    output.textContent = "You didn't enter a password length.";
    return;
    }
    let leninput = Number(length.value)

    if(uppercase.checked){
        allowedChars += upperChars;
    }
    if(lowercase.checked){
        allowedChars += lowerChars;
    }
    if(numbers.checked){
        allowedChars += numbersChars;
    }
    if(symbols.checked){
        allowedChars += symbolChars;
    }
    
    if(allowedChars === ""){
        output.textContent = "You didnt select any character";
        return;
    }
    if(leninput <= 0) {
        output.textContent = "Password length must be greater than 0.";
        return;
    }
    if(leninput > 32){
        output.textContent = "The maximum length is 32"
        return;
    }
    
    for(let i = 0; i<leninput; i++){
        let randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
        
    }
    return password;
}


gen_btn.onclick = function(){
    let password = generatePassword();

    if (password !== undefined) {
        output.textContent = password;
    }
}

reset.onclick = function(){
    length.value = "";
    uppercase.checked = false;
    lowercase.checked = false;
    numbers.checked = false;
    symbols.checked = false;
    output.textContent = "Password appears here";
}
