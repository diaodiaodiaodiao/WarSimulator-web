function vedio() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const originalWidth = 1400;
    const originalHeight = 650;
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const videoWidth = 300;
    const videoHeight = 200;
    let title = '战争与和平：历史的双重面孔';
    const titleStyle = 'bold 36px Microsoft YaHei'; 
    const backgroundImage = new Image();
    const copyrightStyle = 'bold 16px Microsoft YaHei';
    backgroundImage.src = 'img/background3.png';
    let littleTitle = '探索战争与和平：视频系列';
    const littleTitleStyle = 'bold 24px Microsoft YaHei'; 
    let content1 = '欢迎来到我们的视频系列——“战争与和平的多重视角。在这里，我们通过一系列深入而引人思考的视频，带您走进战争与和平的复杂世界。';
    let content2 = '每个视频都是精心策划的，旨在展现这一永恒主题的不同方面，包括历史战争的影响、和平进程的艰难道路，以及这些主题对现代社会的意义。';
    const contentStyle = 'bold 20px Microsoft YaHei'; 
    let clickSound = new Audio('audio/click.mp3');

    let isFullScreen = false;
    let fullScreenVideo = null;

    // 创建四个视频元素
    const videos = [
        document.createElement('video'),
        document.createElement('video'),
        document.createElement('video'),
        document.createElement('video')
    ];

    // 为每个视频添加播放状态标志
    videos.forEach(video => {
        video.isPlaying = false;
    });

    // 设置视频源
    videos[0].src = 'audio/video1.mp4';
    videos[1].src = 'audio/video2.mp4';
    videos[2].src = 'audio/video3.mp4';
    videos[3].src = 'audio/video4.mp4';

    // 设置视频的位置和尺寸
    const videoPositions = [
        { x: 60, y: 300 },
        { x: 380, y: 300 },
        { x: 720, y: 300 },
        { x: 1040, y: 300 }
    ];

    // 为每个视频设置静音、自动播放和循环播放，并添加加载事件监听
    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.addEventListener('loadedmetadata', () => {
            video.play(); // 当视频元数据加载完毕后播放
            video.pause(); // 初始暂停播放
        });
    });

    // 绘制视频和其他元素
    function drawVideos() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        if (isFullScreen && fullScreenVideo) {
        ctx.drawImage(fullScreenVideo, 0, 0, canvas.width, canvas.height);
        } else {
        videos.forEach((video, index) => {
            const pos = videoPositions[index];
            ctx.filter = video.isPlaying ? 'none' : 'grayscale(100%)'; // 应用黑白滤镜
            ctx.drawImage(video, pos.x, pos.y, videoWidth, videoHeight);
        });
        }

        // 绘制标题和版权信息
        if (!isFullScreen) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.2);
        ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.2);
        
        ctx.font = titleStyle;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, canvas.height * 0.1+10);
        ctx.font = littleTitleStyle;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(littleTitle, canvas.width / 2, canvas.height * 0.3-30);
        ctx.font = contentStyle;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(content1, canvas.width / 2, canvas.height * 0.3+10);
        ctx.fillText(content2, canvas.width / 2, canvas.height * 0.3+40);
        drawVideoDescriptions();
        // 绘制版权信息
        ctx.font = copyrightStyle;
        ctx.fillText('© 2023 战争与和平项目组', canvas.width / 2-100, canvas.height * 0.95);
        }
        ctx.filter = 'none'; // 重置滤镜
        drawBackButton();
        }
    // 绘制“返回主题”按钮的函数
    function drawBackButton() {
        // 只在非全屏模式下绘制“返回主题”按钮
        if (!isFullScreen) {
            ctx.fillStyle = 'black';
                ctx.fillRect(canvas.width / 2 -50, canvas.height * 0.1+35, 90,  30);
                ctx.font = 'bold 16px Microsoft YaHei';
                ctx.fillStyle = 'white';
                ctx.fillText('返回主题', canvas.width / 2 -30, canvas.height * 0.1 + 50);
        }
    }

    function drawVideoDescriptions() {
        // 设置文本样式
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
    
        // 定义要显示的文本
        const descriptions = [
            "视频 1: 致敬先烈，珍爱和平",
            "视频 2: 铭记历史，吾辈自强",
            "视频 3: 巴勒斯坦10岁女孩废墟前的哽咽",
            "视频 4: 你只是生活在一个和平的国家"
        ];
    
        // 定义文本的位置
        const descriptionPositions = [
            { x: 80, y: 520 },
            { x: 400, y: 520 },
            { x: 740, y: 520 },
            { x: 1060, y: 520 }
        ];
    
        // 绘制每个视频的描述文本
        descriptions.forEach((description, index) => {
            const pos = descriptionPositions[index];
            ctx.fillText(description, pos.x, pos.y);
        });
    }

    function playVideo(video) {
        if (video.readyState >= 3) {
            video.play();
        } else {
            video.addEventListener('canplay', () => video.play());
        }
    }
    
    // 点击视频播放或全屏
    canvas.addEventListener('click', function(event) {
        if (isFullScreen) {
        document.exitFullscreen();
        return;
        }
        
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ctx.fillRect(canvas.width / 2 -50, canvas.height * 0.1+35, 90,  30);
        
        if (x > canvas.width / 2 -50 && x < canvas.width / 2 +40 &&
         y > canvas.height * 0.1+35 && y < canvas.height * 0.1+65) {        
        handleBackButtonClick();
        }
        videos.forEach((video, index) => {
        const pos = videoPositions[index];
        if (x > pos.x && x < pos.x + videoWidth && y > pos.y && y < pos.y + videoHeight) {
            video.isPlaying = true; // 标记为播放状态
            video.muted = false; // 取消静音
            playVideo(video); // 播放视频
            if (!fullScreenVideo) {
                fullScreenVideo = video;
                canvas.requestFullscreen().then(() => {
                    playVideo(fullScreenVideo);
                });
            }
        }
        });
    });

    // 替换 canvas 元素本身来移除 canvas 上所有的事件监听器
    function clearCanvasAndEvents() {
        const oldCanvas = document.getElementById('canvas');
        const newCanvas = oldCanvas.cloneNode(false);
        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);
        
        // 清除 canvas 内容
        const ctx = newCanvas.getContext('2d');
        ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);
    }
        
    // “返回主题”按钮的点击处理
    function handleBackButtonClick() {
        clickSound.play();
        clearCanvasAndEvents();
    themes();
    }

    // 监听全屏变化事件
    document.addEventListener('fullscreenchange', () => {
        isFullScreen = !!document.fullscreenElement;
        if (!isFullScreen) {
            fullScreenVideo.pause();
            fullScreenVideo.currentTime = 0; // 重置视频时间
            fullScreenVideo.isPlaying = false; // 标记为未播放状态
            fullScreenVideo = null;
            canvas.width = originalWidth;
            canvas.height = originalHeight;
        } else {
            canvas.width = window.screen.width;
            canvas.height = window.screen.height;
        }
        drawVideos();
    });

    // 当背景图片加载完成后开始绘制
    backgroundImage.onload = function() {
        setInterval(drawVideos, 100);
    };
}
