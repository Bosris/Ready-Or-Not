import npcArray from './npcArray.js';
import hidingSpotsArray from './hidingSpotsArray.js';

// Variable declarations
let numberOfPlayersLeftAlive = 8;
let isThePlayerAlive = false;

// Game reset function
let gameReset = () => {
  numberOfPlayersLeftAlive = 8;
  isThePlayerAlive = false;
  currentRound = 1;

  hidingSpotsArray.forEach((obj) => {
    obj.resetObj();
  });

  npcArray.forEach((obj) => {
     obj.resetObj();
 })
}

// Game start function
let gameStart = () => {
  isThePlayerAlive = true;.
  let currentRound = 1;
  let playersChosenHidingSpot;
  let pickedSpot;
  let randomNum;

  // Game loop
  while (isThePlayerAlive === true && numberOfPlayersLeftAlive > 1) {
    // State what round it is at the start of the round
    alert(`Round ${currentRound}!`);

    // Player picks their spot every round
    while (playersChosenHidingSpot === undefined) {
      pickedSpot = Number(prompt('Where are you going to hide!?', `${currentRound}`)) - 1;
      if (!hidingSpotsArray[pickedSpot].isSpotOpen) {
        alert(`Someone was murdered in the ${hidingSpotsArray[pickedSpot].spotName}! Please pick another spot!`);
      } else {
        playersChosenHidingSpot = pickedSpot;
        alert(`So, you decided to hide in the ${hidingSpotsArray[playersChosenHidingSpot].spotName}? I hope you make it!`);
        hidingSpotsArray[playersChosenHidingSpot].closeHidingSpot();
      }
    }

    // NPCs are assigned their hiding spots each round
    for (let i = 0; i < npcArray.length; i++) {
      while (npcArray[i].hidingSpot === undefined) {
        randomNum = Math.floor(Math.random() * hidingSpotsArray.length);
        if (hidingSpotsArray[randomNum].isSpotOpen) {
          npcArray[i].hidingSpot = randomNum;
          hidingSpotsArray[randomNum].closeHidingSpot();
          alert(`${npcArray[i].name} chose to hide in the ${hidingSpotsArray[randomNum].spotName}!`);
        }
      }
    }

    // The murder is assigned a spot to look in each round
    alert(`The murder is deciding where to look!!`);
    let murdersSpotToLookIn = Math.floor(Math.random() * numberOfPlayersLeftAlive); //Fix this random number generator

    // Check who is in the spot each round
    if (murdersSpotToLookIn === playersChosenHidingSpot) {
      alert(`Oh no! You were murdered!!`);
      isThePlayerAlive = false;
    } else {
      for (let j = 0; j < npcArray.length; j++) {
        if (murdersSpotToLookIn === npcArray[j].hidingSpot) {
          alert(`Oh no!! ${npcArray[j].name} was murdered!!`);
          hidingSpotsArray[murdersSpotToLookIn].closeHidingSpot();
          hidingSpotsArray[murdersSpotToLookIn].didSomeOneDieHere = true;
          alert(`Since ${npcArray[j].name} was murdered in the ${hidingSpotsArray[murdersSpotToLookIn].spotName}, it is now unavailable to hide in... Due to the mess...`);
          numberOfPlayersLeftAlive--;
          npcArray.splice(j, 1);
        }
      }
    }

    // Resets the NPCs hiding spot after each round
    for (let k = 0; k < npcArray.length; k++) {
      npcArray[k].resetObj();
    }

    // Resests the players hiding spot
    playersChosenHidingSpot = undefined;.

    // Set up the hidingSpotsArray for the next Round
    for (let l = 0; l < hidingSpotsArray.length; l++) {
      if (!hidingSpotsArray[l].didSomeOneDieHere) {
        hidingSpotsArray[l].isSpotOpen = true;
      }
    }

    // Increases the round counter
    currentRound++;
  }

  // End game conditions
  if (numberOfPlayersLeftAlive = 1 && isThePlayerAlive) {
    alert(`You survived! Congrats!!`);
    gameReset();
  } else if (!isThePlayerAlive) {
    alert('GAME OVER...');
    gameReset();
  }
}
