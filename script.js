const video = document.getElementById('video');
const statusText = document.getElementById('status');

// 1. 載入 AI 模型 (從雲端下載預設的特徵資料)
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights')
]).then(startVideo);

// 2. 開啟相機
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
            statusText.innerText = "模型載入完成，請對準人臉";
        })
        .catch(err => console.error("相機開啟失敗:", err));
}

// 3. 每一秒鐘偵測一次人臉
video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        
        if (detections.length > 0) {
            statusText.innerText = "🔴 偵測到人臉！比對中...";
            statusText.style.color = "red";
            // 這裡未來可以加入比對照片的邏輯
        } else {
            statusText.innerText = "🟢 請對準鏡頭...";
            statusText.style.color = "#00ff00";
        }
    }, 1000);
});