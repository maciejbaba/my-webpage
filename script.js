const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const darkModeBtn = document.getElementById("dark-mode-toggle");
darkModeBtn.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  console.log("test");
}
