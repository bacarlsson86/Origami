import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// TODO

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas})
    const loader = new GLTFLoader()

    
    // set up camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 10
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    const controls = new OrbitControls(camera, renderer.domElement)
    camera.position.set(2, 3,3)
    controls.update()
    camera.lookAt(0,0,0)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x222222);
    
    // Make a light
    const light = new THREE.AmbientLight( 0xFFFFFF );
    light.position.set(1, 1, 1);
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    loader.load(
        'models/planeEightbyEight.glb',
        function ( gltf ){
            console.log(gltf)
            scene.add( gltf.scene );
        }, undefined, function ( error ){
            console.error( error );
        }
    );

    function resizeRendererToDisplaySize(renderer){
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize){
        renderer.setSize(width, height, false);
        }
        return needResize
    }
    
    function render(time){
        time *= 0.001; // convert time to seconds
        
        // this preserves the aspect ratio as the window is resized
        if (resizeRendererToDisplaySize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
    
}
main()