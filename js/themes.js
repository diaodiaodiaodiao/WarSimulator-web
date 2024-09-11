function themes() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 650;
    
    const title = '战争与和平：历史的双重面孔';
    const backgroundImage = new Image();
    const clickSound = new Audio('audio/click.mp3');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const buttonWidth = 350;
    const buttonHeight = 160;
    const gap = 20; // 按钮间隔
    const enlargedButtonWidth = buttonWidth * 1.5; // 放大后的宽度
    const enlargedButtonHeight = buttonHeight * 1.5 - 70; // 放大后的高度
    
    const blocks = [
        { x: centerX - enlargedButtonWidth - gap / 2 - 20, y: centerY - enlargedButtonHeight - gap / 2, text: "游戏", subText: "通过生动的战役游戏体验战争的残酷。" },
        { x: centerX + gap / 2 + 20, y: centerY - enlargedButtonHeight - gap / 2, text: "教学视频", subText: "观看历史上关键战争和和平协议的教学视频。" },
        { x: centerX - enlargedButtonWidth - gap / 2 - 20, y: centerY + gap / 2 + 20, text: "互动问答", subText: "通过问答游戏测试您对战争与和平主题的理解。" },
        { x: centerX + gap / 2 + 20, y: centerY + gap / 2 + 20, text: "资料库", subText: "浏览有关战争与和平的历史文档、图片和文章。" }
    ];

    const backButton = { x: centerX - 40, y: canvas.height * 0.1 + 35, width: 90, height: 30, text: '返回欢迎' };
    
    backgroundImage.src = 'img/background2.png';
    backgroundImage.onload = draw;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
        blocks.forEach(block => {
            let { x, y, text, subText } = block;
            let width = enlargedButtonWidth, height = enlargedButtonHeight;
    
            if (block.hover) {
                x -= 5; y -= 5; width += 10; height += 10;
            }
    
            drawRectWithRoundCorners(x, y, width, height, 20, 'rgba(0, 0, 0, 0.7)');
            drawText(text, x + width / 2, y + height / 2.1, 'bold 30px Microsoft YaHei', 'white');
            drawText(subText, x + width / 2, y + height / 2.1 + 30, '16px Microsoft YaHei', 'white');
        });

        drawRectWithRoundCorners(0, 0, canvas.width, canvas.height * 0.2, 0, 'black');
        drawRectWithRoundCorners(0, canvas.height * 0.85, canvas.width, canvas.height * 0.2, 0, 'black');

        drawText(title, centerX, canvas.height * 0.08, 'bold 36px Microsoft YaHei', 'white');
        drawText('© 2023 战争与和平项目组', centerX, canvas.height * 0.93, 'bold 16px Microsoft YaHei', 'white');
        drawText(backButton.text, centerX, canvas.height * 0.16, 'bold 16px Microsoft YaHei', 'white');
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

    function drawText(text, x, y, style, color) {
        ctx.font = style;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        updateBlockHover(mouseX, mouseY);
        draw();
    }

    function updateBlockHover(mouseX, mouseY) {
        blocks.forEach(block => {
            block.hover = mouseX > block.x && mouseX < block.x + enlargedButtonWidth && mouseY > block.y && mouseY < block.y + enlargedButtonHeight;
        });
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        if (mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.height) {
            clickSound.play();
            clearEvents();
            welcome();
            return;
        }

        blocks.forEach((block, index) => {
            if (mouseX > block.x && mouseX < block.x + enlargedButtonWidth && mouseY > block.y && mouseY < block.y + enlargedButtonHeight) {
                clickSound.play();
                clearEvents();
                switch (index) {
                    case 0: game(); break;
                    case 1: vedio(); break;
                    case 2: quiz(); break;
                    case 3: database(); break;
                }
            }
        });
    }

    function clearEvents() {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
    }
}
