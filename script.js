const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

let ball, paddleOne, paddleTwo, board;

class Board {
    constructor(width, height, backgroundColor) {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.score = 0;
    }
    drawBoard() {
        ctx.clearRect(0, 0, this.width, this.height) //clears board
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.fillRect((canvas.width/2)-5,0,10,this.height);
     
    }
    drawScore(paddle) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(paddle.score, paddle.x, this.height - 6);
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
        this.y - this.r < 0 ? this.dy = -this.dy :  //top
            this.y + this.r > board.height ? this.dy = -this.dy :  //bottom
                this.x + this.r > board.width ? newGame() :  //right
                    this.x - this.r < 0 ? newGame() : null;   //left
    }

}

class Paddle {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.score = 0;
    }
    drawPaddle() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    changePosition(dy) {
        this.y + dy + this.height < canvas.height && this.y + dy > 0 ?
            this.y += dy : null;
    }
    checkPaddleCollision() {    //ok
        (ball.x > this.x- ball.r  && ball.x < this.x + this.width + ball.r) &&
            (ball.y > this.y && ball.y < this.y + this.height) ?
            this.paddleHit() : null;
    }
    paddleHit() {
        ball.dx = -ball.dx;
        this.score++;
    }
    setPosition() {
        this.y = ball.y - this.height / 2;
    }
}

function gameLoop() {
    board.drawBoard();
    ball.drawBall();
    ball.changePosition();
    ball.checkWallCollision();
    paddleOne.drawPaddle();
    paddleTwo.drawPaddle();
    paddleOne.checkPaddleCollision();
    paddleTwo.checkPaddleCollision();
    paddleTwo.setPosition();
    board.drawScore(paddleOne);
    board.drawScore(paddleTwo);
    window.requestAnimationFrame(gameLoop);
}

function newGame() {
    ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 'yellow', 4, 4); //x,y,radious,color,dx,dy
    board = new Board(canvas.width, canvas.height, 'grey');  //width,height,color
    paddleOne = new Paddle(20, 120, 0, canvas.height / 2, 'black') // width,height,x,y,color
    paddleTwo = new Paddle(20, 120, canvas.width - 20, canvas.height / 2, 'black')
}

newGame();
window.requestAnimationFrame(gameLoop);

window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 68:  //'d' key
            console.log('xd')
            paddleOne.changePosition(8);
            break;
        case 65:  //'a' key
            paddleOne.changePosition(-8);
        default:
            break;
    }
});
