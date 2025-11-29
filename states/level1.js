import { Toolbox } from "../toolbox.js";

export class Level1 {

    canvas;
    pencil;
    toolbox = new Toolbox();
    keysPressed = {};

    playerShipSprite = document.getElementById("playerShip");
    laserSprite = document.getElementById("laserSprite");

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // -------------------------
        // PLAYER SHIP
        // -------------------------
        this.playerShip = {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            speed: 5,

            upKey: "w",
            downKey: "s",
            leftKey: "a",
            rightKey: "d",

            sprite: this.playerShipSprite,
            pencil: pencil,

            draw: () => {
                pencil.drawImage(
                    this.playerShip.sprite,
                    this.playerShip.x,
                    this.playerShip.y,
                    this.playerShip.width,
                    this.playerShip.height
                );
            },

            move: () => {
                let keys = this.keysPressed;
                let ship = this.playerShip;

                if (keys[ship.upKey]) ship.y -= ship.speed;
                if (keys[ship.downKey]) ship.y += ship.speed;
                if (keys[ship.leftKey]) ship.x -= ship.speed;
                if (keys[ship.rightKey]) ship.x += ship.speed;
            }
        };

        // -------------------------
        // LASER
        // -------------------------
        this.laser = {
            x: this.playerShip.x + this.playerShip.width,
            y: this.playerShip.y + this.playerShip.height / 2,
            width: 20,
            height: 10,
            speed: 10,
            active: false,

            sprite: this.laserSprite,
            pencil: pencil,
        draw: () => {
            if (!this.laser.active) return;
            this.pencil.drawImage(this.laser.sprite, this.laser.x, this.laser.y, this.laser.width, this.laser.height);
        },

            move: () => {
                if (!this.laser.active) return;
                this.laser.x += this.laser.speed;

                if (this.laser.x > this.canvas.width) {
                    this.laser.active = false;
                }
            },

            fire: () => {
                if (!this.laser.active) {
                    this.laser.active = true;
                    this.laser.x = this.playerShip.x + this.playerShip.width;
                    this.laser.y = this.playerShip.y + this.playerShip.height / 2;
                }
            }
        };

        // Keyboard events
        window.addEventListener("keydown", e => {
            this.keysPressed[e.key] = true;

            if (e.key === " ") {
                this.laser.fire();
            }
        });

        window.addEventListener("keyup", e => {
            this.keysPressed[e.key] = false;
        });
    }

    update() {
        this.playerShip.move();
        this.playerShip.draw();

        this.laser.move();
        this.laser.draw();
    }
}
