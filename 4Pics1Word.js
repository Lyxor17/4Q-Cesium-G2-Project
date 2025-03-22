let currentLevel = "easy";
let currentRound = 0;
let score = 0;

const levels = {
    easy: [
        { images: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"], answer: "movie", hint: "For entertainment" },
        { images: ["img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"], answer: "photo", hint: "Taken by camera" }
    ],
    medium: [
        { images: ["img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg"], answer: "patch", hint: "Cover up for wound" },
        { images: ["img13.jpg", "img14.jpg", "img15.jpg", "img16.jpg"], answer: "bunch", hint: "A group" }
    ],
    hard: [
        { images: ["img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg"], answer: "cloth", hint: "Wearable" },
        { images: ["img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg"], answer: "light", hint: "Bright" }
    ],
    extreme: [
        { images: ["img25.jpg", "img26.jpg", "img27.jpg", "img28.jpg"], answer: "shadow", hint: "Opposite of light" },
        { images: ["img29.jpg", "img30.jpg", "img31.jpg", "img32.jpg"], answer: "island", hint: "Paradise" },
        { images: ["img33.jpg", "img34.jpg", "img35.jpg", "img36.jpg"], answer: "battle", hint: "Combat" }
    ]
};

function saveUsername() {
    let username = document.getElementById("username").value.trim();

    if (username) {
        localStorage.setItem("username", username);
        document.getElementById("greeting").textContent = "Welcome, " + username + "!";
        showGameScreen();
    }
}

function showGameScreen() {
    document.getElementById("username-container").style.display = "none"; 
    document.getElementById("rules-container").style.display = "none";
    document.getElementById("game-container").style.display = "block"; 
    loadRound();
}

function loadRound() {
    let round = levels[currentLevel][currentRound];

    document.getElementById("img1").src = round.images[0];
    document.getElementById("img2").src = round.images[1];
    document.getElementById("img3").src = round.images[2];
    document.getElementById("img4").src = round.images[3];

    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-round-btn").style.display = 
        currentRound >= levels[currentLevel].length - 1 ? "none" : "block"; 
}

function checkAnswer() {
    let answerInput = document.getElementById("answer-input").value.toLowerCase().trim();
    let correctAnswer = levels[currentLevel][currentRound].answer;
    let feedback = document.getElementById("feedback");

    if (answerInput === correctAnswer) {
        feedback.textContent = "✅ Correct!";
        score += 5;
    } else {
        feedback.textContent = "❌ Try Again!";
    }
    
    document.getElementById("score").textContent = score;
}

function useHint() {
    if (score > 0) {
        score -= 1;
        alert("Hint: " + levels[currentLevel][currentRound].hint);
        document.getElementById("score").textContent = score;
    } else {
        alert("Not enough points for a hint!");
    }
}

function nextRound() {
    if (currentRound < levels[currentLevel].length - 1) {
        currentRound++;
        loadRound();
    } else {
        alert("🎉 Game Over! Final Score: " + score);
        resetGame();
    }
}

function resetGame() {
    currentLevel = "easy";
    currentRound = 0;
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("username-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("rules-container").style.display = "block";
}


let storedUsername = localStorage.getItem("username");
if (storedUsername) {
    document.getElementById("greeting").textContent = "Welcome back, " + storedUsername + "!";
    document.getElementById("username-container").style.display = "block"; 
    document.getElementById("rules-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
}
