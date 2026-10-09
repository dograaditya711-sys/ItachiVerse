const canvas = document.getElementById("itachiParticles");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "/static/images/itachi.png";

let particles = [];
let animationStarted = false;
let scrollProgress = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// ===============================
// BIRD PARTICLE
// ===============================

class BirdParticle {

    constructor(x, y, color) {

        this.targetX = x;
        this.targetY = y;

        // Birds start from random places
        this.x = Math.random() * canvas.width;
        this.y =
            canvas.height +
            Math.random() * 500;

        this.size =
            Math.random() * 4 + 2;

        this.color = color;

        this.speed =
            Math.random() * 0.015 + 0.008;

        this.delay =
            Math.random() * 1.5;

        this.angle =
            Math.random() * Math.PI * 2;

        this.randomX =
            (Math.random() - 0.5) * 500;

        this.randomY =
            (Math.random() - 0.5) * 500;
    }

    update(time) {

        let progress =
            Math.min(
                Math.max(
                    (time - this.delay) * this.speed,
                    0
                ),
                1
            );

        // Smooth movement
        let ease =
            progress * progress *
            (3 - 2 * progress);

        this.x =
            this.x +
            (this.targetX - this.x) * ease * 0.08;

        this.y =
            this.y +
            (this.targetY - this.y) * ease * 0.08;

        // Scroll = particles fly away
        if (scrollProgress > 0) {

            this.x +=
                this.randomX *
                scrollProgress *
                0.08;

            this.y -=
                (250 + Math.abs(this.randomY)) *
                scrollProgress;
        }
    }

    draw() {

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate(
            Math.sin(this.angle) * 0.3
        );

        ctx.globalAlpha =
            Math.max(
                0,
                1 - scrollProgress
            );

        ctx.fillStyle = this.color;

        // =========================
        // SMALL BIRD SHAPE
        // =========================

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.quadraticCurveTo(
            -this.size * 2,
            -this.size * 2,
            -this.size * 4,
            0
        );

        ctx.quadraticCurveTo(
            -this.size * 2,
            -this.size,
            0,
            this.size
        );

        ctx.quadraticCurveTo(
            this.size * 2,
            -this.size,
            this.size * 4,
            0
        );

        ctx.quadraticCurveTo(
            this.size * 2,
            -this.size * 2,
            0,
            0
        );

        ctx.fill();

        ctx.restore();
    }
}


// ===============================
// CREATE PARTICLES FROM ITACHI
// ===============================

image.onload = function () {

    const tempCanvas =
        document.createElement("canvas");

    const tempCtx =
        tempCanvas.getContext("2d");

    const maxWidth =
        Math.min(
            window.innerWidth * 0.65,
            850
        );

    const ratio =
        image.height / image.width;

    const width = maxWidth;
    const height = width * ratio;

    tempCanvas.width = width;
    tempCanvas.height = height;

    tempCtx.drawImage(
        image,
        0,
        0,
        width,
        height
    );

    const pixels =
        tempCtx.getImageData(
            0,
            0,
            width,
            height
        ).data;

    const startX =
        (canvas.width - width) / 2;

    const startY =
        (canvas.height - height) / 2;

    // Particle spacing
    const gap = 7;

    for (
        let y = 0;
        y < height;
        y += gap
    ) {

        for (
            let x = 0;
            x < width;
            x += gap
        ) {

            const index =
                (Math.floor(y) *
                    width +
                    Math.floor(x)) * 4;

            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const a = pixels[index + 3];

            if (a > 80) {

                // Don't create particles
                // for very dark transparent areas
                if (
                    r + g + b > 20
                ) {

                    particles.push(

                        new BirdParticle(
                            startX + x,
                            startY + y,
                            `rgb(${r},${g},${b})`
                        )

                    );
                }
            }
        }
    }

    animationStarted = true;
};


// ===============================
// ANIMATION
// ===============================

let startTime = performance.now();

function animate(now) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if (animationStarted) {

        const elapsed =
            (now - startTime) / 1000;

        particles.forEach(
            particle => {

                particle.update(elapsed);
                particle.draw();

            }
        );
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);


// ===============================
// SCROLL ANIMATION
// ===============================

window.addEventListener(
    "scroll",
    () => {

        const maxScroll = 500;

        scrollProgress =
            Math.min(
                window.scrollY / maxScroll,
                1
            );

    }
);