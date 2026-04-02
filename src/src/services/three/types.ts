import * as THREE from 'three';

export type Cube = THREE.Mesh<
  THREE.BoxGeometry,
  THREE.MeshBasicMaterial,
  THREE.Object3DEventMap
>;
