//Dice Roller Program

function diceRoller(){
    
    const numOfDice = document.getElementById("numOfDice").value;
    const dice_result = document.getElementById("dice_result");
    const dice_Images = document.getElementById("dice_Images");
    const values = [];
    const images = [];

    for(let i = 0; i<numOfDice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src = "dice-images/${value}.png" alt = "Dice ${value}">`);
    }
    dice_result.textContent = `dice: ${values.join(', ')}`;
    dice_Images.innerHTML = images.join('');
}