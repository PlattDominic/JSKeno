/*
- Dominic Martinez
- Project: JS Keno Game
- Description: Uses HTML images and JS variables to stimulate a keno game
- Due Date: 4/17/2023
*/

// Two color HEX codes for red and green
const REDHEX = '#FF003F';
const GREENHEX = '#009e60'

// Contains all spans in main game board
let gameBoardItems = document.getElementById('game-board').querySelectorAll('span');

// The HTML header that will show players prompts
let gamePrompt = document.getElementById('game-prompt');

// Get the start and clear buttons so they can be disabled when needed
let startButton = document.getElementById('start-button');
let clearButton = document.getElementById('clear-button');

// game and player span array will contain the spans used in both game and player game board
let gameSpanArray = [];
let playerSpanArray = [];

// inGame will determine if player  can modify their game board
let inGame = false;

// Will keep track of current index of playerSpanArray when placing spots on board
let currentIndex = 0;

// Will keep track of number of spot matches player has made
let matches = 0;

// Function will display a prompt to players using header placed in main HTML file
// text - The text header will show
// delay - How long header will display prompt
let showPrompt = (text, delay) => {

    // Change innerText of gamePrompt header to value of text parameter
    gamePrompt.innerText = text;

    // Change display of gamePrompt header to block so player can see it
    gamePrompt.style.display = 'block';

    // Set a timeout to set gamePrompt display to none and use value of delay parameter as timeout
    setTimeout(() => gamePrompt.style.display = 'none', delay);
}

// Function runs when player clicks a number on their game board
// element - the span element the player clicked on
let selectNum = (element) => {
        // Make sure player is not currently in a game, if so return
        if (inGame) return;

        // Make sure all spans in playerSpanArray have a background color red
        playerSpanArray.forEach(x => x.style.backgroundColor = REDHEX);
        
        // Checks if player has already selected span, if they have unselect it    
        if (playerSpanArray.includes(element)) {
            // Change span back default background color
            element.style.backgroundColor = 'white';
            
            // Remove span from playerSpanArray using filter method
            playerSpanArray = playerSpanArray.filter(x => x != element);
            return;
        }
        
        // Make sure player has not clicked 10 spans and is not a game, if they have, show them a prompt and return
        if (playerSpanArray.length >= 10 && !inGame) {
            showPrompt('You can only choose 10 spots', 1500);
            return;
        }
        
        // Push the selected player span to playerSpanArray
        playerSpanArray.push(element);

        // Set span player picked background color to red
        element.style.backgroundColor = REDHEX;
}
// Function runs when player clicks clear board button which resets playerSpanArray 
let clearPlayerBoard = () => {
    // Set all spans in playerSpanArray back to default background color
    playerSpanArray.forEach(x => x.style.backgroundColor = 'white');

    // Clear playerSpanArray
    playerSpanArray = [];
}

// Function runs when player clicks start new game button and will begin a new game
let startNewGame = () => {
    // Set inGame to true so player can't modify their game board
    inGame = true;

    // Disable both buttons as they should not be clicked when game is running
    startButton.disabled = true;
    clearButton.disabled = true;
  
    // If player clicked start new game without modifying game board from previous game, make sure spans in playerSpanArray are all red
    playerSpanArray.forEach(x => x.style.backgroundColor = REDHEX);

    // Reset gameSpanArray and its spans from previous game
    gameSpanArray.forEach(x => x.style.backgroundColor = 'white');
    gameSpanArray = [];
    currentIndex = 0;

    // Perform a do-while loop until gameSpanArray contains 20 items
    do {
        // Get a random span from gameBoardItems
        let randItem = gameBoardItems[Math.floor(Math.random() * 80)];
        // If span already exits in gameSpanArray, continue and rerun loop
        if (gameSpanArray.includes(randItem)) continue;

        // Push the random span to game span array 
        gameSpanArray.push(randItem);
    } while (gameSpanArray.length < 20);

    // Call the run game function with a delay of 1000ms
    setTimeout(runGame(), 1000);
}
// Function will run the main game
let runGame = () => {
    // Get current span from gameSpanArray by using currentIndex
    let current = gameSpanArray[currentIndex];
    // Change current span background color to red
    current.style.backgroundColor = REDHEX;

    // Iterate through playerSpan array and check if current span matches any of spans in playerSpanArray
    for (let i=0; i < playerSpanArray.length; i++) {
        // If a match is made, than change both current span and current playerSpanArray item to green
        if (playerSpanArray[i].innerText == current.innerText) {
            playerSpanArray[i].style.backgroundColor = GREENHEX;
            current.style.backgroundColor = GREENHEX;

            // Increment one to matches
            matches++;
        }
    }

    // Check if pre-incremented currentIndex is not more than 20, if it's not rerun runGame function is a timeout of 1000ms
    if (++currentIndex < 20) setTimeout(runGame, 1000);
    else {
        // If it is more than 20 though, check if player made more than 3 matches and if so prompt them of so
        if (matches >= 3){
            showPrompt(`You have won!! you matched ${matches} spots`, 6500);
        }
        // And prompt player if they make less than 3 matches
        else {
            showPrompt(`You have lost!! you only matched ${matches} spots. You need at least 3 to win`, 6500);
        }

        // Set inGame back to false so player can modify game board again
        inGame = false;

        // Reenable both game buttons 
        startButton.disabled = false;
        clearButton.disabled = false;

        // Reset matches back to zero
        matches = 0;
    }
}
