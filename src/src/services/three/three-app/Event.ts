import * as THREE from 'three';

import ThreeApp from '../ThreeApp';

import MouseVelocity from '@/services/ui/MouseVelocity';

/**
 * イベント部分
 */
export default class Event {
  private app;

  public mouseVelocity!: MouseVelocity;
  public isMouseDowned = false;

  constructor(app: ThreeApp) {
    this.app = app;
  }

  /** セットアップ */
  public setup() {
    window.addEventListener('resize', this.onResize);

    this.app.renderer.domElement.addEventListener('click', this.onClick);

    this.mouseVelocity = new MouseVelocity(this.app.renderer.domElement);

    this.app.renderer.domElement.addEventListener('mousedown', () => {
      this.isMouseDowned = true;
    });
    this.app.renderer.domElement.addEventListener('mouseup', () => {
      this.isMouseDowned = false;
    });
  }

  /** クリック時 */
  private onClick = (event: PointerEvent) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // マウス座標を -1 ~ 1 に正規化
    const rect = this.app.renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // レイを飛ばす
    raycaster.setFromCamera(mouse, this.app.camera);

    // オブジェクトと衝突判定
    const intersects = raycaster.intersectObjects(
      this.app.scene.children,
      true,
    );

    if (intersects.length > 0) {
      const object = intersects[0]!.object;
      console.log('クリックされた:', object.name);
    }
  };

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
