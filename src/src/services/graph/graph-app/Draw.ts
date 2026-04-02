import * as PIXI from 'pixi.js';

/**
 * 描画部分
 */
export default class Draw {
  app;
  graph;

  data: number[] = [];
  padding: number = 50;
  width: number = 0;
  height: number = 0;
  max: number = 0;

  constructor(app: PIXI.Application<PIXI.Renderer>, graph: PIXI.Graphics) {
    this.app = app;
    this.graph = graph;
  }

  /** 描画 */
  async draw() {
    this.app.stage.removeChildren();
    this.graph.clear();

    this.data = [10, 30, 20, 50, 40, 60, 80];

    this.app.stage.addChild(this.graph);

    this.padding = 50;
    this.width = this.app.screen.width;
    this.height = this.app.screen.height;
    this.max = Math.max(...this.data);

    this.drawGraph();
    this.drawDot();
    this.drawLine();
  }

  /** グラフ描画 */
  async drawGraph() {
    // =========================
    // 📈 グラフ線
    // =========================
    this.data.forEach((value, i) => {
      const x =
        this.padding +
        (i / (this.data.length - 1)) * (this.width - this.padding * 2);
      const y =
        this.height -
        this.padding -
        (value / this.max) * (this.height - this.padding * 2);

      console.log('line', value, x, y);

      if (i === 0) {
        this.graph.moveTo(x, y);
      } else {
        this.graph.lineTo(x, y);
      }
    });
    this.graph.stroke({ width: 2, color: 0x000000 });
  }

  /** 描画 */
  async drawDot() {
    // =========================
    // ⚪ 点 + テキスト
    // =========================
    this.data.forEach((value, i) => {
      const x =
        this.padding +
        (i / (this.data.length - 1)) * (this.width - this.padding * 2);
      const y =
        this.height -
        this.padding -
        (value / this.max) * (this.height - this.padding * 2);

      // 点
      this.graph.circle(x, y, 4).fill(0xff0000);

      // 値テキスト
      const label = new PIXI.Text({
        text: String(value),
        style: {
          fill: 0xff0000,
          fontSize: 12,
        },
      });

      label.x = x - label.width / 2;
      label.y = y - 20;

      this.app.stage.addChild(label);
    });
  }

  /** 描画 */
  async drawLine() {
    // =========================
    // 🧭 軸
    // =========================

    // Y軸
    this.graph.moveTo(this.padding, this.padding);
    this.graph.lineTo(this.padding, this.height - this.padding);
    this.graph.stroke({ width: 1, color: 0xff0000, alpha: 0.5 });

    // X軸
    this.graph.moveTo(this.padding, this.height - this.padding);
    this.graph.lineTo(this.width - this.padding, this.height - this.padding);
    this.graph.stroke({ width: 1, color: 0xff0000, alpha: 0.5 });

    // =========================
    // 🏷️ 軸ラベル
    // =========================

    // Y軸ラベル（最大値）
    const maxLabel = new PIXI.Text({
      text: String(this.max) + ' (最大値)',
      style: { fill: 0xff0000, fontSize: 12 },
    });
    maxLabel.x = 10;
    maxLabel.y = this.padding - 10;
    this.app.stage.addChild(maxLabel);

    // 0ラベル
    const zeroLabel = new PIXI.Text({
      text: '0',
      style: { fill: 0xff0000, fontSize: 12 },
    });
    zeroLabel.x = 20;
    zeroLabel.y = this.height - this.padding - 10;
    this.app.stage.addChild(zeroLabel);
  }
}
