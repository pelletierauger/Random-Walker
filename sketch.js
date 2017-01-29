var pos;
var prev;
var looping = true;
var r, g, b;
var margin;

function setup() {
    createCanvas(windowWidth, windowHeight);
    margin = width * 0.025;
    background(0);
    fill(255);
    stroke(255, 30);
    strokeWeight(2);
    pos = createVector(width / 2, height / 2);
    prev = pos.copy();
}

function draw() {
    r = map(sin(frameCount / 100), -1, 1, 0, 255);
    g = map(sin(frameCount / 20), -1, 1, 200, 55);
    b = map(cos(frameCount / 20), -1, 1, 100, 255);
    // b = map(pos.x, 0, width, 0, 255);
    stroke(r, g, b, 30);
    for (var i = 0; i < 1000; i++) {
        line(pos.x, pos.y, prev.x, prev.y);
        prev.set(pos);

        var step = p5.Vector.random2D();
        // var x = cos(frameCount / 10) * 10;
        // var y = sin(frameCount / 100) * 10;
        // x = lerp(step.x, x, 0.015);
        // y = lerp(step.y, y, 0.015);
        // step = createVector(x, y);
        // var mappedR = map(pos.x, 0, width, 0, 10000);
        var r = random(10000);
        if (r < 1) {
            step.mult(random(50, 1000));
            // stroke(r, g, b, 255);
            // strokeWeight(1);
        } else {
            step.setMag(2);
            // stroke(r, g, b, 30);
            // strokeWeight(1.5);
        }
        if (pos.x + step.x < width - margin && pos.x + step.x > margin) {
            if (pos.y + step.y < height - margin && pos.y + step.y > margin) {
                pos.add(step);
            }
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
}
