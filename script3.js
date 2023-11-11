const game_level3 = [
    {
      targetNumber: '62',
      numbersToShow: ['5', '9+1', '6+6', '9','10*5' , '2'],
      correct: ['6+6','10*5'] ,
    },
    {
      targetNumber: '79',
      numbersToShow: ['7', '6+3', '7*10', '9-3', '5','8'],
      correct: ['7*10','6+3'],
    },
    {
      targetNumber: '81',
      numbersToShow: ['9*9', '8*9','4', '10-10', '6','10'],
      correct: ['10-10','9*9'],
    },
    {
      targetNumber: '94',
      numbersToShow: ['3-1', '2', '1+2', '10*9', '5-1','0'],
      correct: ['10*9','5-1'],
    },
    {
      targetNumber: '106',
      numbersToShow: ['1+9', '10*9','2', '9+7', '4','7'],
      correct: ['10*9','9+7'],
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
        checkAnswer("", null);
       }
      }, 1000);
    }


    function startGame(leve3 ) {
      const targetNumber = leve3.targetNumber;
      const numbersToShow = leve3.numbersToShow;


      // Display cards with numbersToShow
      numbersToShow.forEach((number, index) => {
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
      }, 9000);
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
          resultText.textContent = '👏💥صح عليك ';
          score++;
          updateScore();
      
          // Move to the next level if available
          currentIndex++;
          if (currentIndex < game_level3.length) {
            timer = 10;
            timeLeft.textContent = timer;
            showTimer();
            resetGame();
            startGame(game_level3[currentIndex]);
          } else {
            resultText.textContent = `You completed all levels! Final Score: ${score}`;
          }
          resetFlippedCards();
        } else {
          resultText.textContent = '🐠!افاا';
          setTimeout(() => {
            // If the cards don't match, reset the result text after a short delay
            resultText.textContent = '';
            resetFlippedCards();
          }, 1500);
        }
    }

    function cardsMatch(firstCardNumber, secondCardNumber) {
        const currentLeve3 = game_level3[currentIndex];
        const correctNumbers = currentLeve3.correct.map(number => parseInt(number));
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
        document.getElementById('score').textContent = `Score: ${score}`;
    }
  
    function resetGame() {
        resetFlippedCards();
        currentIndex = 0;
        updateScore();
    }
  
      // Start the game with the 3 level
      startGame(game_level3[currentIndex]);


