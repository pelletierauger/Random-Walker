var pos;
var prev;
var looping = true;
var r, g, b;
var margin;
var foodToEat = [];
var eatenFood = [];
var s = 2.5;
var ant;
var foodAmount = 300;
var bars;

function setup() {
    createCanvas(windowWidth, windowHeight);
    margin = width * 0.025;
    background(0);
    fill(255);
    noStroke();
    pos = createVector(width / 2, height / 2);
    prev = pos.copy();
    createFood();
    ant = createVector(width / 2, height / 2);
}

function draw() {
    for (var i = 0; i < 10; i++) {
        showFood();
        antWalk();
        showBars();
    }
}

function showBars() {
    var barsMax = 50;
    var barsWidth = 200;
    fill(125);
    rect(0, height - barsMax, barsWidth, height);
    stroke(255, 0, 0);
    strokeWeight(1);
    bars = [];
    for (var j = 0; j < eatenFood.length; j++) {
        if (j >= 1) {
            var d = dist(eatenFood[j - 1].x, eatenFood[j - 1].y, eatenFood[j].x, eatenFood[j].y);
            // console.log(d);
            bars.push(d);
        }

    }
    bars.sort(function(a, b) {
        return a - b;
    });
    for (var k = 0; k < bars.length; k++) {
        var mappedBar = map(bars[k], 0, bars[bars.length - 1], 0, barsMax);
        line(k * (barsWidth / bars.length), height, k * (barsWidth / bars.length), height - mappedBar);
    }
    // console.log(bars);
    noStroke();
}

function antWalk() {
    for (var i = 0; i < foodToEat.length; i++) {
        // console.log(dist(ant.x, ant.y, food[i].x, food[i].y));
        // console.log("Quoi?");
        if (dist(ant.x, ant.y, foodToEat[i].x, foodToEat[i].y) <= s * 2) {
            console.log("La fourmi mange!");
            eatenFood.push(foodToEat[i]);
            foodToEat.splice(i, 1);
        }
    }
    var step = p5.Vector.random2D();
    step.setMag(s);
    fill(255, 50);
    ellipse(ant.x, ant.y, s, s);
    if (ant.x + step.x < width - margin && ant.x + step.x > margin) {
        if (ant.y + step.y < height - margin && ant.y + step.y > margin) {
            ant.add(step);
        }
    }
}

function showFood() {
    for (var i = 0; i < foodToEat.length; i++) {
        fill(0, 255, 0);
        ellipse(foodToEat[i].x, foodToEat[i].y, s, s);
    }
    for (var j = 0; j < eatenFood.length; j++) {
        fill(255, 0, 0);
        ellipse(eatenFood[j].x, eatenFood[j].y, s, s);
        stroke(255, 0, 0);
        strokeWeight(1);
        if (j >= 1) {
            line(eatenFood[j - 1].x, eatenFood[j - 1].y, eatenFood[j].x, eatenFood[j].y);
        }
        noStroke();
    }
}

function createFood() {
    // for (var i = 0; i < foodAmount; i++) {
    //     var randomX = random(margin, width - margin);
    //     var randomY = random(margin, height - margin);
    //     var v = createVector(randomX, randomY);
    //     foodToEat.push(v);
    // }
    for (var i = 0; i < foodAmount; i++) {
        var randomX = random(margin, width - margin);
        var randomY = random(margin, height - margin);
        var x = cos(i) * 1.5 * i;
        var y = sin(i) * 1.5 * i;
        var v = createVector(width / 2 + x, height / 2 + y);
        foodToEat.push(v);
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
