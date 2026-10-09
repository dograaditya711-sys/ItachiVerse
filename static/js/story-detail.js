const canvas =
    document.getElementById(
        "detail-canvas"
    );


if (canvas && typeof THREE !== "undefined") {

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
            window.innerHeight,
            .1,
            1000
        );


    camera.position.z = 7;


    const renderer =
        new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    canvas.appendChild(
        renderer.domElement
    );


    /* RED ENERGY */

    const geometry =
        new THREE.IcosahedronGeometry(
            1.5,
            4
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x260000,

            emissive: 0x8b0000,

            emissiveIntensity: 2,

            metalness: .8,

            roughness: .25

        });


    const sphere =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(sphere);


    /* PARTICLES */

    const count = 1200;

    const data =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        data[i * 3] =
            (Math.random() - .5) * 20;

        data[i * 3 + 1] =
            (Math.random() - .5) * 15;

        data[i * 3 + 2] =
            (Math.random() - .5) * 20;

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            data,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xff1111,

            size: .025,

            transparent: true,

            opacity: .55

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* LIGHT */

    const light =
        new THREE.PointLight(
            0xff0000,
            6,
            30
        );


    light.position.set(
        0,
        0,
        5
    );


    scene.add(light);


    scene.add(
        new THREE.AmbientLight(
            0x250000,
            2
        )
    );


    /* MOUSE */

    let mx = 0;
    let my = 0;

    let tx = 0;
    let ty = 0;


    window.addEventListener(
        "mousemove",
        e => {

            tx =
                (e.clientX /
                    window.innerWidth -
                    .5);

            ty =
                (e.clientY /
                    window.innerHeight -
                    .5);

        }
    );


    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        mx +=
            (tx - mx) * .03;


        my +=
            (ty - my) * .03;


        sphere.rotation.x =
            time * .15 +
            my;


        sphere.rotation.y =
            time * .25 +
            mx;


        sphere.scale.setScalar(
            1 +
            Math.sin(time * 2) * .04
        );


        particles.rotation.y =
            time * .02;


        camera.position.x +=
            (
                mx * 1.2 -
                camera.position.x
            ) * .025;


        camera.position.y +=
            (
                -my * .8 -
                camera.position.y
            ) * .025;


        camera.lookAt(
            0,
            0,
            0
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}
