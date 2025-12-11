import { Toolbox } from "../toolbox.js";

export class WinScreen {
    canvas;
    pencil;
    
    changeToGame = false;

    toolbox = new Toolbox();

    winScreen = document.getElementById("winScreen");
    PressAny = document.getElementById("blinkingPressAnyKey");

    pressAnyTimerStarted = false;
    pressAnyVisible = false;

    bufferPassed = false;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.onKeyPressed = this.onKeyPressed.bind(this);


        document.addEventListener("keypress", this.onKeyPressed);

        // start buffer timer
        setTimeout(() => {
            this.bufferOff();
        }, 5000);
    }

    // buffer unlock after 5s
    bufferOff() {
        this.bufferPassed = true;
    }

    // handle keypress safely
    onKeyPressed() {
        if (!this.bufferPassed) return; 
        this.changeToGame = true;
    }

    update() {
        // draw win background
        this.pencil.drawImage(
            this.winScreen,
            0,
            0
        );


        if (!this.pressAnyTimerStarted) {
            this.pressAnyTimerStarted = true;
            setTimeout(() => {
                this.pressAnyVisible = true;
            }, 3000);
        }


        if (this.pressAnyVisible) {
            this.pencil.drawImage(
                this.PressAny,
                this.canvas.width / 2 - this.PressAny.naturalWidth / 2,
                400
            );
        }


        if (this.changeToGame) {
            return "title";
        }
    }

}
