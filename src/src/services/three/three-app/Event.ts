import * as THREE from 'three';

import ThreeApp from '../ThreeApp';

/**
 * イベント部分
 */
export default class Event {
  private app;

  constructor(app: ThreeApp) {
    this.app = app;

    window.addEventListener('resize', this.onResize);
  }

  /** リサイズ時 */
  private onResize = () => {
    console.log('onResize');

    const screenWidth = this.app.parent.clientWidth;
    const screenHeight = this.app.parent.clientHeight;

    this.app.camera.aspect = screenWidth / screenHeight;
    this.app.camera.updateProjectionMatrix();

    // canvasのサイズを設定
    this.app.renderer.setSize(screenWidth, screenHeight);
  };

  /** クリアー */
  clear = () => {
    window.removeEventListener('resize', this.onResize);
  };
}
