/**
 * カメラアプリ
 */
export default class CameraApp {
  video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;

    this.init();
  }

  /** 初期化 */
  private async init(): Promise<void> {
    await this.startCamera();
  }

  /** カメラを起動 */
  private async startCamera(): Promise<void> {
    try {
      // カメラ映像ストリーム取得
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
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

  /** 写真を撮って、DataURLを返す */
  public takePhoto(): string {
    // 新しいcanvasを作成
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('2Dコンテキストが取得できません');
    }

    // videoサイズに合わせる
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    // 描画
    ctx.drawImage(this.video, 0, 0);

    return canvas.toDataURL('image/png');
  }
}
