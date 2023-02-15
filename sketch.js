let sentence1 = "Hello,  World.";
let sentence2 = "hand-held  X-Y  transducer  usable  on  any  flat  surface.";
let sentence3 = "Special-purpose  high-level  languages  and  associated  compilers  provide  rapid,  flexible  development  and  modification  of  the  repertoire  of  service  functions  and  of  their  control  procedures."
let charPosition;
let xoff = 0;
let start = 0;
let interval = 0.001;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);
  start -= interval;
  xoff = start;
  charPosition = createVector(100, 0);
  printBumpyCharacters(sentence1.split(""), -200);
  charPosition = createVector(100, 0);
  printBumpyCharacters(sentence2.split(""), 0);
  charPosition = createVector(100, 0);
  printBumpyCharacters(sentence3.split(""), 200);
}

function printBumpyCharacters(characters, yOffset) {
  characters.forEach(character => {
    text(character, charPosition.x, map(noise(xoff), 0, 1, 200, 500) + yOffset);
    charPosition.x += textWidth(character);
    xoff -= interval - 0.05;
  });
}
