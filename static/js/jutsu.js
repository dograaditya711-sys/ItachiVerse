document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".jutsu-card");
    const filters = document.querySelectorAll(".filter");

    const search = document.getElementById("jutsuSearch");
    const searchCount = document.getElementById("searchCount");
    const noResults = document.getElementById("noResults");

    const modal = document.getElementById("jutsuModal");
    const closeModal = document.getElementById("closeModal");

    const detailTitle = document.getElementById("detailTitle");
    const detailType = document.getElementById("detailType");
    const detailSymbol = document.getElementById("detailSymbol");
    const detailDescription = document.getElementById("detailDescription");
    const detailChakra = document.getElementById("detailChakra");
    const detailClass = document.getElementById("detailClass");

    let currentFilter = "all";


    /* ==========================================
       JUTSU DATA
    ========================================== */

    const jutsuData = {

        "sharingan": {
            title: "SHARINGAN",
            type: "DOUJUTSU",
            symbol: "👁",
            chakra: "30",
            className: "DOUJUTSU",
            description:
                "An ocular ability associated with the Uchiha bloodline. The Sharingan allows its user to perceive and analyze techniques and movements."
        },

        "mangekyo sharingan": {
            title: "MANGEKYO SHARINGAN",
            type: "DOUJUTSU",
            symbol: "◉",
            chakra: "70",
            className: "DOUJUTSU",
            description:
                "An advanced form of the Sharingan that grants its wielder powerful individual abilities."
        },

        "amaterasu black flames": {
            title: "AMATERASU",
            type: "FIRE STYLE",
            symbol: "火",
            chakra: "90",
            className: "FIRE",
            description:
                "A legendary black flame technique associated with the Mangekyo Sharingan. The flames are depicted as continuing to burn after ignition."
        },

        "tsukuyomi genjutsu": {
            title: "TSUKUYOMI",
            type: "GENJUTSU",
            symbol: "月",
            chakra: "85",
            className: "GENJUTSU",
            description:
                "A powerful visual genjutsu associated with Itachi Uchiha."
        },

        "susanoo": {
            title: "SUSANOO",
            type: "NINJUTSU",
            symbol: "須",
            chakra: "100",
            className: "NINJUTSU",
            description:
                "A massive chakra avatar that surrounds and protects its user."
        },

        "great fireball technique": {
            title: "GREAT FIREBALL",
            type: "FIRE STYLE",
            symbol: "炎",
            chakra: "40",
            className: "FIRE",
            description:
                "A Fire Style technique that releases a concentrated blast of flames."
        },

        "shadow clone": {
            title: "SHADOW CLONE",
            type: "NINJUTSU",
            symbol: "影",
            chakra: "35",
            className: "NINJUTSU",
            description:
                "A technique that creates physical clones of the user through chakra."
        },

        "genjutsu illusion": {
            title: "GENJUTSU",
            type: "GENJUTSU",
            symbol: "幻",
            chakra: "60",
            className: "GENJUTSU",
            description:
                "A category of techniques that manipulate the target's perception through chakra."
        }

    };


    /* ==========================================
       FILTER + SEARCH
    ========================================== */

    function updateCards() {

        const query =
            search.value
                .toLowerCase()
                .trim();

        let visible = 0;

        cards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const type =
                card.dataset.type.toLowerCase();

            const matchesSearch =
                name.includes(query);

            const matchesFilter =
                currentFilter === "all" ||
                type === currentFilter;

            if (matchesSearch && matchesFilter) {

                card.style.display = "";

                visible++;

            } else {

                card.style.display = "none";

            }

        });

        searchCount.textContent =
            String(visible).padStart(2, "0");

        noResults.classList.toggle(
            "show",
            visible === 0
        );
    }


    search.addEventListener(
        "input",
        updateCards
    );


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item =>
                item.classList.remove("active")
            );

            filter.classList.add("active");

            currentFilter =
                filter.dataset.type;

            updateCards();

        });

    });


    /* ==========================================
       OPEN DETAIL
    ========================================== */

    cards.forEach(card => {

        const button =
            card.querySelector(".view-jutsu");

        button.addEventListener("click", event => {

            event.stopPropagation();

            const name =
                card.dataset.name;

            const data =
                jutsuData[name];

            if (!data) return;

            detailTitle.textContent =
                data.title;

            detailType.textContent =
                data.type;

            detailSymbol.textContent =
                data.symbol;

            detailChakra.textContent =
                data.chakra;

            detailClass.textContent =
                data.className;

            detailDescription.textContent =
                data.description;

            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        });

    });


    /* ==========================================
       CLOSE MODAL
    ========================================== */

    function closeJutsuModal() {

        modal.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    closeModal.addEventListener(
        "click",
        closeJutsuModal
    );


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeJutsuModal();
        }

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeJutsuModal();
            }

        }
    );


    /* ==========================================
       MASTER BUTTON
    ========================================== */

    document
        .getElementById("masterBtn")
        .addEventListener("click", () => {

            const button =
                document.getElementById("masterBtn");

            button.innerHTML =
                "TECHNIQUE MASTERED ✓";

            button.style.background =
                "transparent";

            button.style.color =
                "#00ff88";

            button.style.borderColor =
                "#00ff88";

        });


    /* ==========================================
       3D CARD TILT
    ========================================== */

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 8;

            const rotateX =
                ((y / rect.height) - .5) * -8;

            card.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform += " translateY(30px)";

        observer.observe(card);

    });


    /* ==========================================
       CURSOR CHAKRA
    ========================================== */

    const cursor =
        document.createElement("div");

    cursor.style.position = "fixed";
    cursor.style.width = "8px";
    cursor.style.height = "8px";
    cursor.style.borderRadius = "50%";
    cursor.style.background = "#ff2020";
    cursor.style.boxShadow =
        "0 0 20px #ff2020";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.transform =
        "translate(-50%, -50%)";

    document.body.appendChild(cursor);


    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                `${event.clientX}px`;

            cursor.style.top =
                `${event.clientY}px`;

        }
    );


    /* ==========================================
       INITIAL
    ========================================== */

    updateCards();

});