import * as THREE from 'three';

import { main } from './main';

/**
 * Three.jsの初期セットアップを行う関数
 * 呼び出すと、指定したDOM要素内に3Dシーンを描画する
 */
export const setupThree = () => {
  const { scene, renderer, camera } = setup();

  main(scene, renderer, camera);
};

/**
 * セットアップ
 */
const setup = () => {
  // ===============================
  // 🎬 シーン（3D空間）を作成
  // ===============================
  // ここにオブジェクト（メッシュ）を追加していく
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xaaaaff); // 青

  // ===============================
  // 📐 描画サイズ
  // ===============================
  // レンダリングする画面サイズ（canvasのサイズ）
  const screenWidth = 800;
  const screenHeight = 600;

  // ===============================
  // 🎥 カメラ
  // ===============================
  const camera = new THREE.PerspectiveCamera(
    75, // 視野角（FOV: Field of View）
    screenWidth / screenHeight, // アスペクト比（幅 / 高さ）
    0.1, // 近くの描画範囲（これより近いと表示されない）
    1000, // 遠くの描画範囲（これより遠いと表示されない）
  );

  // ===============================
  // 🖥️ レンダラー（描画エンジン）
  // ===============================
  const renderer = new THREE.WebGLRenderer();

  // canvasのサイズを設定
  renderer.setSize(screenWidth, screenHeight);

  // HTMLにcanvasを追加
  // id="target" の要素の中に描画される
  document.getElementById('target')!.appendChild(renderer.domElement);

  return { scene, renderer, camera };
};
