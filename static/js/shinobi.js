document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const cards =
        document.querySelectorAll(".shinobi-card");

    const search =
        document.getElementById("shinobiSearch");

    const searchCount =
        document.getElementById("searchCount");

    const noResults =
        document.getElementById("noResults");

    const filters =
        document.querySelectorAll(".filter");


    /* =================================================
       3D CARD TILT
    ================================================= */

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

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

            card.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
            `;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
            `;

        });


        /* =============================================
           CARD CLICK
        ============================================= */

        card.addEventListener("click", () => {

            const url =
                card.dataset.url;

            if (url) {

                document.body.classList.add(
                    "page-leaving"
                );

                setTimeout(() => {

                    window.location.href = url;

                }, 250);

            }

        });

    });


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    cards.forEach(card => {

        observer.observe(card);

    });


    /* =================================================
       SEARCH
    ================================================= */

    function performSearch() {

        const value =
            search.value
                .toLowerCase()
                .trim();

        let visible = 0;


        cards.forEach(card => {

            const name =
                card.dataset.name
                    .toLowerCase();

            const clan =
                card.dataset.clan
                    .toLowerCase();

            const type =
                card.dataset.type
                    .toLowerCase();


            const match =
                name.includes(value) ||
                clan.includes(value) ||
                type.includes(value);


            if (match) {

                card.style.display = "";

                visible++;

            } else {

                card.style.display = "none";

            }

        });


        searchCount.textContent =
            String(visible).padStart(2, "0");


        if (visible === 0) {

            noResults.classList.add(
                "show"
            );

        } else {

            noResults.classList.remove(
                "show"
            );

        }

    }


    search.addEventListener(
        "input",
        performSearch
    );


    /* =================================================
       FILTER
    ================================================= */

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            filter.classList.add("active");


            const selected =
                filter.dataset.filter;

            let visible = 0;


            cards.forEach(card => {

                const clan =
                    card.dataset.clan;

                const type =
                    card.dataset.type;


                if (
                    selected === "all" ||
                    clan === selected ||
                    type === selected
                ) {

                    card.style.display = "";

                    visible++;

                } else {

                    card.style.display = "none";

                }

            });


            search.value = "";

            searchCount.textContent =
                String(visible).padStart(2, "0");


            if (visible === 0) {

                noResults.classList.add(
                    "show"
                );

            } else {

                noResults.classList.remove(
                    "show"
                );

            }

        });

    });


    /* =================================================
       CURSOR CHAKRA LIGHT
    ================================================= */

    const cursorLight =
        document.createElement("div");

    cursorLight.className =
        "cursor-light";

    document.body.appendChild(
        cursorLight
    );


    document.addEventListener(
        "mousemove",
        event => {

            cursorLight.style.left =
                `${event.clientX}px`;

            cursorLight.style.top =
                `${event.clientY}px`;

        }
    );


    /* =================================================
       PARALLAX BACKGROUND
    ================================================= */

    const moon =
        document.querySelector(".moon");

    const symbol =
        document.querySelector(
            ".shinobi-hero::before"
        );


    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                window.innerWidth - .5);

            const y =
                (event.clientY /
                window.innerHeight - .5);


            if (moon) {

                moon.style.transform =
                    `translate(
                        ${x * -20}px,
                        ${y * -20}px
                    )`;

            }

        }
    );


    /* =================================================
       RANDOM PARTICLE
    ================================================= */

    const particleContainer =
        document.querySelector(".scene");


    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "floating-particle";


        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDelay =
            `${Math.random() * 8}s`;

        particle.style.animationDuration =
            `${5 + Math.random() * 8}s`;


        particleContainer.appendChild(
            particle
        );

    }


});