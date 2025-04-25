const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const gridSizeInput = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const resetBtn = document.getElementById("resetBtn");

let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");

    pixel.addEventListener("mouseover", () => {
      if (mouseDown) {
        pixel.style.backgroundColor = colorPicker.value;
      }
    });

    grid.appendChild(pixel);
  }
}

gridSizeValue.textContent = gridSizeInput.value;

gridSizeInput.addEventListener("input", () => {
  const newSize = gridSizeInput.value;
  gridSizeValue.textContent = newSize;
  createGrid(newSize);
});

resetBtn.addEventListener("click", () => {
  const sketch = document.querySelector(".etch-a-sketch");

  // Add the shake animation
  sketch.classList.add("shake");

  // After the animation completes (600ms), remove the shake and clear the grid
  setTimeout(() => {
    sketch.classList.remove("shake");

    // Clear the grid by resetting each pixel to white
    document.querySelectorAll(".pixel").forEach((pixel) => {
      pixel.style.backgroundColor = "white";
    });
  }, 600); // Match the duration of the shake animation (600ms)
});

createGrid(gridSizeInput.value);
