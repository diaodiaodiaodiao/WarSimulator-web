function game() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 650;

    const gameOverRect = { x: canvas.width / 2 - 150, y: canvas.height / 2 + 50, width: 300, height: 100 };
    const restartRect = { x: canvas.width / 2 - 150, y: gameOverRect.y + 120, width: 300, height: 100 };

    const backgroundImage = new Image();
    backgroundImage.src = "img/village.png";
    const gameOverBackground = new Image();
    gameOverBackground.src = "img/game_over.png";

    backgroundImage.onload = drawStartScreen;

    const game = {
        fruits: [],
        score: 0,
        lives: 3,
        gameOver: false,
        hueGameOver: 0,
        hueScore: 0,
        hueLives: 120,
        startTime: Date.now(),
        gameWon: false,
    };

    let fruitInterval;
    const clickSound = new Audio('audio/click.mp3');

    class Fruit {
        constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.alive = true;
            this.image = new Image();
            this.image.src = "img/tnt.png";
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x + 50, this.y + 50, 50, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(this.image, this.x, this.y, 100, 100);
            ctx.restore();
        }
    }

    function drawRectWithRoundCorners(x, y, width, height, cornerRadius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + width - cornerRadius, y);
        ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        ctx.lineTo(x + width, y + height - cornerRadius);
        ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
        ctx.lineTo(x + cornerRadius, y + height);
        ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        ctx.closePath();
        ctx.fill();
    }

    function drawStartScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('导弹防御战', canvas.width / 2, canvas.height / 2 - 150);

        ctx.font = '20px Arial';
        ctx.fillText('在这个游戏中，你的任务是点击屏幕拦截即将落下的导弹', canvas.width / 2, canvas.height / 2 - 80);
        ctx.fillText('保护下方的村民。如果你能坚持30秒，就能赢得胜利。', canvas.width / 2, canvas.height / 2 - 50);

        drawRectWithRoundCorners(canvas.width / 2 - 100, canvas.height / 2, 200, 60, 10, 'rgba(255, 255, 255, 0.8)');

        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('开始游戏', canvas.width / 2, canvas.height / 2 + 40);

        canvas.addEventListener('click', startGameOnClick);
    }

    function startGameOnClick(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        if (x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100 && y >= canvas.height / 2 && y <= canvas.height / 2 + 60) {
            canvas.removeEventListener('click', startGameOnClick);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clickSound.play();
            startGame();
        }
    }

    function startGame() {
        game.score = 0;
        game.lives = 3;
        game.gameOver = false;
        game.startTime = Date.now();
        game.fruits = [];
        mainLoop();

        fruitInterval = setInterval(spawnFruit, 1000);
        canvas.addEventListener("click", handleClick);
        setTimeout(checkCollision, 50);
    }

    function spawnFruit() {
        const x = Math.random() * (canvas.width - 200) + 50;
        const speed = Math.random() * 3 + 0.8;
        game.fruits.push(new Fruit(x, 0, speed));
    }

    function dynamicGradientText(text, x, y, hue) {
        const dynamicColor = "hsl(" + hue + ", 100%, 50%)";
        ctx.font = "50px Arial";
        ctx.fillStyle = dynamicColor;
        ctx.fillText(text, x, y + 10);
        return (hue + 1) % 360;
    }

    function mainLoop() {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - game.startTime) / 1000);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        if (elapsedTime >= 30 && game.lives > 0) {
            game.gameWon = true;
            game.gameOver = true;
        }

        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        game.fruits.forEach(fruit => {
            if (fruit.alive) {
                fruit.y += fruit.speed;
                fruit.draw();
            }
        });

        drawGameInfo(elapsedTime);

        if (game.gameOver) {
            drawGameOverText();
        } else {
            requestAnimationFrame(mainLoop);
        }
    }

    function drawGameInfo(elapsedTime) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.3, "orange");
        gradient.addColorStop(0.6, "yellow");
        gradient.addColorStop(1, "green");

        ctx.font = "30px Arial";
        ctx.fillStyle = gradient;
        ctx.textAlign = "center";
        ctx.fillText("Time: " + elapsedTime + "s", canvas.width / 2, 30);

        game.hueScore = dynamicGradientText("Score: " + game.score, 200, 50, game.hueScore);
        game.hueLives = dynamicGradientText("Lives: " + game.lives, canvas.width - 200, 50, game.hueLives);
    }

    function playSound(soundFile) {
        const sound = new Audio(soundFile);
        sound.play();
    }

    function checkCollision() {
        game.fruits.forEach(fruit => {
            if (fruit.alive && fruit.y + 100 >= canvas.height) {
                fruit.alive = false;
                game.lives -= 1;
                playSound('audio/落地.mp3');
                if (game.lives === 0) game.gameOver = true;
            }
        });

        if (!game.gameOver) setTimeout(checkCollision, 50);
    }

    function clearGameInit() {
        clearInterval(fruitInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.fruits = [];
        game.score = 0;
        game.lives = 3;
        game.gameOver = false;
        game.gameWon = false;
    }

    function handleClick(event) {
        const x = event.offsetX;
        const y = event.offsetY;

        game.fruits.forEach(fruit => {
            if (fruit.alive && x >= fruit.x && x <= fruit.x + 100 && y >= fruit.y && y <= fruit.y + 100) {
                fruit.alive = false;
                game.score += 10;
                playSound('audio/tnt.mp3');
            }
        });

        if (game.gameOver) {
            if (x > gameOverRect.x && x < gameOverRect.x + gameOverRect.width && y > gameOverRect.y && y < gameOverRect.y + gameOverRect.height) {
                clickSound.play();
                clearGameInit();
                themes();
            }

            if (x > restartRect.x && x < restartRect.x + restartRect.width && y > restartRect.y && y < restartRect.y + restartRect.height) {
                clickSound.play();
                clearGameInit();
                startGame();
            }
        }
    }

    function drawGameOverText() {
        ctx.font = "40px Arial";
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        ctx.textAlign = "center";

        drawRectWithRoundCorners(gameOverRect.x, gameOverRect.y, gameOverRect.width, gameOverRect.height, 20, "rgba(0, 0, 0, 0.8)");
        drawRectWithRoundCorners(restartRect.x, restartRect.y, restartRect.width, restartRect.height, 20, "rgba(0, 0, 0, 0.8)");

        if (game.gameWon) {
            ctx.fillStyle = "green";
            ctx.fillText("游戏胜利！", x, y);
        } else {
            ctx.fillStyle = "black";
            ctx.fillText("Game Over!", x, y);
        }

        ctx.fillStyle = "white";
        ctx.fillText("重新开始", restartRect.x + restartRect.width / 2, restartRect.y + restartRect.height / 2 + 10);
        ctx.fillText("返回主题", gameOverRect.x + gameOverRect.width / 2, gameOverRect.y + gameOverRect.height / 2 + 10);
    }
}
