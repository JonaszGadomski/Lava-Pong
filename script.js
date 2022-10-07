const can = document.querySelector('canvas');
const ctx = can.getContext('2d');
const start = document.getElementById('start');
const resultLeft = document.getElementById('resultLeft');
const resultRight = document.getElementById('resultRight');
const settings = document.getElementById('settings');

const settingsPageDiv = document.getElementById('settingsPageDiv');

const rangeLeft = document.getElementById('rangeLeft');
const rangeRight = document.getElementById('rangeRight');

const leftColorSample = document.getElementById('leftColorSample');
const rightColorSample = document.getElementById('rightColorSample');

const leftColorValue = rangeLeft.value;
const rightColorValue = rangeRight.value;

const ok = document.getElementById('ok');


settings.addEventListener('click', () => {
    settingsPageDiv.classList.remove('notVisible')
})


rangeLeft.oninput = function() {
    leftColorSample.style.backgroundColor = "hsl("+this.value+", 100%, 50%)";
    leftColorSample.innerHTML = this.value;
}

rangeRight.oninput = function() {
    rightColorSample.style.backgroundColor = "hsl("+this.value+", 100%, 36%)";
    rightColorSample.innerHTML = this.value;
}


function saveSettings() {
    rocketLeftColor = leftColorSample.style.backgroundColor;
    rocketRightColor = rightColorSample.style.backgroundColor;
    game();
    settingsPageDiv.classList.add('notVisible');
}

ok.addEventListener('click', saveSettings);

let rightGetPoint = 0
let leftGetPoint = 0

var rocketLeftColor = '#3498DB';
var rocketRightColor = '#E67E22';

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
var rlY = 200; //ch/2-rh/2; //y start position of the left rocket
const rrX = cw-2*rw;
var rrY = ch/2-rh/2;

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
        rightGetPoint++
        resultRight.innerHTML = rightGetPoint
    }
    if (ballX > cw) {
        ballX = cw/2-bs/2;
        ballY = ch/2-bs/2;
        leftGetPoint++
        resultLeft.innerHTML = leftGetPoint
    }
    //rocket bumping
    if (ballX <= rlX+20 && ballX > rlX+18 && rlY-19 <= ballY  && ballY <= rlY+99) {
        ballSpeedX = -ballSpeedX
    }
    if (ballX+20 >= rrX && ballX+18 < rrX && rrY-19 <= ballY  && ballY <= rrY+99) {
        ballSpeedX = -ballSpeedX
    }
}

function rocketLeft() {
    ctx.fillStyle = rocketLeftColor;
    ctx.fillRect(rlX, rlY, rw, rh);
    if (rlY <= 0) {
        rlY = 0;
    }
    if (rlY >= ch-100) {
        rlY = ch-100
    }
}

function rocketRight() {
    ctx.fillStyle = rocketRightColor;
    ctx.fillRect(rrX, rrY, rw, rh);
}

topCanvas = can.offsetTop+49;

can.addEventListener('mousemove', leftPosition);
function leftPosition(e) {
    rlY = (e.clientY - topCanvas)
}

function move(e) {
    switch(e.keyCode) {
        case 87:
            rrY = rrY-30
        break;
        case 83:
            rrY = rrY+30
        break
    }
}

window.addEventListener('keydown', move);

function game() {
    table()
    ball()
    rocketLeft()
    rocketRight()
}

var run = ""
function playGame() {
    run = setInterval(game, 10);
    start.innerHTML = 'PAUSE';
} 

function stopGame() {
    game()
    clearInterval(run)
    start.innerHTML = 'START';
}

start.addEventListener('click', () => {
    if (start.innerHTML == 'START') {
        playGame()
    }
    else {
        stopGame()
    }
})

window.onload(stopGame())

