from flask import Flask, render_template, abort

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")
# =========================================================
# STORY
# =========================================================

@app.route("/story")
def story():
    return render_template("story.html")
STORY_DATA = {

    "childhood": {
        "number": "01",
        "label": "UCHIHA",
        "title": "THE PRODIGY",
        "image": "itachi-face.png",
        "subtitle": "A CHILD WHO SAW THE WORLD DIFFERENTLY",
        "text": """
        Itachi's childhood introduced him to the world
        of shinobi conflict at an unusually young age.
        His experiences influenced the way he viewed
        war, responsibility and peace.
        """
    },

    "war": {
        "number": "02",
        "label": "WAR",
        "title": "THE SHINOBI WORLD",
        "image": "itachi-eyes.png",
        "subtitle": "THE COST OF CONFLICT",
        "text": """
        Experiences surrounding conflict shaped Itachi's
        understanding of the consequences of violence.
        """
    },

    "anbu": {
        "number": "03",
        "label": "ANBU",
        "title": "THE MASKED SHINOBI",
        "image": "itachi.png",
        "subtitle": "A SHINOBI IN THE SHADOWS",
        "text": """
        Itachi's career eventually brought him into the
        ANBU, where he became involved in increasingly
        difficult circumstances.
        """
    },

    "uchiha": {
        "number": "04",
        "label": "UCHIHA",
        "title": "THE UCHIHA CRISIS",
        "image": "uchiha.png",
        "subtitle": "A CLAN DIVIDED",
        "text": """
        The relationship between the Uchiha clan and
        Konoha deteriorated as tensions continued to grow.
        """
    },

    "night": {
        "number": "05",
        "label": "TRAGEDY",
        "title": "THE NIGHT OF THE CLAN",
        "image": "itachi-face.png",
        "subtitle": "THE NIGHT THAT CHANGED EVERYTHING",
        "text": """
        The destruction of the Uchiha clan became the
        defining tragedy connected to Itachi's life.
        """
    },

    "sacrifice": {
        "number": "06",
        "label": "SACRIFICE",
        "title": "THE BROTHER",
        "image": "itachi-eyes.png",
        "subtitle": "ITACHI AND SASUKE",
        "text": """
        Itachi's relationship with Sasuke remained one
        of the central elements of his story.
        """
    },

    "akatsuki": {
        "number": "07",
        "label": "AKATSUKI",
        "title": "THE RED CLOUD",
        "image": "akatsuki.png",
        "subtitle": "A SHINOBI AMONG THE OUTCASTS",
        "text": """
        Itachi became associated with Akatsuki and
        operated alongside Kisame.
        """
    },

    "sasuke": {
        "number": "08",
        "label": "BROTHERHOOD",
        "title": "THE LAST ENCOUNTER",
        "image": "sasuke.png",
        "subtitle": "THE FINAL CHAPTER",
        "text": """
        Itachi and Sasuke's relationship reaches one
        of its most important moments.
        """
    },

    "truth": {
        "number": "09",
        "label": "TRUTH",
        "title": "WHAT REMAINED",
        "image": "itachi-face.png",
        "subtitle": "THE TRUTH BEHIND THE SHADOW",
        "text": """
        After Itachi's death, Sasuke learns additional
        information about the events surrounding his
        brother and the Uchiha tragedy.
        """
    }

}


@app.route("/story/<slug>")
def story_detail(slug):

    chapter = STORY_DATA.get(slug)

    if chapter is None:
        abort(404)

    return render_template(
        "story-detail.html",
        chapter=chapter
    )
# =========================================================
# CHARACTERS
# =========================================================

@app.route("/characters")
def characters():
    return render_template("characters.html")
# Individual character
@app.route("/character/itachi")
def itachi():
    return render_template("itachi.html")

@app.route("/shinobi")
def shinobi():
    return render_template("shinobi.html")

@app.route("/character/sasuke")
def sasuke():
    return render_template("sasuke.html")

@app.route("/battle")
def battle():
    return render_template("battle.html")

@app.route("/jutsu")
def jutsu():
    return render_template("jutsu.html")



MISSIONS = [
    {
        "id": "S-001",
        "rank": "S",
        "title": "THE SHADOW OF UCHIHA",
        "difficulty": "EXTREME",
        "enemy": "MADARA",
        "objective": "Survive the shadow and recover the forbidden scroll.",
        "story": "A mysterious chakra signature has appeared deep inside an abandoned Uchiha battlefield.",
        "chakra": 90,
        "xp": 500,
        "reward": "FORBIDDEN SCROLL",
        "status": "LOCKED"
    },
    {
        "id": "A-002",
        "rank": "A",
        "title": "AKATSUKI TRACE",
        "difficulty": "HARD",
        "enemy": "AKATSUKI",
        "objective": "Investigate the abandoned Akatsuki hideout.",
        "story": "A hidden trail leads toward an old Akatsuki base.",
        "chakra": 70,
        "xp": 300,
        "reward": "AKATSUKI FILE",
        "status": "AVAILABLE"
    },
    {
        "id": "B-003",
        "rank": "B",
        "title": "UCHIHA MEMORY",
        "difficulty": "MEDIUM",
        "enemy": "ROGUE SHINOBI",
        "objective": "Recover the lost Uchiha memory fragment.",
        "story": "An encrypted memory has been discovered beneath the ruins.",
        "chakra": 50,
        "xp": 180,
        "reward": "MEMORY FRAGMENT",
        "status": "AVAILABLE"
    },
    {
        "id": "C-004",
        "rank": "C",
        "title": "FIRST PATROL",
        "difficulty": "EASY",
        "enemy": "BANDITS",
        "objective": "Protect the village perimeter.",
        "story": "A group of suspicious outsiders has entered the village territory.",
        "chakra": 25,
        "xp": 100,
        "reward": "100 RYO",
        "status": "AVAILABLE"
    }
]


@app.route("/missions")
def missions():
    return render_template(
        "missions.html",
        missions=MISSIONS
    )

@app.route("/character/madara")
def madara():
    return render_template("madara.html")

@app.route("/explore")
def explore():
    return render_template("explore.html")
# =========================================================
# ADDITIONAL PAGES
# =========================================================

@app.route("/sakura")
def sakura():
    return render_template("sakura.html")


@app.route("/kakashi")
def kakashi():
    return render_template("kakashi.html")


@app.route("/pain")
def pain():
    return render_template("pain.html")


@app.route("/obito")
def obito():
    return render_template("obito.html")


@app.route("/akatsuki")
def akatsuki():
    return render_template("akatsuki.html")


@app.route("/clan")
def clan():
    return render_template("clan.html")


@app.route("/lore")
def lore():
    return render_template("lore.html")


@app.route("/timeline")
def timeline():
    return render_template("timeline.html")


@app.route("/gallery")
def gallery():
    return render_template("gallery.html")


@app.route("/ranking")
def ranking():
    return render_template("ranking.html")


@app.route("/map")
def map_page():
    return render_template("map.html")


@app.route("/about")
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)