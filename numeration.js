var unitSize = 16;
var units = [];
var tenths = [];
var centaines = [];

function Unit() {

    this.x = random(unitSize +  width / 2, width - unitSize);
    this.y = random(unitSize + 100, height - unitSize - 100);
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
    this.x = random(unitSize + width / 4, width - width / 2 - unitSize);
    this.y = random(unitSize + 100, height - unitSize - 100);
    this.col = color(24, 119, 72);

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
                this.col = color(24, 119, 72);
                this.display();
            } else {
                this.is_active = true;
                this.col = color(255, 0, 0);
                this.display();
            }

        }
    }
}

function Centaine() {
    this.x = random(unitSize, width / 4 - unitSize);
    this.y = random(unitSize + 100, height - unitSize - 100);
    this.col = color(30, 144, 255);

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
                this.col = color(30, 144, 255);
                this.display();
            } else {
                this.is_active = true;
                this.col = color(255, 0, 0);
                this.display();
            }

        }
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
        window.alert("Tu n'as pas selectionné dix unités, réessaie !");
        for (var i = 0; i < selected.length; i++) {
            units.push(selected[i]);
        }
    }
}

function makeCentaine() {
    var counter = 0;
    var selected = [];
    for (var i = 0; i < tenths.length; i++) {
        if (tenths[i].is_active) {
            counter += 1;
            selected.push(tenths.splice(i, 1)[0]);
            i = i - 1;
        }
    }
    print(counter);
    if (counter == 10) {
        console.log("Bravo, tu as créé une centaine !")
        // Créé une dizaine
        centaine = new Centaine();
        centaine.display();
        centaines.push(centaine);
        // Redessine le fond et ajoute les éléments restantes
        drawAllElements()
    } else {
        console.log("Tu n'as pas selecté une dizaine, réessaie !");
        window.alert("Tu n'as pas selectionné dix dizaines, réessaie !");
        for (var i = 0; i < selected.length; i++) {
            tenths.push(selected[i]);
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
    // Dessine les centaines si il y en a 
    if (centaines.length > 0) {
        for (var i = 0; i < centaines.length; i++) {
            centaines[i].display();
        }
    }
}

function answerCheck() {
    if (int(inputElem.value()) == numberUnit) {
        print("Bravo ! Tu as donné la bonne réponse.");
    } else {
        print("Es-tu sûr ? Recompte et reessaie.");
    }
}

function setup() {
    createCanvas(1200, 600);
    background(220);

    numberUnit = int(random(1, 200));

    for (var i = 0; i < numberUnit; i++) {
        unit = new Unit();
        unit.display();
        units.push(unit);
    }

    button = createButton('Faire une dizaine');
    button.position(width / 2, 50);
    button.mousePressed(makeTenth);

    button_100 = createButton('Faire une centaine');
    button_100.position(width / 4, 50);
    button_100.mousePressed(makeCentaine);

    inputElem = createInput(''); 
    button_ok = createButton('OK');

    inputElem.position((width - (inputElem.width + 20 + button_ok.width))/2, height - 40); 
    button_ok.position((width - (inputElem.width + 20 + button_ok.width))/2 + 20 + inputElem.width, height - 40);
    button_ok.mousePressed(answerCheck);
}

function mousePressed() {
    for (var i = 0; i < units.length; i++) {
        units[i].clicked();
    }
    if (tenths.length > 0) {
        for (var i = 0; i < tenths.length; i++) {
            tenths[i].clicked();
        }
    }
}