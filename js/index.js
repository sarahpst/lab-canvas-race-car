const canvas = document.querySelector("#canvas");
const startScreen = document.querySelector(".game-intro");
const ctx = canvas.getContext("2d");
const roadImg = new Image();
roadImg.src = "../images/road.png";
let grassWidth = 50;
const carImg = new Image();
carImg.src = "../images/car.png";
let carMouvement = 34;
carImg.width = 50;
carImg.height = 100;
let carPositionX = canvas.width / 2 - 25;
let carPositionY = canvas.height - 200;
let obstacleArray = [];

let obstaclesWidth = 100;
let obstaclesSpace = 280;
let obstaclesHeight = 30;
let maxObstaclesPositionX = canvas.width - obstaclesWidth - grassWidth;

ctx.fillStyle = "black";
let score = 0;
let animateId;
var fps = 30;

window.onload = () => {
  canvas.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    console.log("game start");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    ctx.fillStyle = "Black";
    obstacleInitiallValue();
    animate();
  }

  const obstacleInitiallValue = () => {
    obstacleArray = [];
    for (let i = 0; i < 3; i++) {
      obstacleArray.push({
        posX: Math.random() * (maxObstaclesPositionX - grassWidth) + grassWidth,
        posY: -obstaclesSpace * i,
      });
    }
  };

  const drawRoad = () => {
    ctx.beginPath();
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
  };

  const drawCar = () => {
    ctx.beginPath();
    ctx.drawImage(
      carImg,
      carPositionX,
      carPositionY,
      carImg.width,
      carImg.height
    );
    ctx.fill();
    ctx.closePath();
  };

  const drawObstacles = () => {
    obstacleArray.forEach((obstacle) => {
      obstacle.posY += 1;
      if (obstacle.posY + obstaclesHeight >= canvas.height) {
        obstacle.posY = 0;
        obstacle.posX =
          Math.random() * (maxObstaclesPositionX - grassWidth) + grassWidth;
        score += 1;
      }
      ctx.beginPath();
      ctx.rect(obstacle.posX, obstacle.posY, obstaclesWidth, obstaclesHeight);
      ctx.fill();
      ctx.closePath();
    });
  };

  const drawScore = () => {
    ctx.font = "30px sans-serif";
    ctx.fillText(`Score: ${score}`, 10, 30);
  };

  const animate = () => {
    let myInterval = setInterval(() => {
      drawRoad();
      drawCar();
      drawObstacles();
      drawScore();

      //colission
      obstacleArray.forEach((obstacle) => {
        if (
          obstacle.posY + obstaclesHeight >= carPositionY &&
          obstacle.posY <= carPositionY + carImg.height &&
          obstacle.posX + obstaclesWidth >= carPositionX &&
          obstacle.posX <= carPositionX + carImg.width
        ) {
          ctx.font = "45px sans-serif";
          ctx.fillStyle = "black";
          ctx.fillRect(20, 200, canvas.width - 40, canvas.height / 2);
          ctx.fillStyle = "red";
          ctx.fillText("Game over", canvas.width / 2 - 120, canvas.height / 2);
          ctx.fillStyle = "white";
          ctx.fillText(
            "Your final score " + score,
            canvas.width / 2 - 180,
            canvas.height / 2 + 80
          );
          setTimeout(() => {
            canvas.style.display = "none";
            startScreen.style.display = "block";
          }, 3000);
          clearInterval(myInterval);
        }
      });
    }, 1);
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && carPositionX > grassWidth) {
      carPositionX -= carMouvement;
    }
    if (
      e.key === "ArrowRight" &&
      carPositionX < canvas.width - carImg.width - grassWidth
    ) {
      carPositionX += carMouvement;
    }
  });
};
