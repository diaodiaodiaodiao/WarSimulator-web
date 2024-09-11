function welcome() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 650;

    let title = '战争与和平：历史的双重面孔';
    let index = 0;
    let interval;
    let backgroundImage = loadImage('img/background1.png');
    let clickSound = new Audio('audio/click.mp3');

    function loadImage(src) {
        let img = new Image();
        img.src = src;
        return img;
    }

    function drawText(text, x, y, style, color, align = 'center') {
        ctx.font = style;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
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

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawRectWithRoundCorners(0, 0, canvas.width, canvas.height * 0.2, 0, 'black');
        drawRectWithRoundCorners(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15, 0, 'black');

        let rectX = canvas.width * 0.3 + 20;
        let rectY = canvas.height * 0.3 + 20;
        let rectWidth = canvas.width * 0.4 - 40;
        let rectHeight = canvas.height * 0.3 - 40;
        drawRectWithRoundCorners(rectX, rectY, rectWidth, rectHeight, 20, 'rgba(0, 0, 0, 0.7)');

        drawText(title, canvas.width / 2, canvas.height * 0.1 + 10, 'bold 36px Microsoft YaHei', 'white');
        drawText('© 2023 战争与和平项目组', canvas.width / 2, canvas.height * 0.95, 'bold 16px Microsoft YaHei', 'white');

        let displayText = '探索历史上战争与和平的故事，了解它们如何塑造我们的世界';

        if (index <= 12) {
            drawText(displayText.substring(0, index + 1), canvas.width / 2, canvas.height * 0.4, 'bold 20px Microsoft YaHei', 'white');
        } else if (index > 13) {
            drawText('探索历史上战争与和平的故事', canvas.width / 2, canvas.height * 0.4, 'bold 20px Microsoft YaHei', 'white');
            drawText(displayText.substring(14, index + 1), canvas.width / 2, canvas.height * 0.5, 'bold 20px Microsoft YaHei', 'white');
        }
        index++;

        if (index >= displayText.length) {
            let colors = ['red', 'green', 'blue'];
            let colorIndex = Math.floor(index / 10) % colors.length;
            drawText('按下空格进入主题', canvas.width / 2, canvas.height * 0.7, 'bold 30px Microsoft YaHei', colors[colorIndex]);
            document.addEventListener('keydown', keyDownHandler);
        }
    }
    
    function keyDownHandler(event) {
        if (event.code === 'Space') {
            clickSound.play();
            clearCanvasAndEvents();
            themes();
        }
    }

    function clearCanvasAndEvents() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.removeEventListener('keydown', keyDownHandler);
        clearInterval(interval);
    }
    
    interval = setInterval(draw, 100);
}

welcome();
