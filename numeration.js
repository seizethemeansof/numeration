var unitSize = 16;
var units = [];
var tenths = [];

function Unit() {
    this.x = random(unitSize, width - unitSize);
    this.y = random(unitSize + 100, height - unitSize);
    this.col = color(0, 0, 0);
    this.is_active = false;

    this.display = function () {
        fill(this.col);
        ellipse(this.x, this.y, unitSize, unitSize);
    }

    this.clicked = function () {
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < unitSize / 2) {
            if (this.is_active) {
                this.is_active = false;
                this.col = color(0, 0, 0);
                this.display();
            } else {
                this.is_active = true;
                this.col = color(255, 0, 0);
                this.display();
            }

        }
    }
}

function Tenth() {
    this.x = random(unitSize, width - unitSize);
    this.y = random(unitSize + 100, height - unitSize);
    this.col = color(24, 119, 72);

    this.is_active = false;

    this.display = function () {
        fill(this.col);
        ellipse(this.x, this.y, unitSize, unitSize);
    }
}

function makeTenth() {
    var counter = 0;
    var selected = [];
    for (var i = 0; i < units.length; i++) {
        if (units[i].is_active) {
            counter += 1;
            selected.push(units.splice(i, 1)[0]);
            i = i - 1;
        }
    }
    print(counter);
    if (counter == 10) {
        console.log("Bravo, tu as créé une dizaine !")
        // Redessine le fond et ajoute les éléments restantes
        drawAllElements()
        // Créé une dizaine
        tenth = new Tenth();
        tenth.display();
        tenths.push(tenth);
    } else {
        console.log("Tu n'as pas selecté une dizaine, réessaie !")
        for (var i = 0; i < selected.length; i++) {
            units.push(selected[i]);
        }
    }
}

function drawAllElements() {
    background(220);
    // Dessine les unités si il en a
    if (units.length > 0) {
        for (var i = 0; i < units.length; i++) {
            units[i].display();
        }
    }
    // Dessine les dizaines si il y en a 
    if (tenths.length > 0) {
        for (var i = 0; i < tenths.length; i++) {
            tenths[i].display();
        }
    }
}

function setup() {
    createCanvas(400, 600);
    background(220);

    numberUnit = random(1, 200);

    for (var i = 0; i < numberUnit; i++) {
        unit = new Unit();
        unit.display();
        units.push(unit);
    }

    button = createButton('Créer une dizaine');
    button.position(50, 50);
    button.mousePressed(makeTenth);
}

function mousePressed() {
    for (var i = 0; i < units.length; i++) {
        units[i].clicked();
    }
}