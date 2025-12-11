import { Toolbox } from "../toolbox.js";
import { Missile } from "../missile.js";

export class Level2 {
    //setting up variables
    canvas;
    pencil;
    toolbox = new Toolbox();
    keysPressed = {};

    playerShipSprite = document.getElementById("playerShip");
    laserSprite = document.getElementById("laserSprite");
    lifeCounter = document.getElementById("lifeCounter")
    lifeShip = document.getElementById("lifeShip")
    
    //missileCount basically sets level difficulty along with speed passed in spawn function
    missileCount = 25;
    missiles = [];

    
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        //background
        this.bg = document.getElementById("backgroundL2");
        this.bgX = 0;
        this.scrollSpeed = 30;

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
            
            //dash key
            dashKey: "Shift",
            lastDir: { x: 1, y: 0 },
            dashDistance: 180,
            dashCooldown: 600,
            cooldownTimer: 0,


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

                let moved = false;

                if (keys[ship.upKey]) {
                    ship.y -= ship.speed;
                    ship.lastDir.y = -1;
                    ship.lastDir.x = 0;
                    moved = true;
                }
                if (keys[ship.downKey]) {
                    ship.y += ship.speed;
                    ship.lastDir.y = 1;
                    ship.lastDir.x = 0;
                    moved = true;
                }
                if (keys[ship.leftKey]) {
                    ship.x -= ship.speed;
                    ship.lastDir.x = -1;
                    ship.lastDir.y = 0;
                    moved = true;
                }
                if (keys[ship.rightKey]) {
                    ship.x += ship.speed;
                    ship.lastDir.x = 1;
                    ship.lastDir.y = 0;
                    moved = true;
                }
            },

            //ship dash function
            dash: () => {
                let ship = this.playerShip;
                let keys = this.keysPressed;

                // Cooldown ticking
                if (ship.cooldownTimer > 0) {
                    ship.cooldownTimer -= 16;
                    return;
                }

                // If Shift is not pressed, do nothing
                if (!keys[ship.dashKey]) return;

                // Dash direction: always use lastDir
                let dx = ship.lastDir.x;
                let dy = ship.lastDir.y;

                // Safety: if somehow both are 0, dash forward
                if (dx === 0 && dy === 0) dx = 1;

                // Normalize
                let len = Math.hypot(dx, dy);
                dx /= len;
                dy /= len;

                // *** INSTANT DASH ***
                ship.x += dx * ship.dashDistance;
                ship.y += dy * ship.dashDistance;

                // Start cooldown
                ship.cooldownTimer = ship.dashCooldown;
            }
        }
    
        //laser object
        this.laser = {
            x: this.playerShip.x + this.playerShip.width,
            y: this.playerShip.y + this.playerShip.height / 2,
            width: 20,
            height: 10,
            speed: 25,
            //is the laser active variable
            active: false,

            //bind sprite and pencil
            sprite: this.laserSprite,
            pencil: pencil,
            //only draw laser if its active
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
        
        
        //starts missile spawning below once cause in constructor
        setTimeout(() => {
            this.spawnMissileInterval(this.missileCount, 1000)
        }, 6000);
        
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

    //check ship and missile colliding function
    checkShipMissileCollision(playerShip, missile) {
        return (
            playerShip.x < missile.x + missile.width &&
            playerShip.x + playerShip.width > missile.x &&
            playerShip.y < missile.y + missile.height &&
            playerShip.y + playerShip.height > missile.y
        );
    }

    endLevel = false;

    endLevelGo(){
        this.endLevel = true;
    }
    
    //missileSpawns function
        spawnMissileInterval(missileCount, intervalMilliseconds) {
            let currentCount = 0;

            const intervalId = setInterval(() => {
                if (currentCount < missileCount) {
                    const newMissile = new Missile(this.canvas, this.pencil, 10);
                    this.missiles.push(newMissile);
                    currentCount++;
                } else {
                    clearInterval(intervalId); // Stop the interval when all items are spawned
                    console.log('All missiles spawned.');
                    setTimeout(() => {
                    this.endLevelGo();
                    }, 6000);
                }
            }, intervalMilliseconds);
        }
    
    //bg function
    drawBackground() {
        this.bgX -= this.scrollSpeed;

        // Wrap around
        if (this.bgX <= -this.bg.width) {
            this.bgX = 0;
        }

        this.pencil.drawImage(this.bg, this.bgX, 0);
        this.pencil.drawImage(this.bg, this.bgX + this.bg.width, 0);
    }

    //Lives system
    playerLives = 3;

    //Invincibility Frames on Miss or Hit
    iFrame = false;
    iFrameTimer = 0;
    iFrameDuration = 2000;

    //IFrame start
    startIFrame(){
        this.iFrame = true;
        this.iFrameTimer = this.iFrameDuration
    }
    displayLives(){
        this.pencil.drawImage(this.lifeCounter, 10, 10, 229, 79)
        if (this.playerLives == 3){
            this.pencil.drawImage(this.lifeShip, 85, 35, 30, 40)
            this.pencil.drawImage(this.lifeShip, 135, 35, 30, 40)
            this.pencil.drawImage(this.lifeShip, 185, 35, 30, 40)
        } else if (this.playerLives == 2){
            this.pencil.drawImage(this.lifeShip, 85, 35, 30, 40)
            this.pencil.drawImage(this.lifeShip, 135, 35, 30, 40)
        } else if (this.playerLives == 1){
            this.pencil.drawImage(this.lifeShip, 85, 35, 30, 40)
        }
        
    }

    //Level 1 Update loop
    update() {
        //scrolling bg
        this.drawBackground();

        //Update ship
        this.playerShip.move();
        this.playerShip.dash();
        //Draw also handles i frame to create blink effect
        // Handle invincibility frames
        if (this.iFrame) {
            this.iFrameTimer -= 16; // ~16ms per frame (60fps)

        // Blink the ship visually if iFrame
            if (Math.floor(this.iFrameTimer / 100) % 2 === 0) {
                this.playerShip.draw();
            }

            if (this.iFrameTimer <= 0) {
                this.iFrame = false;
            }
        } else {
            this.playerShip.draw();
        }

        //Update lasers
        this.laser.move();
        this.laser.draw();

        //Update life counter
        this.displayLives();
        
        // Update missiles
        this.missiles.forEach(m => {
            m.move();
            m.draw();
            if (m.check()){
                if (!this.iFrame){
                this.playerLives --;
                this.startIFrame();
                }
                m.isLive = false
            }
            if (this.checkLaserMissileCollision(this.laser, m)) {
                console.log("missile hit!")
                m.explode();
            }
            if (this.checkShipMissileCollision(this.playerShip, m)) {
                if (!this.iFrame){
                this.playerLives --;
                this.startIFrame();
                }
                m.isLive = false
            }
        });

        //filter disabled missiles
        this.missiles = this.missiles.filter(m => m.isLive);

        //return to gameOver state if 0 lives remaining
        if (this.playerLives == 0){
            return "gameOver"
        }

        //endLevel
        if(this.endLevel === true){
            return "level3"
        }
    }   
}