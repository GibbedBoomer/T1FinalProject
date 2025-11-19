import { Toolbox } from "./toolbox.js";
import { Game } from "./game.js";
import { GameOver } from "./gameOver.js";
import { Title } from "./title.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

//make states
let game = new Game();
let gameOver = new GameOver();
let title = new Title();

let state = title;

