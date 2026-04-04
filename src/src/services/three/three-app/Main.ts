import * as THREE from 'three';

import ThreeApp from '../ThreeApp';

import { makeCube } from './make';

import type { Cube } from '../types';

/**
 * メイン部分
 */
export default class Main {
  private app;
  private animationId: number = 0;

  private timer!: THREE.Timer;

  private block!: Cube;
  private ground!: Cube;

  constructor(app: ThreeApp) {
    this.app = app;
  }

  /** セットアップ */
  setup = () => {
    this.app.renderer.shadowMap.enabled = true;

    this.timer = new THREE.Timer();

    this.setupCamera();
    this.setupObjects();
    this.setupLight();
  };

  /** カメラセットアップ */
  setupCamera = () => {
    // カメラを移動
    // デフォルトだと(0,0,0)にあるので、オブジェクトと重なって見えない
    this.app.camera.position.z = 4;
    this.app.camera.position.y = 3;

    this.app.camera.rotation.x -= 0.7;
  };

  /** オブジェクトセットアップ */
  setupObjects = () => {
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

    // オブジェクト追加
    this.app.scene.add(this.block);
    this.app.scene.add(this.ground);
  };

  /** 光源セットアップ */
  setupLight = () => {
    // 光源追加

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
  };

  /**
   * メイン処理
   */
  start() {
    // ===============================
    // 🔄 アニメーションループ
    // ===============================
    const animate = () => {
      // 次のフレームで再度animateを呼ぶ（ループ）
      this.animationId = requestAnimationFrame(animate);

      this.timer.update();

      this.app.stats.begin();

      this.update();

      // ===========================
      // 🖼️ 描画
      // ===========================
      // 現在のシーンをカメラ視点で描画
      this.app.renderer.render(this.app.scene, this.app.camera);

      this.app.stats.end();
    };

    // アニメーション開始
    animate();
  }

  /**
   * フレームごとの更新処理
   */
  update() {
    const delta = this.timer.getDelta(); // 経過時間（秒）

    // ===========================
    // 🎯 オブジェクト更新
    // ===========================
    // 毎フレーム少しずつ回転させる
    this.block.rotation.x += 1.5 * delta;
    this.block.rotation.y += 1 * delta;
  }

  /** クリアー */
  clear = () => {
    cancelAnimationFrame(this.animationId);
  };
}
