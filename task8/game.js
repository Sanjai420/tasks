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

let snake=[
    {x:0,y:0}
]
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
    ctx.strokeStyle='#212121';
    createFood();
    displayFood();
    // drawSnake();
    // moveSnake();
    nextTick();
}

function createFood(){
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}
console.log(foodY);

function displayFood(){
    ctx.fillStyle='red';
    ctx.fillRect(foodX,foodY,UNIT,UNIT)
}
function drawSnake(){
    ctx.fillStyle='aqua';
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
    setTimeout(() =>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        nextTick();
    },100);
}
function keyPress(event){
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        case(event.keyCode==LEFT):
            xVel=-UNIT;
            yVel=0;
            break;
        case (event.keyCode==RIGHT):
            xVel=UNIT;
            yVel=0;
            break;
        case(event.keyCode==UP):
            xVel=0;
            yVel=-UNIT;
            break;
        case(event.keyCode==DOWN):
            xVel=0;
            yVel=UNIT;
            break;
    }
}