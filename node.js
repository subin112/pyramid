let intervalId;
let currentRow = 0;
let isBlinking = false;

function generatePyramid() {
  const rowCount = document.getElementById("rowCount").value;
  const pyramidContainer = document.getElementById("pyramidContainer");
  pyramidContainer.innerHTML = "";

    for (let i = 1; i <= rowCount *2; i += 2) {
    const row = document.createElement("div");
    row.className = "pyramid-row";
    row.dataset.rowNumber = i;

    
    for (let j = 1; j <= i; j++) {
      const button = document.createElement("button");
      button.className = "round-button";
      button.id = `lights${i}_${j}`;
      row.appendChild(button);
    }

    pyramidContainer.appendChild(row);
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function startBlink() {
  stopBlink();
  currentRow = 0;
  isBlinking = true;
  const delay = parseInt(document.getElementById("delay").value) || 1000;
  intervalId = setInterval(() => {
    if (isBlinking) {
      blinkRow(currentRow);
      currentRow = (currentRow + 1) % document.querySelectorAll(".pyramid-row").length;
    }
  }, delay);
}

function blinkRow(rowIndex) {
  const rows = document.querySelectorAll(".pyramid-row");
  if (rowIndex < rows.length) {
    rows.forEach((row, index) => {
      const color = index === rowIndex ? getRandomColor() : "";
      row.querySelectorAll(".round-button").forEach((button) => {
        button.style.backgroundColor = color;
      });
    });
  }
}

function stopBlink() {
  isBlinking = false;
  clearInterval(intervalId);
  intervalId = null;
}
