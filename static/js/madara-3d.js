/* =========================================================
   MADARA 3D EXPERIENCE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach((item) => {

        revealObserver.observe(item);

    });


    /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(".madara-hero-image");

    const eyeOrbit =
        document.querySelector(".madara-eye-orbit");

    const ninja =
        document.querySelector(".ninja-3d");


    let mouseX = 0;
    let mouseY = 0;

    let smoothX = 0;
    let smoothY = 0;


    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth - 0.5) * 2;

        mouseY =
            (event.clientY / window.innerHeight - 0.5) * 2;

    });


    function animateMouse() {

        smoothX +=
            (mouseX - smoothX) * 0.06;

        smoothY +=
            (mouseY - smoothY) * 0.06;


        if (heroImage) {

            heroImage.style.transform =
                `translate3d(${smoothX * 22}px,
                ${smoothY * 15}px, 0)
                rotateY(${smoothX * 5}deg)
                rotateX(${-smoothY * 3}deg)`;

        }


        if (eyeOrbit) {

            eyeOrbit.style.transform =
                `translate3d(${smoothX * -25}px,
                ${smoothY * -20}px, 0)
                rotateY(${smoothX * 8}deg)
                rotateX(${-smoothY * 6}deg)`;

        }


        if (ninja) {

            ninja.style.transform =
                `translate3d(${smoothX * 35}px,
                ${smoothY * 25}px, 0)
                rotateY(${smoothX * 15}deg)`;

        }


        requestAnimationFrame(animateMouse);

    }


    animateMouse();


    /* =====================================================
       3D GALLERY TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(".tilt-card");


    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 7;

            const rotateX =
                -((y - centerY) / centerY) * 7;


            card.style.transform =
                `perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";

        });

    });


    /* =====================================================
       IMAGE MOUSE MOVEMENT
    ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".madara-gallery-card img"
        );


    galleryImages.forEach((image) => {

        image.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    image.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) /
                    rect.width - .5) * 12;

                const y =
                    ((event.clientY - rect.top) /
                    rect.height - .5) * 12;


                image.style.transform =
                    `scale(1.08)
                    translate(${x}px, ${y}px)`;

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1)";

            }
        );

    });


    /* =====================================================
       PARTICLE SYSTEM
    ===================================================== */

    const canvas =
        document.getElementById(
            "madaraParticles"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    let width =
        canvas.width =
        window.innerWidth;

    let height =
        canvas.height =
        window.innerHeight;


    window.addEventListener(
        "resize",
        () => {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

        }
    );


    const particles = [];


    const particleCount =
        window.innerWidth < 700
            ? 45
            : 100;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() * width,

            y:
                Math.random() * height,

            size:
                Math.random() * 2 + .4,

            speed:
                Math.random() * .6 + .15,

            opacity:
                Math.random() * .7 + .2,

            drift:
                (Math.random() - .5) * .35

        });

    }


    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach((particle) => {

            particle.y -=
                particle.speed;

            particle.x +=
                particle.drift;


            if (particle.y < -10) {

                particle.y =
                    height + 10;

                particle.x =
                    Math.random() * width;

            }


            if (particle.x < -10) {
                particle.x = width;
            }

            if (particle.x > width + 10) {
                particle.x = 0;
            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255, ${Math.floor(
                    20 + Math.random() * 25
                )}, ${Math.floor(
                    20 + Math.random() * 25
                )}, ${particle.opacity})`;


            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ff0000";

            ctx.fill();

        });


        requestAnimationFrame(
            drawParticles
        );

    }


    drawParticles();


    /* =====================================================
       3D DEPTH MOUSE EFFECT
    ===================================================== */

    const depthSection =
        document.querySelector(
            ".madara-depth-section"
        );

    const depthImage =
        document.querySelector(
            ".depth-madara"
        );


    if (
        depthSection &&
        depthImage
    ) {

        depthSection.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    depthSection.getBoundingClientRect();

                const x =
                    (event.clientX -
                    rect.left) /
                    rect.width - .5;

                const y =
                    (event.clientY -
                    rect.top) /
                    rect.height - .5;


                depthImage.style.transform =
                    `translate3d(
                        ${x * 30}px,
                        ${y * 20}px,
                        60px
                    )
                    rotateY(${x * 8}deg)
                    rotateX(${-y * 5}deg)`;

            }
        );


        depthSection.addEventListener(
            "mouseleave",
            () => {

                depthImage.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       3D FLOATING CHARACTER
    ===================================================== */

    const floating =
        document.querySelector(
            ".floating-character"
        );


    if (floating) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                    window.innerWidth - .5);

                const y =
                    (event.clientY /
                    window.innerHeight - .5);


                floating.style.transform =
                    `translate3d(
                        ${x * -30}px,
                        ${y * -20}px,
                        0
                    )
                    rotateY(${x * 8}deg)
                    rotateX(${-y * 4}deg)`;

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       CURSOR RED LIGHT
    ===================================================== */

    const cursorLight =
        document.createElement("div");


    cursorLight.className =
        "madara-cursor-light";


    document.body.appendChild(
        cursorLight
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            cursorLight.style.left =
                event.clientX + "px";

            cursorLight.style.top =
                event.clientY + "px";

        }
    );


    /* =====================================================
       POWER CARD RANDOM PULSE
    ===================================================== */

    const powerCards =
        document.querySelectorAll(
            ".power-card"
        );


    powerCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 40}ms`;

        }
    );


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.body.classList.add(
        "madara-loaded"
    );

});

/* =========================================================
   SHARINGAN 3D MOUSE TRACKING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".explore-card");

    cards.forEach(card => {

        const eyes = card.querySelector(".card-eyes-image");

        if (!eyes) return;


        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const moveX =
                (x - centerX) / 25;

            const moveY =
                (y - centerY) / 25;


            card.style.setProperty(
                "--eye-x",
                `${moveX}px`
            );

            card.style.setProperty(
                "--eye-y",
                `${moveY}px`
            );


            eyes.style.transform = `
                translate3d(
                    ${moveX}px,
                    ${moveY}px,
                    80px
                )
                scale(1.12)
            `;

        });


        card.addEventListener("mouseleave", () => {

            card.style.setProperty(
                "--eye-x",
                "0px"
            );

            card.style.setProperty(
                "--eye-y",
                "0px"
            );


            eyes.style.transform = `
                translate3d(0, 0, 40px)
                scale(1.05)
            `;

        });

    });

});