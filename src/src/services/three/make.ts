import * as THREE from 'three';

/** キューブ生成 */
export const makeCube = (textureName: string) => {
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
