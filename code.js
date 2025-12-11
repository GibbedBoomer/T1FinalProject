import { Level1 } from "./states/level1.js";
import { Level2 } from "./states/level2.js";
import { Level3 } from "./states/level3.js";
import { GameOver } from "./states/gameOver.js";
import { Title } from "./states/title.js";
import { Toolbox } from "./toolbox.js";
import { WinScreen } from "./states/winScreen.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

let state = new Title(canvas, pencil)

function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);

    let command = state.update();

    if(command == "title") {
        state = new Title(canvas, pencil);
    }
    if(command == "gameOver") {
        state = new GameOver(canvas, pencil);
    }
    if(command == "level1") {
        state = new Level1(canvas, pencil);
    }
    if(command == "level2") {
        state = new Level2(canvas, pencil);
    }
    if(command == "level3") {
        state = new Level3(canvas, pencil);
    }
    if(command == "winScreen") {
        state = new WinScreen(canvas, pencil);
    }
}

setInterval(gameLoop, 1000 / 60);