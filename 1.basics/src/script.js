import * as THREE from "three";

// We need 4 elements to get started:

// * 1.  A scene that will contain objects
const scene = new THREE.Scene();

// * 2. Some objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// ? MESH: Combination of geometry (shape) and a material (how it looks)
const mesh = new THREE.Mesh(geometry, material);

// Adding the object to scene
scene.add(mesh);

// * 3. A camera

/**
 * ? The camera is not visible. It's more like a theoretical point of view.
   When we will do a render of your scene, it will be from that camera's point of view.
 */

const sizes = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

// * 4. A renderer

// ? We will simply ask the renderer to render our scene from the camera's point of view,
// ? and the result will be drawn into a canvas.

// ! Canvas
const canvas = document.querySelector("canvas.webgl");

// ! Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.width);

// * First render
renderer.render(scene, camera);
