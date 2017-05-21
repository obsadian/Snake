//https://www.youtube.com/watch?v=YCI8uqePkrc
var comida = [];
var powerUps = [];
var powerDowns = [];
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
    size: 8,
    cleaner: 2,
    direcao: teclado.RIGHT
};

var game = {
    pontuacao: 0,
    tempo: 0,
};

window.addEventListener("load", init);

function init() {
    canvas = document.getElementById("canvas");
    jogo.width = 1320;
    jogo.height = 600;

    canvas.width = jogo.width;
    canvas.height = jogo.height;
    jogo.contexto = canvas.getContext("2d");


    var posX = [];
    var posY = [];
    inicioJogo();
    var posicoesXY = [getPosicoes(), getPosicoes(), getPosicoes()];
    setInterval(function () {
        jogo.contexto.fillStyle = "#ffffb8";
        jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);

        drawBackground();

        comida[0] = createFood(posicoesXY[0].posX, posicoesXY[0].posY);
        powerUps[0] = (createPowerUp(posicoesXY[1].posX, posicoesXY[1].posY));
        powerDowns[0] = (createPowerDown(posicoesXY[2].posX, posicoesXY[2].posY));

        //apagaParticula(100, 500);
        comida[0].draw();
        powerUps[0].draw();
        powerDowns[0].draw();
        renderSnake();
    }, 60);
    inicioJogo();


}

function inicioJogo() {
    for (var i = snake.size - 1; i >= 0; i--)
        snake.corpo.push({
            x: i,
            y: 0
        });
    for (var i = snake.cleaner - 1; i >= 0; i--)
        snake.corpo.push({
            x: i + snake.size,
            y: 0
        });

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

    //imagem da cabeça
    var img_head = new Image();
    img_head.addEventListener('load', function () {}, false);
    img_head.src = 'head.png';
  
    var c;
    //head
    var h;
    for (var i = 1; i < snake.size - 1; i++) {
        h = snake.corpo[0];
        c = snake.corpo[i];
        jogo.contexto.fillStyle = "#00FFFF";
        jogo.contexto.drawImage(img_head, h.x * (CELL), h.y * (CELL), CELL, CELL);
        jogo.contexto.drawImage(loadBody(), c.x * (CELL), c.y * (CELL), CELL, CELL);
        jogo.contexto.strokeStyle = "none";
        //jogo.contexto.strokeRect(c.x * (CELL), c.y * (CELL), CELL, CELL);
        console.log("Quadrado " + (i + 1) + ": posicao X: " + c.x + ", posicao Y: " + c.y);
    }

    for (var i = 0; i < snake.cleaner; i++) {
        c = snake.corpo[snake.size + i];
        // jogo.contexto.fillStyle = "rgba(0,0,0,0.5)";
        //jogo.contexto.fillRect(c.x * (CELL), c.y * (CELL), CELL, CELL);

    }
}

function drawBackground() {

    var img = new Image(); // Create new img element
    img.addEventListener('load', function () {
        // execute drawImage statements here
    }, false);
    img.src = 'back3.png';
    for (var i=0; i < 30; i++) {
        jogo.contexto.drawImage(img, 0, 50*i, 50, 50);
        jogo.contexto.drawImage(img, 50*i, 0, 50, 50);
        jogo.contexto.drawImage(img, canvas.width-50, 50*i, 50, 50);
        jogo.contexto.drawImage(img, 50*i,canvas.height-50, 50, 50);
    }
}

function loadBody() {
    var n = getRandom(1,12);
    var img = new Image();
    img.addEventListener('load', function () {}, false);
    img.src = 'c' + n + '.png';
    console.log("random" + n + "//");
    return img;
}

function getRandom(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _onKeyDown(e) {
    var novaDirecao;
    var tecla = e.keyCode;
    if (tecla == teclado.DOWN || tecla == teclado.UP || tecla == teclado.LEFT || tecla == teclado.RIGHT)
        novaDirecao = tecla;
    if (!(snake.direcao == teclado.RIGHT && novaDirecao == teclado.LEFT ||
            snake.direcao == teclado.LEFT && novaDirecao == teclado.RIGHT ||
            snake.direcao == teclado.UP && novaDirecao == teclado.DOWN ||
            snake.direcao == teclado.DOWN && novaDirecao == teclado.UP))
        snake.direcao = novaDirecao;
    render();
}

function getPosicoes() {
    var posX = (rand(Math.round(jogo.width / CELL), 1) - 1) * CELL + CELL / 2;
    var posY = rand(Math.round(jogo.height / CELL), 1) * CELL + CELL / 2;
    while (estaOcupado(posX, posY)) {
        posX = (rand(Math.round(jogo.width / CELL), 1) - 1) * CELL + CELL / 2;
        posY = rand(Math.round(jogo.height / CELL), 1) * CELL + CELL / 2;
    }
    return {
        posX,
        posY
    };
}

function estaOcupado(x, y) {
    for (var i = 0; i < comida.length; i++)
        if (comida[i].x == x && comida[i].y == y)
            return true;
    for (var i = 0; i < powerUps.length; i++)
        if (powerUps[i].x == x && powerUps[i].y == y)
            return true;
    for (var i = 0; i < powerDowns.length; i++)
        if (powerDowns[i].x == x && powerDowns[i].y == y)
            return true;
    for (var i = 0; i < snake.size; i++)
        if (snake.corpo[i].x == x && snake.corpo[i].y == y)
            return true;

    return false;
}

function comi() {
    var x = snake.corpo[0].x;
    var y = snake.corpo[0].y;
    for (var i = 0; i < comida.length; i++)
        if (comida[i].x == x && comida[i].y == y)
            return camida[i];
    for (var i = 0; i < powerUps.length; i++)
        if (powerUps[i].x == x && powerUps[i].y == y)
            return powerUps[i];
    for (var i = 0; i < powerDowns.length; i++)
        if (powerDowns[i].x == x && powerDowns[i].y == y)
            return powerDowns[i];
    return undefined;
}

function snakeOnLimit() {
    if (snake.corpo[0].x <= 0)
        snake.corpo[0].x = jogo.width;
    if (snake.corpo[0].x >= jogo.width)
        snake.corpo[0].x = 0;
}
