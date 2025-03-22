const levels = {
  easy: [
    {
      images: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"],
      answer: "movie",
      hint: "For entertainment"
    },
    {
      images: ["img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"],
      answer: "photo",
      hint: "Taken by camera"
    }
  ],
  medium: [
    {
      images: ["img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg"],
      answer: "patch",
      hint: "Cover up for wound"
    },
    {
      images: ["img13.jpg", "img14.jpg", "img15.jpg", "img16.jpg"],
      answer: "bunch",
      hint: "a group"
    }
  ],
  hard: [
    {
      images: ["img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg"],
      answer: "cloth",
      hint: "Wearable"
    },
    {
      images: ["img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg"],
      answer: "light",
      hint: "Bright"
    }
  ],
  extreme: [
    {
      images: ["img25.jpg", "img26.jpg", "img27.jpg", "img28.jpg"],
      answer: "shadow",
      hint: "Opposite of light"
    },
    {
      images: ["img29.jpg", "img30.jpg", "img31.jpg", "img32.jpg"],
      answer: "island",
      hint: "Paradise"
    },
    {
      images: ["img33.jpg", "img34.jpg", "img35.jpg", "img36.jpg"],
      answer: "battle",
      hint: "Combat"
    }
  ]
};

let currentLevel = 'easy';
let currentRound = 0;
let score = 0;

function loadRound() {
  const round = levels[currentLevel][currentRound];
  document.getElementById('img1').src = round.images[0];
  document.getElementById('img2').src = round.images[1];
  document.getElementById('img3').src = round.images[2];
  document.getElementById('img4').src = round.images[3];

  // Always display all four images
  document.getElementById('img1').style.display = 'inline-block';
  document.getElementById('img2').style.display = 'inline-block';
  document.getElementById('img3').style.display = 'inline-block';
  document.getElementById('img4').style.display = 'inline-block';

  document.getElementById('answer-input').value = '';
  document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
  const answer = document.getElementById('answer-input').value.toLowerCase();
  if (answer === levels[currentLevel][currentRound].answer) {
    document.getElementById('feedback').textContent = 'Correct!';
    score += 5;
    document.getElementById('score').textContent = score;
  } else {
    document.getElementById('feedback').textContent = 'Try Again!';
  }
}

function useHint() {
  if (score > 0) {
    score -= 1;
    alert(`Hint: ${levels[currentLevel][currentRound].hint}`);
    document.getElementById('score').textContent = score;
  } else {
    alert("Not enough points for a hint!");
  }
}

function nextRound() {
  if (currentRound < levels[currentLevel].length - 1) {
    currentRound++;
    loadRound();
  } else {
    if (currentLevel === 'easy') {
      currentLevel = 'medium';
      currentRound = 0;
      alert('Level up! Welcome to MEDIUM level!');
      loadRound();
    } else if (currentLevel === 'medium') {
      currentLevel = 'hard';
      currentRound = 0;
      alert('Level up! Welcome to HARD level!');
      loadRound();
    } else if (currentLevel === 'hard') {
      currentLevel = 'extreme';
      currentRound = 0;
      alert('Level up! Welcome to EXTREME level!');
      loadRound();
    } else {
      alert(`Game Over! Final Score: ${score}`);
      resetGame();
    }
  }
}

function resetGame() {
  currentLevel = 'easy';
  currentRound = 0;
  score = 0;
  document.getElementById('score').textContent = score;
  loadRound();
}

loadRound();
