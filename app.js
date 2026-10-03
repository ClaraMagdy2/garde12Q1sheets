const QUIZ_DATA = {"sheet1": [{"q": "Which component manages CPU, memory and hardware resources?", "options": ["Operating system", "Web browser", "Router", "Spreadsheet"], "answer": 0}, {"q": "Which layer is closest to the person using the hospital system?", "options": ["User and web interface", "Operating system", "Hardware sensor", "Network cable"], "answer": 0}, {"q": "Which is an input in the hospital circuit?", "options": ["Red LED", "Piezo buzzer", "Temperature sensor", "Speaker output"], "answer": 2}, {"q": "If the emergency button is HIGH OR temperature is above the threshold, what should happen?", "options": ["Activate emergency outputs", "Delete the patient record", "Turn off Arduino", "Disconnect the network"], "answer": 0}, {"q": "Which is an output device?", "options": ["TMP36 sensor", "Pushbutton", "Red LED", "A0 input"], "answer": 2}], "sheet2": [{"q": "What device directs packets between networks?", "options": ["Router", "LED", "Keyboard", "Sensor"], "answer": 0}, {"q": "What does bandwidth describe?", "options": ["Amount of data that can be transmitted over a period", "Server size", "Password length", "Number of Python functions"], "answer": 0}, {"q": "What does network latency measure?", "options": ["Communication delay", "Storage capacity", "Screen brightness", "Password complexity"], "answer": 0}, {"q": "Which security concept verifies who a user is?", "options": ["Authentication", "Bandwidth", "Latency", "Compression"], "answer": 0}, {"q": "Why log failed login attempts?", "options": ["To help identify possible unauthorized access", "Increase CPU temperature", "Replace the router", "Change a sensor into an output"], "answer": 0}], "sheet3": [{"q": "Which Python statement makes a decision based on a condition?", "options": ["if", "print", "import", "list"], "answer": 0}, {"q": "Which keyword defines a Python function?", "options": ["def", "function", "make", "define"], "answer": 0}, {"q": "For temperature 39.2, heart rate 125, and oxygen 88, what is the project algorithm result?", "options": ["CRITICAL EMERGENCY", "STABLE", "WARNING - MONITOR", "NO DATA"], "answer": 0}, {"q": "Which structure stores an ordered collection of patient records?", "options": ["List", "Boolean only", "Comment", "Single integer"], "answer": 0}, {"q": "What is a dictionary useful for in a patient record?", "options": ["Storing key-value information such as ID, room and temperature", "Connecting networks", "Producing sound", "Measuring latency"], "answer": 0}], "revision": [{"q": "Which part manages hardware resources?", "options": ["Operating system", "Monitor", "Router", "Database"], "answer": 0}, {"q": "An operating system can manage memory and CPU resources.", "options": ["True", "False"], "answer": 0}, {"q": "Which is an input in the hospital project?", "options": ["Temperature sensor", "Red LED", "Buzzer", "Screen"], "answer": 0}, {"q": "A buzzer is normally an output device.", "options": ["True", "False"], "answer": 0}, {"q": "Which logic operator means either condition can trigger an action?", "options": ["OR", "NOT", "ONLY", "LOOP"], "answer": 0}, {"q": "Which device forwards packets between networks?", "options": ["Router", "LED", "TMP36", "Pushbutton"], "answer": 0}, {"q": "Lower latency generally means less communication delay.", "options": ["True", "False"], "answer": 0}, {"q": "A LAN typically connects devices within a limited area.", "options": ["True", "False"], "answer": 0}, {"q": "Which process checks a user's identity?", "options": ["Authentication", "Latency", "Routing", "Iteration"], "answer": 0}, {"q": "Authorization determines what an authenticated user is allowed to access.", "options": ["True", "False"], "answer": 0}, {"q": "Which Python keyword begins a conditional?", "options": ["if", "for", "def", "return"], "answer": 0}, {"q": "Python functions can accept parameters.", "options": ["True", "False"], "answer": 0}, {"q": "Which Python structure stores key-value pairs?", "options": ["Dictionary", "List only", "String", "Loop"], "answer": 0}, {"q": "Which condition represents a critical oxygen reading?", "options": ["oxygen < 90", "oxygen > 100", "oxygen == 98", "oxygen > 95"], "answer": 0}, {"q": "A list can contain multiple dictionary records.", "options": ["True", "False"], "answer": 0}, {"q": "What is the main purpose of an algorithm?", "options": ["Provide a sequence of steps for solving a problem", "Increase screen size", "Replace all hardware", "Create a network cable"], "answer": 0}, {"q": "Testing an algorithm with different inputs helps check its behavior.", "options": ["True", "False"], "answer": 0}, {"q": "Which Python statement repeats over items in a collection?", "options": ["for", "if", "def", "input"], "answer": 0}, {"q": "What is modular programming mainly about?", "options": ["Organizing a program into reusable components or functions", "Removing all functions", "Using only hardware", "Increasing bandwidth"], "answer": 0}, {"q": "A dictionary can store fields such as patient ID, room and temperature.", "options": ["True", "False"], "answer": 0}]};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderQuiz(name) {
  const form = document.querySelector('[data-quiz="' + name + '"]');
  if (!form) return;
  form.innerHTML = "";
  const questions = QUIZ_DATA[name];

  questions.forEach((item, index) => {
    const question = document.createElement("div");
    question.className = "question";
    question.dataset.correct = item.answer;

    const number = document.createElement("b");
    number.textContent = "QUESTION " + (index + 1) + " OF " + questions.length;
    question.appendChild(number);

    const title = document.createElement("h3");
    title.textContent = (index + 1) + ". " + item.q;
    question.appendChild(title);

    const choices = document.createElement("div");
    const shuffled = shuffle(item.options.map((text, originalIndex) => ({text, originalIndex})));

    shuffled.forEach((choice, displayIndex) => {
      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = name + "-" + index;
      input.value = choice.originalIndex;

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + String.fromCharCode(65 + displayIndex) + ". " + choice.text));
      choices.appendChild(label);
    });

    question.appendChild(choices);

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    question.appendChild(feedback);

    form.appendChild(question);
  });

  const bar = document.createElement("div");
  bar.className = "bar";
  bar.innerHTML = '<span>Choose one answer for every question.</span><div><button type="button" class="reset">Shuffle Choices</button> <button type="button" class="submit">Submit & Check Answers</button></div>';
  form.appendChild(bar);

  bar.querySelector(".reset").addEventListener("click", () => renderQuiz(name));
  bar.querySelector(".submit").addEventListener("click", () => checkQuiz(form, name));
}

