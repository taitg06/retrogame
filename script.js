const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let score = 0;
let topScores = JSON.parse(localStorage.getItem('topScores')) || [];

const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const resetScoresButton = document.getElementById("reset-scores-button");
const playerNameInput = document.getElementById("player-name");
const topScoresList = document.getElementById("top-scores-list");

// Game Over Modal Elements
const gameOverModal = document.getElementById("game-over-modal");
const gameOverMessage = document.getElementById("game-over-message");
const closeModalButton = document.getElementById("close-modal-button");

// Add event listeners to buttons
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button));
});

// Start the game
startButton.addEventListener("click", startGame);

// Reset the scores
resetScoresButton.addEventListener("click", resetScores);

// Close the modal when the close button is clicked
closeModalButton.addEventListener("click", () => {
    gameOverModal.style.display = "none"; // Hide the modal
});

// Display top scores
displayTopScores();

// Function to start the game
function startGame() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
      alert("Please enter your name to start the game.");
      return;
    }
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreDisplay.textContent = score;
    startButton.disabled = true; // Ensure this line is present
    nextRound();
  }

  // Function to play the sequence
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      flashButton(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 1000);
  }

/// Function to generate the next round
function nextRound() {
    playerSequence = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playSequence(); // Ensure this line is present
  }



// Function to flash a button
function flashButton(color) {
    const button = document.querySelector(`[data-color="${color}"]`);
    button.classList.add('lit'); // Add the "lit" class
    setTimeout(() => {
      button.classList.remove('lit'); // Remove the "lit" class after a delay
    }, 500);
  }

// Function to handle button clicks
function handleButtonClick(button) {
    const color = button.getAttribute("data-color");
    playerSequence.push(color);
    flashButton(color);
    checkSequence();
}

// Function to check the player's sequence
function checkSequence() {
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== sequence[index]) {
        endGame();
        return;
    }
    if (playerSequence.length === sequence.length) {
        score++;
        scoreDisplay.textContent = score;
        setTimeout(nextRound, 1000);
    }
}


// Function to end the game
function endGame() {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
      updateTopScores(playerName);
    }
    displayTopScores();
  
    // Display game over message
    gameOverMessage.textContent = `Game over, ${playerName}! Your score: ${score}`;
    gameOverModal.style.display = 'flex'; // Ensure this line is present
  }

// Function to update top scores
function updateTopScores(playerName) {
    topScores.push({ name: playerName, score: score });
    topScores.sort((a, b) => b.score - a.score); // Sort by score in descending order
    topScores = topScores.slice(0, 10); // Keep only the top 10 scores
    localStorage.setItem('topScores', JSON.stringify(topScores));
    displayTopScores(); // Ensure this line is present
  }

// Function to display top scores
function displayTopScores() {
    topScoresList.innerHTML = topScores
      .map((entry, index) => `<li>${index + 1}. ${entry.name}: ${entry.score}</li>`)
      .join('');
  }

// Function to reset the top scores
function resetScores() {
    topScores = [];
    localStorage.removeItem("topScores");
    displayTopScores();
    alert("Top scores have been reset.");
}