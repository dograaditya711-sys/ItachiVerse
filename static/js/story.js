const container =
    document.getElementById("story-canvas");


if (container && typeof THREE !== "undefined") {

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
            window.innerHeight,
            0.1,
            2000
        );


    camera.position.z = 9;


    const renderer =
        new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    container.appendChild(
        renderer.domElement
    );


    /* =====================================
       RED CHAKRA CORE
    ===================================== */

    const coreGeometry =
        new THREE.SphereGeometry(
            1.25,
            64,
            64
        );


    const coreMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x550000,
            emissive: 0x8b0000,
            emissiveIntensity: 2,
            roughness: .25,
            metalness: .7
        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    scene.add(core);


    /* =====================================
       OUTER RINGS
    ===================================== */

    const rings = [];


    for (let i = 0; i < 6; i++) {

        const geometry =
            new THREE.TorusGeometry(
                1.8 + i * .3,
                .008,
                16,
                160
            );


        const material =
            new THREE.MeshBasicMaterial({
                color: 0xaa0000,
                transparent: true,
                opacity: .45
            });


        const ring =
            new THREE.Mesh(
                geometry,
                material
            );


        ring.rotation.x =
            Math.random() * Math.PI;


        ring.rotation.y =
            Math.random() * Math.PI;


        scene.add(ring);

        rings.push(ring);
    }


    /* =====================================
       PARTICLES
    ===================================== */

    const particleCount = 1600;


    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            3 +
            Math.random() * 10;


        const angle =
            Math.random() *
            Math.PI *
            2;


        positions[i * 3] =
            Math.cos(angle) *
            radius;


        positions[i * 3 + 1] =
            (Math.random() - .5) *
            12;


        positions[i * 3 + 2] =
            Math.sin(angle) *
            radius;

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({
            color: 0xff2020,
            size: .025,
            transparent: true,
            opacity: .65
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* =====================================
       LIGHT
    ===================================== */

    const redLight =
        new THREE.PointLight(
            0xff0000,
            7,
            30
        );


    redLight.position.set(
        0,
        0,
        4
    );


    scene.add(redLight);


    const ambient =
        new THREE.AmbientLight(
            0x220000,
            1.5
        );


    scene.add(ambient);


    /* =====================================
       MOUSE
    ===================================== */

    let mouseX = 0;
    let mouseY = 0;


    let targetX = 0;
    let targetY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            targetX =
                (event.clientX /
                    window.innerWidth -
                    .5) * 2;


            targetY =
                (event.clientY /
                    window.innerHeight -
                    .5) * 2;

        }
    );


    /* =====================================
       ANIMATION
    ===================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        mouseX +=
            (targetX - mouseX) *
            .04;


        mouseY +=
            (targetY - mouseY) *
            .04;


        core.rotation.x =
            time * .15 +
            mouseY * .25;


        core.rotation.y =
            time * .25 +
            mouseX * .35;


        core.scale.setScalar(
            1 +
            Math.sin(time * 2) * .025
        );


        rings.forEach(
            (ring, index) => {

                ring.rotation.x +=
                    .001 *
                    (index + 1);


                ring.rotation.y +=
                    .002 *
                    (index + 1);

            }
        );


        particles.rotation.y =
            time * .025;


        particles.rotation.x =
            mouseY * .05;


        camera.position.x +=
            (
                mouseX * .7 -
                camera.position.x
            ) * .025;


        camera.position.y +=
            (
                -mouseY * .5 -
                camera.position.y
            ) * .025;


        camera.lookAt(
            scene.position
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =====================================
       RESIZE
    ===================================== */

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


/* =========================================
   STORY CARD REVEAL
========================================= */

const cards =
    document.querySelectorAll(
        ".story-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


cards.forEach(
    card => observer.observe(card)
);


/* =========================================
   IMAGE PARALLAX
========================================= */

cards.forEach(card => {

    const image =
        card.querySelector(
            ".story-card-image"
        );


    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - .5)
                * 10;


            const rotateX =
                ((y / rect.height) - .5)
                * -10;


            image.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            image.style.transform =
                "";

        }
    );

});