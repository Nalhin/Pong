const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let board, player;

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
    constructor(positionx, positiony, radious, color) {
        this.x = positionx;
        this.y = positiony;
        this.r = radious;
        this.color = color;
    }
    drawPlayer() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function gameLoop() {
    board.drawBoard();
    player.drawPlayer();

}

function newGame() {
    board = new Board(canvas.width, canvas.height, 'grey');
    player = new Player(50, 50, 10, 'black');
}
window.requestAnimationFrame(gameLoop);

// center x, center y, radious, start angle, end angle