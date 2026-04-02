import * as PIXI from 'pixi.js';

import { draw } from './draw';

export let app: PIXI.Application<PIXI.Renderer>;
export let graph: PIXI.Graphics;
let parent: HTMLElement;

/**
 * セットアップ
 */
export const setupPixi = async () => {
  app = new PIXI.Application();
  parent = document.getElementById('target')!;

  await app.init({
    width: parent.clientWidth,
    height: parent.clientHeight,
    backgroundColor: 0xdddddd,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  });

  parent.appendChild(app.canvas);

  window.addEventListener('resize', onResize);

  graph = new PIXI.Graphics();

  drawMain();
};

/** リサイズ時 */
const onResize = () => {
  console.log('onResize');
  const parent = document.getElementById('target')!;

  const width = parent.clientWidth;
  const height = parent.clientHeight;

  app.renderer.resize(width, height);

  drawMain();
};

/** 描画 */
const drawMain = () => {
  draw(app, graph);
};

/** クリアー */
export const clearPixi = () => {
  window.removeEventListener('resize', onResize);
};
