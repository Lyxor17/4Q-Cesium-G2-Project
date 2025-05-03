const difficulties = ["easy", "medium", "hard", "extreme"];
const words = ["movie", "photo", "patch", "bunch", "light", "cloth", "shadow", "island", "battle"];

let currentDifficultyIndex = 0;
let currentLevel = difficulties[currentDifficultyIndex];
let currentRound = 0;
let score = 0;
let answered = false;

let highScore = parseInt(localStorage.getItem('highscore')) || 0;
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("highscore").textContent = "High score: " + highScore;

  const storedUsername = localStorage.getItem("username");
  const expiration = localStorage.getItem("username_expiration");
  if (storedUsername && expiration) {
    document.getElementById("greeting").textContent = "Welcome back, " + storedUsername + "!";
    document.getElementById("storage-info").textContent =
      "Local Storage - Username: " + storedUsername + " | Expires: " + expiration;
    document.getElementById("username-container").style.display = "block";
    document.getElementById("rules-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    showHomepageHighScore();
  }
});

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highscore', highScore);
  }
  document.getElementById("highscore").textContent = "High score: " + highScore;
}

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

function saveUsername() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  if (!username) return;

  currentDifficultyIndex = 0;
  currentLevel = difficulties[0];
  currentRound = 0;
  score = 0;
  answered = false;
  document.getElementById("score").textContent = score;

  localStorage.setItem("username", username);

  const now = new Date();
  const expirationDate = new Date(now.setMonth(now.getMonth() + 1));
  const formattedExpiration = expirationDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  localStorage.setItem("username_expiration", formattedExpiration);

  document.getElementById("greeting").textContent = "Welcome, " + username + "!";
  document.getElementById("storage-info").textContent =
    "Local Storage - Username: " + username + " | Expires: " + formattedExpiration;

  showGameScreen();
}

function showGameScreen() {
  document.getElementById("username-container").style.display = "none";
  document.getElementById("rules-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  loadRound();
}

function loadRound() {
  if (currentDifficultyIndex === 0 && currentRound === 0 && !answered) {
    alert("Let's start the game!");
  }

  const round = levels[currentLevel][currentRound];
  ["img1", "img2", "img3", "img4"].forEach((id, i) => {
    document.getElementById(id).src = round.images[i];
  });

  document.getElementById("answer-input").value = "";
  document.getElementById("feedback").textContent = "";

  if (currentRound < levels[currentLevel].length - 1) {
    document.getElementById("next-round-btn").textContent = "Next Round";
  } else if (currentLevel !== "extreme") {
    document.getElementById("next-round-btn").textContent = "Next Level";
  } else {
    document.getElementById("next-round-btn").textContent = "Finish Game";
  }
}

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
function goToHomepage() {
  resetGame();
  showHomepageHighScore();
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

function showHomepageHighScore() {
  const hs = parseInt(localStorage.getItem('highscore')) || 0;
  document.getElementById("homepage-highscore").textContent = "High Score: " + hs;
}

function goToHomepage() {
  resetGame();
  showHomepageHighScore();
}
