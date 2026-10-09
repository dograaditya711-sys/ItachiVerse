/* =========================================================
   STORY 3D ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader =
        document.getElementById("storyLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 700);

    });


    /* =====================================================
       PARTICLE ENGINE
    ===================================================== */

    const particleContainer =
        document.getElementById("particles");

    const emberContainer =
        document.getElementById("embers");


    function createParticle() {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        const size =
            Math.random() * 4 + 1;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.setProperty(
            "--duration",
            `${Math.random() * 12 + 6}s`
        );

        particle.style.setProperty(
            "--moveX",
            `${(Math.random() - .5) * 500}px`
        );

        particle.style.setProperty(
            "--moveZ",
            `${(Math.random() - .5) * 500}px`
        );

        particle.style.animationDelay =
            `${Math.random() * 8}s`;

        particleContainer.appendChild(
            particle
        );

    }


    for (let i = 0; i < 90; i++) {

        createParticle();

    }


    /* =====================================================
       EMBERS
    ===================================================== */

    function createEmber() {

        const ember =
            document.createElement("span");

        ember.className =
            "particle";

        ember.style.left =
            `${Math.random() * 100}%`;

        ember.style.bottom =
            "0";

        ember.style.setProperty(
            "--duration",
            `${Math.random() * 7 + 3}s`
        );

        ember.style.setProperty(
            "--moveX",
            `${(Math.random() - .5) * 250}px`
        );

        ember.style.setProperty(
            "--moveZ",
            "0px"
        );

        ember.style.animationDelay =
            `${Math.random() * 5}s`;

        emberContainer.appendChild(
            ember
        );

    }


    for (let i = 0; i < 35; i++) {

        createEmber();

    }


    /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(
            ".story-hero-3d"
        );

    const heroCopy =
        document.querySelector(
            ".hero-copy"
        );

    const heroEye =
        document.querySelector(
            ".hero-eye"
        );

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (event.clientX /
                window.innerWidth - .5);

            mouseY =
                (event.clientY /
                window.innerHeight - .5);

        }
    );


    function animateParallax() {

        currentX +=
            (mouseX - currentX) * .05;

        currentY +=
            (mouseY - currentY) * .05;


        if (heroCopy) {

            heroCopy.style.transform =
                `
                translate3d(
                    ${currentX * -25}px,
                    ${currentY * -15}px,
                    100px
                )
                `;

        }


        if (heroEye) {

            heroEye.style.transform =
                `
                translateY(-50%)
                rotateY(${currentX * 20 - 18}deg)
                rotateX(${currentY * -15 + 10}deg)
                translateZ(80px)
                `;

        }


        requestAnimationFrame(
            animateParallax
        );

    }

    animateParallax();


    /* =====================================================
       CARD 3D TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".timeline-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

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

                const rotateX =
                    ((y - centerY) /
                    centerY) * -4;

                const rotateY =
                    ((x - centerX) /
                    centerX) * 5;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                    scale(1.015)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-card"
        );


    const revealObserver =
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

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: .15
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       HERO EYE FOLLOW
    ===================================================== */

    const pupil =
        document.querySelector(
            ".eye-pupil"
        );


    if (pupil) {

        window.addEventListener(
            "mousemove",
            event => {

                const eye =
                    document
                        .querySelector(
                            ".eye-inner"
                        );

                if (!eye) return;

                const rect =
                    eye.getBoundingClientRect();

                const centerX =
                    rect.left +
                    rect.width / 2;

                const centerY =
                    rect.top +
                    rect.height / 2;

                const angle =
                    Math.atan2(
                        event.clientY - centerY,
                        event.clientX - centerX
                    );

                const distance =
                    Math.min(
                        30,
                        Math.hypot(
                            event.clientX - centerX,
                            event.clientY - centerY
                        ) / 10
                    );

                const x =
                    Math.cos(angle) *
                    distance;

                const y =
                    Math.sin(angle) *
                    distance;


                pupil.style.transform =
                    `
                    translate(
                        calc(-50% + ${x}px),
                        calc(-50% + ${y}px)
                    )
                    `;

            }
        );

    }


    /* =====================================================
       RANDOM EYE BLINK
    ===================================================== */

    const eye =
        document.querySelector(
            ".eye-inner"
        );


    function blinkEye() {

        if (!eye) return;

        eye.animate(
            [
                {
                    clipPath:
                        "inset(0 0 0 0)"
                },

                {
                    clipPath:
                        "inset(48% 0 48% 0)"
                },

                {
                    clipPath:
                        "inset(0 0 0 0)"
                }

            ],
            {
                duration: 280,
                easing:
                    "ease-in-out"
            }
        );

        const next =
            Math.random() * 5000 + 2500;

        setTimeout(
            blinkEye,
            next
        );

    }


    setTimeout(
        blinkEye,
        3000
    );


    /* =====================================================
       SCROLL DEPTH
    ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            const moon =
                document.querySelector(
                    ".moon-3d"
                );

            if (moon) {

                moon.style.transform =
                    `
                    translateY(
                        ${scroll * .08}px
                    )
                    rotate(
                        ${scroll * .02}deg
                    )
                    `;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       IMAGE DEPTH
    ===================================================== */

    const memoryCards =
        document.querySelectorAll(
            ".memory-card"
        );


    memoryCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX -
                    rect.left) /
                    rect.width;

                const y =
                    (event.clientY -
                    rect.top) /
                    rect.height;

                const rotateY =
                    (x - .5) * 10;

                const rotateX =
                    (y - .5) * -10;

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

});