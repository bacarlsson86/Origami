import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas})

    // set up camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2;
    const scene = new THREE.Scene()

    // Make our box
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material)

    // Make a light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);



    function makeInstance(geometry, color, x){
        const material = new THREE.MeshPhongMaterial({color})

        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = x;
        return cube
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];

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

        cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed
        cube.rotation.x = rot;
        cube.rotation.y = rot;
        })

        scene.add(...cubes, light);
        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}
main()