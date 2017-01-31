var pos;
var prev;
var looping = true;
var r, g, b;
var margin;
var foodToEat = [];
var eatenFood = [];
var s = 2.5;
var ant;
var foodAmount = 1800;
var bars;
var barsMax = 75;
var padding = 10;
var barsWidth;
var interface;
var showPanels = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    margin = width * 0.025;
    background(0);
    fill(255);
    noStroke();
    pos = createVector(width / 2, height / 2);
    prev = pos.copy();
    createFood();
    ant = createVector(width / 4, height / 2);
    barsWidth = width - padding * 2;
    textFont("Inconsolata");
    textSize(15);
    showBars();
    showFood();
    // createInterface();
}

function createInterface() {
    interface = createDiv('');
    interface.style('position', 'absolute');
    interface.style('width', '100%');
    // interface.style('bottom', '2.5em');
    interface.style('padding', '10px 0px 0px 0px');
    interface.style('opacity', '1');
    interface.style('background-color', 'rgba(65, 65, 65, 0.5)');
    interface.style('font-family', 'Inconsolata', 'Helvetica', 'Arial');
    // interface.style('line-height', '0.75em');
    var calculateHeight = windowHeight - 50;
    interface.style("max-height", calculateHeight + "px");
    interface.style("overflow", "auto");
    interface.style('color', 'rgba(255, 255, 255, 0.5');

    var div = createDiv('<span class="highlight">A random walker forages for green food.</span> </br>When eaten, food turns red.');
    div.parent(interface);
    div.style('float', 'left');
    div.style('width', '48%');
    div.style('font-size', '1.25em');
    div.style('padding', '0px 1% 0% 1%');
    var s = 'Each time the walker eats food, a line is connected between it and the previously eaten food.';
    s += '</br></br>At the bottom left, a graph plots the lengths of the lines, creating a curve which fits a <a href="https://en.wikipedia.org/wiki/Power_law">Power law</a>.';
    s += '</br></br><span class="highlight">Press spacebar</span> to pause.';
    s += '</br><span class="highlight">Press t</span> to hide this text overlay.';

    var div2 = createDiv(s);
    div2.parent(interface);
    div2.style('float', 'left');
    div2.style('width', '48%');
    div2.style('padding', '0px 1% 0% 1%');
    div2.style('font-size', '1.25em');
    div2.style('padding-bottom', '1em');



    // this.nameDiv = createDiv(name + ' : ');
    // this.nameDiv.parent(this.div);
    // this.nameDiv.style('float', 'left');
    // this.nameDiv.style('padding-right', '0.5em');
}

function draw() {
    if (foodToEat.length > 0) {
        for (var i = 0; i < 100; i++) {
            antWalk();
        }
    } else {
        console.log("All the food is eaten.");
        noLoop();
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
            // console.log("La fourmi mange!");
            eatenFood.push(foodToEat[i]);
            foodToEat.splice(i, 1);
            showBars();
            fill(255, 0, 0);
            ellipse(eatenFood[eatenFood.length - 1].x, eatenFood[eatenFood.length - 1].y, s, s);
            push();
            translate(width / 2, 0);
            ellipse(eatenFood[eatenFood.length - 1].x, eatenFood[eatenFood.length - 1].y, s, s);
            var e = eatenFood.length;
            if (e >= 2) {
                stroke(255, 0, 0);
                strokeWeight(1);
                line(eatenFood[e - 1].x, eatenFood[e - 1].y, eatenFood[e - 2].x, eatenFood[e - 2].y);
                noStroke();
            }
            pop();
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
        if (ant.x + step.x < (width - margin) / 2 && ant.x + step.x > margin / 2) {
            if (ant.y + step.y < height - barsMax - padding * 2 - margin / 2 && ant.y + step.y > margin / 2) {
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
    // for (var j = 0; j < eatenFood.length; j++) {
    //     fill(255, 0, 0);
    //     ellipse(eatenFood[j].x, eatenFood[j].y, s, s);
    //     stroke(255, 0, 0);
    //     strokeWeight(0.5);
    //     if (j >= 1) {
    //         line(eatenFood[j - 1].x, eatenFood[j - 1].y, eatenFood[j].x, eatenFood[j].y);
    //     }
    //     noStroke();
    // }
}

function createFood() {
    for (var i = 0; i < foodAmount; i++) {
        var randomX = random(margin / 2, (width - margin) / 2);
        var randomY = random(margin / 2, height - barsMax - padding * 2 - margin / 2);
        var v = createVector(randomX, randomY);
        foodToEat.push(v);
    }
    // for (var i = 0; i < foodAmount; i++) {
    //     var randomX = random(margin, width - margin);
    //     var randomY = random(margin, height - margin);
    //     var x = cos(i) * 1.5 * i;
    //     var y = sin(i) * 1.5 * i;
    //     var v = createVector(width / 4 + x, height / 2 + y);
    //     if (v.x < (width - margin) / 2 && v.x > margin / 2) {
    //         if (v.y < height - barsMax - padding * 2 - margin / 2 && v.y > margin / 2) {
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
    if (key == 't' || key == 'T') {
        if (showPanels) {
            showPanels = false;
            interface.style("display", "none");
        } else {
            showPanels = true;
            interface.style("display", "block");
        }
    }
}
