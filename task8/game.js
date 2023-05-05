const gameBoard=document.getElementById('gameBoard');
const ctx= gameBoard.getContext("2d");
const scoreText=document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT=25;

let foodX;
let foodY;
let xVel=25;
let yVel=0;
let score=0;
let active=true;  
let started=false;

let snake=[
    {x:0,y:0}
]
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
    ctx.strokeStyle='#212121';
    ctx.fillStyle='#EEEEEE';
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
}

function createFood(){
    do {
        foodX = Math.floor(Math.random() * (WIDTH/UNIT)) * UNIT;
        foodY = Math.floor(Math.random() * (HEIGHT/UNIT)) * UNIT;
    } while (snake.some(snakePart => snakePart.x == foodX && snakePart.y == foodY));
}


function displayFood(){
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(foodX + UNIT/2, foodY + UNIT/2, UNIT/2 - ctx.lineWidth/2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
function drawSnake(){
    ctx.fillStyle='#424242';
    ctx.strokeStyle='#212121';
    snake.forEach((snakePart) =>{
        ctx.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        ctx.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}


function moveSnake(){
    const head={x:snake[0].x+xVel,
                y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else
    snake.pop()
}
function clearBoard(){
    ctx.fillStyle='white';
    ctx.fillRect(0,0,WIDTH,HEIGHT);
}
function nextTick(){
    if(active){
        setTimeout(() =>{
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },150);
    }
    else{
        clearBoard();
        ctx.font="bold 50px serif";
        ctx.fillStyle="black";
        ctx.textAlign="center";
        ctx.fillText("Game Over!",WIDTH/2,HEIGHT/2);
    }
}
function keyPress(event){
    if(!started){
        started=true;
        nextTick();
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        case(event.keyCode==LEFT && xVel!=UNIT):
            xVel=-UNIT;
            yVel=0;
            break;
        case (event.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        case(event.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        case(event.keyCode==DOWN && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT;
            break;
    }
}

function checkGameOver(){
    if(snake[0].x<0 || snake[0].x>=WIDTH || snake[0].y<0 || snake[0].y>=HEIGHT){
        active=false;
        return;
    }

    // Check if the snake has collided with its body
    for(let i=1; i<snake.length; i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            active=false;
            return;
        }
    }
}