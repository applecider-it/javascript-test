import * as THREE from 'three';

import ThreeApp from '../ThreeApp';

import { makeCube } from './make';

/**
 * メイン部分
 */
export default class Main {
  private app;
  private animationId: number = 0;

  constructor(app: ThreeApp) {
    this.app = app;
  }

  /**
   * メイン処理
   */
  main = () => {
    this.app.renderer.shadowMap.enabled = true;

    // カメラを移動
    // デフォルトだと(0,0,0)にあるので、オブジェクトと重なって見えない
    this.app.camera.position.z = 4;
    this.app.camera.position.y = 3;

    this.app.camera.rotation.x -= 0.7;

    // オブジェクト生成
    const block = makeCube('Block');
    const ground = makeCube('Ground');

    block.position.y += 2;
    block.castShadow = true;

    ground.scale.x *= 5;
    ground.scale.z *= 5;
    ground.receiveShadow = true;

    // シーンに追加

    // オブジェクト追加
    this.app.scene.add(block);
    this.app.scene.add(ground);

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

    const timer = new THREE.Timer();

    // ===============================
    // 🔄 アニメーションループ
    // ===============================
    const animate = () => {
      // 次のフレームで再度animateを呼ぶ（ループ）
      this.animationId = requestAnimationFrame(animate);

      timer.update();

      const delta = timer.getDelta(); // 経過時間（秒）

      this.app.stats.begin();

      // ===========================
      // 🎯 オブジェクト更新
      // ===========================
      // 毎フレーム少しずつ回転させる
      block.rotation.x += 1.5 * delta;
      block.rotation.y += 1 * delta;

      // ===========================
      // 🖼️ 描画
      // ===========================
      // 現在のシーンをカメラ視点で描画
      this.app.renderer.render(this.app.scene, this.app.camera);

      this.app.stats.end();
    };

    // アニメーション開始
    animate();
  };

  /** クリアー */
  clear = () => {
    cancelAnimationFrame(this.animationId);
  };
}
