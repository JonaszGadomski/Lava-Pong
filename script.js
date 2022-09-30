const can = document.querySelector('canvas');
const ctx = can.getContext('2d');
const start = document.getElementById('start');
const resultLeft = document.getElementById('resultLeft');
const resultRight = document.getElementById('resultRight');



can.height = 500;
can.width = 1000;
const ch = can.height;
const cw = can.width;
const bs = 20;
let ballX = cw/2-bs/2;
let ballY = ch/2-bs/2;

//rocket dimensions and location
const rh = 100;
const rw = 20;
const rlX = rw; //x start position of the left rocket
var rlY = 200;               //ch/2-rh/2; //y start position of the left rocket
const rrX = cw-2*rw;
const rrY = ch/2-rh/2;

const lineWidth = 6;
const lineHeight = 16;

const startShoot = [1.1, 1.2, 1.3, 1.4, 1.5];
const shootDirection = [-1, 1];

var ballSpeedX = startShoot[Math.floor(Math.random()*5)]*shootDirection[Math.floor(Math.random()*2)];
var ballSpeedY = startShoot[Math.floor(Math.random()*5)]*shootDirection[Math.floor(Math.random()*2)];

function table() {
    ctx.fillStyle = 'rgb(60, 0, 10)';
    ctx.fillRect(0, 0, cw, ch);
    
    //drawing dashed line in the middle
    for (let linePosition = 20; linePosition < ch; linePosition +=30) {
        ctx.fillStyle = '#EDBB99';
        ctx.fillRect(cw/2-lineWidth/2, linePosition, lineWidth, lineHeight)
    }
}

function ball() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, bs, bs);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //wall bumping
    if (ballY > ch-bs || ballY < 0) {
        ballSpeedY = -ballSpeedY
    }
    //ball out
    if (ballX < 0) {
        ballX = cw/2-bs/2;
        ballY = ch/2-bs/2;
    }
    if (ballX > cw) {
        ballX = cw/2-bs/2;
        ballY = ch/2-bs/2;
    }
    //rocket bumping
}

function rocketLeft() {
    ctx.fillStyle = '#3498DB';
    ctx.fillRect(rlX, rlY, rw, rh);
}

function rocketRight() {
    ctx.fillStyle = '#E67E22';
    ctx.fillRect(rrX, rrY, rw, rh);
}

topCanvas = can.offsetTop+49;

can.addEventListener('mousemove', leftPosition);
function leftPosition(e) {
    rlY = (e.clientY - topCanvas)
}


function game() {
table()
ball()
rocketLeft()
rocketRight()
}

setInterval(game, 10)
