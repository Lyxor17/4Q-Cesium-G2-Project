let currentLevel = "easy";
let currentRound = 0;
let score = 0;

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
        { images: ["HARD/img17.jpg", "HARD/img18.jpg", "HARD/img19.jpg", "HARD/img20.jpg"], answer: "cloth", hint: "Wearable" },
        { images: ["HARD/img21.jpg", "HARD/img22.jpg", "HARD/img23.jpg", "HARD/img24.jpg"], answer: "light", hint: "Bright" }
    ],
    extreme: [
        { images: ["EXTREME/img25.jpg", "EXTREME/img26.jpg", "EXTREME/img27.jpg", "EXTREME/img28.jpg"], answer: "shadow", hint: "Opposite of light" },
        { images: ["EXTREME/img29.jpg", "EXTREME/img30.jpg", "EXTREME/img31.jpg", "EXTREME/img32.jpg"], answer: "island", hint: "Paradise" },
        { images: ["EXTREME/img33.jpg", "EXTREME/img34.jpg", "EXTREME/img35.jpg", "EXTREME/img36.jpg"], answer: "battle", hint: "Combat" }
    ]
};

// Function to set a cookie with a specified expiration (in days)
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    
    // Log the expiration date, current day and month in the console
    console.log("Cookie set:");
    console.log("Name:", name);
    console.log("Value:", value);
    console.log("Expiration Date:", date.toUTCString());
    console.log("Current Day:", date.getDate());
    console.log("Current Month:", date.getMonth() + 1);
}

function saveUsername() {
    let username = document.getElementById("username").value.trim();

    if (username) {
        // Save username in localStorage
        localStorage.setItem("username", username);
        // Also save username in a cookie with a 30-day expiration
        setCookie("username", username, 30);
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
    alert('lets start the game!');
    let round = levels[currentLevel][currentRound];

    document.getElementById("img1").src = round.images[0];
    document.getElementById("img2").src = round.images[1];
    document.getElementById("img3").src = round.images[2];
    document.getElementById("img4").src = round.images[3];

    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").textContent = "";

    // Always show the Next Round button and update its text based on the round.
    let nextRoundBtn = document.getElementById("next-round-btn");
    nextRoundBtn.style.display = "block";
    if (currentRound >= levels[currentLevel].length - 1) {
        nextRoundBtn.textContent = "Finish Game";
    } else {
        nextRoundBtn.textContent = "Next Round";
    }
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
