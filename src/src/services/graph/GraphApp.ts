import * as PIXI from 'pixi.js';

import Draw from './graph-app/Draw';

/**
 * グラフアプリ
 */
export default class GraphApp {
  app: PIXI.Application<PIXI.Renderer>;
  graph: PIXI.Graphics;
  parent: HTMLElement;

  draw: Draw;

  constructor() {
    this.app = new PIXI.Application();
    this.parent = document.getElementById('target')!;

    this.graph = new PIXI.Graphics();

    this.draw = new Draw(this.app, this.graph);

    window.addEventListener('resize', this.onResize);

    const init = async () => {
      await this.app.init({
        width: this.parent.clientWidth,
        height: this.parent.clientHeight,
        backgroundColor: 0xdddddd,
        resolution: window.devicePixelRatio,
        autoDensity: true,
      });

      this.parent.appendChild(this.app.canvas);

      this.draw.draw();
    };

    init();
  }

  /** リサイズ時 */
  onResize = () => {
    console.log('onResize');
    const parent = document.getElementById('target')!;

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    this.app.renderer.resize(width, height);

    this.draw.draw();
  };

  /** クリアー */
  clear() {
    window.removeEventListener('resize', this.onResize);
  }
}
