export class Missile{
    x = 1300;
    y = 50;
    speed = 5;
    missileSprite = document.getElementById("missile")
    height = 100;
    width = 100;
    pencil;
    canvas;

    constructor(canvas, pencil, speed) {
        this.pencil = pencil;
        this.canvas = canvas;
        this.speed = speed;
        this.y = Math.random() * this.canvas.height;
    }

    draw(){
        this.pencil.drawImage(this.missileSprite, this.x, this.y, this.width, this.height);
    }

    check(){
        //check for miss
        if (this.x < 0){
          console.log("Missile Missed")
        }
    }

    move(){
        this.x -= this.speed;
    }
}