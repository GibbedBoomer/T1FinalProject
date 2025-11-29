import { Level1 } from "./states/level1.js";
import { GameOver } from "./states/gameOver.js";
import { Title } from "./states/title.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

//make some states to go to.
let level1 = new Level1(canvas, pencil);
let gameOver = new GameOver(canvas, pencil);
let title = new Title(canvas, pencil);

let state = title;

function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);

    let command = state.update();

    if(command == "title") {
        state = title;
    }
    if(command == "gameOver") {
        state = gameOver;
    }
    if(command == "level1") {
        state = level1;
    }

}

setInterval(gameLoop, 1000 / 60);