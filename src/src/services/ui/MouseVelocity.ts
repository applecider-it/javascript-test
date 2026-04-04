/**
 * マウスの移動速度管理
 */
export default class MouseVelocity {
  private lastX = 0;
  private lastY = 0;

  private lastTime = 0;

  public x = 0;
  public y = 0;

  private target;

  private timerId: number | null = null;

  constructor(target: HTMLElement) {
    this.target = target;

    this.target.addEventListener('mousemove', this.handleMove);
  }

  /** マウス移動時 */
  private handleMove = (e: MouseEvent) => {
    // 現在時刻（高精度）
    const now = performance.now();

    if (this.lastTime !== 0) {
      // 前回との差分（移動量）
      const x = e.clientX - this.lastX;
      const y = e.clientY - this.lastY;

      // 経過時間（ms）
      const time = now - this.lastTime;

      // 速度 = 距離 ÷ 時間（0除算防止）
      this.x = time > 0 ? x / time : 0;
      this.y = time > 0 ? y / time : 0;
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.lastTime = now;

    this.stopTimer();

    this.timerId = window.setTimeout(() => {
      this.x = 0;
      this.y = 0;

      //console.log('mouse', this.x, this.y);
    }, 100);

    //console.log('mouse', this.x, this.y);
  };

  /** クリア */
  clear() {
    this.target.removeEventListener('mousemove', this.handleMove);

    this.stopTimer();
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  }
}
