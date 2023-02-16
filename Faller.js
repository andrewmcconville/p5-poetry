class Faller {
    constructor(config) {
        this.position = config.position;
        this.velocity = createVector(0, -6);
        this.acceleration = createVector(0, 0.25);
        this.character = config.character;
        this.opacity = random(0.01, 0.50);
    }

    drawFaller() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        push();
        fill(0, 0, 100, this.opacity);
        text(this.character, this.position.x, this.position.y)
        pop();
    }
}