var pos;
var prev;
var looping = true;
var r, g, b;
var margin;
var foodToEat = [];
var eatenFood = [];
var s = 2.5;
var ant;
var foodAmount = 450;
var bars;
var barsMax = 75;
var padding = 10;
var barsWidth;

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
    barsWidth = width - padding * 2;
    textFont("Inconsolata");
    textSize(15);
    showBars();
}

function draw() {
    for (var i = 0; i < 10; i++) {
        showFood();
        antWalk();
    }
}

function showBars() {

    fill(85);
    rect(0, height - barsMax - padding * 2, barsWidth + padding * 2, height);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    strokeWeight(0);
    text(eatenFood.length + "/" + (foodToEat.length + eatenFood.length), padding, height - barsMax);
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
    push();
    translate(padding, -padding);
    for (var k = 0; k < bars.length; k++) {
        var mappedBar = map(bars[k], 0, bars[bars.length - 1], 0, barsMax);
        // line(k * (barsWidth / bars.length), height, k * (barsWidth / bars.length), height - mappedBar);
        line(map(k, 0, bars.length - 1, 0, barsWidth), height, map(k, 0, bars.length - 1, 0, barsWidth), height - mappedBar);
    }
    // console.log(bars);
    pop();
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
            showBars();
        }
    }
    var step = p5.Vector.random2D();
    var ran = random(0, 1000);
    var times = 1;
    step.setMag(s);
    fill(255, 50);
    // if (ran <= 1) {
    //     var times = random(0, 500);
    // }
    for (var j = 0; j < times; j++) {
        ellipse(ant.x, ant.y, s, s);
        if (ant.x + step.x < width - margin && ant.x + step.x > margin) {
            if (ant.y + step.y < height - barsMax - padding * 2 - margin && ant.y + step.y > margin) {
                ant.add(step);
            }
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
        strokeWeight(0.5);
        if (j >= 1) {
            line(eatenFood[j - 1].x, eatenFood[j - 1].y, eatenFood[j].x, eatenFood[j].y);
        }
        noStroke();
    }
}

function createFood() {
    for (var i = 0; i < foodAmount; i++) {
        var randomX = random(margin, width - margin);
        var randomY = random(margin, height - barsMax - padding * 2 - margin);
        var v = createVector(randomX, randomY);
        foodToEat.push(v);
    }
    // for (var i = 0; i < foodAmount; i++) {
    //     var randomX = random(margin, width - margin);
    //     var randomY = random(margin, height - margin);
    //     var x = cos(i) * 1.5 * i;
    //     var y = sin(i) * 1.5 * i;
    //     var v = createVector(width / 2 + x, height / 2 + y);
    //     if (v.x < width - margin && v.x > margin) {
    //         if (v.y < height - margin && v.y > margin) {
    //             foodToEat.push(v);
    //         }
    //     }
    // }
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
