//ver: https://www.youtube.com/watch?v=YCI8uqePkrc
var particleIndex = 0;
var particles = {};
var numeroDeParticulas = 10;

class Particula {
    constructor(posX, posY, vx, vy, color, maxLife, largura, comprimento) {
        this.id = 0;
        this.posX = posX;
        this.posY = posY;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.maxLife = maxLife;
        this.largura = largura;
        this.comprimento = comprimento;

        this.gravity = 0;
        this.life = 0;
    }

    draw() {
        this.posX += this.vx; // positivo: direita; negativo: esquerda
        this.posY += this.vy; // positivo: baixo; negativo: cima
        this.vy += this.gravity;
        this.life++;
        if (this.life >= this.maxLife)
            delete particles[this.id];
        jogo.contexto.fillStyle = this.color;
        jogo.contexto.fillRect(this.posX, this.posY, this.largura, this.comprimento);
    }
}

class ParticulaCircular extends Particula {
    draw() {
        this.posX += this.vx; // positivo: direita; negativo: esquerda
        this.posY += this.vy; // positivo: baixo; negativo: cima


        this.vx = Math.random() * 2;
        this.vy = Math.random() * 2;

        this.life++;
        if (this.life >= this.maxLife)
            delete particles[this.id];
        jogo.contexto.fillStyle = this.color;
        jogo.contexto.fillRect(this.posX, this.posY, this.largura, this.comprimento);
    }

}

class ParticleSystem {
    constructor(posX, posY, vX, vY, color, maxLife, pWidth, pHeight) {
        for (var i = 0; i < numeroDeParticulas; i++) {
            if (particleIndex > 1000)
                particleIndex = 0;


            //jogo.contexto.fillStyle = corRGBA(0, 0, 0, Math.random());
            //jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);

            /*particles[particleIndex] = new ParticulaCircular(jogo.width / 4, jogo.height / 2,
                Math.random() * 10 - 5, Math.random() * 10 - 5,
                corRGBA(rand(250, 180), rand(250, 180), rand(250, 180), Math.random()), Math.floor(Math.random() * 5), 5, 5);
            particles[particleIndex].id = particleIndex;
            particleIndex++;
            particles[particleIndex] = new ParticulaCircular(jogo.width / 2, jogo.height / 2,
                Math.random() * 10 - 5, Math.random() * 10 - 5,
                corRGBA(rand(160, 10), rand(250, 180), rand(160, 10), Math.random()), Math.floor(Math.random() * 5), 5, 5);
            particles[particleIndex].id = particleIndex;
            particleIndex++;
            particles[particleIndex] = new ParticulaCircular(jogo.width / 4 * 3, jogo.height / 2,
                Math.random() * 10 - 5, Math.random() * 10 - 5,
                corRGBA(rand(250, 180), rand(160, 10), rand(160, 10), Math.random()), Math.floor(Math.random() * 5), 5, 5);

            particles[particleIndex].id = particleIndex;
            */

            particles[particleIndex] = new ParticulaCircular(posX, posY, vX, vY, color, maxLife, pWidth, pHeight);
            particles[particleIndex].id = particleIndex;
            particleIndex++;
        }
    }

    draw() {
        for (var i in particles)
            particles[i].draw();
    }
}

function drawFoods() {
    var posX, posY, vX, vY, maxLife, pWidth, pHeight;

    var whiteish = corRGBA(rand(250, 180), rand(250, 180), rand(250, 180), Math.random());
    var reddish = corRGBA(rand(250, 180), rand(160, 10), rand(160, 10), Math.random());
    var greenish = corRGBA(rand(160, 10), rand(250, 180), rand(160, 10), Math.random());

    posY = jogo.height / 2;
    vx = rand(10) - 5;
    vy = rand(10) - 5;
    maxLife = rand(5, 1);
    pWidth = 6;
    pHeight = 6;
    jogo.contexto.fillRect(0, 0, jogo.width, jogo.height);
    jogo.contexto.strokeStyle = "black";
    //Food
    posX = jogo.width / 4;
    //clearScreen(posX, posY, 5, 5);
    var food = new ParticleSystem(posX, posY, vX, vY, whiteish, maxLife, pWidth, pHeight)
    food.draw();

    //PowerUp
    posX = jogo.width / 2;
    //clearScreen(posX, posY, 5, 5);
    var powerUp = new ParticleSystem(posX, posY, vX, vY, greenish, maxLife, pWidth, pHeight)
    powerUp.draw();

    //PowerDown
    posX = 3 * jogo.width / 4;
    //clearScreen(posX, posY, 5, 5);
    var powerDown = new ParticleSystem(posX, posY, vX, vY, reddish, maxLife, pWidth, pHeight)
    powerDown.draw();
}

function corRGBA(red, green, blue, alpha) {
    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function corHSLA(hue, saturation, luminosity, alpha) {
    return "hsla(" + hue + "," + saturation + "," + luminosity + ", " + alpha + ")";
}

function rand(max, min) {
    min = min ? min : 0;
    max = max ? max : 1;
    return Math.round(Math.random() * max) + min;
}

function clearScreen(vX, vY, width, height) {
    jogo.contexto.fillRect(vX - width / 2, vY - height / 2, width * 2, height * 2);
    jogo.contexto.fillStyle = corRGBA(0, 0, 0, 0.2);
    jogo.contexto.strokeStyle = "pink";
    jogo.contexto.strokeRect(vX - width / 2, vY - height / 2, width * 2, height * 2);
}