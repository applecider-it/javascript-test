const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// カメラ起動
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error('カメラ使えません:', err);
  });

// 撮影
function takePhoto() {
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
}

document.getElementById('take').addEventListener('click', () => {
  takePhoto();
})