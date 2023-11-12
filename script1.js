const game_level1 = [
    {
      targetNumber: '13',
      numbersToShow: ['5', '7', '4', '9','10' , '2'],
      correct: ['4','9'] ,
    },
    {
      targetNumber: '7',
      numbersToShow: ['2', '6', '4', '3', '5','8'],
      correct: ['4','3'],
    },
    {
      targetNumber: '19',
      numbersToShow: ['9', '3','4', '10', '6','0'],
      correct: ['10','9'],
    },
    {
      targetNumber: '4',
      numbersToShow: ['3', '2', '1', '10', '5','0'],
      correct: ['3','1'],
    },
    {
      targetNumber: '16',
      numbersToShow: ['1', '7','2', '9', '4','7'],
      correct: ['9','7'],
    },
  ];
  


let number = document.getElementById("number");
let cards_cont=document.getElementById("cards-cont");
let card = document.getElementById("card");
const timeLeft = document.getElementById("time-left");
const resultCont = document.getElementById("result-cont");
const resultText = document.getElementById("result-text");


let flippedCards = [];
let currentIndex = 0;
let score = 0;
let timer = 10;
let countDown;


   function showTimer() {
     countDown = setInterval(function () {
      timer--;
      timeLeft.textContent = timer;
      if (timer <= 0) {
        clearInterval(countDown);
        checkCards([]);
      }
      }, 1000);
    } 

    function startGame(index) {
      clearGame();

      let targetNumber = index.targetNumber;
      let numbersToShow = index.numbersToShow;

      // Display cards with numbersToShow
      numbersToShow.forEach((number) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card','hCard');
        cardElement.textContent = number;

        // Add click event to each card
        cardElement.dataset.number = number;
        cardElement.addEventListener('click', () => handleCardClick(number, targetNumber));

        cards_cont.appendChild(cardElement);
      });

      // After some seconds, hide the numbers and display the target number
      setTimeout(() => {
        hideNumbers();
        displayTargetNumber(targetNumber);
      }, 7000);
    }

    function clearGame() {
      // Clear the timer
      clearInterval(countDown);
      timer = 10;
      timeLeft.textContent = timer;
    
      // Clear the displayed cards
      cards_cont.innerHTML = '';
      number.innerHTML = '?';
    
      // Clear the result text
      resultText.textContent = '';
    }
    

    function hideNumbers() {
      // Hide the numbers on the cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        card.textContent = '?';
      });
    }

    function displayTargetNumber(targetNumber) {
      // Display the targetNumber
      number.innerHTML = targetNumber;
      // Allow the player to click on two cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        card.addEventListener('click', () => handleCardSelection(card));
      });
      showTimer();
    }

    function handleCardSelection(card) {
        if (flippedCards.length < 2) {
            // Flip the card
            card.textContent = card.dataset.number; 
            flippedCards.push(card);
        }
    
        // Check if two cards are selected
        if (flippedCards.length === 2) {
            checkCards(flippedCards);
        }
    }
    
    function checkCards(cards) {
        const firstCardNumber = parseInt(cards[0].textContent);
        const secondCardNumber = parseInt(cards[1].textContent );

        if (cardsMatch(firstCardNumber, secondCardNumber)) {
          resultText.textContent = '👏💥كفووو';
          clearInterval(countDown);
          currentIndex++;
          score++;
          updateScore();
        
         // Move to the next level if available
    if (currentIndex < game_level1.length) {
      setTimeout(() => {
        resetGame();
        clearGame();
        startGame(game_level1[currentIndex]);
      }, 2000); 
    } else {
      // resultText.textContent = ` النتيجة ${score}`;
    }
  }else {
    resultText.textContent = '🐠!افاا';
    setTimeout(() => {
      resultText.textContent = '';
      resetFlippedCards();

      // Move to the next level if available
      currentIndex++;
      if (currentIndex < game_level1.length) {
        clearGame();
        startGame(game_level1[currentIndex]);
      } else {
      // resultText.textContent = ` النتيجة ${score}`;
  
    }
    }, 1500);
  }
}
    
    function cardsMatch(firstCardNumber, secondCardNumber) {
        const currentLevel = game_level1[currentIndex];
        const correctNumbers = currentLevel.correct.map(number => parseInt(number));
        return correctNumbers.includes(firstCardNumber) && correctNumbers.includes(secondCardNumber);
    }
      
  
    function resetFlippedCards() {
        flippedCards.forEach((card) => {
          card.textContent = '?';
          card.classList.add('hCard');
        });
        flippedCards = [];
    }
  
    function updateScore() {
        document.getElementById('score').textContent = `النتيجة ${score}`;
    }
  
    function resetGame() {
        resetFlippedCards();
        currentIndex = 0;
        updateScore();
    }
      // Start the game with the first level
      startGame(game_level1[currentIndex]);










  