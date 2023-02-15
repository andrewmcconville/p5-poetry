let sentences = [
  /*1a1b1*/ "hand-held X-Y transducer usable on any flat surface.",
  /*1a2*/ "Special-purpose high-level languages and associated compilers provide rapid, flexible development and modification of the repertoire of service functions and of their control procedures.",
  /*3b3*/ "The alphanumeric keyboard has 96 normal characters in two cases",
  /*3b4a*/ "a tracking spot with which the user may point",
  /*3c4a*/ "the conception, stipulation, and execution of significant manipulations are made much easier by the structuring conventions",
  /*3d2al*/ "direct selection of a statement which is on the display—the user simply points to any character in the statement, using the mouse."
];
let charPosition;
let xoff = 0;
let start = 0;
let interval = 0.001;
let timer = 1000;
let nextMillis = timer;
let fallingLetters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(180);
  start -= interval;
  xoff = start;

  sentences.forEach((sentence, index) => {
    charPosition = createVector(100, 0);
    printBumpyCharacters(sentence.split(""), index * 100);
  });

  if(fallingLetters.length)
  fallingLetters[0].drawFaller();
}

function printBumpyCharacters(characters, yOffset) {
  characters.forEach(character => {
    charPosition.y = map(noise(xoff), 0, 1, 0, 180);

    fill(map(charPosition.y, 0, 180, 180, 0));
    text(character, charPosition.x, charPosition.y + yOffset);

    if(millis() >= nextMillis) {
      let faller = new Faller({
        position: createVector(charPosition.x, charPosition.y + yOffset),
        character: character,
      });

      fallingLetters[0] = faller;

      nextMillis += timer;
    }
    
    charPosition.x += textWidth(character);
    xoff -= interval - 0.04;
  });
}
