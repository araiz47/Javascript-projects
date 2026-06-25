//Password Strength Checker

const password = document.getElementById("password");
const checkbtn = document.getElementById("checkbtn");
const Result = document.getElementById("Result");
const showpass = document.getElementById("showpass");


checkbtn.onclick = function(){
    let userpass = password.value.trim();
    if (userpass.length < 6) {
    Result.textContent = "🔴 Weak Password";
}
else if (userpass.length <= 10) {
    Result.textContent = "🟠 Medium Password";
}
else {
    Result.textContent = "🟢 Strong Password";
}
}

showpass.onclick = function(){
    if(showpass.checked){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
}