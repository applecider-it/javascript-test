import * as THREE from 'three';

import ThreeApp from '../ThreeApp';

import { makeBox, makePlane, makeLabel, loadModel } from './make';

import type { Box, Plane, Model } from '../types';

/**
 * メイン部分
 */
export default class Main {
  private app;

  private block!: Box;
  private ground!: Plane;
  private duck!: Model;

  private rotationWait = 0;

  constructor(app: ThreeApp) {
    this.app = app;
  }

  /** セットアップ */
  async setup() {
    this.app.renderer.shadowMap.enabled = true;

    this.setupCamera();
    this.setupLight();

    await this.setupObjects();
  }

  /** カメラセットアップ */
  setupCamera() {
    // カメラを移動
    // デフォルトだと(0,0,0)にあるので、オブジェクトと重なって見えない
    this.app.camera.position.z = 3;
    this.app.camera.position.y = 3;

    this.app.camera.rotation.x -= 0.5;
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

  /** オブジェクトセットアップ */
  async setupObjects() {
    this.setupBlock();
    this.setupGround();
    await this.setupDuck();
  }

  /** ブロックセットアップ */
  setupBlock() {
    this.block = makeBox({
      textureName: 'Block',
    });
    this.block.position.y += 2;
    this.block.position.x += 1;
    this.block.castShadow = true;
    this.block.name = 'Block';

    const labelBlock = makeLabel('ブロック');
    labelBlock.position.set(0.5, 0.5, 0.5);
    this.block.add(labelBlock);

    this.app.scene.add(this.block);
  }

  /** 地面セットアップ */
  setupGround() {
    this.ground = makePlane({
      textureName: 'Ground',
    });
    this.ground.scale.y *= 10;
    this.ground.scale.x *= 10;

    this.ground.rotation.x = THREE.MathUtils.degToRad(-90);
    this.ground.receiveShadow = true;
    this.ground.name = 'Ground';
    this.app.scene.add(this.ground);
  }

  /** アヒルセットアップ */
  async setupDuck() {
    this.duck = await loadModel({
      url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
      castShadow: true,
    });
    this.duck.position.y += 2;
    this.duck.position.x -= 1;
    const duckScale = 0.6;
    this.duck.scale.set(duckScale, duckScale, duckScale);

    const labelDuck = makeLabel('アヒル');
    labelDuck.position.set(-0.5, 1.2, 0);
    this.duck.add(labelDuck);

    this.app.scene.add(this.duck);
  }

  /**
   * フレームごとの更新処理
   */
  update() {
    const delta = this.app.timer.getDelta(); // 経過時間（秒）

    const mouseVelocity = this.app.event.mouseVelocity;
    const isMouseDowned = this.app.event.isMouseDowned;

    //console.log(mouseVelocity.x, mouseVelocity.y);

    const speed = 5;
    const speedAuto = 1;

    if (isMouseDowned) {
      this.block.rotation.x += mouseVelocity.y * speed * delta;
      this.block.rotation.y += mouseVelocity.x * speed * delta;
      this.duck.rotation.x += mouseVelocity.y * speed * delta;
      this.duck.rotation.y += mouseVelocity.x * speed * delta;

      this.rotationWait = 3;
    } else {
      if (this.rotationWait > 0) {
        this.rotationWait -= delta;
      } else {
        this.block.rotation.y += speedAuto * delta;
        this.duck.rotation.y += speedAuto * delta;
      }
    }
  }
}
