const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = getRandomFoodPosition();
let score = 0;

// Mobile controls
document.getElementById('up').addEventListener('click', () => setDirection(0, -1));
document.getElementById('down').addEventListener('click', () => setDirection(0, 1));
document.getElementById('left').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('right').addEventListener('click', () => setDirection(1, 0));

// Desktop keyboard controls
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': setDirection(0, -1); break;
    case 'ArrowDown': setDirection(0, 1); break;
    case 'ArrowLeft': setDirection(-1, 0); break;
    case 'ArrowRight': setDirection(1, 0); break;
  }
});

// Game loop
function gameLoop() {
  update();
  draw();
  if (isGameOver()) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
  } else {
    setTimeout(gameLoop, 100);
  }
}

function update() {
  const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

  // Add new head and check food collision
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = getRandomFoodPosition();
  } else {
    snake.pop(); // Remove the tail if no food is eaten
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = 'lime';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function setDirection(x, y) {
  if ((x !== 0 && direction.x === 0) || (y !== 0 && direction.y === 0)) {
    direction = { x, y };
  }
}

function getRandomFoodPosition() {
  const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  return { x, y };
}

function isGameOver() {
  const head = snake[0];
  // Check wall collision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  snake.splice(0, snake.length, { x: 200, y: 200 });
  direction = { x: 0, y: 0 };
  food = getRandomFoodPosition();
  score = 0;
}

// Start the game
gameLoop();
