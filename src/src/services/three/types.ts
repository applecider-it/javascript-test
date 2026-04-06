import * as THREE from 'three';

export type Box = THREE.Mesh<
  THREE.BoxGeometry,
  THREE.MeshStandardMaterial,
  THREE.Object3DEventMap
>;

export type Plane = THREE.Mesh<
  THREE.PlaneGeometry,
  THREE.MeshStandardMaterial,
  THREE.Object3DEventMap
>;

export type Model = THREE.Group<THREE.Object3DEventMap>;
