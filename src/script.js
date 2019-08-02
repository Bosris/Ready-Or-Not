import npcArray from './npcArray.js';
import hidingSpotsArray from './hidingSpotsArray.js';

// Variable declarations
let numberOfPlayersLeftAlive = 8;
let isThePlayerAlive = false;
let currentRound = 1;
let pickedSpot;
let randomNum;

// Players spot function
const playersSpot = () => {
   let playersChosenHidingSpot;
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
}

// NPC spot assignment function
const npcAssignment = () => {
   for (let i = 0; i < npcArray.length; i++) {
      while(npcArray[i].hidingSpot === undefined) {
         randomNum = Math.floor(Math.random() * hidingSpotsArray.length);
         if (hidingSpotsArray[random].isSpotOpen) {
            npcArray[i].hidingSpot = randomNum;
            hidingSpotsArray[randomNum].closeHidingSpot();
            alert(`${npcArray[i].name} chose to hide in the ${hidingSpotsArray[randomNum].spotName}!`);
         }
      }
   }
}

// Murder Spot assignment function
const murderAssignment = () => {
   alert(`The murder is deciding where to look!!`);
   let murdersSpotToLookIn = Math.floor(Math.random() * hidingSpotsArray.length);
   if (murdersSpotToLookIn === playersChosenHidingSpot) {
      alert(`Oh no! You were murdered!!`);
      isThePlayerAlive = false;
   } else {
      for (let i = 0; i < npcArray.length; i++) {
         if (murdersSpotToLookIn === npcArray[i].hidingSpot) {
            alert(`Oh no!! ${npcArray[i].name} was murdered!!`);
            hidingSpotsArray[murdersSpotToLookIn].closeHidingSpot();
            hidingSpotsArray[murdersSpotToLookIn].didSomeOneDieHere = true;
            alert(`Since ${npcArray[i].name} was murdered in the ${hidingSpotsArray[murdersSpotToLookIn].spotName}, it is now unavailable to hide in... Due to the mess...`);
            numberOfPlayersLeftAlive--;
            npcArray.splice(i, 1);
         }
      }
   }
}

// Game reset function
export const gameReset = () => {
   // Reset the variables
  numberOfPlayersLeftAlive = 8;
  isThePlayerAlive = false;
  currentRound = 1;

  // Reset the objects in both arrays
  hidingSpotsArray.forEach((obj) => obj.resetObj())
  npcArray.forEach((obj) => obj.resetObj())
}

// Game start function
export const gameStart = () => {
   isThePlayerAlive = true;

   // Game loop
   while (isThePlayerAlive === true && numberOfPlayersLeftAlive > 1) {
      alert(`Round ${currentRound}!`);

      // Calls the playersSpot function
      playersSpot();

      // Calls the npcAssignment function
      npcAssignment();

      // Calls the murderAssignment function
      murderAssignment();

      // Resets the npcArray
      npcArray.forEach((obj) => obj.resetObj())

      // Resets the players hiding spot
      playersChosenHidingSpot = undefined;

      // Resets the hiding spot objects if didSomeOneDieHere is false
      hidingSpotsArray.forEach((obj) => {
         if (!hidingSpotsArray[l].didSomeOneDieHere) {
            hidingSpotsArray[l].isSpotOpen = true;
         }
      })
      currentRound++;
   }

   if (numberOfPlayersLeftAlive = 1 && isThePlayerAlive) {
      alert(`You survived! Congrats!!`);
      gameReset();
   } else if (!isThePlayerAlive) {
      alert('GAME OVER...');
      gameReset();
   }
}
