export class Missile {
    width = 100;
    height = 100;

    missileSprite = document.getElementById("missile");
    explosionSprite = document.getElementById("explosion");

    isLive = true;
    exploding = false;

    constructor(canvas, pencil, speed) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.speed = speed;

        // Spawn off screen right
        this.x = this.canvas.width + 100;

        // Random Y
        this.y = Math.random() * (this.canvas.height - this.height);
    }

    move() {
        if (this.exploding) return;
        this.x -= this.speed;
    }

    check() {
        if (!this.isLive) return false;

        if (this.x + this.width < 0) {
            return true;
        }

        return false;
    }

    draw() {
        if (this.exploding) {
            this.pencil.drawImage(this.explosionSprite, this.x, this.y, this.width, this.height);
        } else {
            this.pencil.drawImage(this.missileSprite, this.x, this.y, this.width, this.height);
        }
    }

    explode() {
        this.exploding = true;
        setTimeout(() => (this.isLive = false), 500);
    }
}
