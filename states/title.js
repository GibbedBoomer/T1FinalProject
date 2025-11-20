import { Toolbox } from "../toolbox.js";

export class Title {

    canvas;
    pencil;
    ChangeToGame = false;
    toolbox = new Toolbox();

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        //function binding, set this to be this this forever for this
        //this ;)
        this.onKeyPressed = this.onKeyPressed.bind(this)
        this.onClicked = this.onClicked.bind(this)

        document.addEventListener("keypress", this.onKeyPressed)
        document.addEventListener("click", this.onClicked)
    }

    onKeyPressed() {
        this.changeToGame = true;
    }

    startButtonX = 200
    startButtonY = 200
    startButtonWidth = 100
    startButtonHeight = 50
    
    isHitButton= false;

    onClicked(event) {
        console.log(event);
        let pointX = event.offsetX
        let pointY = event.offsetY
        this.isHitButton = this.toolbox.isWithinRect(pointX, pointY, 
            this.startButtonX, this.startButtonY, 
            this.startButtonWidth, this.startButtonHeight
        );
        this.changeToGame = this.isHitButton
    }

    update() {
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Title", 10, 50);

        this.pencil.fillStyle = "pink";
        this.pencil.fillRect(this.startButtonX, this.startButtonY, this.startButtonWidth, this.startButtonHeight);
        if(this.changeToGame) {
            this.changeToGame = "false"
            return "game";
        }
        //return "gameOver";
    }


}