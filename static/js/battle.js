/* =====================================================
   ITACHIVERSE — BATTLE ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const playerCard =
        document.querySelector("#playerCard");

    const enemyCard =
        document.querySelector("#enemyCard");


    const playerImage =
        document.querySelector("#playerImage");

    const enemyImage =
        document.querySelector("#enemyImage");


    const playerName =
        document.querySelector("#playerName");

    const enemyName =
        document.querySelector("#enemyName");


    const playerHealth =
        document.querySelector("#playerHealth");

    const enemyHealth =
        document.querySelector("#enemyHealth");


    const playerHPText =
        document.querySelector("#playerHPText");

    const enemyHPText =
        document.querySelector("#enemyHPText");


    const playerChakra =
        document.querySelector("#playerChakra");

    const enemyChakra =
        document.querySelector("#enemyChakra");


    const playerChakraText =
        document.querySelector("#playerChakraText");

    const enemyChakraText =
        document.querySelector("#enemyChakraText");


    const startBtn =
        document.querySelector("#startBattleBtn");

    const resetBtn =
        document.querySelector("#resetBtn");


    const attackBtn =
        document.querySelector("#attackBtn");

    const chakraBtn =
        document.querySelector("#chakraBtn");

    const ultimateBtn =
        document.querySelector("#ultimateBtn");

    const guardBtn =
        document.querySelector("#guardBtn");


    const battleMessage =
        document.querySelector("#battleMessage");


    const battleStatus =
        document.querySelector("#battleStatus");


    const heroBattleState =
        document.querySelector("#heroBattleState");


    const turnText =
        document.querySelector("#turnText");


    const turnIndicator =
        document.querySelector(".turn-indicator");


    const battleTimer =
        document.querySelector("#battleTimer");


    const battleLog =
        document.querySelector("#battleLog");


    const resultScreen =
        document.querySelector("#battleResult");


    const resultTitle =
        document.querySelector("#resultTitle");


    const resultText =
        document.querySelector("#resultText");


    const resultReset =
        document.querySelector("#resultReset");


    const totalAttacks =
        document.querySelector("#totalAttacks");


    const damageDealt =
        document.querySelector("#damageDealt");


    const chakraUsed =
        document.querySelector("#chakraUsed");


    const comboCount =
        document.querySelector("#comboCount");


    /* =================================================
       STATE
    ================================================= */

    const MAX_HP = 100;
    const MAX_CHAKRA = 100;

    let playerHP = MAX_HP;
    let enemyHP = MAX_HP;

    let playerCP = MAX_CHAKRA;
    let enemyCP = MAX_CHAKRA;

    let battleStarted = false;
    let battleOver = false;

    let playerTurn = true;

    let seconds = 0;

    let timerInterval = null;

    let enemyAttackTimeout = null;

    let attacks = 0;
    let damage = 0;
    let chakraSpent = 0;
    let combo = 0;


    /* =================================================
       AUDIO ENGINE
    ================================================= */

    let audioContext = null;


    function audio() {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }

        return audioContext;
    }


    function beep(
        frequency = 180,
        duration = 0.08,
        type = "square"
    ) {

        try {

            const ctx = audio();

            const oscillator =
                ctx.createOscillator();

            const gain =
                ctx.createGain();


            oscillator.type = type;

            oscillator.frequency.value =
                frequency;


            gain.gain.setValueAtTime(
                .05,
                ctx.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                .001,
                ctx.currentTime + duration
            );


            oscillator.connect(gain);

            gain.connect(ctx.destination);


            oscillator.start();

            oscillator.stop(
                ctx.currentTime + duration
            );

        } catch (error) {

            console.log(
                "Audio unavailable"
            );

        }

    }


    /* =================================================
       LOG
    ================================================= */

    function log(
        message,
        type = "system"
    ) {

        if (!battleLog) return;


        const line =
            document.createElement("div");

        line.className =
            `log-line ${type}`;


        const time =
            new Date().toLocaleTimeString();


        line.innerHTML = `
            <span>
                ${time}
            </span>
            >
            ${message}
        `;


        battleLog.appendChild(line);


        battleLog.scrollTop =
            battleLog.scrollHeight;

    }


    /* =================================================
       MESSAGE
    ================================================= */

    function message(text) {

        if (battleMessage) {

            battleMessage.textContent =
                text;

        }

    }


    /* =================================================
       UI UPDATE
    ================================================= */

    function updateUI() {


        playerHP =
            Math.max(
                0,
                Math.min(
                    MAX_HP,
                    playerHP
                )
            );


        enemyHP =
            Math.max(
                0,
                Math.min(
                    MAX_HP,
                    enemyHP
                )
            );


        playerCP =
            Math.max(
                0,
                Math.min(
                    MAX_CHAKRA,
                    playerCP
                )
            );


        enemyCP =
            Math.max(
                0,
                Math.min(
                    MAX_CHAKRA,
                    enemyCP
                )
            );


        playerHealth.style.width =
            `${playerHP}%`;


        enemyHealth.style.width =
            `${enemyHP}%`;


        playerChakra.style.width =
            `${playerCP}%`;


        enemyChakra.style.width =
            `${enemyCP}%`;


        playerHPText.textContent =
            `${playerHP} / ${MAX_HP}`;


        enemyHPText.textContent =
            `${enemyHP} / ${MAX_HP}`;


        playerChakraText.textContent =
            `${playerCP} / ${MAX_CHAKRA}`;


        enemyChakraText.textContent =
            `${enemyCP} / ${MAX_CHAKRA}`;


        totalAttacks.textContent =
            attacks;


        damageDealt.textContent =
            damage;


        chakraUsed.textContent =
            chakraSpent;


        comboCount.textContent =
            combo;

    }


    /* =================================================
       TIMER
    ================================================= */

    function startTimer() {

        clearInterval(timerInterval);

        seconds = 0;


        timerInterval =
            setInterval(() => {

                seconds++;


                const minutes =
                    Math.floor(seconds / 60);

                const secs =
                    seconds % 60;


                battleTimer.textContent =
                    `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

            }, 1000);

    }


    function stopTimer() {

        clearInterval(
            timerInterval
        );

    }


    /* =================================================
       SCREEN EFFECT
    ================================================= */

    function screenShake() {

        document.body.classList.remove(
            "screen-shake"
        );


        void document.body.offsetWidth;


        document.body.classList.add(
            "screen-shake"
        );


        setTimeout(() => {

            document.body.classList.remove(
                "screen-shake"
            );

        }, 400);

    }


    /* =================================================
       DAMAGE NUMBER
    ================================================= */

    function showDamage(
        target,
        amount
    ) {

        const element =
            target === "player"
                ? document.querySelector("#playerDamage")
                : document.querySelector("#enemyDamage");


        if (!element) return;


        element.textContent =
            `-${amount}`;


        element.classList.remove(
            "show"
        );


        void element.offsetWidth;


        element.classList.add(
            "show"
        );

    }


    /* =================================================
       HIT
    ================================================= */

    function hitAnimation(
        target,
        powerful = false
    ) {

        const card =
            target === "player"
                ? playerCard
                : enemyCard;


        card.classList.remove(
            "hit"
        );


        void card.offsetWidth;


        card.classList.add(
            "hit"
        );


        if (powerful) {

            screenShake();

        }

    }


    /* =================================================
       START BATTLE
    ================================================= */

    function startBattle() {

        if (battleStarted) return;


        battleStarted = true;

        battleOver = false;

        playerTurn = true;


        startTimer();


        startBtn.disabled =
            true;


        battleStatus.textContent =
            "LIVE";


        heroBattleState.textContent =
            "BATTLE IN PROGRESS";


        turnText.textContent =
            "YOUR TURN";


        turnIndicator.classList.add(
            "live"
        );


        message(
            "COMBAT INITIATED"
        );


        log(
            "Combat sequence initiated.",
            "system"
        );


        log(
            "Player turn activated.",
            "system"
        );


        beep(
            600,
            .15
        );


        updateButtons();

    }


    /* =================================================
       PLAYER ATTACK
    ================================================= */

    function playerAttack(
        type
    ) {

        if (!battleStarted) {

            message(
                "START THE BATTLE FIRST."
            );

            beep(100, .1);

            return;

        }


        if (battleOver) return;


        if (!playerTurn) {

            message(
                "WAIT FOR YOUR TURN."
            );

            return;

        }


        let attackDamage = 0;

        let cost = 0;

        let name = "";


        if (type === "attack") {

            attackDamage =
                random(
                    12,
                    20
                );

            cost = 5;

            name =
                "SHARINGAN STRIKE";

        }


        if (type === "chakra") {

            attackDamage =
                random(
                    20,
                    30
                );

            cost = 18;

            name =
                "AMATERASU";

        }


        if (type === "ultimate") {

            attackDamage =
                random(
                    30,
                    42
                );

            cost = 35;

            name =
                "SUSANOO";

        }


        if (type === "guard") {

            guard();

            return;

        }


        if (playerCP < cost) {

            message(
                "NOT ENOUGH CHAKRA."
            );

            log(
                "Insufficient chakra.",
                "damage"
            );

            beep(
                100,
                .15
            );

            return;

        }


        playerCP -= cost;

        chakraSpent += cost;


        enemyHP -= attackDamage;


        attacks++;

        damage += attackDamage;

        combo++;


        showDamage(
            "enemy",
            attackDamage
        );


        hitAnimation(
            "enemy",
            type === "ultimate"
        );


        if (type === "ultimate") {

            powerfulEffect();

        }


        updateUI();


        message(
            `${name}  —  ${attackDamage} DAMAGE`
        );


        log(
            `${name} hit Madara for ${attackDamage} damage.`,
            "damage"
        );


        beep(
            type === "ultimate"
                ? 80
                : 180,
            .15
        );


        if (enemyHP <= 0) {

            victory();

            return;

        }


        playerTurn = false;


        turnText.textContent =
            "ENEMY TURN";


        updateButtons();


        enemyAttackTimeout =
            setTimeout(
                enemyAttack,
                type === "ultimate"
                    ? 1200
                    : 800
            );

    }


    /* =================================================
       ENEMY ATTACK
    ================================================= */

    function enemyAttack() {

        if (battleOver) return;


        const enemyDamage =
            random(
                8,
                18
            );


        playerHP -=
            enemyDamage;


        enemyCP =
            Math.max(
                0,
                enemyCP - random(5, 12)
            );


        combo = 0;


        showDamage(
            "player",
            enemyDamage
        );


        hitAnimation(
            "player",
            enemyDamage > 15
        );


        screenShake();


        updateUI();


        message(
            `ENEMY COUNTER ATTACK  —  ${enemyDamage} DAMAGE`
        );


        log(
            `Madara counter attacked for ${enemyDamage} damage.`,
            "damage"
        );


        beep(
            120,
            .12
        );


        if (playerHP <= 0) {

            defeat();

            return;

        }


        playerTurn = true;


        turnText.textContent =
            "YOUR TURN";


        message(
            "YOUR TURN — CHOOSE A TECHNIQUE"
        );


        updateButtons();

    }


    /* =================================================
       GUARD
    ================================================= */

    function guard() {

        if (!battleStarted) {

            message(
                "START THE BATTLE FIRST."
            );

            return;

        }


        if (!playerTurn ||
            battleOver) return;


        const recovered =
            random(
                12,
                22
            );


        playerCP =
            Math.min(
                MAX_CHAKRA,
                playerCP + recovered
            );


        playerHP =
            Math.min(
                MAX_HP,
                playerHP + 5
            );


        combo = 0;


        updateUI();


        message(
            `MANGEKYŌ FOCUS — +${recovered} CHAKRA`
        );


        log(
            `Player recovered ${recovered} chakra.`,
            "system"
        );


        beep(
            400,
            .15,
            "sine"
        );


        playerTurn = false;


        turnText.textContent =
            "ENEMY TURN";


        updateButtons();


        enemyAttackTimeout =
            setTimeout(
                enemyAttack,
                900
            );

    }


    /* =================================================
       VICTORY
    ================================================= */

    function victory() {

        battleOver = true;

        stopTimer();


        battleStatus.textContent =
            "VICTORY";


        heroBattleState.textContent =
            "COMBAT COMPLETE";


        turnText.textContent =
            "VICTORY";


        message(
            "VICTORY — ENEMY DEFEATED"
        );


        log(
            "VICTORY. Enemy defeated.",
            "victory"
        );


        setTimeout(() => {

            resultTitle.textContent =
                "VICTORY";

            resultText.textContent =
                "THE ENEMY HAS FALLEN.";

            resultScreen.classList.add(
                "show"
            );

        }, 600);


        updateButtons();

    }


    /* =================================================
       DEFEAT
    ================================================= */

    function defeat() {

        battleOver = true;

        stopTimer();


        battleStatus.textContent =
            "DEFEAT";


        heroBattleState.textContent =
            "COMBAT FAILED";


        turnText.textContent =
            "DEFEATED";


        message(
            "YOUR SHINOBI HAS FALLEN"
        );


        log(
            "DEFEAT. Player HP reached zero.",
            "damage"
        );


        setTimeout(() => {

            resultTitle.textContent =
                "DEFEAT";

            resultText.textContent =
                "THE SHINOBI HAS FALLEN.";

            resultScreen.classList.add(
                "show"
            );

        }, 600);


        updateButtons();

    }


    /* =================================================
       RESET
    ================================================= */

    function resetBattle() {

        clearTimeout(
            enemyAttackTimeout
        );


        stopTimer();


        playerHP =
            MAX_HP;

        enemyHP =
            MAX_HP;


        playerCP =
            MAX_CHAKRA;

        enemyCP =
            MAX_CHAKRA;


        attacks = 0;

        damage = 0;

        chakraSpent = 0;

        combo = 0;


        battleStarted = false;

        battleOver = false;

        playerTurn = true;


        battleTimer.textContent =
            "00:00";


        battleStatus.textContent =
            "READY";


        heroBattleState.textContent =
            "WAITING FOR BATTLE";


        turnText.textContent =
            "WAITING";


        turnIndicator.classList.remove(
            "live"
        );


        startBtn.disabled =
            false;


        message(
            "BATTLE READY"
        );


        resultScreen.classList.remove(
            "show"
        );


        updateUI();

        updateButtons();


        log(
            "Arena reset. Waiting for combat.",
            "system"
        );


        beep(
            250,
            .1
        );

    }


    /* =================================================
       BUTTON STATE
    ================================================= */

    function updateButtons() {

        const disabled =
            !battleStarted ||
            battleOver ||
            !playerTurn;


        attackBtn.disabled =
            disabled;


        chakraBtn.disabled =
            disabled;


        ultimateBtn.disabled =
            disabled;


        guardBtn.disabled =
            disabled;

    }


    /* =================================================
       RANDOM
    ================================================= */

    function random(
        min,
        max
    ) {

        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;

    }


    /* =================================================
       POWERFUL EFFECT
    ================================================= */

    function powerfulEffect() {

        const arena =
            document.querySelector(
                "#battleArena"
            );


        if (!arena) return;


        arena.style.filter =
            "brightness(1.7)";


        setTimeout(() => {

            arena.style.filter =
                "";

        }, 350);

    }


    /* =================================================
       TECHNIQUE EVENTS
    ================================================= */

    attackBtn.addEventListener(
        "click",
        () => {

            playerAttack(
                "attack"
            );

        }
    );


    chakraBtn.addEventListener(
        "click",
        () => {

            playerAttack(
                "chakra"
            );

        }
    );


    ultimateBtn.addEventListener(
        "click",
        () => {

            playerAttack(
                "ultimate"
            );

        }
    );


    guardBtn.addEventListener(
        "click",
        () => {

            playerAttack(
                "guard"
            );

        }
    );


    startBtn.addEventListener(
        "click",
        startBattle
    );


    resetBtn.addEventListener(
        "click",
        resetBattle
    );


    resultReset.addEventListener(
        "click",
        resetBattle
    );


    /* =================================================
       WARRIOR SELECTION
    ================================================= */

    const warriors =
        document.querySelectorAll(
            ".warrior-card"
        );


    warriors.forEach(card => {

        card.addEventListener(
            "click",
            () => {


                if (battleStarted) {

                    message(
                        "RESET THE ARENA TO CHANGE WARRIOR."
                    );

                    return;

                }


                warriors.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                card.classList.add(
                    "active"
                );


                const image =
                    card.dataset.image;

                const name =
                    card.dataset.name;


                playerImage.src =
                    image;

                playerName.textContent =
                    name;


                message(
                    `${name} SELECTED`
                );


                log(
                    `${name} selected as player.`,
                    "system"
                );


                beep(
                    300,
                    .1
                );

            }
        );

    });


    /* =================================================
       3D CARD MOVEMENT
    ================================================= */

    document
        .querySelectorAll(
            ".fighter-card, .technique-card, .warrior-card"
        )
        .forEach(card => {


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


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                        centerY) *
                        -4;


                    const rotateY =
                        ((x - centerX) /
                        centerX) *
                        4;


                    card.style.transform =
                        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

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
       PARTICLE SYSTEM
    ================================================= */

    const canvas =
        document.querySelector(
            "#battleCanvas"
        );


    const ctx =
        canvas.getContext("2d");


    let particles = [];


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();


    function createParticle() {

        return {

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 2 + .3,

            speed:
                Math.random() * .6 + .1,

            alpha:
                Math.random() * .5 + .1

        };

    }


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        particles.push(
            createParticle()
        );

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


            if (p.y < -10) {

                p.y =
                    canvas.height + 10;

            }


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


    /* =================================================
       INITIALIZE
    ================================================= */

    updateUI();

    updateButtons();


    log(
        "Shinobi Combat System online.",
        "system"
    );


});