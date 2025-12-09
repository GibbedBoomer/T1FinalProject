export class Missile {
    x = 1300;
    y = 50;
    speed = 5;
    height = 100;
    width = 100;

    missileSprite = document.getElementById("missile");
    explosionSprite = document.getElementById("explosion");

    isLive = true;
    exploding = false;

    constructor(canvas, pencil, speed) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.speed = speed;
        this.y = Math.random() * this.canvas.height;
    }

    move() {
        if (this.exploding) return;  // Stop moving when exploding
        this.x -= this.speed;
    }

    check(){ 
        //check for miss 
        if (this.x < 0){ console.log("Missile Missed") } 
    }

    draw() {
        if (this.exploding) {
            this.pencil.drawImage(
                this.explosionSprite,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            this.pencil.drawImage(
                this.missileSprite,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    explode() {
        this.exploding = true;

        // Remove missile after explosion is finished
        setTimeout(() => {
            this.isLive = false;
        }, 500);
    }
}
