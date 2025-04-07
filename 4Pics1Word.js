// Define the order of difficulties.
const difficulties = ["easy", "medium", "hard", "extreme"];
let currentDifficultyIndex = 0;
let currentLevel = difficulties[currentDifficultyIndex];
let currentRound = 0;
let score = 0;

// Each difficulty's rounds:
// easy, medium, hard have 2 rounds each; extreme has 3 rounds.
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

// Function to set a cookie with a specified expiration (in days) and return the expiration date as a string.
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log("Cookie set:", name, value, date.toUTCString());
    return date.toUTCString();
}

function saveUsername() {
    let username = document.getElementById("username").value.trim();
    if (username) {
        // Save username in local storage.
        localStorage.setItem("username", username);
        // Set cookie with a 30-day expiration and capture the expiration date.
        let expirationDate = setCookie("username", username, 30);
        // Save the expiration date in local storage.
        localStorage.setItem("username_expiration", expirationDate);
        // Update greeting.
        document.getElementById("greeting").textContent = "Welcome, " + username + "!";
        // Update storage info display.
        updateStorageInfo();
        showGameScreen();
    }
}

// Display the username and cookie expiration information from both storages.
function updateStorageInfo() {
    let storedUsername = localStorage.getItem("username");
    let storedExpiration = localStorage.getItem("username_expiration");
    let storageInfo = "";
    if (storedUsername && storedExpiration) {
        storageInfo += "Local Storage - Username: " + storedUsername + ", Expires on: " + storedExpiration;
    }
    // Also show cookie info by parsing document.cookie (assuming a simple cookie structure)
    let cookies = document.cookie.split("; ").reduce((acc, cookieStr) => {
        let [key, value] = cookieStr.split("=");
        acc[key] = value;
        return acc;
    }, {});
    if (cookies.username) {
        // We already know the expiration date from local storage.
        storageInfo += " | Cookie - Username: " + cookies.username + ", Expires on: " + storedExpiration;
    }
    document.getElementById("storage-info").textContent = storageInfo;
}

function showGameScreen() {
    document.getElementById("username-container").style.display = "none"; 
    document.getElementById("rules-container").style.display = "none";
    document.getElementById("game-container").style.display = "block"; 
    loadRound();
}

function loadRound() {
    // Alert only on the very first round of the game.
    if (currentDifficultyIndex === 0 && currentRound === 0) {
        alert("Let's start the game!");
    }
    let round = levels[currentLevel][currentRound];
    document.getElementById("img1").src = round.images[0];
    document.getElementById("img2").src = round.images[1];
    document.getElementById("img3").src = round.images[2];
    document.getElementById("img4").src = round.images[3];
    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").textContent = "";
    
    // Update the Next button text:
    let nextBtn = document.getElementById("next-round-btn");
    nextBtn.style.display = "block";
    // If more rounds remain in this difficulty:
    if (currentRound < levels[currentLevel].length - 1) {
        nextBtn.textContent = "Next Round";
    } else {
        // End of current difficulty.
        if (currentLevel !== "extreme") {
            nextBtn.textContent = "Next Level";
        } else {
            nextBtn.textContent = "Finish Game";
        }
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
    // If there are rounds left in the current difficulty, go to the next round.
    if (currentRound < levels[currentLevel].length - 1) {
        currentRound++;
        loadRound();
    } else {
        // End of current difficulty.
        if (currentLevel !== "extreme") {
            // Advance to the next difficulty.
            currentDifficultyIndex++;
            currentLevel = difficulties[currentDifficultyIndex];
            currentRound = 0;
            alert("Advancing to " + currentLevel + " level!");
            loadRound();
        } else {
            // Last round of extreme; finish game.
            alert("🎉 Game Over! Final Score: " + score);
            resetGame();
        }
    }
}

function resetGame() {
    // Reset back to the beginning (easy level)
    currentDifficultyIndex = 0;
    currentLevel = difficulties[currentDifficultyIndex];
    currentRound = 0;
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("username-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("rules-container").style.display = "block";
}

// On page load, if a username exists in local storage, update the greeting and storage info.
let storedUsername = localStorage.getItem("username");
if (storedUsername) {
    document.getElementById("greeting").textContent = "Welcome back, " + storedUsername + "!";
    updateStorageInfo();
    document.getElementById("username-container").style.display = "block"; 
    document.getElementById("rules-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
}
