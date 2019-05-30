const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let player, board;

class Board {
    constructor(width, height, backgroundColor) {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
    }
    drawBoard() {
        ctx.clearRect(0, 0, this.width, this.height) //clears board
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);
    }
}

class Player {
    constructor(positionx, positiony, radious, color, dx, dy) {
        this.x = positionx;
        this.y = positiony;
        this.r = radious;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }
    drawPlayer() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    changePosition() {
        this.x += this.dx;
        this.y += this.dy;
    }
    checkCollision() {
        this.x + this.r > board.width ? console.log("right") :
            this.x - this.r < 0 ? console.log("left") :
                this.y - this.r < 0 ? console.log("top") :
                    this.y + this.r > board.height ? console.log("bottom") : null;

    }
}

class Paddle {
    constructor(positionx, positiony, width, height, color) {
        this.x = positionx;
        this.y = positiony;
        this.width = width;
        this.height = height;
        this.color = color;
    }

}

function gameLoop() {
    board.drawBoard();
    player.drawPlayer();
    player.changePosition();
    player.checkCollision();
    window.requestAnimationFrame(gameLoop);
}

function newGame() {
    player = new Player(20, 400, 10, 'black', 2, 2);
    board = new Board(canvas.width, canvas.height, 'grey');

}

newGame();
window.requestAnimationFrame(gameLoop);

window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {

        case 83:  //"s" key
          //  peddle.changePosition();
            break;

        case 65:  //"a" key
            peddle.changePosition();
           // break;
        default:
            break;
    }

});
