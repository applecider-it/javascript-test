import * as THREE from 'three';

import Main from './three-app/Main';

/**
 * Three.jsの動作確認
 */
export default class ThreeApp {
  private main;

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private parent: HTMLElement;

  constructor() {
    this.main = new Main();
    this.parent = document.getElementById('target')!;

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
    const screenWidth = this.parent.clientWidth;
    const screenHeight = this.parent.clientHeight;

    // ===============================
    // 🎥 カメラ
    // ===============================
    this.camera = new THREE.PerspectiveCamera(
      75, // 視野角（FOV: Field of View）
      screenWidth / screenHeight, // アスペクト比（幅 / 高さ）
      0.1, // 近くの描画範囲（これより近いと表示されない）
      1000, // 遠くの描画範囲（これより遠いと表示されない）
    );

    // ===============================
    // 🖥️ レンダラー（描画エンジン）
    // ===============================
    this.renderer = new THREE.WebGLRenderer();

    // canvasのサイズを設定
    this.renderer.setSize(screenWidth, screenHeight);

    // HTMLにcanvasを追加
    this.parent.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize);

    this.main.main(scene, this.renderer, this.camera);
  }

  /** リサイズ時 */
  private onResize = () => {
    console.log('onResize');

    const screenWidth = this.parent.clientWidth;
    const screenHeight = this.parent.clientHeight;

    this.camera.aspect = screenWidth / screenHeight;
    this.camera.updateProjectionMatrix();

    // canvasのサイズを設定
    this.renderer.setSize(screenWidth, screenHeight);
  };

  /** クリアー */
  clear = () => {
    window.removeEventListener('resize', this.onResize);

    this.main.clear();

    // DOM削除
    this.renderer.domElement.remove();

    // GPU解放
    this.renderer.dispose();
  };
}
