const character =
    document.getElementById("character");

const eyesBackground =
    document.getElementById("eyesParallax");

const eyesVideo =
    document.getElementById("eyesVideo");


let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

let eyesX = 0;
let eyesY = 0;


/* =====================================================
   MOUSE TRACKING
===================================================== */

document.addEventListener("mousemove", (event) => {

    const x =
        event.clientX / window.innerWidth;

    const y =
        event.clientY / window.innerHeight;


    mouseX =
        (x - 0.5) * 2;

    mouseY =
        (y - 0.5) * 2;

});


/* =====================================================
   LIVE 3D SCENE
===================================================== */

function animateScene() {


    /* =================================================
       ITACHI CHARACTER
    ================================================= */

    if (character) {

        currentX +=
            (mouseX - currentX) * 0.06;

        currentY +=
            (mouseY - currentY) * 0.06;


        const moveX =
            currentX * 25;

        const moveY =
            currentY * 15;


        const rotateY =
            currentX * 5;

        const rotateX =
            currentY * -3;


        character.style.transform = `
            translate3d(
                ${moveX}px,
                ${moveY}px,
                0
            )
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
        `;

    }


    /* =================================================
       EYES VIDEO 3D PARALLAX
    ================================================= */

    if (eyesBackground) {

        eyesX +=
            (mouseX - eyesX) * 0.035;

        eyesY +=
            (mouseY - eyesY) * 0.035;


        const moveX =
            eyesX * 35;

        const moveY =
            eyesY * 22;


        const rotateY =
            eyesX * 2.5;

        const rotateX =
            eyesY * -2;


        eyesBackground.style.transform = `
            translate3d(
                ${moveX}px,
                ${moveY}px,
                0
            )
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
        `;

    }


    requestAnimationFrame(animateScene);

}


animateScene();


/* =====================================================
   START VIDEO
===================================================== */

window.addEventListener("load", () => {

    if (!eyesVideo) return;

    eyesVideo.muted = true;
    eyesVideo.setAttribute("muted", "");
    eyesVideo.setAttribute("playsinline", "");

    const playVideo = () => {

        eyesVideo.play().catch((error) => {

            console.log(
                "Video autoplay error:",
                error
            );

        });

    };


    playVideo();


    /* Browser ko ek aur chance */

    setTimeout(() => {

        if (eyesVideo.paused) {
            playVideo();
        }

    }, 500);

});


/* =====================================================
   TAB VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!eyesVideo) return;


        if (document.hidden) {

            eyesVideo.pause();

        } else {

            eyesVideo.play().catch(() => {});

        }

    }
);
/* =====================================================
   FLOATING IMAGE 3D PARALLAX
===================================================== */

const floatingItems =
    document.querySelectorAll(".floating-item");


let floatingMouseX = 0;
let floatingMouseY = 0;


document.addEventListener("mousemove", (event) => {

    floatingMouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    floatingMouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;


    floatingItems.forEach((item, index) => {

        const strength =
            8 + (index * 6);

        const moveX =
            floatingMouseX * strength;

        const moveY =
            floatingMouseY * strength;


        item.style.marginLeft =
            `${moveX}px`;

        item.style.marginTop =
            `${moveY}px`;

    });

});