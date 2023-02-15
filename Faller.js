class Faller {
    constructor(config) {
        this.position = config.position;
        this.velocity = createVector(0, 4);
        this.character = config.character;
    }

    makeFaller() {

    }

    drawFaller() {
        this.position.add(this.velocity);
        text(this.character, this.position.x, this.position.y)
    }
}