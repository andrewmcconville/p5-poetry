// const twitch = new tmi.Client({
//   channels: ['Ninja', 'mirggles', 'Pokimane', 'chess', 'KaiCenat', 'amouranth'],
// });

let twitchMessages = [];
let twitchMessagesBuffer = [];
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
  "mashed loudly on the keyboard typing",
  "looked around and proclaimed",
  "methodically wrote",
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
  "mashed loudly on the keyboard",
  "proclaimed while looking around the room",
  "wrote methodically",
];
let twitchStoryTimer = 3000;
let nextMillis = 0;
let twitchChatOutputPadding = 50;


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
  // twitch.connect().then(() => {
  //   console.log('connected')
  // });
  // twitch.on('message', (channelName, tags, message, isSelf) => {
  //   if(twitchMessages.length < 50) {
  //     twitchMessages.push(
  //       {
  //         message: message,
  //         username: tags.username,
  //         isBeforeDialogTag: random() < 0.5 ? true : false,
  //         dialogTag: random(twitchAfterDialogueTags),
  //       }
  //     );
  //   }
  // });
  // twitchMessages.push({
  //   message: "One moment, I'm connecting you now",
  //   username: "Twitch bot",
  //   isBeforeDialogTag: false,
  //   dialogTag: "printed to the screen, then began to listen patiently",
  // });

  createCanvas(windowWidth, windowHeight);  
  colorMode(HSL, 360, 100, 100, 1);
  noStroke();
  noFill();
  textSize(16);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(210, 20, 80, 1);
  
  if(millis() >= nextMillis) {
    console.log(twitchMessages);
    console.log(twitchMessagesBuffer);

    if(twitchMessages.length > twitchMessagesBuffer.length) {
      twitchMessagesBuffer.push(twitchMessages[0]);
      twitchMessages.shift();
    }

    if(twitchMessagesBuffer.length > 8) {
      twitchMessagesBuffer.shift()
    }

    twitchStory = "";

    twitchMessagesBuffer.forEach( message => {
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
  fill(210, 10, 30, 1);
  text(
    twitchStory,
    windowWidth - 400,
    0 + twitchChatOutputPadding,
    400 - (twitchChatOutputPadding * 2),
    windowHeight - (twitchChatOutputPadding * 2));
  pop();

  start -= interval;
  xoff = start;

  sentences.forEach((sentence, index) => {
    charPosition = createVector(100, 0);
    printBumpyCharacters(sentence.split(""), index * 80);
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

    if(random() < 0.005) {
      fallingLetters.push(
        new Faller({
        position: createVector(charPosition.x, charPosition.y + yOffset),
        character: character,
      }));
    }
    
    push();
    fill(210, 12, map(charPosition.y, 0, 180, 88, 0), 1);
    text(character, charPosition.x, charPosition.y + yOffset);
    pop();
    
    charPosition.x += textWidth(character);
    xoff -= interval - 0.04;
  });
}
