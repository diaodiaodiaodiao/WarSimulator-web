function quiz() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 650;

    const questions = [
        {
            question: '战争的根源是什么？',
            options: [
                { text: '经济利益冲突', score: 2 },
                { text: '民族文化差异', score: 3 },
                { text: '霸权主义政策', score: 4 },
                { text: '人类本性', score: 5 }
            ]
        },
        {
            question: '你认为和平的本质是什么？',
            options: [
                { text: '一种理想状态', score: 3 },
                { text: '一种动态平衡', score: 4 },
                { text: '一种共同利益', score: 5 },
                { text: '一种道德责任', score: 6 }
            ]
        },
        {
            question: '你认为历史上哪场战争对人类的影响最深远？',
            options: [
                { text: '一战', score: 4 },
                { text: '二战', score: 6 },
                { text: '冷战', score: 5 },
                { text: '其他', score: 3 }
            ]
        },
        {
            question: '战争中的创伤如何影响个体和社会？',
            options: [
                { text: '破坏身心健康', score: 6 },
                { text: '激发创新精神', score: 4 },
                { text: '强化集体认同', score: 5 },
                { text: '促进历史进步', score: 3 }
            ]
        },
        {
            question: '你认为国际合作对和平有何重要性？',
            options: [
                { text: '非常重要', score: 6 },
                { text: '一般重要', score: 4 },
                { text: '不太重要', score: 2 }
            ]
        },
        {
            question: '和平是否只是消除战争？',
            options: [
                { text: '是', score: 3 },
                { text: '否', score: 5 }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let selectedOptions = Array(questions.length).fill(null);
    let isOptionSelected = false;
    let isQuizCompleted = false;
    const title = '战争与和平：历史的双重面孔';
    const titleStyle = 'bold 36px Microsoft YaHei';
    const copyrightStyle = 'bold 16px Microsoft YaHei';
    const backgroundImage = new Image();
    const clickSound = new Audio('audio/click.mp3');
    let gradientOffset = 0;
    let isFullScreen = false;

    backgroundImage.onload = draw;
    backgroundImage.src = 'img/background4.png';

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // 绘制标题和版权信息
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.2);
        ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.2);

        ctx.font = titleStyle;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, canvas.height * 0.1 + 10);

        ctx.fillStyle = createRainbowGradient();
        ctx.fillText('全面探索战争与和平：互动式问卷调查', canvas.width / 2, canvas.height * 0.1 + 120);

        ctx.font = copyrightStyle;
        ctx.fillStyle = 'white';
        ctx.fillText('© 2023 战争与和平项目组', canvas.width / 2, canvas.height * 0.95);

        if (isQuizCompleted) {
            displayResults();
        } else {
            // 绘制当前问题和选项
            const currentQuestion = questions[currentQuestionIndex];
            drawRectWithRoundCorners(canvas.width / 2 - 250, 250, 500, 225, 10, 'rgba(0, 0, 0, 0.8)');
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(currentQuestion.question, canvas.width / 2, 300);

            currentQuestion.options.forEach((option, index) => {
                drawOptionCircle(canvas.width / 2 - 100, 345 + 30 * index, selectedOptions[currentQuestionIndex] === index);
                ctx.fillStyle = selectedOptions[currentQuestionIndex] === index ? createRainbowGradient() : 'white';
                ctx.fillText(option.text, canvas.width / 2, 350 + 30 * index);
            });
        }

        // 绘制返回主题按钮
        drawBackButton();

        // 绘制上一题和下一题按钮
        if (currentQuestionIndex > 0 && !isQuizCompleted) {
            drawButton('上一题', canvas.width / 2 - 240, 420, 100, 40, handlePreviousButtonClick);
        }
        if (!isQuizCompleted) {
            drawButton(currentQuestionIndex === questions.length - 1 ? '提交答案' : '下一题', canvas.width / 2 + 140, 420, 100, 40, handleNextButtonClick);
        }

        gradientOffset += 0.001; // 调整这个值来控制渐变速度
        requestAnimationFrame(draw);
    }

    function createRainbowGradient() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop((0 + gradientOffset) % 1, "magenta");
        gradient.addColorStop((0.2 + gradientOffset) % 1, "blue");
        gradient.addColorStop((0.4 + gradientOffset) % 1, "cyan");
        gradient.addColorStop((0.6 + gradientOffset) % 1, "green");
        gradient.addColorStop((0.8 + gradientOffset) % 1, "yellow");
        gradient.addColorStop((1 + gradientOffset) % 1, "red");
        return gradient;
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

    function drawOptionCircle(x, y, isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = isSelected ? createRainbowGradient() : 'white';
        ctx.fill();
    }

    function drawBackButton() {
        if (!isFullScreen) {
            const buttonX = canvas.width / 2 - 45;
            const buttonY = canvas.height * 0.1 + 35;
            ctx.fillStyle = 'black';
            ctx.fillRect(buttonX, buttonY, 90, 30);
            ctx.font = 'bold 16px Microsoft YaHei';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('返回主题', canvas.width / 2, canvas.height * 0.1 + 55);
        }
    }

    function drawButton(text, x, y, width, height, onClick) {
        drawRectWithRoundCorners(x, y, width, height, 10, 'black');
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + width / 2, y + height / 2 + 10);
    }

    function handleOptionSelect(index) {
        isOptionSelected = true;
        selectedOptions[currentQuestionIndex] = index;
    }

    function handleBackButtonClick() {
        replaceCanvas();
        themes();
    }

    function handlePreviousButtonClick() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            isOptionSelected = selectedOptions[currentQuestionIndex] !== null;
        }
    }

    function handleNextButtonClick() {
        if (!isOptionSelected) {
            alert("请选择选项");
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            isOptionSelected = selectedOptions[currentQuestionIndex] !== null;
        } else {
            submitAnswers();
        }
    }

    function submitAnswers() {
        let totalScore = selectedOptions.reduce((total, selectedIndex, questionIndex) => {
            return total + (questions[questionIndex].options[selectedIndex]?.score || 0);
        }, 0);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawRectWithRoundCorners(canvas.width / 2 - 250, 250, 500, 225, 10, 'rgba(0, 0, 0, 0.8)');

        ctx.font = 'bold 50px "Microsoft YaHei"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("总分: " + totalScore, canvas.width / 2, 310);

        ctx.font = 'bold 20px "Microsoft YaHei"';
        const resultText = getResultText(totalScore);
        const lines = resultText.match(/.{1,20}/g) || [];
        lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 350 + 30 * index);
        });

        isQuizCompleted = true;
    }

    function getResultText(totalScore) {
        if (totalScore >= 30) {
            return '你对战争有深刻的理解，思考非常透彻。你能够从多个角度分析战争的原因、过程和结果，以及战争对人类社会的影响。';
        } else if (totalScore >= 25) {
            return '你对战争有较好的理解，思考比较全面。你能够从一定的角度分析战争的原因、过程和结果，以及战争对人类社会的影响。';
        } else if (totalScore >= 20) {
            return '你对战争有一般的理解，思考有些片面。你能够从表面的角度分析战争的原因、过程和结果，但对战争对人类社会的影响缺乏深入的思考。';
        } else if (totalScore >= 16) {
            return '你对战争的理解还比较浅显，思考有些缺乏。你能够从简单的角度分析战争的原因、过程和结果，但对战争对人类社会的影响几乎没有思考。';
        } else {
            return '你对战争的理解还很不足，思考有些错误。你对战争的原因、过程和结果有很多误解，也没有意识到战争对人类社会的影响。';
        }
    }

    function displayResults() {
        let totalScore = selectedOptions.reduce((total, selectedIndex, questionIndex) => {
            return total + (questions[questionIndex].options[selectedIndex]?.score || 0);
        }, 0);

        drawRectWithRoundCorners(canvas.width / 2 - 250, 250, 500, 225, 10, 'rgba(0, 0, 0, 0.8)');

        ctx.font = 'bold 50px "Microsoft YaHei"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("总分: " + totalScore, canvas.width / 2, 310);

        ctx.font = 'bold 20px "Microsoft YaHei"';
        const resultText = getResultText(totalScore);
        const lines = resultText.match(/.{1,20}/g) || [];
        lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 350 + 30 * index);
        });
    }

    function replaceCanvas() {
        const oldCanvas = document.getElementById('canvas');
        const parent = oldCanvas.parentNode;
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'canvas';
        newCanvas.width = 1400;
        newCanvas.height = 650;
        newCanvas.style.border = '1px solid black';
        parent.replaceChild(newCanvas, oldCanvas);
    }

    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x > canvas.width / 2 - 50 && x < canvas.width / 2 + 40 && y > canvas.height * 0.1 + 35 && y < canvas.height * 0.1 + 65) {
            clickSound.play();
            handleBackButtonClick();
        } else if (x > canvas.width / 2 - 240 && x < canvas.width / 2 - 140 && y > 420 && y < 460) {
            clickSound.play();
            handlePreviousButtonClick();
        } else if (x > canvas.width / 2 + 140 && x < canvas.width / 2 + 240 && y > 420 && y < 460) {
            clickSound.play();
            handleNextButtonClick();
        } else {
            const currentQuestion = questions[currentQuestionIndex];
            currentQuestion.options.forEach((option, optionIndex) => {
                const circleX = canvas.width / 2 - 100;
                const circleY = 345 + 30 * optionIndex;
                const distanceToCircle = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);

                if (distanceToCircle < 10) {
                    handleOptionSelect(optionIndex);
                }
            });
        }
    });

    canvas.addEventListener('mousemove', function (event) {
        if (isQuizCompleted) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const currentQuestion = questions[currentQuestionIndex];
        currentQuestion.options.forEach((option, optionIndex) => {
            const circleX = canvas.width / 2 - 100;
            const circleY = 350 + 30 * optionIndex;
            const distanceToCircle = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);

            drawOptionCircle(circleX, circleY, selectedOptions[currentQuestionIndex] === optionIndex);
        });
    });

    requestAnimationFrame(draw);
}
