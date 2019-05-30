const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let ball, paddle, board;

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

class Ball {
    constructor(positionx, positiony, radious, color, dx, dy) {
        this.x = positionx;
        this.y = positiony;
        this.r = radious;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    changePosition() {
        this.x += this.dx;
        this.y += this.dy;
    }
    checkWallCollision() {
        this.x + this.r > board.width ? this.dx=-this.dx :  //right
            this.x - this.r < 0 ? this.dx=-this.dx :     //left
                this.y - this.r < 0 ? this.dy=-this.dy :      //top
                    this.y + this.r > board.height ? console.log("bottom") : null;  //bottom

    }
    checkPaddleCollision() {
        (this.x > paddle.x && this.x + this.r <paddle.x + paddle.width) &&
            (this.y > paddle.y && this.y < paddle.y + paddle.height) ?
            this.dy=-this.dy : null;

    }
}

class Paddle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height;
        this.color = color;
    }
    drawPaddle() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    changePosition(dx) {
        this.x + dx + this.width < canvas.width && this.x + dx > 0 ?
            this.x += dx : null;
    }
}

function gameLoop() {
    board.drawBoard();
    ball.drawBall();
    ball.changePosition();
    ball.checkWallCollision();
    paddle.drawPaddle();
    ball.checkPaddleCollision();
    window.requestAnimationFrame(gameLoop);
}

function newGame() {
    ball = new Ball(20, 400, 10, 'black', 2, 2);
    board = new Board(canvas.width, canvas.height, 'grey');
    paddle = new Paddle(140, 20, 'black')

}

newGame();
window.requestAnimationFrame(gameLoop);

window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {

        case 68:  //'d' key
        console.log('xd')
            paddle.changePosition(8);
            break;

        case 65:  //'a' key
            paddle.changePosition(-8);
        // break;
        default:
            break;
    }

});
