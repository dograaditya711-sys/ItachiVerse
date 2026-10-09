/* =====================================================
   ITACHIVERSE — MISSION PROGRESSION ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MISSION DATA
    ================================================= */

    const missions = {
        "C-021": {
            rank: "C",
            title: "LOST SCROLL",
            difficulty: "EASY",
            xp: 100,
            chakra: 20,
            objective: "RECOVER THE LOST SHINOBI SCROLL"
        },

        "B-014": {
            rank: "B",
            title: "FOREST PATROL",
            difficulty: "MEDIUM",
            xp: 200,
            chakra: 35,
            objective: "INVESTIGATE THE NORTHERN FOREST"
        },

        "A-007": {
            rank: "A",
            title: "AKATSUKI TRACE",
            difficulty: "HIGH",
            xp: 350,
            chakra: 50,
            objective: "FOLLOW THE AKATSUKI OPERATIVE"
        },

        "S-001": {
            rank: "S",
            title: "THE UCHIHA SHADOW",
            difficulty: "EXTREME",
            xp: 500,
            chakra: 70,
            objective: "INVESTIGATE THE UCHIHA DISTRICT"
        }
    };


    /* =================================================
       PLAYER STATE
    ================================================= */

    let player = JSON.parse(
        localStorage.getItem("itachiversePlayer")
    ) || {
        xp: 0,
        level: 1,
        completed: [],
        rank: "GENIN"
    };


    let selectedMission = null;
    let activeMission = null;

    let countdownTimer = null;
    let objectiveTimer = null;


    /* =================================================
       ELEMENTS
    ================================================= */

    const modal =
        document.querySelector("#missionModal");

    const closeModal =
        document.querySelector("#closeModal");

    const acceptMission =
        document.querySelector("#acceptMission");

    const activeMissionBox =
        document.querySelector("#activeMission");

    const activeMissionName =
        document.querySelector("#activeMissionName");

    const countdown =
        document.querySelector("#countdown");

    const objectivePercent =
        document.querySelector("#objectivePercent");

    const objectiveFill =
        document.querySelector("#objectiveFill");

    const completeObjective =
        document.querySelector("#completeObjective");

    const completeScreen =
        document.querySelector("#completeScreen");

    const continueBtn =
        document.querySelector("#continueBtn");


    /* =================================================
       PLAYER UI
    ================================================= */

    const xpCurrent =
        document.querySelector("#xpCurrent");

    const xpMax =
        document.querySelector("#xpMax");

    const xpFill =
        document.querySelector("#xpFill");

    const playerLevel =
        document.querySelector("#playerLevel");

    const playerRank =
        document.querySelector("#playerRank");

    const completedMissions =
        document.querySelector("#completedMissions");


    /* =================================================
       SAVE PLAYER
    ================================================= */

    function savePlayer() {

        localStorage.setItem(
            "itachiversePlayer",
            JSON.stringify(player)
        );

    }


    /* =================================================
       XP REQUIRED
    ================================================= */

    function requiredXP() {

        return player.level * 1000;

    }


    /* =================================================
       UPDATE PLAYER
    ================================================= */

    function updatePlayerUI() {

        const maxXP =
            requiredXP();

        if (xpCurrent)
            xpCurrent.textContent =
                player.xp;

        if (xpMax)
            xpMax.textContent =
                maxXP;

        if (xpFill)
            xpFill.style.width =
                `${Math.min(
                    (player.xp / maxXP) * 100,
                    100
                )}%`;

        if (playerLevel)
            playerLevel.textContent =
                String(player.level).padStart(2, "0");

        if (playerRank)
            playerRank.textContent =
                player.rank;

        if (completedMissions)
            completedMissions.textContent =
                player.completed.length;

    }


    /* =================================================
       RANK SYSTEM
    ================================================= */

    function calculateRank() {

        if (player.level >= 10)
            return "KAGE";

        if (player.level >= 7)
            return "ANBU";

        if (player.level >= 5)
            return "JONIN";

        if (player.level >= 3)
            return "CHUNIN";

        return "GENIN";

    }


    /* =================================================
       LEVEL CHECK
    ================================================= */

    function checkLevelUp() {

        let leveledUp = false;

        while (
            player.xp >= requiredXP()
        ) {

            player.xp -= requiredXP();

            player.level++;

            leveledUp = true;

        }

        const oldRank =
            player.rank;

        player.rank =
            calculateRank();

        if (
            player.rank !== oldRank
        ) {

            showLevelMessage(
                `RANK PROMOTED — ${player.rank}`
            );

        }
        else if (leveledUp) {

            showLevelMessage(
                `LEVEL ${String(player.level).padStart(2, "0")}`
            );

        }

        if (leveledUp) {

            updatePlayerUI();

        }

        savePlayer();

    }


    /* =================================================
       LEVEL MESSAGE
    ================================================= */

    function showLevelMessage(text) {

        const message =
            document.createElement("div");

        message.className =
            "level-up-message";

        message.innerHTML = `
            <div class="level-symbol">忍</div>

            <span>SHINOBI PROGRESSION</span>

            <strong>${text}</strong>

            <small>NEW POWER UNLOCKED</small>
        `;

        document.body.appendChild(message);

        setTimeout(() => {

            message.classList.add("show");

        }, 50);

        setTimeout(() => {

            message.classList.remove("show");

            setTimeout(() => {

                message.remove();

            }, 500);

        }, 2800);

    }


    /* =================================================
       MISSION UNLOCK SYSTEM
    ================================================= */

    function isUnlocked(mission) {

        const rank =
            mission.rank;

        if (rank === "C")
            return true;

        if (rank === "B")
            return player.completed.includes("C-021");

        if (rank === "A")
            return player.completed.includes("B-014");

        if (rank === "S")
            return player.completed.includes("A-007");

        return false;

    }


    /* =================================================
       UPDATE MISSION CARDS
    ================================================= */

    function updateMissionCards() {

        document
            .querySelectorAll(".mission-card")
            .forEach(card => {

                const id =
                    card.dataset.id;

                const mission =
                    missions[id];

                if (!mission)
                    return;


                card.classList.remove(
                    "mission-locked",
                    "mission-completed"
                );


                const oldStatus =
                    card.querySelector(
                        ".mission-status"
                    );

                if (oldStatus)
                    oldStatus.remove();


                /* COMPLETED */

                if (
                    player.completed.includes(id)
                ) {

                    card.classList.add(
                        "mission-completed"
                    );

                    addStatus(
                        card,
                        "✓ COMPLETED"
                    );

                    return;

                }


                /* LOCKED */

                if (
                    !isUnlocked(mission)
                ) {

                    card.classList.add(
                        "mission-locked"
                    );

                    addStatus(
                        card,
                        "🔒 LOCKED"
                    );

                    return;

                }


                /* AVAILABLE */

                addStatus(
                    card,
                    "⚡ AVAILABLE"
                );

            });

    }


    /* =================================================
       STATUS
    ================================================= */

    function addStatus(card, text) {

        const status =
            document.createElement("div");

        status.className =
            "mission-status";

        status.textContent =
            text;

        card.appendChild(status);

    }


    /* =================================================
       FILTER SYSTEM
    ================================================= */

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".filter")
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add(
                        "active"
                    );

                    const rank =
                        button.dataset.rank;

                    document
                        .querySelectorAll(
                            ".mission-card"
                        )
                        .forEach(card => {

                            if (
                                rank === "ALL" ||
                                card.dataset.rank === rank
                            ) {

                                card.style.display =
                                    "";

                            }
                            else {

                                card.style.display =
                                    "none";

                            }

                        });

                }
            );

        });


    /* =================================================
       OPEN MISSION
    ================================================= */

    document
        .querySelectorAll(".mission-card")
        .forEach(card => {

            const button =
                card.querySelector(
                    ".view-mission"
                );

            if (!button)
                return;


            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const id =
                        card.dataset.id;

                    const mission =
                        missions[id];

                    if (!mission)
                        return;


                    if (
                        player.completed.includes(id)
                    ) {

                        showMessage(
                            "MISSION ALREADY COMPLETED."
                        );

                        return;

                    }


                    if (
                        !isUnlocked(mission)
                    ) {

                        showMessage(
                            "MISSION LOCKED — COMPLETE THE PREVIOUS RANK FIRST."
                        );

                        return;

                    }


                    selectedMission =
                        mission;

                    selectedMission.id =
                        id;


                    fillMissionModal(
                        mission
                    );


                    modal.classList.add(
                        "show"
                    );

                }
            );

        });


    /* =================================================
       FILL MODAL
    ================================================= */

    function fillMissionModal(
        mission
    ) {

        const detailRank =
            document.querySelector(
                "#detailRank"
            );

        const detailId =
            document.querySelector(
                "#detailId"
            );

        const detailTitle =
            document.querySelector(
                "#detailTitle"
            );

        const detailLore =
            document.querySelector(
                "#detailLore"
            );

        const detailObjective =
            document.querySelector(
                "#detailObjective"
            );

        const detailDifficulty =
            document.querySelector(
                "#detailDifficulty"
            );

        const detailXP =
            document.querySelector(
                "#detailXP"
            );


        detailRank.textContent =
            `${mission.rank}-RANK`;

        detailId.textContent =
            `MISSION ${mission.id}`;

        detailTitle.textContent =
            mission.title;

        detailLore.textContent =
            getLore(mission);

        detailObjective.textContent =
            mission.objective;

        detailDifficulty.textContent =
            mission.difficulty;

        detailXP.textContent =
            `${mission.xp} XP`;

    }


    /* =================================================
       LORE
    ================================================= */

    function getLore(mission) {

        const lore = {

            "C-021":
                "A shinobi scroll has disappeared from the village. Recover it before it falls into enemy hands.",

            "B-014":
                "Strange chakra signatures have been detected deep inside the northern forest. Investigate the source.",

            "A-007":
                "An Akatsuki operative has been spotted near the village. Track the trail and discover their objective.",

            "S-001":
                "A mysterious chakra signature has appeared near the abandoned Uchiha district. Its origin remains unknown."

        };

        return lore[mission.id] ||
            "Mission intelligence unavailable.";

    }


    /* =================================================
       CLOSE MODAL
    ================================================= */

    function closeMissionModal() {

        modal.classList.remove(
            "show"
        );

    }


    closeModal.addEventListener(
        "click",
        closeMissionModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeMissionModal();

            }

        }
    );


    /* =================================================
       ACCEPT MISSION
    ================================================= */

    acceptMission.addEventListener(
        "click",
        () => {

            if (!selectedMission)
                return;

            activeMission =
                selectedMission;

            closeMissionModal();

            startMission();

        }
    );


    /* =================================================
       START MISSION
    ================================================= */

    function startMission() {

        if (!activeMission)
            return;


        activeMissionBox.classList.add(
            "show"
        );


        activeMissionName.textContent =
            activeMission.title;


        document
            .querySelector("#missionState")
            .textContent =
            "MISSION ACTIVE";


        let count = 5;

        countdown.textContent =
            String(count).padStart(2, "0");


        clearInterval(
            countdownTimer
        );


        countdownTimer =
            setInterval(() => {

                count--;

                countdown.textContent =
                    String(
                        Math.max(count, 0)
                    ).padStart(2, "0");


                if (count <= 0) {

                    clearInterval(
                        countdownTimer
                    );

                    beginObjective();

                }

            }, 1000);

    }


    /* =================================================
       OBJECTIVE
    ================================================= */

    function beginObjective() {

        let progress = 0;

        objectivePercent.textContent =
            "0%";

        objectiveFill.style.width =
            "0%";

        completeObjective.disabled =
            true;


        clearInterval(
            objectiveTimer
        );


        objectiveTimer =
            setInterval(() => {

                progress += 10;

                objectivePercent.textContent =
                    `${progress}%`;

                objectiveFill.style.width =
                    `${progress}%`;


                if (progress >= 100) {

                    clearInterval(
                        objectiveTimer
                    );

                    completeObjective.disabled =
                        false;

                }

            }, 300);

    }


    /* =================================================
       COMPLETE OBJECTIVE
    ================================================= */

    completeObjective.addEventListener(
        "click",
        completeMission
    );


    function completeMission() {

        if (!activeMission)
            return;


        completeObjective.disabled =
            true;


        const id =
            activeMission.id;


        if (
            player.completed.includes(id)
        ) {

            return;

        }


        player.completed.push(id);


        player.xp +=
            activeMission.xp;


        checkLevelUp();


        savePlayer();


        updatePlayerUI();

        updateMissionCards();


        document
            .querySelector("#rewardXP")
            .textContent =
            `+${activeMission.xp} XP`;


        completeScreen.classList.add(
            "show"
        );


        document
            .querySelector("#missionState")
            .textContent =
            "MISSION COMPLETE";

    }


    /* =================================================
       CONTINUE
    ================================================= */

    continueBtn.addEventListener(
        "click",
        () => {

            completeScreen.classList.remove(
                "show"
            );

            activeMissionBox.classList.remove(
                "show"
            );

            activeMission =
                null;

            selectedMission =
                null;

            objectivePercent.textContent =
                "0%";

            objectiveFill.style.width =
                "0%";

            document
                .querySelector("#missionState")
                .textContent =
                "AWAITING OPERATIVE";

            updateMissionCards();

        }
    );


    /* =================================================
       MESSAGE
    ================================================= */

    function showMessage(text) {

        const box =
            document.createElement("div");

        box.className =
            "mission-message";

        box.textContent =
            text;

        document.body.appendChild(box);


        setTimeout(() => {

            box.classList.add(
                "show"
            );

        }, 20);


        setTimeout(() => {

            box.classList.remove(
                "show"
            );

            setTimeout(() => {

                box.remove();

            }, 300);

        }, 2200);

    }


    /* =================================================
       CARD 3D EFFECT
    ================================================= */

    document
        .querySelectorAll(".mission-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (
                        card.classList.contains(
                            "mission-locked"
                        )
                    )
                        return;


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        ((y -
                            rect.height / 2) /
                            (rect.height / 2)) *
                        -6;


                    const rotateY =
                        ((x -
                            rect.width / 2) /
                            (rect.width / 2)) *
                        6;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

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


    /* =================================================
       PARTICLES
    ================================================= */

    const canvas =
        document.querySelector(
            "#missionCanvas"
        );


    if (canvas) {

        const ctx =
            canvas.getContext("2d");


        let particles = [];


        function resizeCanvas() {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

        }


        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        for (
            let i = 0;
            i < 100;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                size:
                    Math.random() * 2,

                speed:
                    Math.random() * .6 + .1,

                alpha:
                    Math.random() * .5

            });

        }


        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(p => {

                p.y -= p.speed;


                if (p.y < 0)
                    p.y =
                        canvas.height;


                ctx.beginPath();


                ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(255,0,0,${p.alpha})`;


                ctx.fill();

            });


            requestAnimationFrame(
                animateParticles
            );

        }


        animateParticles();

    }


    /* =================================================
       INITIALIZE
    ================================================= */

    updatePlayerUI();

    updateMissionCards();

});