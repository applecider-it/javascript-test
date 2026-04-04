import * as THREE from 'three';

export type Cube = THREE.Mesh<
  THREE.BoxGeometry,
  THREE.MeshStandardMaterial,
  THREE.Object3DEventMap
>;
