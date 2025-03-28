import * as THREE from 'three';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const geometry_cube = new THREE.BoxGeometry(1, 1, 1);
const geometry_cube_2 = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry_cube, material );
const cube_2 = new THREE.Mesh( geometry_cube_2, material );
scene.add( cube, cube_2 );

camera.position.z = 5;
cube.translateX(2)

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube_2.rotation.x += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );