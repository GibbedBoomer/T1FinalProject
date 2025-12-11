import { Toolbox } from "../toolbox.js";

export class GameOver {
    canvas;
    pencil;
    
    changeToGame = false;

    toolbox = new Toolbox();

    gameOverScreen = document.getElementById("gameOver");
    PressAny = document.getElementById("blinkingPressAnyKey");

    pressAnyTimerStarted = false;
    pressAnyVisible = false;

    bufferPassed = false;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        
        this.onKeyPressed = this.onKeyPressed.bind(this);

        // add listener
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

    // handle keypress
    onKeyPressed() {
        if (!this.bufferPassed) return; // ignore early presses
        this.changeToGame = true;
    }

    update() {
        this.pencil.drawImage(
            this.gameOverScreen,
            0,
            0
        );

        // start "Press Any Key" timer once
        if (!this.pressAnyTimerStarted) {
            this.pressAnyTimerStarted = true;
            setTimeout(() => {
                this.pressAnyVisible = true;
            }, 3000);
        }

        // draw blinking text
        if (this.pressAnyVisible) {
            this.pencil.drawImage(
                this.PressAny,
                this.canvas.width / 2 - this.PressAny.naturalWidth / 2,
                400
            );
        }

        // if key pressed after buffer, return to title
        if (this.changeToGame) {
            return "title";
        }
    }

}
