// Define order of difficulties and initialize game state variables.
const difficulties = ["easy", "medium", "hard", "extreme"];
const allAnswers = ["movie", "photo", "patch", "bunch", "light", "cloth", "shadow", "island", "battle"];

let currentDifficultyIndex = 0;
let currentLevel = difficulties[currentDifficultyIndex];
let currentRound = 0;
let score = 0;
let answered = false;
let highScore = parseInt(localStorage.getItem('highscore')) || 0;

// Display the high score when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateHighScoreDisplay();
  initializeGameState();
  showHomepageHighScore();
});

// Show and update the high score
function updateHighScoreDisplay() {
  document.getElementById("highscore").textContent = `High score: ${highScore}`;
}

// Update the high score if the current score is higher
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highscore', highScore);
    updateHighScoreDisplay();
  }
}

// Load and display username and reset game state when a user starts the game
function saveUsername() {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    document.getElementById("greeting").textContent = `Welcome, ${username}!`;
    document.getElementById("storage-info").textContent = `Local Storage - Username: ${username}`;
    resetGameState();
    showGameScreen();
    storeGameDataLocally();
  }
}
function storeGameDataLocally() {
  const username = localStorage.getItem("username") || "guest";
  const highscore = localStorage.getItem("highscore") || "0";

  const now = new Date();
  const expires = new Date();
  expires.setDate(now.getDate() + 30);

  const gameData = {
    username: username,
    highscore: highscore,
    accessed: now.toISOString(),
    expires: expires.toISOString()
  };

  localStorage.setItem("gameData", JSON.stringify(gameData));
}

// Show the game screen by hiding the username and rules containers
function showGameScreen() {
  document.getElementById("username-container").style.display = "none";
  document.getElementById("rules-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  loadRound();
}

// Reset the game state
function resetGameState() {
  currentDifficultyIndex = 0;
  currentLevel = difficulties[currentDifficultyIndex];
  currentRound = 0;
  score = 0;
  answered = false;
  document.getElementById("score").textContent = score;
}

// Display the game round details
function loadRound() {
  const round = levels[currentLevel][currentRound];
  loadImages(round.images);
  initializeAnswerInput();
  updateRoundNavigation();
}

// Load the images for the current round
function loadImages(images) {
  images.forEach((imgSrc, index) => {
    document.getElementById(`img${index + 1}`).src = imgSrc;
  });
}

// Initialize the answer input and enable/disable relevant buttons
function initializeAnswerInput() {
  const inputEl = document.getElementById("answer-input");
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  document.getElementById("feedback").textContent = "";
  const nextBtn = document.getElementById("next-round-btn");
  nextBtn.disabled = true;
  setTimeout(() => nextBtn.disabled = false, 500);
  nextBtn.style.display = "block";
}

// Update the round navigation button text based on current state
function updateRoundNavigation() {
  const nextBtn = document.getElementById("next-round-btn");
  const isLastRound = currentRound === levels[currentLevel].length - 1;

  if (isLastRound && currentLevel === "extreme") {
    nextBtn.textContent = "Finish Game";
  } else if (isLastRound) {
    nextBtn.textContent = "Next Level";
  } else {
    nextBtn.textContent = "Next Round";
  }
}

// Check if the user's answer is correct
function checkAnswer() {
  const answerInput = document.getElementById("answer-input").value.toLowerCase().trim();
  const correctAnswer = levels[currentLevel][currentRound].answer;
  const feedback = document.getElementById("feedback");

  if (answerInput === correctAnswer && !answered) {
    feedback.textContent = "✅ Correct!";
    score += 5;
    answered = true;
    document.getElementById("score").textContent = score;
    updateHighScore();
  } else if (!answered) {
    feedback.textContent = "❌ Try Again!";
  }
}

// Use a hint and deduct points if applicable
function useHint() {
  if (!answered && score > 0) {
    score -= 1;
    alert(`Hint: ${levels[currentLevel][currentRound].hint}`);
    document.getElementById("score").textContent = score;
  } else if (!answered) {
    alert("Not enough points for a hint!");
  }
}

// Move to the next round or level
function nextRound() {
  answered = false;

  if (currentRound < levels[currentLevel].length - 1) {
    currentRound++;
  } else if (currentLevel !== "extreme") {
    currentDifficultyIndex++;
    currentLevel = difficulties[currentDifficultyIndex];
    currentRound = 0;
    alert(`Advancing to ${currentLevel} level!`);
  } else {
    alert(`🎉 Game Over! Final Score: ${score}`);
    resetGameState();
    return;
  }

  loadRound();
}

// Reset the game to its initial state
function resetGame() {
  resetGameState();
  document.getElementById("username-container").style.display = "block";
  document.getElementById("rules-container").style.display = "block";
  document.getElementById("game-container").style.display = "none";
  updateHighScoreDisplay();
}

// Show high score on homepage when returning
function showHomepageHighScore() {
  const hs = parseInt(localStorage.getItem('highscore')) || 0;
  document.getElementById("homepage-highscore").textContent = `High Score: ${hs}`;
}

// Go back to the homepage after game over
function goToHomepage() {
  resetGame();
  showHomepageHighScore();
}

// Initialize game state when the page loads and a stored username exists
function initializeGameState() {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    document.getElementById("greeting").textContent = `Welcome back, ${storedUsername}!`;
    document.getElementById("storage-info").textContent = `Local Storage - Username: ${storedUsername}`;
    document.getElementById("username-container").style.display = "block";
    document.getElementById("rules-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    showHomepageHighScore();
  }
}

// Levels object to define rounds for each difficulty level
const levels = {
  easy: [
    { images: ["EASY/img1.jpg", "EASY/img2.jpg", "EASY/img3.jpg", "EASY/img4.jpg"], answer: "movie", hint: "For entertainment" },
    { images: ["EASY/img5.jpg", "EASY/img6.jpg", "EASY/img7.jpg", "EASY/img8.jpg"], answer: "photo", hint: "Taken by camera" }
  ],
  medium: [
    { images: ["MEDIUM/img9.jpg", "MEDIUM/img10.jpg", "MEDIUM/img11.jpg", "MEDIUM/img12.jpg"], answer: "patch", hint: "Cover up for wound" },
    { images: ["MEDIUM/img13.jpg", "MEDIUM/img14.jpg", "MEDIUM/img15.jpg", "MEDIUM/img16.jpg"], answer: "bunch", hint: "A group" }
  ],
  hard: [
    { images: ["HARD/img17.jpg", "HARD/img18.jpg", "HARD/img19.jpg", "HARD/img20.jpg"], answer: "light", hint: "Bright" },
    { images: ["HARD/img21.jpg", "HARD/img22.jpg", "HARD/img23.jpg", "HARD/img24.jpg"], answer: "cloth", hint: "Wearable" }
  ],
  extreme: [
    { images: ["EXTREME/img25.jpg", "EXTREME/img26.jpg", "EXTREME/img27.jpg", "EXTREME/img28.jpg"], answer: "shadow", hint: "Opposite of light" },
    { images: ["EXTREME/img29.jpg", "EXTREME/img30.jpg", "EXTREME/img31.jpg", "EXTREME/img32.jpg"], answer: "island", hint: "Paradise" },
    { images: ["EXTREME/img33.jpg", "EXTREME/img34.jpg", "EXTREME/img35.jpg", "EXTREME/img36.jpg"], answer: "battle", hint: "Combat" }
  ]
};

