const game_level1 = [
    {
      targetNumber: 13,
      numbersToShow: [5, 7, 4, 9, 10 , 2],
      correct: null ,
    },
    {
      targetNumber: 7,
      numbersToShow: [2, 6, 4, 3, 5,8],
      correct: null,
    },
    {
      targetNumber: 19,
      numbersToShow: [9, 3, 4, 10, 6,0],
      correct: null,
    },
    {
      targetNumber: 4,
      numbersToShow: [3, 2, 1, 10, 5,0],
      correct: null,
    },
    {
      targetNumber: 16,
      numbersToShow: [1, 7, 2, 9, 4,7],
      correct: null,
    },
    {
      targetNumber: 2,
      numbersToShow: [10, 1, 11, 1, 20,0],
      correct: null,
    },
  ];
  
  // Find the correct combination of two numbers whose sum equals the targetNumber
  function findCorrectNumbers(targetNumber, numbersToShow) {
    for (let i = 0; i < numbersToShow.length - 1; i++) {
      for (let j = i + 1; j < numbersToShow.length; j++) {
        if (numbersToShow[i] + numbersToShow[j] === targetNumber) {
          return [numbersToShow[i], numbersToShow[j]];
        }
      }
    }
    return null; // Return null if no such combination is found
  }
  
  // Iterate through the game levels and find correct numbers
  game_level1.forEach((level) => {
    const { targetNumber, numbersToShow } = level;
    level.correct = findCorrectNumbers(targetNumber, numbersToShow);
  });
  
  // Display the updated game_level1 array
  console.log(game_level1);











  