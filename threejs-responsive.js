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
    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const box_geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Make a plane
    const planeWidth = 1
    const planeHeight = 1
    const plane_geometry = new THREE.BoxGeometry(planeWidth, planeHeight, 0.001)

    // Define the colors of the "plane"
    // the last two are the front and back of the "plane"
    const materials = [
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
        new THREE.MeshBasicMaterial({color: 0xFF0000}),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
        new THREE.MeshBasicMaterial({color: 0xFF0000}),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
      ];

    // Make a light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    



    function makeInstance(geometry, color, x, materials){
        // const material = new THREE.MeshBasicMaterial({color})

        const instance = new THREE.Mesh(geometry, materials)
        instance.position.x = x;
        return instance
    }

    // const cubes = [
    //     makeInstance(box_geometry, 0x44aa88,  0),
    //     makeInstance(box_geometry, 0x8844aa, -2),
    //     makeInstance(box_geometry, 0xaa8844,  2),
    // ];

    const plane = makeInstance(plane_geometry, 0x8844aa, 0, materials)

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

        // cubes.forEach((cube, ndx) => {
        // const speed = 1 + ndx * .1;
        // const rot = time * speed
        // cube.rotation.x = rot;
        // cube.rotation.y = rot;
        // })

        plane.rotation.x = time * .5
        plane.rotation.z = time * .5

        // scene.add(...cubes, light);
        scene.add(plane, light)
        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}
main()