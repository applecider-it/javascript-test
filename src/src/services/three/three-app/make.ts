import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

/** モデル生成 */
export const loadModel = ({
  url,
  castShadow = false,
}: {
  url: string;
  castShadow?: boolean;
}): Promise<THREE.Group> => {
  const loader = new GLTFLoader();

  const update = (model: THREE.Group<THREE.Object3DEventMap>) => {
    if (castShadow) {
      model.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
        }
      });
    }
    return model;
  };

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(update(gltf.scene)),
      undefined,
      (error) => reject(error),
    );
  });
};
