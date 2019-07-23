// Variable decleration
let numberOfPlayersLeft = 8;
let isPlayerAlive = false;

// Hiding Spots
let hidingSpots = [
  { spot: 'Fridge', spotOpen: true },
  { spot: 'Hall Closet', spotOpen: true },
  { spot: 'Bathroom', spotOpen: true },
  { spot: 'Dining Area', spotOpen: true },
  { spot: 'Living Room', spotOpen: true },
  { spot: 'Dresser', spotOpen: true },
  { spot: 'Garage', spotOpen: true },
  { spot: 'Basement', spotOpen: true }
];

// Characters
let characterArray = [
  { isAlive: true, name: 'John', hidingSpot: 9 },
  { isAlive: true, name: 'Dave', hidingSpot: 9 },
  { isAlive: true, name: 'Hannah', hidingSpot: 9 },
  { isAlive: true, name: 'Sarah', hidingSpot: 9 },
  { isAlive: true, name: 'Bob', hidingSpot: 9 },
  { isAlive: true, name: 'Steve', hidingSpot: 9 },
  { isAlive: true, name: 'Emma', hidingSpot: 9 }
];

let gameReset = () => {
  numberOfPlayersLeft = 8;
  isPlayerAlive = false;
  round = 1;
  hidingSpots = [
    { spot: 'Fridge', spotOpen: true },
    { spot: 'Hall Closet', spotOpen: true },
    { spot: 'Bathroom', spotOpen: true },
    { spot: 'Dining Area', spotOpen: true },
    { spot: 'Living Room', spotOpen: true },
    { spot: 'Dresser', spotOpen: true },
    { spot: 'Garage', spotOpen: true },
    { spot: 'Basement', spotOpen: true }
  ];
  characterArray = [
    { isAlive: true, name: 'John', hidingSpot: 10 },
    { isAlive: true, name: 'Dave', hidingSpot: 10 },
    { isAlive: true, name: 'Hannah', hidingSpot: 10 },
    { isAlive: true, name: 'Sarah', hidingSpot: 10 },
    { isAlive: true, name: 'Bob', hidingSpot: 10 },
    { isAlive: true, name: 'Steve', hidingSpot: 10 },
    { isAlive: true, name: 'Emma', hidingSpot: 10 }
  ];
}

// Game Loop
let gameStart = () => {
  isPlayerAlive = true;
  let round = 1;
  while (isPlayerAlive === true && round < 8) {
    if (isPlayerAlive === true) {
      // Letting you know what round it is
      alert(`Round ${round}!`);

      // Player picking their hiding spot
      let playersHidingSpot = Number(prompt('Where shall you hide!?', `${round}`));
      if (typeof playersHidingSpot === 'number' && (playersHidingSpot > 0 && playersHidingSpot <= numberOfPlayersLeft)) {
        if (hidingSpots[playersHidingSpot - 1].spotOpen === true) {
          alert(`So, you decided to hide in the ${hidingSpots[playersHidingSpot - 1].spot}?`)
        } else {
          while (hidingSpots[playersHidingSpot - 1].spotOpen === false) {
            alert(`You don't want to hide in the ${hidingSpots[playersHidingSpot - 1].spot}! It's covered in blood! Please pick a different spot!`);
            playersHidingSpot = Number(prompt('Where shall you hide!?', `${round}`));
          }
        }
      }

      // The characters being assisgned their hiding spots
      for (let i = 0; i < characterArray.length; i++) {
        if (characterArray[i].isAlive === true) {
          let randomSpot = 0;
          while (characterArray[i].hidingSpot === 10) {
            randomSpot = Math.floor(Math.random() * numberOfPlayersLeft);
            if (hidingSpots[randomSpot].spotOpen === true) {
              characterArray[i].hidingSpot = randomSpot;
              alert(`${characterArray[i].name} decided to hide in the ${hidingSpots[randomSpot].spot}!`);
              hidingSpots[randomSpot].spotOpen = false;
            }
          }
        }
      }

      // Murder picks which spot to look in
      alert('The murder is deciding where to look!!');
      let murdersSpotToLook = Math.floor(Math.random() * numberOfPlayersLeft);
      if (murdersSpotToLook === playersHidingSpot) {
        alert(`Oh no! You were murdered!`);
        isPlayerAlive = false;
      } else {
        for (let j = 0; j < characterArray.length; j++) {
          if (murdersSpotToLook === characterArray[j].hidingSpot) {
            alert(`Oh no!! ${characterArray[j].name} was murdered!`);
            alert(`Looks like you cannot hide at the ${hidingSpots[characterArray[j].hidingSpot].spot} anymore...`);
            hidingSpots[characterArray[j].hidingSpot].spotOpen = false;
            characterArray[j].isAlive = false;
            numberOfPlayersLeft--;
          }
        }
      }
      round++;
    } else if (numberOfPlayersLeft === 1 && isPlayerAlive === true) {
      alert('You survived!!');
      break;
      gameReset();
    } else {
      break;
      alert('GAME OVER');
      gameReset();
    }
  }
}
