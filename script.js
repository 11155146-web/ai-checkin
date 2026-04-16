const video = document.getElementById('video');
const statusText = document.getElementById('status');

// 直接啟動相機，不載入 AI 模型
function startVideo() {
    statusText.innerText = "正在嘗試開啟相機...";
    
    const constraints = {
        video: { facingMode: 'user' } // 強制使用前鏡頭
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
            statusText.innerText = "相機已啟動！(測試模式)";
            statusText.style.color = "#00ff00";
        })
        .catch(err => {
            console.error("相機失敗:", err);
            statusText.innerText = "相機開啟失敗，請檢查權限";
            statusText.style.color = "red";
        });
}

// 網頁載入後直接執行
window.onload = startVideo;
