export class Title {

    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
    }

    update() {
        console.log("In title!")
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Title", 10, 50);

        return "gameOver";
    }


}