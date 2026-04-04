import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

/** キューブ生成 */
export const makeCube = ({ textureName }: { textureName: string }) => {
  // ===============================
  // 🧱 ジオメトリ（形）
  // ===============================
  // 立方体の形状データを作成
  const geometry = new THREE.BoxGeometry();

  // テクスチャ読み込み
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(`/images/three/${textureName}.png`); // public配下

  // ===============================
  // 🎨 マテリアル（見た目）
  // ===============================
  const material = new THREE.MeshStandardMaterial({
    //color: 0x00ff00, // 緑
    map: texture,
  });

  // ===============================
  // 🧩 メッシュ（形 + 見た目）
  // ===============================
  const cube = new THREE.Mesh(geometry, material);

  return cube;
};

/** ラベル生成 */
export const makeLabel = (name: string) => {
  const div = document.createElement('div');

  div.className = 'app-three-label';
  div.textContent = name;

  const label = new CSS2DObject(div);

  return label;
};
