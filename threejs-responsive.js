import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas})

    // set up camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 10
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 3
    // camera.position.y = 3
    camera.position.x = 3
    camera.lookAt(0,0,0)
    const scene = new THREE.Scene()

    // Make a light
    const light = new THREE.AmbientLight( 0xFFFFFF );
    light.position.set(-1, 2, 4);
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    let vertices = new Float32Array([
        1.0, 0, 0,    // vertex 1
        0, 1.0, 0,     // vertex 2
        -1.0, 0, 0,      // vertex 3
    ]);
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 'red' , side:THREE.DoubleSide});
    const triangle = new THREE.Mesh(geometry, material);
    scene.add(triangle);

    let verticesTwo = new Float32Array([
        1.0, 0, 0,    // vertex 1
        0, -1.0, 0,     // vertex 2
        -1.0, 0, 0,      // vertex 3
    ]);
    
    const geometryTwo = new THREE.BufferGeometry();
    geometryTwo.setAttribute('position', new THREE.BufferAttribute(verticesTwo, 3));
    const materialTwo = new THREE.MeshBasicMaterial({ color: 'red', side:THREE.DoubleSide });
    const triangleTwo = new THREE.Mesh(geometryTwo, materialTwo);
    scene.add(triangleTwo);

    // now let's make a shape that combines all of these
    // let combinedVerticies = new Float32Array([...verticies, ...verticesTwo])
    // const combinedGeo = new THREE.BufferGeometry();
    // combinedGeo.setAttribute('position', new THREE.BufferAttribute(combinedVerticies, 6));
    // const combined = new THREE.Mesh(combinedGeo, materialTwo);
    // scene.add(combinedGeo);

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
        // triangle.rotation.x = time * .5
        // // triangle.rotation.y = time * .01
        // // triangle.rotation.z = time * .01

        // triangleTwo.rotation.x = time * -.5
        // if triangle && triangleTwo
        // triangle.rotation.x = time * .5
        // triangleTwo.rotation.x = time * -.5

        renderer.render(scene, camera)
        if ((triangle.rotation.x === -triangleTwo.rotation.x) && (triangle.rotation.x > Math.PI / 2)){
            return
        }
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}
main()