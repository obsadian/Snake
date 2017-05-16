//link fixe para veres: https://www.youtube.com/watch?v=YCI8uqePkrc
var testerI = 0;
var CELL = 30;

var teclado = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32
};

var canvas;
var jogo = {
    contexto: undefined,
    width: 0,
    height: 0,
    pontuacao: 0,
    emCurso: true,
    loop: undefined,
    nivel: 0
};

var snake = {
    corpo: [],
    size: 4,
    direcao: teclado.RIGHT
};

var game = {
    pontuacao: 0,
    tempo: 0,
};

window.addEventListener("load", init);

function init() {
    canvas = document.getElementById("canvas");
    //    jogo.width = window.innerWidth * 0.9;
    //    jogo.height = window.innerHeight * 0.9;

    jogo.width = 1300;
    jogo.height = 600;

    canvas.width = jogo.width;
    canvas.height = jogo.height;
    jogo.contexto = canvas.getContext("2d");
    setInterval(function() {
        jogo.contexto.fillStyle = "rgba(0,0,0,0.1)";
        jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);
        //sistemaParticulas = new ParticleSystem();
        //sistemaParticulas.draw();
        createFood(jogo.width / 4, jogo.height / 2).draw();
        if (testerI <= 100) {
            createFood(100, 500).draw();
            testerI++;
        } else
            apagaParticula(100, 500);

        createPowerDown(jogo.width / 2, jogo.height / 2).draw();
        createPowerUp(jogo.width / 4 * 3, jogo.height / 2).draw();
    }, 30);
    inicioJogo();
}

function inicioJogo() {
    for (var i = snake.size - 1; i >= 0; i--)
        snake.corpo.push({ x: i, y: 0 });

    if (!jogo.emCurso) clearInterval(jogo.loop);
    jogo.loop = setInterval(render, 120);
    window.addEventListener("keydown", _onKeyDown, false);
}

function render() {
    /*    jogo.contexto.fillStyle = corRGBA(0, 0, 0, 0.2);
        jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);
        jogo.contexto.strokeStyle = "black";
        jogo.contexto.strokeRect(0, 0, jogo.width, jogo.height);
    */
    //renderSnake();

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
        jogo.contexto.fillStyle = "#00FFFF";
        jogo.contexto.fillRect(c.x * (CELL), c.y * (CELL), CELL, CELL);
        jogo.contexto.strokeStyle = "black";
        jogo.contexto.strokeRect(c.x * (CELL), c.y * (CELL), CELL, CELL);
    }

}


function _onKeyDown(e) {
    var tecla = e.keyCode;
    if (tecla == teclado.DOWN || tecla == teclado.UP || tecla == teclado.LEFT || tecla == teclado.RIGHT)
        snake.direcao = tecla;
    render();
}