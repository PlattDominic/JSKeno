/*
- Dominic Martinez
- Project: JS Keno Game
- Description: Uses HTML images and JS variables to stimulate a keno game
- Due Date: 4/17/2023
*/


const REDHEX = '#FF003F';
const GREENHEX = '#009e60'

let gameBoardItems = document.getElementById('game-board').querySelectorAll('span');
let gamePrompt = document.getElementById('game-prompt');
let startButton = document.getElementById('start-button');
let clearButton = document.getElementById('clear-button');


let gameNumArray = [];
let playerSpanArray = [];

let inGame = false;
let currentIndex = 0;
let matches = 0;


let showPrompt = (text, delay) => {
    gamePrompt.innerText = text;
    gamePrompt.style.display = 'block';
    setTimeout(() => gamePrompt.style.display = 'none', delay);
}

let selectNum = (element) => {
        if (inGame) return;

        playerSpanArray.forEach(x => x.style.backgroundColor = REDHEX);
        
        if (playerSpanArray.includes(element)) {
            element.style.backgroundColor = 'white';
            playerSpanArray = playerSpanArray.filter(x => x != element);
            return;
        }
        
        if (playerSpanArray.length >= 10 && !inGame) {
            showPrompt('You can only choose 10 spots', 1500);
            return;
        }
        
    
    playerSpanArray.push(element);
    
    element.style.backgroundColor = REDHEX;
}
let clearPlayerBoard = () => {
    playerSpanArray.forEach(x => x.style.backgroundColor = 'white');

    playerSpanArray = [];
}


let startNewGame = () => {
    inGame = true;
    startButton.disabled = true;
    clearButton.disabled = true;
  

    gameNumArray.forEach(x => x.style.backgroundColor = 'white');
    gameNumArray = [];
    currentIndex = 0;

    do {
        let randItem = gameBoardItems[Math.floor(Math.random() * 80)];
        if (gameNumArray.includes(randItem)) continue;

        gameNumArray.push(randItem);
    } while (gameNumArray.length < 20);

    setTimeout(blinkSpan(), 1000);
}
let blinkSpan = () => {
    let current = gameNumArray[currentIndex];
    current.style.backgroundColor = REDHEX;

    for (let i=0; i < playerSpanArray.length; i++) {
        if (playerSpanArray[i].innerText == current.innerText) {
            playerSpanArray[i].style.backgroundColor = GREENHEX;
            current.style.backgroundColor = GREENHEX;

            matches++;
        }
    }

    if (++currentIndex < 20) setTimeout(blinkSpan, 1000);
    else {

        if (matches >= 3){
            showPrompt(`You have won!! you matched ${matches} spots`, 5000);
        }
        else {
            showPrompt(`You have lost!! you only matched ${matches} spots. You need at least 3 to win`, 5000);
        }

        inGame = false;
        startButton.disabled = false;
        clearButton.disabled = false;

        matches = 0;
    }
}
