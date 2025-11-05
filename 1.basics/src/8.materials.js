import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

/**
 * DEBUG
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * LIGHTS
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;

// scene.add(pointLight);

/**
 * * ENVIRONMENT MAP
 * The environment map is like an image of what's surrounding the scene
 */
const rgbeLoader = new RGBELoader();

rgbeLoader.load("/static/textures/environmentMap/2k.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularRefractionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
});

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/static/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/static/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
    "/static/textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("/static/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/static/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/static/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/static/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/static/textures/matcaps/8.png");
const gradientTexture = textureLoader.load("/static/textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const texture = new THREE.TextureLoader().load("/static/textures/door/color.jpg");
texture.colorSpace = true;

// OBJECTS
// Mesh basic material

// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// const material = new THREE.MeshBasicMaterial();
// texture - map
// material.map = doorColorTexture;

// colors
// material.color = new THREE.Color(0xff0000);

// wirefrime
// material.wireframe = true;

// opacity
// material.transparent = true;
// material.opacity = 0.5;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;

// SIDE
// material.side = THREE.DoubleSide;

//* MESH NORMAL MATERIAL
// "Normals" are information encoded in each vertex that contains
// the direction of the outside of the face
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

//* MESH MATCAP MATERIAL
// const material = new THREE.MeshMatcapMaterial();
// Looks great while remaining very performant
// Needs a reference texture that looks like a sphere
// The material will pick colors from the texture according to the normal orientation relative to the camera

// material.matcap = matcapTexture;

//* MESH DEPTH MATERIAL
// Color the geometry in white if it's close to the camera's near value and in black if it's close to the far value
// const material = new THREE.MeshDepthMaterial();

//* MESH LAMBERT MATERIAL
// first material that requires light
// const material = new THREE.MeshLambertMaterial();

//* MESH PHONG MATERIAL
// less performant that lambert
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100; // *controls the light reflection and intensity
// material.specular = new THREE.Color(0x1188ff); // *controls the light reflection color

//* MESH TOON MATERIAL (cell shading)
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// * MESH STANDAR MATERIAL - PBR
// use physically based rendering principles
// Supports light but with a more realistic algorithm and better parameters like roughness and metalness
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.7;
// material.roughness = 0.2;
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture; // ambient occlusion map - will add shadows there the texture is dark
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, "metalness").min(0).max(1).step(0.0001);
// gui.add(material, "roughness").min(0).max(1).step(0.0001);

//* MESH PHYSICAL MATERIAL

const material = new THREE.MeshPhysicalMaterial();
// material.metalness = 0.7;
// material.roughness = 0.2;
// material.metalness = 1;
material.roughness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture; // ambient occlusion map - will add shadows there the texture is dark
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, "clearcoat").min(0).max(1).step(0.00001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.00001);

// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, "sheen").min(0).max(1).step(0.00001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.00001);
// gui.addColor(material, "sheenColor");

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence").min(0).max(1).step(0.00001);
// gui.add(material, "iridescenceIOR").min(0).max(2.333).step(0.00001);
// gui.add(material.iridescenceThicknessRange, "0").min(0).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(0).max(1000).step(1);

// Transmission
material.transmission = 1;
// Ior: index of refraction
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.00001);
gui.add(material, "ior").min(0).max(10).step(0.00001);
gui.add(material, "thickness").min(0).max(10).step(0.00001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

function rotateGeometry(geometry, elapsedTime = clock.getElapsedTime()) {
    geometry.rotation.x = -0.15 * elapsedTime;
    geometry.rotation.y = 0.15 * elapsedTime;
}

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    rotateGeometry(sphere);
    rotateGeometry(plane);
    rotateGeometry(torus);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
