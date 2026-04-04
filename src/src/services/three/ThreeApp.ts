import * as THREE from 'three';

import Stats from 'stats.js';

import Main from './three-app/Main';
import Event from './three-app/Event';

/**
 * Three.jsの動作確認
 */
export default class ThreeApp {
  public main;
  public event;

  public renderer!: THREE.WebGLRenderer;
  public camera!: THREE.PerspectiveCamera;
  public parent!: HTMLElement;
  public scene!: THREE.Scene;
  public stats!: Stats;

  private animationId: number = 0;

  public timer!: THREE.Timer;

  constructor(targetId: string, statsId: string) {
    this.setup(targetId, statsId);

    this.main = new Main(this);
    this.event = new Event(this);

    this.event.setup();
    this.main.setup();

    this.loop();
  }

  /** セットアップ */
  setup(targetId: string, statsId: string) {
    this.timer = new THREE.Timer();

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
  }

  /**
   * アニメーションループ処理
   */
  loop() {
    const animate = () => {
      // 次のフレームで再度animateを呼ぶ（ループ）
      this.animationId = requestAnimationFrame(animate);

      this.timer.update();

      this.stats.begin();

      this.main.update();

      // ===========================
      // 🖼️ 描画
      // ===========================
      // 現在のシーンをカメラ視点で描画
      this.renderer.render(this.scene, this.camera);

      this.stats.end();
    };

    // アニメーション開始
    animate();
  }

  /** クリアー */
  clear() {
    cancelAnimationFrame(this.animationId);

    this.event.clear();

    // DOM削除
    this.stats.dom.remove();
    this.renderer.domElement.remove();

    // GPU解放
    this.renderer.dispose();
  }
}
