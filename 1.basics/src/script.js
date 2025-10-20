import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const sizes = {
    width: 600,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.width);

// renderer.render(scene, camera);

//  Adapt to framerate
//? we need to know how much time it's been since the last tick

// Using the javascript's built in Date
// let time = Date.now();

// Using THREE.JS Clock
// const clock = new THREE.Clock();

// Using GSAP
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// ANIMATIONS
const tick = () => {
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;

    // Clock
    // const elapsedTime = clock.getElapsedTime();

    // Update Objects
    // mesh.position.x += 0.01;
    // mesh.position.y += 0.01;

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.001;

    // mesh.rotation.y = elapsedTime * Math.PI * 2;
    // mesh.position.y = elapsedTime;
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);

    // The cube is not moving, just the camera
    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);
    // camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
