//link fixe para veres: https://www.youtube.com/watch?v=YCI8uqePkrc

var teclado = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32
};

var CELL = 20;
var canvas;
var jogo = {
    contexto: undefined,
    width: 0,
    height: 0,
    pontuacao: 0,
    emCurso: true,
    loop: undefined
};

var canvas;

var snake = {
    corpo: [],
    size: 1,
    direcao: teclado.RIGHT,
    speed: 3
};

var game = {
    pontuacao: 0,
    tempo: 0,
};

window.addEventListener("load", init);

function init() {
    canvas = document.getElementById("canvas");
    jogo.contexto = canvas.getContext("2d");
    jogo.width = canvas.width;
    jogo.height = canvas.height
    inicioJogo();
}

function inicioJogo() {
    snake.size = 1;
    snake.direcao = teclado.RIGHT;
    snake.speed = 1;

    snake.corpo = [];
    for (var i = snake.size - 1; i >= 0; i--) {
        snake.corpo.push({ x: i, y: 0 });
    }

    if (!jogo.emCurso) clearInterval(jogo.loop)
    jogo.loop = setInterval(render, 360 / snake.speed);
    window.addEventListener("keydown", _onKeyDown, false);
}

function render() {
    jogo.contexto.fillStyle = "rgba(0,0,0,0.8)";
    jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);
    jogo.contexto.strokeStyle = "black";
    jogo.contexto.strokeRect(0, 0, jogo.width, jogo.height);
    renderSnake();

    //var score_text = "Pontuacao: " + jogo.pontuacao;
    //jogo.contexto.fillText(score_text, 5, 20);
}

function renderSnake() {
    var cabecaX = snake.corpo[0].x;
    var cabecaY = snake.corpo[0].y;

    if (snake.direcao == teclado.RIGHT) cabecaX++;
    else if (snake.direcao == teclado.LEFT) cabecaX--;
    else if (snake.direcao == teclado.UP) cabecaY--;
    else if (snake.direcao == teclado.DOWN) cabecaY++;

    var cauda = snake.corpo.pop();
    cauda.x = cabecaX;
    cauda.y = cabecaY;

    snake.corpo.unshift(cauda);


    //Desenho
    for (var i = 0; i < snake.size; i++) {
        var c = snake.corpo[i];
        jogo.contexto.fillStyle = "pink";
        jogo.contexto.fillRect(c.x * CELL, c.y * CELL, CELL, CELL);
        jogo.contexto.strokeStyle = "black";
        jogo.contexto.strokeRect(c.x * CELL, c.y * CELL, CELL, CELL);
    }

}


function _onKeyDown(e) {
    var tecla = e.keyCode;
    if (tecla == teclado.DOWN || tecla == teclado.UP || tecla == teclado.LEFT || tecla == teclado.RIGHT)
        snake.direcao = tecla;
    render();
}