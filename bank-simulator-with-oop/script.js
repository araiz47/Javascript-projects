//Banking Simulator Ver 1

const accName = document.getElementById("accName");
const amount = document.getElementById("amount");
const accNumber = document.getElementById("accNumber");
const createAcc = document.getElementById("createAcc");
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
const showAcc = document.getElementById("showAcc");
const output = document.getElementById("output");

let accounts = [];

class Account{
    static nextAccountNumber = 1001;

    constructor(name,balance){
        this.name = name;
        this.balance = balance
        this.accnumber = Account.nextAccountNumber++;
    }

    deposit(amount){
        if(amount <=0){
            return false;
        }

        this.balance += amount;
        return true;
    }

    withdraw(amount){
        if(this.balance >= amount){
            
            this.balance -=amount;
            return true;
        }
        return false;
    }

}
createAcc.onclick = function(){

    let accountName = accName.value;
    let amountValue = Number(amount.value);
    let accountNumber = accNumber.value;

    if(accountName === ""){
        output.textContent = "Please enter a name";
        return;
    }
    
    if(isNaN(amountValue) || amountValue <= 0) {
    output.textContent = "Please enter a valid amount";
    return;
}
    const account = new Account(accountName,amountValue,accountNumber);

    accounts.push(account);
    output.textContent = "Account created successfully";
}

deposit.onclick = function(){
    if(accounts.length === 0){
        output.textContent = "There are no accounts";
        return
    }

    let accountNumber = Number(accNumber.value);
    let depositAmount = Number(amount.value);

    if(isNaN(depositAmount) || depositAmount <=0){
        output.textContent = "Enter a valid amount";
        return;
    }

    if(isNaN(accountNumber) || accountNumber <=0){
        output.textContent = "Enter a valid account";
        return;
    }

    const account = accounts.find(function(account){
        return account.accnumber === accountNumber;
    });

    if (!account){
    output.textContent = "Account not found.";
    return;
    }

    if(account.deposit(depositAmount)){
        output.innerHTML = `
        Deposit Successful!<br><br>
        Name: ${account.name}<br>
        Balance: ${account.balance}<br>
        Account Number: ${account.accnumber}
        `;
    }

}

withdraw.onclick = function(){
      if(accounts.length === 0){
        output.textContent = "There are no accounts";
        return
    }

    let accountNumber = Number(accNumber.value);
    let withdrawAmount = Number(amount.value);

    if(isNaN(withdrawAmount) || withdrawAmount <=0){
        output.textContent = "Enter a valid amount";
        return;
    }


    if(isNaN(accountNumber) || accountNumber <=0){
        output.textContent = "Enter a valid account";
        return;
    }

    const account = accounts.find(function(account){
        return account.accnumber === accountNumber;
    });

    if (!account){
    output.textContent = "Account not found.";
    return;
    }

    if(account.withdraw(withdrawAmount)){
        output.innerHTML = `
        Withdraw Successful!<br><br>
        Name: ${account.name}<br>
        Balance: ${account.balance}<br>
        Account Number: ${account.accnumber}
        `;
    }

}

showAcc.onclick = function(){
    if(accounts.length === 0){
        output.textContent = "There are no accounts";
        return;
    }
    output.innerHTML = "";
    accounts.forEach(function(account, index) {
        output.innerHTML += `
            Account ${account.accnumber}<br>
            Name: ${account.name}<br>
            Balance: ${account.balance}<br>
        `;
    });
}