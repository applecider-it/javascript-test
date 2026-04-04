import * as THREE from 'three';

import Stats from 'stats.js';

import Main from './three-app/Main';
import Event from './three-app/Event';

/**
 * Three.jsの動作確認
 */
export default class ThreeApp {
  private main;
  private event;

  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public parent: HTMLElement;
  public scene: THREE.Scene;
  public stats: Stats;

  constructor(targetId: string, statsId: string) {
    this.main = new Main(this);
    this.event = new Event(this);
    this.parent = document.getElementById(targetId)!;

    // スタッツ
    this.stats = new Stats();
    document.getElementById(statsId)!.appendChild(this.stats.dom);

    // ===============================
    // 🎬 シーン（3D空間）を作成
    // ===============================
    // ここにオブジェクト（メッシュ）を追加していく
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xaaaaff); // 青

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

    this.main.main();
  }

  /** クリアー */
  clear = () => {
    this.main.clear();
    this.event.clear();

    // DOM削除
    this.stats.dom.remove();
    this.renderer.domElement.remove();

    // GPU解放
    this.renderer.dispose();
  };
}
