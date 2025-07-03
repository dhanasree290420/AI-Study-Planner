function generatePlan() {
  const subjects = document.getElementById("subjects").value.split(",");
  const hours = parseInt(document.getElementById("hours").value);
  const days = parseInt(document.getElementById("days").value);
  const plan = [];

  let hoursPerSubject = Math.floor((days * hours) / subjects.length);

  for (let i = 0; i < subjects.length; i++) {
    plan.push({
      subject: subjects[i].trim(),
      hours: hoursPerSubject,
      completed: false
    });
  }

  // Save plan to localStorage
  localStorage.setItem("studyPlan", JSON.stringify(plan));

  renderPlan(plan);
  startReminder();
  showRandomQuote();

}

function renderPlan(plan) {
  let outputHTML = `<h3>Your Study Plan:</h3><ul style="list-style: none; padding: 0;">`;

  plan.forEach((p, index) => {
    outputHTML += `
      <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span>${p.subject} → ${p.hours} hours</span>
        <input type="checkbox" class="subject-checkbox" onchange="toggleSubject(${index})" ${p.completed ? "checked" : ""}>
      </li>`;
  });

  outputHTML += `</ul><p id="progressText" style="font-weight: bold;">Progress: ${getProgress(plan)}%</p>`;
  document.getElementById("output").innerHTML = outputHTML;
}



function toggleSubject(index) {
  const plan = JSON.parse(localStorage.getItem("studyPlan")) || [];
  plan[index].completed = !plan[index].completed;

  localStorage.setItem("studyPlan", JSON.stringify(plan));
  renderPlan(plan);
  showRandomQuote();

}

function getProgress(plan) {
  const total = plan.length;
  const completed = plan.filter(p => p.completed).length;
  return Math.round((completed / total) * 100);
}

function startReminder() {
  // Clears previous reminders if any
  if (window.studyInterval) {
    clearInterval(window.studyInterval);
  }

  // Every 30 minutes (you can change it for testing)
  window.studyInterval = setInterval(() => {
    alert("⏰ Time to study! Stay focused 💪");
  }, 30 * 60 * 1000); // Change to 1 * 60 * 1000 for 1-minute test
}

// Load saved plan on page reload
window.onload = function () {
  const savedPlan = JSON.parse(localStorage.getItem("studyPlan"));
  if (savedPlan && savedPlan.length > 0) {
    renderPlan(savedPlan);
    startReminder();
  }
  showRandomQuote();

};

function clearPlan() {
  localStorage.removeItem("studyPlan");
  location.reload(); // Refresh the page
}
const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Consistency is more important than perfection.",
  "Keep grinding. Your future self will thank you."
];

function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").innerText = `"${quote}"`;
}