function checkQuiz(form, name) {
  let score = 0;
  let answered = 0;
  const questions = QUIZ_DATA[name];

  form.querySelectorAll(".question").forEach((question) => {
    question.querySelectorAll(".option").forEach(label => label.classList.remove("correct", "wrong"));

    const selected = question.querySelector("input:checked");
    const feedback = question.querySelector(".feedback");

    if (!selected) {
      feedback.textContent = "Please select an answer.";
      feedback.style.color = "#9a7621";
      return;
    }

    answered++;
    const correctAnswer = Number(question.dataset.correct);
    const selectedAnswer = Number(selected.value);
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) score++;

    question.querySelectorAll(".option").forEach(label => {
      const input = label.querySelector("input");
      if (Number(input.value) === correctAnswer) label.classList.add("correct");
      else if (input.checked) label.classList.add("wrong");
    });

    feedback.textContent = isCorrect ? "✓ Correct" : "✗ Incorrect — the correct answer is highlighted.";
    feedback.style.color = isCorrect ? "#287d52" : "#b33f49";
  });

  const barText = form.querySelector(".bar span");
  if (answered === questions.length) {
    const percent = Math.round((score / questions.length) * 100);
    barText.textContent = "Score: " + score + "/" + questions.length + " (" + percent + "%)";
  } else {
    barText.textContent = "Answered " + answered + "/" + questions.length + " — complete all questions.";
  }
}

function showPage(pageName) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  const page = document.getElementById(pageName);
  if (page) page.classList.add("active");

  document.querySelectorAll("nav button").forEach(button => {
    button.classList.toggle("active", button.dataset.page === pageName);
  });

  window.scrollTo({top: 0, behavior: "smooth"});
  if (QUIZ_DATA[pageName]) renderQuiz(pageName);
}

document.querySelectorAll("nav button").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.go));
});

["sheet1", "sheet2", "sheet3", "revision"].forEach(renderQuiz);
