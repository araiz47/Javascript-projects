//Basic BMI Calculator

const inputw = document.getElementById('inputw');  //linking stuff
const inputh = document.getElementById('inputh');
const btn = document.getElementById('btn');
const output = document.getElementById('output');
const resetbtn = document.getElementById('resetbtn');

btn.onclick = function(){ // when u click button it does stuff 
    if(inputw.value === "" || inputh.value === ""){ // makes sure both values are added 
        output.textContent = "Pls Enter both values Correctly"
        return;
    }
    let value1 = Number(inputw.value);
    let value2 = Number(inputh.value);

    if(isNaN(value1) || isNaN(value2) || value2 === 0) { // if the input is not a number it says this 
        output.textContent = "Invalid input";
        return;
    }

    let bmi = value1 / ((value2 / 100) * (value2 / 100)); //formula for bmi
    let category = "";
    //if else structure to see which category you belong to
    if (bmi < 18.5){  
        category = "Underweight"
    }
    else if (bmi < 24.9) {
    category = "Normal";
    }
    else if (bmi < 29.9) {
        category = "Overweight";
    }
    else {
        category = "Obese";
    }

    output.textContent = `BMI ${bmi.toFixed(2)} → (${category})`; //output
}
resetbtn.onclick = function(){
    inputw.value = "";
    inputh.value = "";
    output.textContent = "";
}