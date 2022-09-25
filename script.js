const can = document.querySelector('canvas');
const ctx = can.getContext('2d');

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
const rlX = rw; //x start position of the rocket left
let rlY = ch/2-rh/2; //y start position of the rocket left
const rrX = cw-2*rw;
let rrY = ch/2-rh/2;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 1;
let ballSpeedY = 1;


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

}

function rocketLeft() {
    ctx.fillStyle = '#3498DB';
    ctx.fillRect(rw, rlY, rw, rh);
}

function rocketRight() {
    ctx.fillStyle = '#E67E22';
    ctx.fillRect(rrX, rrY, rw, rh);
}


function game() {
table()
ball()
rocketLeft()
rocketRight()
}

setInterval(game, 16)