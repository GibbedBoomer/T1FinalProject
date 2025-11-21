import { Toolbox } from "../toolbox.js";

export class Title {

    canvas;
    pencil;
    changeToGame = false;
    toolbox = new Toolbox();
    titleScreen = document.getElementById("title_screen");
    PressAny = document.getElementById("blinkingPressAnyKey");

    pressAnyTimerStarted = false;
    pressAnyVisible = false;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.onKeyPressed = this.onKeyPressed.bind(this);
        document.addEventListener("keypress", this.onKeyPressed);
    }

    onKeyPressed() {
        this.changeToGame = true;
    }

    update() {
        this.pencil.drawImage(
            this.titleScreen,
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
            this.changeToGame = "false";
            return "game";
        }

    }

}
