const sablik = document.querySelector(".sablik");
const gameSpace = document.querySelector("#game");

//add space keybord clikc event listener

let currentJump = 0;
let over = false;

const runGame = () => {
  const obstacles = [];

  const gen = setInterval(() => {
    const obstacle = generateObstacle();
    obstacles.push(obstacle);
  }, 3000);

  const move = setInterval(() => {
    obstacles.forEach((obstacle) => {
      const left = obstacle.style.left.replace("%", "");
      obstacle.style.left = left - 1 + "%";
      obstacle.getBoundingClientRect().x;
      if (obstacle.getBoundingClientRect().x < 0) {
        obstacle.remove();
      }

      //check collision

      const sablikY = sablik.getBoundingClientRect().y;
      const sablikX = sablik.getBoundingClientRect().x;
      const obstacleX = obstacle.getBoundingClientRect().x;
      const obstacleWidth = obstacle.getBoundingClientRect().width;
      const sablikHeight = sablik.getBoundingClientRect().height;
      const sablikWidth = sablik.getBoundingClientRect().width;
      const topObstacle = obstacle.querySelector(".top");
      const bottomObstacle = obstacle.querySelector(".bottom");

      const bottomTreshold = bottomObstacle.getBoundingClientRect().y;
      const topTreshold = topObstacle.getBoundingClientRect().y + topObstacle.getBoundingClientRect().height;

      if (sablikX + sablikWidth >= obstacleX && sablikX < obstacleX + obstacleWidth && (sablikY < topTreshold || sablikY + sablikHeight > bottomTreshold)) {
        if (sablikX + sablikWidth > obstacle.getBoundingClientRect().x) {
          gameOver();
        }
      }
    });
  }, 50);

  const gameOver = () => {
    clearInterval(interval);
    clearInterval(gen);
    clearInterval(move);

    over = true;
    setTimeout(() => {
      alert("Game Over");
      runGame();
    }, 1000);
  };

  document.addEventListener("keydown", function (e) {
    if (over) return;
    if (sablik.classList.contains("jump")) return;
    currentJump += 20;
    if (currentJump > 100) {
      currentJump = 100;
    }
    sablik.style.transition = "bottom 0.5s";
    sablik.style.bottom = currentJump + "%";
    sablik.classList.add("jump");
    setTimeout(() => {
      sablik.classList.remove("jump");
    }, 501);
  });
  const interval = setInterval(() => {
    if (sablik.classList.contains("jump")) return;
    currentJump -= 2;
    if (currentJump < 0) {
      currentJump = 0;
    }
    sablik.style.bottom = currentJump + "%";

    const sablikY = sablik.getBoundingClientRect().y;

    if (sablikY < 0) {
      gameOver();
      currentJump = 0;
      sablik.style.transition = "bottom 1s";
      sablik.style.bottom = currentJump + "%";
    }
  }, 50);
};

const generateObstacle = () => {
  const gap = Math.random() * 50 + 25;
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = "100%";
  obstacle["data-gap"] = gap;

  const top = document.createElement("div");
  top.classList.add("top");
  top.style.height = 100 - gap - 15 + "%";

  const bottom = document.createElement("div");
  bottom.classList.add("bottom");
  bottom.style.height = gap - 15 + "%";

  obstacle.appendChild(top);
  obstacle.appendChild(bottom);
  gameSpace.appendChild(obstacle);

  return obstacle;
};

runGame();
