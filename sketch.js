const twitch = new tmi.Client({
  channels: ['LCK'],
});

let twitchMessages = [];
let twitchStory = "";
let twitchBeforeDialogueTags = [
  "bellowed loudly claiming",
  "munched on their snack and mumbled",
  "leaned into the microphone and whispered",
  "hollered across the room for all to hear",
  "scribbled into the chat box",
  "thought to themselves",
  "giggled and said",
  "sang for all to hear",
];
let twitchAfterDialogueTags = [
  "bellowed loudly",
  "said while snacking",
  "whispered into the microphone",
  "hollered across the room",
  "scribbled into the chat box",
  "thought to themselves",
  "chimed in while giggling",
  "sang for all to hear",
];
let twitchStoryTimer = 2000;
let nextMillis = twitchStoryTimer;


let sentences = [
  /*1a1b1*/ "hand-held X-Y transducer usable on any flat surface.",
  /*1a2*/ //"Special-purpose high-level languages and associated compilers provide rapid, flexible development and modification of the repertoire of service functions and of their control procedures.",
  /*3b3*/ "The alphanumeric keyboard has 96 normal characters in two cases",
  /*3b4a*/ "a tracking spot with which the user may point",
  /*3c4a*/ "the conception, stipulation, and execution of significant manipulations are made much easier by the structuring conventions",
  /*3d2al*/ "direct selection of a statement which is on the display—the user simply points to any character in the statement, using the mouse."
];
let charPosition;
let xoff = 0;
let start = 0;
let interval = 0.001;
let fallingLetters = [];

function setup() {
  twitch.connect().then(() => {
    console.log('connected')
  });
  twitch.on('message', (channelName, tags, message, isSelf) => {
    twitchMessages.push(
      {
        message: message,
        username: tags.username,
        isBeforeDialogTag: random() < 0.5 ? true : false,
        dialogTag: random(twitchAfterDialogueTags),
      }
    );

    if(twitchMessages.length > 8) {
      twitchMessages.shift()
    }
    //console.log(tags);
  });

  createCanvas(windowWidth, windowHeight);
  noStroke();
  noFill();
  textSize(16);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(180);
  
  if(millis() >= nextMillis) {
    twitchStory = "";

    twitchMessages.forEach( message => {
      if(message.isBeforeDialogTag) {
        twitchStory += ` ${message.username} ${message.dialogTag}, "${message.message}." \n\n`;
      }
      else {
        twitchStory += `"${message.message}." ${message.username} ${message.dialogTag}. \n\n`;
      }
    });

    nextMillis += twitchStoryTimer;
  }

  push();
  fill(60);
  text(twitchStory, windowWidth - 300, 0 + 50, 300 - 50, windowHeight);
  pop();

  start -= interval;
  xoff = start;

  sentences.forEach((sentence, index) => {
    charPosition = createVector(100, 0);
    printBumpyCharacters(sentence.split(""), index * 100);
  });

  fallingLetters.forEach((letter, index) => {
    if(letter.position.y > windowHeight) {
      fallingLetters.splice(index, 1);
    }

    letter.drawFaller();
  });
}

function printBumpyCharacters(characters, yOffset) {
  characters.forEach(character => {
    charPosition.y = map(noise(xoff), 0, 1, 0, 180);

    if(random() < 0.01) {
      fallingLetters.push(
        new Faller({
        position: createVector(charPosition.x, charPosition.y + yOffset),
        character: character,
      }));
    }
    
    push();
    fill(map(charPosition.y, 0, 180, 220, 0));
    text(character, charPosition.x, charPosition.y + yOffset);
    pop();
    
    charPosition.x += textWidth(character);
    xoff -= interval - 0.04;
  });
}
