// A basic Temprature Converter
const entertemp = document.getElementById("entertemp"); //linking the stuff from html file
const rad1 = document.getElementById("rad1");
const rad2 = document.getElementById("rad2");
const mybtn = document.getElementById("mybtn");
const myout = document.getElementById("myout");
const resetbtn = document.getElementById("resetbtn");

mybtn.onclick = function(){  //Button function that does the real stuff 
    if(entertemp.value === "") { //makes sure the user inputs a value 
            myout.textContent = "Please enter a value"
            return;
        }

    let temp = Number(entertemp.value) // makes sure the input is number


    if(rad1.checked){ //Converts it to Fahrenheit
        let result = (temp * (9/5) +32);
        myout.textContent = `Output: ${result.toFixed(2) + "°F"}`;
    }
    else if(rad2.checked){
        let result = (temp - 32) * 5/9; // Converts it to Celsius
        myout.textContent = `Output: ${result.toFixed(2) + "°C"}`;
    }
    else{
        myout.textContent = "You did not select a conversion type";
    }
}

resetbtn.onclick = function(){ // resetting the whatever u wrote
    entertemp.value = "";
    rad1.checked = false;
    rad2.checked = false;
    myout.textContent = "Output cleared"
}