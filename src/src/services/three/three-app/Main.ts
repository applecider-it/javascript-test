import * as THREE from 'three';

import Stats from 'stats.js';

import { makeCube } from './make';

/**
 * メイン部分
 */
export default class Main {
  private animationId: number = 0;
  private stats: Stats;

  constructor(statsId: string) {
    this.stats = new Stats();

    document.getElementById(statsId)!.appendChild(this.stats.dom);
  }

  /**
   * メイン処理
   */
  main = (
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
  ) => {
    renderer.shadowMap.enabled = true;

    // カメラを移動
    // デフォルトだと(0,0,0)にあるので、オブジェクトと重なって見えない
    camera.position.z = 4;
    camera.position.y = 3;

    camera.rotation.x -= 0.7;

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
    scene.add(block);
    scene.add(ground);

    // 光源追加

    // 環境光
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // 自然な補助光
    scene.add(new THREE.HemisphereLight(0xddddff, 0xddaaaa, 0.6));

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 10, 1);
    directionalLight.castShadow = true;
    directionalLight.intensity = 0.8;
    scene.add(directionalLight);

    const timer = new THREE.Timer();

    // ===============================
    // 🔄 アニメーションループ
    // ===============================
    const animate = () => {
      // 次のフレームで再度animateを呼ぶ（ループ）
      this.animationId = requestAnimationFrame(animate);

      timer.update();

      const delta = timer.getDelta(); // 経過時間（秒）

      this.stats.begin();

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
      renderer.render(scene, camera);

      this.stats.end();
    };

    // アニメーション開始
    animate();
  };

  /** クリアー */
  clear = () => {
    cancelAnimationFrame(this.animationId);

    // DOM削除
    this.stats.dom.remove();
  };
}
