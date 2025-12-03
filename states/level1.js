import { Toolbox } from "../toolbox.js";
import { Missile } from "../missile.js";

export class Level1 {
    //setting up variables
    canvas;
    pencil;
    toolbox = new Toolbox();
    keysPressed = {};

    playerShipSprite = document.getElementById("playerShip");
    laserSprite = document.getElementById("laserSprite");
    
    //missileCount basically sets level difficulty along with speed passed in spawn function
    missileCount = 20;
    missiles = [];
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

     

        // ship object
        this.playerShip = {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            speed: 5,
        //controls
            upKey: "w",
            downKey: "s",
            leftKey: "a",
            rightKey: "d",

            sprite: this.playerShipSprite,
            pencil: pencil,
        //ship draw
            draw: () => {
                pencil.drawImage(
                    this.playerShip.sprite,
                    this.playerShip.x,
                    this.playerShip.y,
                    this.playerShip.width,
                    this.playerShip.height
                );
            },
        //ship move function
            move: () => {
                let keys = this.keysPressed;
                let ship = this.playerShip;

                if (keys[ship.upKey]) ship.y -= ship.speed;
                if (keys[ship.downKey]) ship.y += ship.speed;
                if (keys[ship.leftKey]) ship.x -= ship.speed;
                if (keys[ship.rightKey]) ship.x += ship.speed;
            }
        };

        //laser object
        this.laser = {
            x: this.playerShip.x + this.playerShip.width,
            y: this.playerShip.y + this.playerShip.height / 2,
            width: 20,
            height: 10,
            speed: 25,
            //is the laser active variable
            active: false,

            sprite: this.laserSprite,
            pencil: pencil,
            //only draw laser if its set to be active
            draw: () => {
                if (!this.laser.active) return;
                this.pencil.drawImage(this.laser.sprite, this.laser.x, this.laser.y, this.laser.width, this.laser.height);
            },
            //function only happens if laser is active, moves laser based on its speed and deactivates it when it clears the screen
            move: () => {
                if (!this.laser.active) return;
                this.laser.x += this.laser.speed;

                if (this.laser.x > this.canvas.width) {
                    this.laser.active = false;
                }
            },
            //function that starts the laser shooting, sets laser to be active and assigns the laser position to start from the ship
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
        
        
        //starts missile spawning below once
        this.spawnMissileInterval(this.missileCount, 5000)
    }
    
    //check laser and missile colliding function
    checkLaserMissileCollision(laser, missile) {
        return (
            laser.x < missile.x + missile.width &&
            laser.x + laser.width > missile.x &&
            laser.y < missile.y + missile.height &&
            laser.y + laser.height > missile.y
        );
    }
    //missileSpawns function
        spawnMissileInterval(missileCount, intervalMilliseconds) {
            let currentCount = 0;

            const intervalId = setInterval(() => {
                if (currentCount < missileCount) {
                    const newMissile = new Missile(this.canvas, this.pencil, 5);
                    this.missiles.push(newMissile);
                    currentCount++;
                } else {
                    clearInterval(intervalId); // Stop the interval when all items are spawned
                    console.log('All missiles spawned.');
                }
            }, intervalMilliseconds);
        }

    //Level 1 Update loop
    update() {
        this.playerShip.move();
        this.playerShip.draw();

        this.laser.move();
        this.laser.draw();

        
        // Update missiles
        this.missiles.forEach(m => {
            m.move();
            m.draw();
            m.check();
        });
    }   
}