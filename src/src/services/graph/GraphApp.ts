import * as PIXI from 'pixi.js';

import Draw from './graph-app/Draw';

/**
 * グラフアプリ
 */
export default class GraphApp {
  private app: PIXI.Application<PIXI.Renderer>;
  private graph: PIXI.Graphics;
  private parent: HTMLElement;

  private draw: Draw;

  constructor(targetId: string) {
    this.app = new PIXI.Application();
    this.parent = document.getElementById(targetId)!;

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
  private onResize = () => {
    console.log('onResize');

    const width = this.parent.clientWidth;
    const height = this.parent.clientHeight;

    this.app.renderer.resize(width, height);

    this.draw.draw();
  };

  /** クリアー */
  clear() {
    window.removeEventListener('resize', this.onResize);
  }
}
