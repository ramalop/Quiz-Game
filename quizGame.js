const quesJSON = [
  {
    correctAnswer: "Venus",
    options: ["Earth", "Saturn", "Venus", "Jupiter"],
    question:
      "What is the only planet in our solar system to rotate clockwise on its axis?",
  },
  {
    correctAnswer: "Rabindranath Tagore",
    options: ["Jawaharlal Nehru", "Rabindranath Tagore", "Arundhati Roy"],
    question: "Who is the writer of Jana Gana Mana?",
  },
  {
    correctAnswer: "Narmada",
    options: ["Narmada", "Mahanadi", "Son", "Netravati"],
    question:
      "Which one of the following rivers flows between Vindhyan and Satpura ranges?",
  },
  {
    correctAnswer: "Panini",
    options: ["Kalidasa", "Charak", "Panini", "Aryabhatt"],
    question: "Who among the following wrote Sanskrit grammar?",
  },
  {
    correctAnswer: "Silver",
    options: ["Zinc", "Silver", "Copper", "Aluminum"],
    question: "The metal whose salts are sensitive to light is?",
  },
];

let score = 0;
let currentQuestion = 0;
let selectedOption = null;
const total = quesJSON.length;

// Select DOM elements
const questionDiv = document.getElementById("question");
const optionDiv = document.getElementById("options");
const scoreDiv = document.getElementById("score");
const nextBtn = document.getElementById("next");
const subBtn = document.getElementById("submit");
const prevBtn = document.getElementById("prev");
const restartContainer = document.getElementById("restart-container");

// Create restart button
const restartBtn = document.createElement("button");
restartBtn.textContent = "Restart Quiz";
restartBtn.id = "restart";
restartBtn.className = "nav-btn";

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;

  subBtn.style.visibility = "visible";
  nextBtn.style.visibility = "visible";
  prevBtn.style.visibility = "visible";

  restartBtn.remove();
  showQuestion();
  scoreDiv.textContent = `Score: ${score}/${total}`;
});

showQuestion();

function showQuestion() {
  const { question, options } = quesJSON[currentQuestion];
  const shuffledOptions = shuffle([...options]);

  questionDiv.textContent = question;
  optionDiv.innerHTML = "";
  selectedOption = null;
  subBtn.disabled = true;

  prevBtn.disabled = currentQuestion === 0;

  nextBtn.textContent =
    currentQuestion === quesJSON.length - 1 ? "Finish" : "Next...";

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.addEventListener("click", () => {
      selectedOption = opt;
      subBtn.disabled = false;
      Array.from(optionDiv.children).forEach((b) =>
        b.classList.remove("selected")
      );
      btn.classList.add("selected");
    });
    optionDiv.appendChild(btn);
  });
}

subBtn.addEventListener("click", () => {
  if (!selectedOption) return;

  const correctAnswer = quesJSON[currentQuestion].correctAnswer;
  if (selectedOption === correctAnswer) {
    score++;
  } else {
    score -= 0.25;
  }

  scoreDiv.textContent = `Score: ${score}/${total}`;
  Array.from(optionDiv.children).forEach((btn) => (btn.disabled = true));
  subBtn.disabled = true;
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quesJSON.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    // Quiz complete
    questionDiv.textContent = "🎉 Quiz Completed!";
    optionDiv.innerHTML = "";
    scoreDiv.textContent = `Final Score: ${score}/${total}`;

    subBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "hidden";
    prevBtn.style.visibility = "hidden";

    restartContainer.appendChild(restartBtn);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
    scoreDiv.textContent = `Score: ${score}/${total}`;
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
