import * as PIXI from 'pixi.js';

/**
 * 描画
 */
export const draw = async (
  app: PIXI.Application<PIXI.Renderer>,
  graph: PIXI.Graphics,
) => {
  app.stage.removeChildren();
  graph.clear();

  const data = [10, 30, 20, 50, 40, 60, 80];

  app.stage.addChild(graph);

  const padding = 50;
  const width = app.screen.width;
  const height = app.screen.height;
  const max = Math.max(...data);

  // =========================
  // 📈 グラフ線
  // =========================
  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (value / max) * (height - padding * 2);

    console.log('line', value, x, y);

    if (i === 0) {
      graph.moveTo(x, y);
    } else {
      graph.lineTo(x, y);
    }
  });
  graph.stroke({ width: 2, color: 0x000000 });

  // =========================
  // ⚪ 点 + テキスト
  // =========================
  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (value / max) * (height - padding * 2);

    // 点
    graph.circle(x, y, 4).fill(0xff0000);

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

    app.stage.addChild(label);
  });

  // =========================
  // 🧭 軸
  // =========================

  // Y軸
  graph.moveTo(padding, padding);
  graph.lineTo(padding, height - padding);
  graph.stroke({ width: 1, color: 0xff0000, alpha: 0.5 });

  // X軸
  graph.moveTo(padding, height - padding);
  graph.lineTo(width - padding, height - padding);
  graph.stroke({ width: 1, color: 0xff0000, alpha: 0.5 });

  // =========================
  // 🏷️ 軸ラベル
  // =========================

  // Y軸ラベル（最大値）
  const maxLabel = new PIXI.Text({
    text: String(max) + ' (最大値)',
    style: { fill: 0xff0000, fontSize: 12 },
  });
  maxLabel.x = 10;
  maxLabel.y = padding - 10;
  app.stage.addChild(maxLabel);

  // 0ラベル
  const zeroLabel = new PIXI.Text({
    text: '0',
    style: { fill: 0xff0000, fontSize: 12 },
  });
  zeroLabel.x = 20;
  zeroLabel.y = height - padding - 10;
  app.stage.addChild(zeroLabel);
};
