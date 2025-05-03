
// Define the order of difficulties.
const difficulties = ["easy", "medium", "hard", "extreme"];
let currentDifficultyIndex = 0;
let currentLevel = difficulties[currentDifficultyIndex];
let currentRound = 0;
let score = 0;
let answered = false;

// Load & display high score from localStorage
let highScore = parseInt(localStorage.getItem('highscore')) || 0;
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("highscore").textContent = "High score: " + highScore;
});

// Update high score if beaten
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highscore', highScore);
  }
  document.getElementById("highscore").textContent = "High score: " + highScore;
}

// Each difficulty's rounds:
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

// Save username and reset game state (localStorage only)
function saveUsername() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  if (!username) return;

  // Reset game state
  currentDifficultyIndex = 0;
  currentLevel = difficulties[0];
  currentRound = 0;
  score = 0;
  answered = false;
  document.getElementById("score").textContent = score;

  localStorage.setItem("username", username);
  document.getElementById("greeting").textContent = "Welcome, " + username + "!";
  document.getElementById("storage-info").textContent = "Local Storage - Username: " + username;

  showGameScreen();
}

function showGameScreen() {
  document.getElementById("username-container").style.display = "none";
  document.getElementById("rules-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  loadRound();
}

function loadRound() {
  // Alert on very first round
  if (currentDifficultyIndex === 0 && currentRound === 0 && !answered) {
    alert("Let's start the game!");
  }

  const round = levels[currentLevel][currentRound];
  ["img1","img2","img3","img4"].forEach((id,i) => {
    document.getElementById(id).src = round.images[i];
  });

  const inputEl = document.getElementById("answer-input");
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();

  document.getElementById("feedback").textContent = "";

  const nextBtn = document.getElementById("next-round-btn");
  nextBtn.disabled = true;
  setTimeout(() => nextBtn.disabled = false, 500);

  nextBtn.style.display = "block";
  if (currentRound < levels[currentLevel].length - 1) {
    nextBtn.textContent = "Next Round";
  } else if (currentLevel !== "extreme") {
    nextBtn.textContent = "Next Level";
  } else {
    nextBtn.textContent = "Finish Game";
  }
}

function checkAnswer() {
  const inputEl = document.getElementById("answer-input");
  const answerInput = inputEl.value.toLowerCase().trim();
  const correctAnswer = levels[currentLevel][currentRound].answer;
  const feedback = document.getElementById("feedback");

  if (answerInput === correctAnswer && !answered) {
    feedback.textContent = "✅ Correct!";
    score += 5;
    answered = true;
    inputEl.disabled = true;
    document.getElementById("score").textContent = score;
    updateHighScore();
  } else if (!answered) {
    feedback.textContent = "❌ Try Again!";
  }
}

function useHint() {
  if (!answered && score > 0) {
    score -= 1;
    alert("Hint: " + levels[currentLevel][currentRound].hint);
    document.getElementById("score").textContent = score;
  } else if (!answered) {
    alert("Not enough points for a hint!");
  }
}

function nextRound() {
  answered = false;
  if (currentRound < levels[currentLevel].length - 1) {
    currentRound++;
  } else if (currentLevel !== "extreme") {
    currentDifficultyIndex++;
    currentLevel = difficulties[currentDifficultyIndex];
    currentRound = 0;
    alert("Advancing to " + currentLevel + " level!");
  } else {
    alert("🎉 Game Over! Final Score: " + score);
    resetGame();
    return;
  }
  loadRound();
}

function resetGame() {
  currentDifficultyIndex = 0;
  currentLevel = difficulties[0];
  currentRound = 0;
  score = 0;
  answered = false;
  document.getElementById("score").textContent = score;

  document.getElementById("username-container").style.display = "block";
  document.getElementById("rules-container").style.display = "block";
  document.getElementById("game-container").style.display = "none";
}

// Show high score on homepage
function showHomepageHighScore() {
  const hs = parseInt(localStorage.getItem('highscore')) || 0;
  document.getElementById("homepage-highscore").textContent = "High Score: " + hs;
}

// Back to homepage
function goToHomepage() {
  resetGame();
  showHomepageHighScore();
}

// On page load, if a username exists, show greeting
  document.addEventListener('DOMContentLoaded', () => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    document.getElementById("greeting").textContent = "Welcome back, " + storedUsername + "!";
    document.getElementById("storage-info").textContent = "Local Storage - Username: " + storedUsername;
    document.getElementById("username-container").style.display = "block";
    document.getElementById("rules-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";

     showHomepageHighScore();
  }

});
