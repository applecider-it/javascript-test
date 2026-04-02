import * as THREE from 'three';

import { makeCube } from './make';

import type { Cube } from './types';

/**
 * メイン処理
 */
export const main = (
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
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 10, 1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // ===============================
  // 🔄 アニメーションループ
  // ===============================
  function animate() {
    // 次のフレームで再度animateを呼ぶ（ループ）
    requestAnimationFrame(animate);

    // ===========================
    // 🎯 オブジェクト更新
    // ===========================
    // 毎フレーム少しずつ回転させる
    block.rotation.x += 0.01;
    block.rotation.y += 0.01;

    // ===========================
    // 🖼️ 描画
    // ===========================
    // 現在のシーンをカメラ視点で描画
    renderer.render(scene, camera);
  }

  // アニメーション開始
  animate();
};
