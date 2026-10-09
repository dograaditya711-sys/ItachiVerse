/* =========================================================
   ITACHIVERSE — ITACHI 3D DETAIL
   Mouse Parallax + 3D Tilt + Eye Tracking
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".itachi-detail-page");
    const hero = document.querySelector(".itachi-detail-hero");
    const imageBox = document.querySelector(".detail-image");
    const image = document.querySelector(".detail-image img");
    const content = document.querySelector(".detail-content");

    if (!hero || !imageBox || !image) {
        console.warn("Itachi 3D elements not found.");
        return;
    }


    /* =====================================================
       MOUSE POSITION
       ===================================================== */

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth) - 0.5;

        const y =
            (event.clientY / window.innerHeight) - 0.5;

        mouseX = x;
        mouseY = y;

    });


    /* =====================================================
       SMOOTH 3D ANIMATION
       ===================================================== */

    function animate3D() {

        currentX +=
            (mouseX - currentX) * 0.06;

        currentY +=
            (mouseY - currentY) * 0.06;


        /* IMAGE TILT */

        const rotateY =
            currentX * 14;

        const rotateX =
            currentY * -10;


        imageBox.style.transform =
            `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(0)
            `;


        /* IMAGE MOVEMENT */

        const moveX =
            currentX * 25;

        const moveY =
            currentY * 18;


        image.style.transform =
            `
            translate3d(
                ${moveX}px,
                ${moveY}px,
                45px
            )
            scale(1.035)
            `;


        /* TEXT PARALLAX */

        if (content) {

            content.style.transform =
                `
                translate3d(
                    ${currentX * -18}px,
                    ${currentY * -12}px,
                    70px
                )
                `;
        }


        requestAnimationFrame(animate3D);
    }

    animate3D();


    /* =====================================================
       MOUSE ENTER / LEAVE
       ===================================================== */

    hero.addEventListener("mouseenter", () => {

        image.style.filter =
            `
            contrast(1.18)
            saturate(1.3)
            brightness(.86)
            `;

    });


    hero.addEventListener("mouseleave", () => {

        mouseX = 0;
        mouseY = 0;

        image.style.filter =
            `
            contrast(1.12)
            saturate(1.15)
            brightness(.78)
            `;

    });


    /* =====================================================
       CLICK — RED FLASH
       ===================================================== */

    imageBox.addEventListener("click", () => {

        imageBox.classList.remove("eye-flash");

        void imageBox.offsetWidth;

        imageBox.classList.add("eye-flash");

        setTimeout(() => {
            imageBox.classList.remove("eye-flash");
        }, 700);

    });


    /* =====================================================
       SCROLL PARALLAX
       ===================================================== */

    let scrollY = 0;

    window.addEventListener(
        "scroll",
        () => {

            scrollY = window.scrollY;

            const heroRect =
                hero.getBoundingClientRect();

            if (
                heroRect.bottom > 0 &&
                heroRect.top < window.innerHeight
            ) {

                const offset =
                    scrollY * 0.12;

                image.style.marginTop =
                    `${offset}px`;
            }

        },
        { passive: true }
    );


    /* =====================================================
       ABILITY CARD 3D TILT
       ===================================================== */

    const cards =
        document.querySelectorAll(
            ".ability-grid article"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

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
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
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
       RED PARTICLE CLICK EFFECT
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            createRedParticle(
                event.clientX,
                event.clientY
            );

        }
    );


    function createRedParticle(x, y) {

        const particle =
            document.createElement("span");

        particle.style.position =
            "fixed";

        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;

        particle.style.width =
            "5px";

        particle.style.height =
            "5px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            "#ff0000";

        particle.style.boxShadow =
            "0 0 15px #ff0000";

        particle.style.pointerEvents =
            "none";

        particle.style.zIndex =
            "99999";

        document.body.appendChild(
            particle
        );


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            30 + Math.random() * 70;


        const targetX =
            Math.cos(angle) * distance;

        const targetY =
            Math.sin(angle) * distance;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `
                        translate(
                            ${targetX}px,
                            ${targetY}px
                        )
                        scale(0)
                        `,
                    opacity: 0
                }
            ],
            {
                duration: 650,
                easing: "cubic-bezier(.2,.8,.2,1)"
            }
        );


        setTimeout(() => {

            particle.remove();

        }, 700);

    }


    /* =====================================================
       PAGE LOAD
       ===================================================== */

    page.classList.add("itachi-page-ready");


    console.log(
        "ITACHIVERSE 3D SYSTEM ONLINE"
    );

});