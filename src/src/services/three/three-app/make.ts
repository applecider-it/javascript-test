import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Model } from '../types';

/** 箱生成 */
export const makeBox = ({ textureName }: { textureName: string }) => {
  // ジオメトリ（形）
  const geometry = new THREE.BoxGeometry();

  // マテリアル（見た目）
  const material = makeMaterial(textureName);

  // メッシュ（形 + 見た目）
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

/** 平面生成 */
export const makePlane = ({ textureName }: { textureName: string }) => {
  // ジオメトリ（形）
  const geometry = new THREE.PlaneGeometry();

  // マテリアル（見た目）
  const material = makeMaterial(textureName);

  // メッシュ（形 + 見た目）
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

/** マテリアル生成 */
const makeMaterial = (textureName: string) => {
  // テクスチャ読み込み
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(`/images/three/${textureName}.png`); // public配下

  // マテリアル（見た目）
  const material = new THREE.MeshStandardMaterial({
    //color: 0x00ff00, // 緑
    map: texture,
  });

  return material;
};

/** ラベル生成 */
export const makeLabel = (name: string) => {
  const div = document.createElement('div');

  div.className = 'app-three-label';
  div.textContent = name;

  const label = new CSS2DObject(div);

  return label;
};

/** モデルのメッシュにコールバックを適用 */
export const modelMesh = (
  model: Model,
  callback: (obj: THREE.Mesh) => void,
) => {
  model.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      callback(obj);
    }
  });
};

/** 同期的にモデル生成 */
export const loadModel = ({ url }: { url: string }): Promise<Model> => {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error),
    );
  });
};
