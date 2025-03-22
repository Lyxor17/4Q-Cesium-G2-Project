let currentLevel = "easy";
let currentRound = 0;
let score = 0;

const levels = {
    easy: [
        { images: ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg"], answer: "movie", hint: "For entertainment" },
        { images: ["images/img5.jpg", "images/img6.jpg", "images/img7.jpg", "images/img8.jpg"], answer: "photo", hint: "Taken by camera" }
    ],
    medium: [
        { images: ["images/img9.jpg", "images/img10.jpg", "images/img11.jpg", "images/img12.jpg"], answer: "patch", hint: "Cover up for wound" },
        { images: ["images/img13.jpg", "images/img14.jpg", "images/img15.jpg", "images/img16.jpg"], answer: "bunch", hint: "A group" }
    ],
    hard: [
        { images: ["images/img17.jpg", "images/img18.jpg", "images/img19.jpg", "images/img20.jpg"], answer: "light", hint: "Bright" },
        { images: ["images/img21.jpg", "images/img22.jpg", "images/img23.jpg", "images/img24.jpg"], answer: "cloth", hint: "Wearable" }
    ],
    extreme: [
        { images: ["images/img25.jpg", "images/img26.jpg", "images/img27.jpg", "images/img28.jpg"], answer: "shadow", hint: "Opposite of light" },
        { images: ["images/img29.jpg", "images/img30.jpg", "images/img31.jpg", "images/img32.jpg"], answer: "island", hint: "Paradise" },
        { images: ["images/img33.jpg", "images/img34.jpg", "images/img35.jpg", "images/img36.jpg"], answer: "battle", hint: "Combat" }
    ]
};

function saveUsername() {
    let username = document.getElementById("username").value.trim();
    
    if (username) {
        localStorage.setItem("username", username);
        document.getElementById("greeting").textContent = "Welcome, " + username + "!";
        document.getElementById("username-container").style.display = "none"; 
        document.getElementById("game-container").style.display = "block"; 
        loadRound();
    }
}

function checkAnswer() {
    let answerInput = document.getElementById("answer-input");
    let feedback = document.getElementById("feedback");
    let scoreDisplay = document.getElementById("score");

    let answer = answerInput.value.toLowerCase().trim();
    let correctAnswer = levels[currentLevel][currentRound].answer;

    if (answer === correctAnswer) {
        feedback.textContent = "✅ Correct!";
        score += 5;
    } else {
        feedback.textContent = "❌ Try Again!";
    }
    
    scoreDisplay.textContent = score;
}

function useHint() {
    let scoreDisplay = document.getElementById("score");

    if (score > 0) {
        score -= 1;
        alert("Hint: " + levels[currentLevel][currentRound].hint);
        scoreDisplay.textContent = score;
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
}

function loadRound() {
    let round = levels[currentLevel][currentRound];

    document.getElementById("img1").src = round.images[0];
    document.getElementById("img2").src = round.images[1];
    document.getElementById("img3").src = round.images[2];
    document.getElementById("img4").src = round.images[3];

    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").textContent = "";

    let nextButton = document.querySelector("button[onclick='nextRound()']");
    if (currentRound >= levels[currentLevel].length - 1) {
        nextButton.style.display = "none"; // Hide next round button on last question
    } else {
        nextButton.style.display = "block"; // Show next round button
    }
}

// Check for stored username
let storedUsername = localStorage.getItem("username");
if (storedUsername) {
    document.getElementById("greeting").textContent = "Welcome back, " + storedUsername + "!";
    document.getElementById("username-container").style.display = "block"; 
    document.getElementById("game-container").style.display = "none"; 
}
