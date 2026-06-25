const number = document.getElementById("number");
const genbtn = document.getElementById("genbtn");
const output = document.getElementById("output");

genbtn.onclick = function(){

    let num = Number(number.value)

    if(number.value === ""){
        output.textContent = "Please Enter a Number";
        return
    }
    else{
        let table = "";
        for(i=1; i<=10; i++){
            table += `${num} x ${i} = ${num * i}<br>`;
        }
        output.innerHTML = table;
    }
}