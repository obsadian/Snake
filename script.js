//link fixe para veres: https://www.youtube.com/watch?v=YCI8uqePkrc
var CELL = 30;

var sistemaParticulas;

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
        sistemaParticulas = new ParticleSystem();
        sistemaParticulas.draw();
    }, 30);
    inicioJogo();
}

function inicioJogo() {
    //    snake.size = 1;
    //    snake.direcao = teclado.RIGHT;
    //    snake.speed = 1;

    //    snake.corpo = [];

    for (var i = snake.size - 1; i >= 0; i--)
        snake.corpo.push({ x: i, y: 0 });

    if (!jogo.emCurso) clearInterval(jogo.loop);
    jogo.loop = setInterval(render, 120);
    window.addEventListener("keydown", _onKeyDown, false);
}

function render() {
    //jogo.contexto.fillStyle = corRGBA(0, 0, 0, Math.random());
    jogo.contexto.fillStyle = corRGBA(0, 0, 0, 0.2);
    jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);
    jogo.contexto.strokeStyle = "black";
    jogo.contexto.strokeRect(0, 0, jogo.width, jogo.height);
    sistemaParticulas.draw();

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



/*

$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//Lets save the cell width in a variable for easy control
	var cw = 10;
	var d;
	var food;
	var score;
	
	//Lets create the snake now
	var snake_array; //an array of cells to make up the snake
	
	function init()
	{
		d = "right"; //default direction
		create_snake();
		create_food(); //Now we can see the food particle
		//finally lets display the score
		score = 0;
		
		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();
	
	function create_snake()
	{
		var length = 5; //Length of the snake
		snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:0});
		}
	}
	
	//Lets create the food now
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
	}
	
	//Lets paint the snake now
	function paint()
	{
		//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//The movement code for the snake to come here.
		//The logic is simple
		//Pop out the tail cell and place it infront of the head cell
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			//restart game
			init();
			//Lets organize the code a bit now.
			return;
		}
		
		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//Create new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = nx; tail.y = ny;
		}
		//The snake can now eat the food.
		
		snake_array.unshift(tail); //puts back the tail as the first cell
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			//Lets paint 10px wide cells
			paint_cell(c.x, c.y);
		}
		
		//Lets paint the food
		paint_cell(food.x, food.y);
		//Lets paint the score
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);
	}
	
	//Lets first create a generic function to paint cells
	function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function check_collision(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	//Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		//The snake is now keyboard controllable
	})
	
	
	
	
	
	
	
})

 */

/*

var H = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    globalAlpha = 0.4;
    blendMode(SCREEN);
}

function draw() {
    background(11, 11, 18, 250);
    // 	ellipse(mouseX, mouseY, 50, 50);
    // 	c();
    colorMode(HSB, 360, 100, 100);
    b();

}

function text() {
    //   globalCompositeOperation = "lighter";
    strokeWeight(0.5);
    textStyle("Arial");
    textSize(80);
    var n = 360;
    while (n--) {
        globalAlpha = n / 1200;
        stroke(n + 110 % 360, 99, 50);
        var x = -n * cos(n / 360);
        var y = 250 - sin(n / 360 * 2) * n / 2.5;
        text("Neon", x + 230, y + 60);
        text("Lights", x + 380, y + 245);
    }
}
// }, 0);
onmousedown = function (e) {

    function f(e, m) {
        X = mouseX;
        Y = mouseY;
        if (m == "down") {
            var a;
            var b;
            var A = X,
                B = Y,
                R = random(99), //rolling circle radius
                r = random(99), // fixed circle radius
                d = random(99), // distance
                t = 0; //theta
            time = setInterval(function () {
                i = 10;
                while (i--) {
                    beginShape();
                    q = (R / r - 1) * t;
                    x = (R - r) * cos(t) + d * cos(q) + (A + (X - A) * (i / 10)) + (R - r);
                    y = (R - r) * sin(t) - d * sin(q) + (B + (Y - B) * (i / 10));
                    if (a) {
                        //               translate(A, B);
                        line(a, b, x, y);
                        //               vertex(px, py);
                        //               vertex(x, y);
                    }
                    stroke((H % 360), 99, 50);
                    t += radians(360);
                    a = x;
                    b = y;
                    //           endShape();
                }
                H++;
                A = X;
                B = Y;

            }, 5);
        } else {
            if (m == "up") {
                clearTimeout(time);
            }
        }
    }

    f(e, "down");
    onmousemove = function (e) {
        f(e, "move");
    };
    onmouseup = function (e) {
        f(e, "up");
    };
    
// Utilities functions
keyPressed = function() {
  if (key == 's' || key == 'S') {
    saveFrame("out/pic-##.png"); 
    println("Picture saved as " + "pic-"+ frameCount +".png");
  }
}
};
 */