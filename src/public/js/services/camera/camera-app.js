/**
 * カメラアプリ
 */
class CameraApp {
  /**
   * コンストラクタ
   * @param {string} videoId - video要素のID
   * @param {string} canvasId - canvas要素のID
   * @param {string} buttonId - ボタン要素のID
   */
  constructor(videoId, canvasId, buttonId) {
    // HTML要素を取得
    this.video = document.getElementById(videoId);
    this.canvas = document.getElementById(canvasId);
    this.button = document.getElementById(buttonId);

    // 2Dコンテキストを先に取得
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * 初期化処理
   * ・イベント登録
   * ・カメラ起動
   */
  async init() {
    this.addEvent();
    await this.startCamera();
  }

  /**
   * カメラを起動
   */
  async startCamera() {
    try {
      // カメラ映像ストリーム取得
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // videoにストリームをセット
      this.video.srcObject = stream;

      // 必要なら再生（環境によっては必要）
      // await this.video.play();

    } catch (err) {
      console.error('カメラ使えません:', err);
    }
  }

  /**
   * 写真を撮る
   */
  takePhoto() {
    // videoサイズにcanvasを合わせる
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;

    // 映像をcanvasに描画
    this.ctx.drawImage(this.video, 0, 0);
  }

  /**
   * イベント登録
   */
  addEvent() {
    this.button.addEventListener('click', () => {
      this.takePhoto();
    });
  }
}

window.App.CameraApp = CameraApp;
