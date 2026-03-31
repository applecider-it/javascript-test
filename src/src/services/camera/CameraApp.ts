/**
 * カメラアプリ
 */
export default class CameraApp {
  video;
  photos;

  /** コンストラクタ */
  constructor(video: any, photos: any) {
    this.video = video;
    this.photos = photos;

    this.init();
  }

  /** 初期化 */
  async init() {
    await this.startCamera();
  }

  /** カメラを起動 */
  async startCamera() {
    try {
      // カメラ映像ストリーム取得
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment', // スマホなら背面カメラ
        },
      });

      // videoにストリームをセット
      this.video.srcObject = stream;

      // 必要なら再生（環境によっては必要）
      // await this.video.play();
    } catch (err) {
      console.error('カメラ使えません:', err);
    }
  }

  /** 写真を撮る */
  takePhoto() {
    // 新しいcanvasを作成
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');

    // videoサイズに合わせる
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    // 描画
    ctx.drawImage(this.video, 0, 0);

    this.photos!.appendChild(canvas);
  }
}
