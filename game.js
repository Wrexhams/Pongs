const game = document.getElementById('game');
const playerPaddle = document.getElementById('player-paddle');
const computerPaddle = document.getElementById('computer-paddle');
const ball = document.getElementById('ball');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');

const gameHeight = game.clientHeight;
const paddleHeight = playerPaddle.clientHeight;
const ballSize = ball.clientWidth;

let playerScore = 0;
let computerScore = 0;
let ballX = 0;
let ballY = 0;
let ballVelocityX = 4;
let ballVelocityY = 4;

const movePaddle = (paddle, offsetY) => {
    const newTop = Math.max(0, Math.min(gameHeight - paddleHeight, paddle.offsetTop + offsetY));
    paddle.style.top = `${newTop}px`;
};

// Touch controls for mobile
let touchStartY = 0;

playerPaddle.addEventListener('touchstart', event => {
    touchStartY = event.touches[0].clientY;
});

playerPaddle.addEventListener('touchmove', event => {
    const touchY = event.touches[0].clientY;
    const deltaY = touchY - touchStartY;
    movePaddle(playerPaddle, deltaY);
    touchStartY = touchY;
});

// Ball and game logic
const updateBall = () => {
    const nextBallX = ballX + ballVelocityX;
    const nextBallY = ballY + ballVelocityY;

    // Wall collision
    if (nextBallY <= 0 || nextBallY >= gameHeight - ballSize) {
        ballVelocityY = -ballVelocityY;
    }

    // Paddle collision
    if (
        (nextBallX <= playerPaddle.offsetLeft + playerPaddle.offsetWidth &&
            nextBallY + ballSize >= playerPaddle.offsetTop &&
            nextBallY <= playerPaddle.offsetTop + paddleHeight) ||
        (nextBallX + ballSize >= computerPaddle.offsetLeft &&
            nextBallY + ballSize >= computerPaddle.offsetTop &&
            nextBallY <= computerPaddle.offsetTop + paddleHeight)
    ) {
        ballVelocityX = -ballVelocityX;
    }

    // Score update
    if (nextBallX < 0) {
        computerScore++;
        computerScoreElem.textContent = computerScore;
        resetBall();
    } else if (nextBallX > game.clientWidth) {
        playerScore++;
        playerScoreElem.textContent = playerScore;
        resetBall();
    }

    // Update ball position
    ballX += ballVelocityX;
    ballY += ballVelocityY;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
};

const resetBall = () => {
    ballX = game.clientWidth / 2 - ballSize / 2;
    ballY = gameHeight / 2 - ballSize / 2;
    ballVelocityX = Math.random() > 0.5 ? 4 : -4;
    ballVelocityY = Math.random() > 0.5 ? 4 : -4;
};

resetBall();
setInterval(updateBall, 16);