/**
 * マイク録音＆音量取得
 *
 * ・マイク入力を取得
 * ・リアルタイムで音量を計測
 * ・音声を録音してURL化
 */
export default class MicRecorder {
  /** マイクの音声ストリーム（getUserMediaで取得） */
  private mediaStream: MediaStream | null = null;

  /** 録音用のMediaRecorderインスタンス */
  private mediaRecorder: MediaRecorder | null = null;

  /** Web Audio API のコンテキスト（音量解析に使用） */
  private audioContext: AudioContext | null = null;

  /** 周波数データを解析するためのノード */
  private analyser: AnalyserNode | null = null;

  /** requestAnimationFrameのID（音量更新ループ用） */
  private animationId: number | null = null;

  // コールバック

  /** 録音中フラグ更新 */
  setIsRecording: ((flg: boolean) => void) | null = null;

  /** 音量更新 */
  setVolume: ((val: number) => void) | null = null;

  /** 録音後の音声URL */
  setAudioUrl: ((val: string) => void) | null = null;

  /** マイク開始（音量取得 + 録音） */
  start = async () => {
    try {
      await this.setupMic();

      this.setupAnalyser();

      this.setupVolumeUpdate();

      this.setupRecorder();

      // 録音中フラグON
      this.setIsRecording!(true);
    } catch (err) {
      // マイク許可拒否やデバイスエラー
      console.error('マイクエラー:', err);
    }
  };

  /** 録音停止 */
  stop = () => {
    // 録音停止（onstopが呼ばれる）
    this.mediaRecorder?.stop();

    // マイクのトラックをすべて停止（デバイス解放）
    this.mediaStream?.getTracks().forEach((track) => track.stop());

    // AudioContextを閉じる（メモリ解放）
    if (this.audioContext) {
      this.audioContext.close();
    }

    // 音量更新ループ停止
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // 録音中フラグOFF
    this.setIsRecording!(false);
  };

  /** マイクのセットアップ */
  private setupMic = async () => {
    // マイクの使用許可を取得
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  };

  /** 音量解析のセットアップ */
  private setupAnalyser = () => {
    // AudioContextを作成（音声処理の基盤）
    this.audioContext = new AudioContext();

    // マイク入力をAudioNodeとして扱う
    const source = this.audioContext.createMediaStreamSource(this.mediaStream!);

    // 周波数データを取得するためのAnalyserNodeを作成
    this.analyser = this.audioContext.createAnalyser();

    // FFTサイズ（小さいほど軽量・荒い解析）
    this.analyser.fftSize = 256;

    // マイク → analyser に接続
    source.connect(this.analyser);
  };

  /** 音量の取得ループのセットアップと開始処理 */
  private setupVolumeUpdate = () => {
    // 周波数データを格納する配列
    const data = new Uint8Array(this.analyser!.frequencyBinCount);

    const updateVolume = () => {
      // 周波数データを配列に格納（0〜255）
      this.analyser!.getByteFrequencyData(data);

      // 平均値を取って簡易的な音量として扱う
      const avg = data.reduce((a, b) => a + b, 0) / data.length;

      // UIへ反映（四捨五入）
      this.setVolume!(Math.round(avg));

      // 次フレームでも更新（ループ）
      this.animationId = requestAnimationFrame(updateVolume);

      console.log('updateVolume', this.animationId);
    };

    // 音量取得ループ開始
    updateVolume();
  };

  /** 録音処理のセットアップと開始処理 */
  private setupRecorder = () => {
    // MediaRecorder生成
    this.mediaRecorder = new MediaRecorder(this.mediaStream!);

    /** 録音データの断片 */
    const chunks: Blob[] = [];

    // 録音データ初期化

    // データが分割で届くたびに保存
    this.mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    // 録音停止時に呼ばれる
    this.mediaRecorder.onstop = () => {
      // Blobにまとめる
      const blob = new Blob(chunks, { type: 'audio/webm' });

      // 再生用URLを生成して外部に渡す
      this.setAudioUrl!(URL.createObjectURL(blob));
    };

    // 録音開始
    this.mediaRecorder.start();
  };
}
