import * as THREE from "three";

const sizes = {
    width: 600,
    height: 600,
};

// We need 4 elements to get started:
// * 1.  A scene that will contain objects
const scene = new THREE.Scene();

// // * 2. Some objects
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// // ? MESH: Combination of geometry (shape) and a material (how it looks)
// const mesh = new THREE.Mesh(geometry, material);

// // Adding the object to scene
// scene.add(mesh);

// // * 3. A camera

// /**
//  * ? The camera is not visible. It's more like a theoretical point of view.
//    When we will do a render of your scene, it will be from that camera's point of view.
//  */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

// // * TRANSFORM OBJECTS

// // There are 4 properties to transform objects in our scene

// // * 1. position (to move the object)
// // ? position it's an instance of the Vector3 class.
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;
// mesh.position.set(0.7, -0.6, 1);

// // * 2. scale (to resize the object)
// // mesh.scale.x = 2;
// // mesh.scale.y = 0.25;
// // mesh.scale.z = 1;
// mesh.scale.set(2, 0.5, 0.5);

// // rotation (to rotate the object)
// // quaternion (to also rotate the object; more about that later)
// // * PI = half rotation
// mesh.rotation.reorder("YXZ");
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;

// ! Useful methods:

// console.log(mesh.position.length());
// console.log(mesh.position.distanceTo(camera.position)); // distance from another vector
// console.log(mesh.position.normalize()); // You will reduce te length of the vector to 1 unit but preserve it's direction
// mesh.position.set(0.7, -0.6, 1); // to changes values in one line

//? LookAt method: rotates the object that it's -z faces the target you provided
// camera.lookAt(new THREE.Vector3(3, 0, 0));
// camera.lookAt(mesh.position);

// SCENE GRAPHS - Groups

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
cube2.position.x = -2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);
cube3.position.x = 2;

group.add(cube1, cube2, cube3);

// * 4. A renderer

// ? We will simply ask the renderer to render our scene from the camera's point of view,
// ? and the result will be drawn into a canvas.

// ! Canvas
const canvas = document.querySelector("canvas.webgl");

// ! Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.width);

const axesHelper = new THREE.AxesHelper(2);
// ? The AxesHelper will display 3 lines corresponding to the x, y and z axes, each one starting at
// ? the center of the scene and going in the corresponding direction.

scene.add(axesHelper);

// * render
renderer.render(scene, camera);
