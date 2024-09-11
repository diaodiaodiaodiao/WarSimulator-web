function database() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 650;
    
    let title = '战争与和平：历史的双重面孔';
    let index = 0;
    let interval;
    let backgroundImage = new Image();
    backgroundImage.src = 'img/background5.png';
    let clickSound = new Audio('audio/click.mp3');
    let showEventInfo1 = false;
    let showEventInfo2 = false;
    let showEventInfo3 = false;
    let showEventInfo4 = false;
    let showEventInfo5 = false;
    let activeEventIndex = -1;
    let animationFrameId;
    
    // 定义标题、内容和版权信息的字体样式
    const titleStyle = 'bold 36px Microsoft YaHei'; 
    const copyrightStyle = 'bold 16px Microsoft YaHei';
    const tishi = 'bold 30px Microsoft YaHei';
    const backButton = { x: canvas.width / 2 - 100, y: canvas.height * 0.12, width: 200, height: 50 };
    const backButtonText = '返回主题';
    const backButtonStyle = 'bold 16px Microsoft YaHei';
    const returnButton = { x: 980, y: 430, width: 100, height: 50, radius: 10, isHovered: false };
    
    // 节点数据
    const nodes = [
        { x: 300, y: 300, radius: 10, color: 0, isHovered: false },
        { x: 500, y: 400, radius: 10, color: 0, isHovered: false },
        { x: 700, y: 300, radius: 10, color: 0, isHovered: false },
        { x: 900, y: 500, radius: 10, color: 0, isHovered: false },
        { x: 1100, y: 300, radius: 10, color: 0, isHovered: false },
    ];
    
    // 创建渐变颜色函数
    function getGradientColor(node) {
        let gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        gradient.addColorStop(0, `hsl(${node.color}, 100%, 50%)`);
        gradient.addColorStop(1, 'white');
    
        // 更新颜色（简单的颜色循环）
        node.color = (node.color + 1) % 360;
        
        return gradient;
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
        // 标题框 - 全黑
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.2);
    
        // 版权信息框 - 全黑
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.2);
    
        // 标题文本
        ctx.font = titleStyle;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, canvas.height * 0.1 + 10);
    
        // 绘制“返回欢迎”按钮下方的文本
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
    
        // 添加文本内容
        ctx.fillText("历史见证了冲突与和解，提醒我们和平的脆弱与宝贵", 300, 470);
        ctx.fillText("在战火与和平的交织中，我们学会了珍惜每一刻的安宁", 500, 200);
        ctx.fillText("和平不是理所当然，它需要每一代人的不懈努力和坚守", 1100, 450);
        
        // 版权文本
        ctx.font = copyrightStyle;
        ctx.fillStyle = 'white';
        ctx.fillText('© 2023 战争与和平项目组', canvas.width / 2, canvas.height * 0.95);
        ctx.font = backButtonStyle;

        // 绘制返回按钮
        ctx.fillStyle = 'black';
        ctx.fillRect(backButton.x, backButton.y, backButton.width, backButton.height); // 绘制按钮
    
        // 绘制返回按钮上的文字
        ctx.font = backButtonStyle;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(backButtonText, backButton.x + backButton.width / 2, backButton.y + backButton.height / 2 + 10);
        
        // 绘制按钮下方的时间
        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText("1945年8月", nodes[0].x, nodes[0].y + 40);
        ctx.fillText("1989年11月", nodes[4].x, nodes[4].y + 40);
        ctx.fillText("1950年10月", nodes[1].x, nodes[1].y + 40);
        ctx.fillText("1962年10月", nodes[2].x, nodes[2].y + 40);
        ctx.fillText("1972年2月", nodes[3].x, nodes[3].y + 40);
    
        // 绘制曲线
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.8);
        for (let i = 0; i < nodes.length; i++) {
            ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        ctx.lineTo(canvas.width, canvas.height * 0.6);
        ctx.stroke();
    
        // 绘制渐变的节点
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.fillStyle = getGradientColor(node);
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        if (nodes[0].isHovered) {
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText("广岛和长崎原子弹轰炸事件", nodes[0].x, nodes[0].y - 20);
        }
        if (nodes[1].isHovered) {
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText("抗美援朝", nodes[1].x, nodes[1].y - 20);
        }
        if (nodes[2].isHovered) {
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText("古巴导弹危机", nodes[2].x, nodes[2].y - 20);
        }
        if (nodes[3].isHovered) {
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText("尼克松访华", nodes[3].x, nodes[3].y - 20);
        }
        if (nodes[4].isHovered) {
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText("柏林墙的倒塌", nodes[4].x, nodes[4].y - 20);
        }
        if (activeEventIndex !== -1) {
            switch (activeEventIndex) {
                case 0:
                    drawNode1();
                    break;
                case 1:
                    drawNode2();
                    break;
                case 2:
                    drawNode3();
                    break;
                case 3:
                    drawNode4();
                    break;
                case 4:
                    drawNode5();
                    break;
            }
        }
    }
    
    function drawNode1() {
        drawRectWithRoundCorners(300, 150, 800, 350, 20, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        let textY = 180; 
        ctx.fillText("背景：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20; 
        ctx.fillText("第二次世界大战末期，1945年8月，美国为了迫使日本投降，决定使用原子弹。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("事件：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("1945年8月6日，美军在日本广岛市投下了名为“小男孩”的原子弹。", 320, textY);
        textY += 20;
        ctx.fillText("三天后，又在长崎市投下了名为“胖子”的原子弹。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("影响：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("这两次轰炸造成了巨大的破坏和大量平民死伤。", 320, textY);
        textY += 20;
        ctx.fillText("它们直接导致了日本的投降，同时标志着第二次世界大战的结束。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("和平的象征：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("在战后，广岛和长崎成为了核武器的危害和世界和平的象征。", 320, textY);
        textY += 20;
        ctx.fillText("广岛和长崎的和平纪念活动每年吸引着来自世界各地的人们。", 320, textY);
        drawreturn();
    }

    function drawNode2() {
        drawRectWithRoundCorners(300, 150, 800, 350, 20, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        let textY = 180;
        ctx.fillText("背景：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("1950年，朝鲜战争爆发，美军越过38度线，威胁到朝鲜半岛和中国的安全。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("事件：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("中国为了保卫国家安全和和平，决定出兵朝鲜，与美军进行了激烈的战斗。", 320, textY);
        textY += 20;
        ctx.fillText("这场战争持续了三年，最终以停战协议结束。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("影响：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("抗美援朝有效地阻止了战争的扩散，维护了中国和朝鲜半岛的安全。", 320, textY);
        textY += 20;
        ctx.fillText("同时，这一行动也影响了国际政治格局的变化。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("和平的象征：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("抗美援朝显示了中国捍卫国家主权和领土完整的决心。", 320, textY);
        textY += 20;
        ctx.fillText("它也展示了中国为维护区域和世界和平所作的努力。", 320, textY);
        drawreturn();
    }
    
    function drawNode3() {
        drawRectWithRoundCorners(300, 150, 800, 350, 20, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        let textY = 180;
        ctx.fillText("背景：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("在冷战高峰期，苏联向古巴部署导弹，引发了与美国的直接对峙。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("事件：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("1962年，美国发现苏联在古巴部署核导弹，随后展开了海上封锁。", 320, textY);
        textY += 20;
        ctx.fillText("这场危机将世界推到了核战争的边缘。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("影响：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("古巴导弹危机导致了美苏之间的紧张关系达到了顶峰。", 320, textY);
        textY += 20;
        ctx.fillText("但最终双方通过外交谈判避免了直接的军事冲突。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("和平的象征：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("这一事件标志着冷战期间对话与外交的重要性。", 320, textY);
        textY += 20;
        ctx.fillText("它提醒世界，即使在紧张关系下，和平仍然可以通过对话实现。", 320, textY);
        drawreturn();
    }
    
    function drawNode4() {
        drawRectWithRoundCorners(300, 150, 800, 350, 20, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        let textY = 180;
        ctx.fillText("背景：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("1972年，美国总统尼克松进行了一次历史性的访问，成为首位访问中华人民共和国的美国总统。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("事件：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("这次访问标志着美中两国关系的重大转变，结束了长达25年的隔绝。", 320, textY);
        textY += 20;
        ctx.fillText("双方签署了《上海公报》，为改善关系和加强合作奠定了基础。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("影响：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("这一事件不仅改变了美中双方的双边关系，也对冷战的国际格局产生了重大影响。", 320, textY);
        textY += 20;
        ctx.fillText("它开启了中美之间的交流与合作的新纪元。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("和平的象征：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("尼克松的访华是冷战期间和平与外交的重要象征。", 320, textY);
        textY += 20;
        ctx.fillText("它展示了通过外交途径解决分歧，促进和平与稳定的重要性。", 320, textY);
        drawreturn();
    }

    function drawNode5() {
        drawRectWithRoundCorners(300, 150, 800, 350, 20, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        let textY = 180;
        ctx.fillText("背景：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("1945年二战结束后，德国被分为东西两部分。柏林，尽管位于东德，也被分为东西两部分。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("事件：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("1961年8月13日，东德开始建造柏林墙。1989年11月9日，墙最终被拆除。", 320, textY);
        textY += 20;
        ctx.fillText("墙的存在物理上和象征上分割了柏林和整个德国。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("影响：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("柏林墙成为冷战时期对立的象征。它的倒塌标志着东西方对抗的结束，预示着德国的重新统一。", 320, textY);
        textY += 20;
        ctx.fillText("它不仅分隔了家庭和社区，也成为了压迫和自由之间的边界。", 320, textY);
        ctx.font = 'bold 18px Arial';
        textY += 30;
        ctx.fillText("和平的象征：", 320, textY);
        ctx.font = '16px Arial';
        textY += 20;
        ctx.fillText("柏林墙的倒塌成为了欧洲乃至全球和平与自由的强大象征。", 320, textY);
        textY += 20;
        ctx.fillText("它的倒塌预示着一个新时代的到来，象征着团结和希望。", 320, textY);
        drawreturn();
    }
    
    function drawreturn() {
        drawRectWithRoundCorners(returnButton.x, returnButton.y, returnButton.width, returnButton.height, returnButton.radius, 'black');
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("返回", returnButton.x + returnButton.width / 2, returnButton.y + returnButton.height / 2 + 6);
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
    
    function onMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        nodes[0].isHovered = Math.sqrt(Math.pow(nodes[0].x - mouseX, 2) + Math.pow(nodes[0].y - mouseY, 2)) < nodes[0].radius;
        nodes[1].isHovered = Math.sqrt(Math.pow(nodes[1].x - mouseX, 2) + Math.pow(nodes[1].y - mouseY, 2)) < nodes[1].radius;
        nodes[2].isHovered = Math.sqrt(Math.pow(nodes[2].x - mouseX, 2) + Math.pow(nodes[2].y - mouseY, 2)) < nodes[2].radius;
        nodes[3].isHovered = Math.sqrt(Math.pow(nodes[3].x - mouseX, 2) + Math.pow(nodes[3].y - mouseY, 2)) < nodes[3].radius;
        nodes[4].isHovered = Math.sqrt(Math.pow(nodes[4].x - mouseX, 2) + Math.pow(nodes[4].y - mouseY, 2)) < nodes[4].radius;
    }
    canvas.addEventListener('mousemove', onMouseMove);
    
    function resetCanvas() {
        // 移除事件监听器
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('click', onClick);
    
        // 重置全局变量
        showEventInfo1 = false;
        showEventInfo2 = false;
        showEventInfo3 = false;
        showEventInfo4 = false;
        showEventInfo5 = false;
        activeEventIndex = -1;
    
        // 清除 canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // 停止动画循环
        stopAnimation();
    }

    function onClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        let buttonClicked = false;
    
        // 检查是否点击了节点
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].isHovered) {
                activeEventIndex = i; // 设置活动事件索引
                buttonClicked = true;
                break; // 退出循环
            }
        }

        // 检查是否点击了返回按钮
        if (mouseX > returnButton.x && mouseX < returnButton.x + returnButton.width &&
            mouseY > returnButton.y && mouseY < returnButton.y + returnButton.height) {
            activeEventIndex = -1; // 重置活动事件索引
            buttonClicked = true;
        }

        // 检查是否点击了返回主题按钮
        if (mouseX > backButton.x && mouseX < backButton.x + backButton.width &&
            mouseY > backButton.y && mouseY < backButton.y + backButton.height) {
            clickSound.play();
            resetCanvas(); // 调用 resetCanvas 清除画布和停止动画
            themes();
            return; // 退出函数，不继续执行后续代码
        }
    
        // 如果点击了任何按钮，播放音效
        if (buttonClicked) {
            clickSound.play();
        }
    }
    canvas.addEventListener('click', onClick);

    function animate() {
        animationFrameId = requestAnimationFrame(animate); // 赋值 animationFrameId
        draw();
    }
    
    function stopAnimation() {
        cancelAnimationFrame(animationFrameId); // 使用 animationFrameId 停止动画循环
    }
    
    backgroundImage.onload = function() {
        animate(); // 开始动画循环
        draw();
    }
}
