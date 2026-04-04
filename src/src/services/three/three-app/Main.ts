import * as THREE from 'three';

import ThreeApp from '../ThreeApp';

import { makeCube } from './make';

import type { Cube } from '../types';

/**
 * メイン部分
 */
export default class Main {
  private app;

  private block!: Cube;
  private ground!: Cube;

  constructor(app: ThreeApp) {
    this.app = app;
  }

  /** セットアップ */
  setup() {
    this.app.renderer.shadowMap.enabled = true;

    this.setupCamera();
    this.setupObjects();
    this.setupLight();
  }

  /** カメラセットアップ */
  setupCamera() {
    // カメラを移動
    // デフォルトだと(0,0,0)にあるので、オブジェクトと重なって見えない
    this.app.camera.position.z = 4;
    this.app.camera.position.y = 3;

    this.app.camera.rotation.x -= 0.7;
  }

  /** オブジェクトセットアップ */
  setupObjects() {
    // オブジェクト生成

    this.block = makeCube('Block');
    this.block.position.y += 2;
    this.block.castShadow = true;
    this.block.name = 'Block';

    this.ground = makeCube('Ground');
    this.ground.scale.x *= 5;
    this.ground.scale.z *= 5;
    this.ground.receiveShadow = true;
    this.ground.name = 'Ground';

    // シーンに追加

    this.app.scene.add(this.block);
    this.app.scene.add(this.ground);
  }

  /** 光源セットアップ */
  setupLight() {
    // 環境光
    this.app.scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // 自然な補助光
    this.app.scene.add(new THREE.HemisphereLight(0xddddff, 0xddaaaa, 0.6));

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 10, 1);
    directionalLight.castShadow = true;
    directionalLight.intensity = 0.8;
    this.app.scene.add(directionalLight);
  }

  /**
   * フレームごとの更新処理
   */
  update() {
    const delta = this.app.timer.getDelta(); // 経過時間（秒）

    const mouseVelocity = this.app.event.mouseVelocity;
    const isMouseDowned = this.app.event.isMouseDowned;

    //console.log(mouseVelocity.x, mouseVelocity.y);

    const speed = 2;

    if (isMouseDowned) {
      this.block.rotation.x += mouseVelocity.y * speed * delta;
      this.block.rotation.y += mouseVelocity.x * speed * delta;
    } else {
      this.block.rotation.y += 0.1 * delta;
    }
  }
}
