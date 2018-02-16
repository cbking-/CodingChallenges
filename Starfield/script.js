let canvas = document.createElement("canvas");;
let ctx = canvas.getContext('2d');
let width = 500;
let height = 500;
let FPS = 30;
let stars = [];
let starCount = 200;

setInterval(function() {
    update();
    draw();
}, 1000/FPS);

function init() {
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas); 

    for(var i = 0; i < starCount; i++){
        stars[i] = new Star();
    }
}

function update() {

}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle="#000000";
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width/2, height/2);

    for(var i = 0; i < stars.length; i++){
        stars[i].move();
        stars[i].draw();
    }
    ctx.restore();
}

function Star(){
    let x = getRndInteger(-width/2, width/2);
    let y = getRndInteger(-height/2, height/2);
    let z = getRndInteger(0, width/2);
    let sx = x;
    let sy = y;

    this.draw = function() {
        if (z < 1) {
            x = getRndInteger(-width/2, width/2);
            y = getRndInteger(-height/2, height/2);
            z = getRndInteger(0, width/2);
        }

        let sx = (x/z).map(0, 1, 0, width/2);
        let sy = (y/z).map(0, 1, 0, height/2);
        ctx.beginPath();
        let r = z.map(0, width/2, 10, 0);
        ctx.arc(sx,sy,r,0,2*Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill()
    }

    this.move = function(){
        z = z - 5;

        if (z < 1) {
            x = getRndInteger(-width/2, width/2);
            y = getRndInteger(-height/2, height/2);
            z = getRndInteger(0, width/2);
        }
    }

    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

window.onload = init;