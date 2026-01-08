let z3 = -110;
let zDirection3 = 1;
let img;
let grow = 0;
let fusionMode = false;
let sonidoAgua;

let matrixDrops = [];
let fallingTexts = [];

let numberGraphics = [];
let textGraphic;

function preload() {
  img = loadImage("riachuelo.jpg");
  sonidoAgua = loadSound("agua.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
  userStartAudio();

  createNumberGraphics();
  createTextGraphic();

  for (let i = 0; i < 250; i++) {
    matrixDrops.push(new MatrixDrop());
  }
}

function createNumberGraphics() {
  for (let i = 0; i < 2; i++) {
    let g = createGraphics(60, 60);
    g.clear();
    g.fill(0, 255, 100, 255);
    g.textAlign(CENTER, CENTER);
    g.textSize(48);
    g.text(i, 30, 30);
    numberGraphics.push(g);
  }
}

function createTextGraphic() {
  textGraphic = createGraphics(1000, 120);
  textGraphic.clear();
  textGraphic.fill(0, 255, 0);
  textGraphic.textAlign(CENTER, CENTER);
  textGraphic.textSize(52);
  textGraphic.textStyle(BOLD);
  textGraphic.text("Vemos lo que deciden las máquinas", 500, 60);
}

class MatrixDrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-width * 0.75, width * 0.75);
    this.y = random(-height, -100);
    this.z = random(-400, 400);
    this.speed = random(3, 9);
    this.value = floor(random(2));
    this.size = random(25, 55);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.03, 0.03);
  }

  update() {
    this.y += this.speed;
    this.rotation += this.rotationSpeed;
    if (this.y > height / 2 + 200) this.reset();
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(this.rotation);
    texture(numberGraphics[this.value]);
    plane(this.size, this.size);
    pop();
  }
}

function draw() {
  background(0);

  noStroke();
  ambientLight(50);
  directionalLight(123, 135, 65, 0, 0, -1);

  z3 += 2 * zDirection3;
  if (z3 > 310 || z3 < -110) zDirection3 *= -1;

  if (keyIsDown(81) || mouseIsPressed) grow += 2;
  else grow = max(0, grow - 2);

  if (fusionMode) {
    push();
    rotateY(frameCount * 0.02);
    pointLight(random(255), random(155), random(255), 20, 1, 2);
    drawScene();
    pop();
  } else drawScene();

  for (let drop of matrixDrops) {
    drop.update();
    drop.display();
  }

  drawFallingText3D();
}

function drawScene() {
  push();
  translate(0, 0, -190);
  rotate(frameCount * 0.01);
  texture(img);
  plane(width * 1.5, height * 1.5);
  pop();

  push();
  translate(z3, -5, 90);
  rotateY(frameCount * 0.03);
  texture(img);
  sphere(90 + grow, 120);
  pop();
}

function drawFallingText3D() {
  if (frameCount % 90 === 0) {
    fallingTexts.push({
      y: -height / 2 - 50,
      z: random(-200, 200),
      alpha: 300,
      rotation: random(TWO_PI)
    });
  }

  for (let i = fallingTexts.length - 1; i >= 0; i--) {
    let t = fallingTexts[i];
    
    push();
    translate(0, t.y, t.z);
    rotateY(t.rotation + frameCount * 0.01);
    texture(textGraphic);
    plane(700, 120);
    pop();

    t.y += 2;
    t.rotation += 0.005;
    t.alpha -= 1;

    if (t.alpha <= 1) fallingTexts.splice(i, 1);
  }
}

function keyPressed() {
  if (key === "s" || key === "S") saveCanvas("mi_arte3D", "png");
  if (key === "f" || key === "F") fusionMode = !fusionMode;
  startSoundIfNeeded();
}

function touchStarted() {
  startSoundIfNeeded();
  let currentTime = millis();
  if (touchStarted.lastTap && currentTime - touchStarted.lastTap < 300)
    saveCanvas("mi_arte3D", "png");
  touchStarted.lastTap = currentTime;
  return false;
}

function touchEnded() {
  fusionMode = !fusionMode;
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startSoundIfNeeded() {
  if (sonidoAgua && !sonidoAgua.isPlaying()) {
    sonidoAgua.loop();
    sonidoAgua.setVolume(0.4);
  }
}