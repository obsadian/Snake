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
    constructor(posX, posY, vx, vy, color, maxLife, largura, comprimento) {
        for (var i = 0; i < numeroDeParticulas; i++) {
            if (particleIndex > 1000)
                particleIndex = 0;
            particles[particleIndex] = new ParticulaCircular(posX, posY, vx, vy, color, maxLife, largura, comprimento);
            particles[particleIndex].id = particleIndex;
            particleIndex++;
        }
    }

    draw() {
        for (var i in particles)
            particles[i].draw();
    }
}

function createFood(posX, posY) {
    return new ParticleSystem(posX, posY,
        Math.random() * 10 - 5, Math.random() * 10 - 5,
        corRGBA(rand(250, 180), rand(250, 180), rand(250, 180), Math.random()),
        Math.floor(Math.random() * 5), 5, 5);
}

function createPowerUp(posX, posY) {
    return new ParticleSystem(posX, posY,
        Math.random() * 10 - 5, Math.random() * 10 - 5,
        corRGBA(rand(160, 10), rand(250, 180), rand(160, 10), Math.random()),
        Math.floor(Math.random() * 5), 5, 5);
}

function createPowerDown(posX, posY) {
    return new ParticleSystem(posX, posY,
        Math.random() * 10 - 5, Math.random() * 10 - 5,
        corRGBA(rand(250, 180), rand(160, 10), rand(160, 10), Math.random()),
        Math.floor(Math.random() * 5), 5, 5);
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

function apagaParticula(x, y) {
    jogo.contexto.fillStyle = "black";
    jogo.contexto.fillRect(x - 20, y - 20, 40, 40);
}