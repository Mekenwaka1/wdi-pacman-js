// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;

// Define your ghosts here
const inky = {
  menu_option: "1",
  name: "Inky",
  colour: "Red",
  character: "Shadow",
  edible: false]
  
};
const blinky = {
  menu_option: "2",
  name: "Blinky",
  colour: "Cyan",
  character: "Speedy",
  edible: false
};
const pinky = {
  menu_option: "3",
  name: "Pinky",
  colour: "Pink",
  character: "Bashful",
  edible: false
};
const clyde = {
  menu_option: "4",
  name: "Clyde",
  colour: "Orange",
  character: "Pokey",
  edible: false
};

// replace this comment with your four ghosts setup as objects
const ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log("\x1Bc");
}

function displayStats() {
  console.log(
    `Score: ${score}     Lives: ${lives}\n\n\nPower-Pellets: ${powerPellets}`
  );
}

function displayMenu() {
  console.log("\n\nSelect Option:\n"); // each \n creates a new line
  console.log("(d) Eat Dot");
  if (powerPellets > 0) {
    console.log("(p) Eat Power-Pellet");
  }
  if (inky["edible"]) {
    console.log("(1) Eat Inky (edible)");
  } else if (inky["edible"] === false) {
    console.log("(1) Eat Inky (inedible)");
  }
  if (blinky["edible"]) {
    console.log("(2) Eat Blinky (edible)");
  } else if (blinky["edible"] === false) {
    console.log("(2) Eat Blinky (inedible)");
  }
  if (pinky["edible"]) {
    console.log("(3) Eat Pinky (edible)");
  } else if (pinky["edible"] === false) {
    console.log("(3) Eat Pinky (inedible)");
  }
  if (clyde["edible"]) {
    console.log("(4) Eat Clyde (edible)");
  } else if (clyde["edible"] === false) {
    console.log("(4) Eat Clyde (inedible)");
  }
  console.log("(q) Quit");
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write("\nWaka Waka :v "); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  console.log("\nChomp!");
  score += 10;
}

// Process Player's Input
function processInput(key) {
  switch (key) {
    case "\u0003": // This makes it so CTRL-C will quit the program
    case "q":
      process.exit();
      break;
    case "d":
      eatDot();
      break;
    case "p":
      if (powerPellets > 0) {
        eatPowerPellet();
      } else {
        console.log("\nNo Power-Pellets left!");
      }
      break;
    case "1":
      eatGhost(inky);
      break;
    case "2":
      eatGhost(blinky);
      break;
    case "3":
      eatGhost(pinky);
      break;
    case "4":
      eatGhost(clyde);
      break;
    default:
      console.log("\nInvalid Command!");
  }
}

const eatGhost = ghost => {
  if (ghost["edible"] === false) {
    lives -= 1;
    console.log(
      "\n" +
        ghost["name"] +
        " with " +
        ghost["colour"] +
        " colour kills PacMan!"
    );
  } else {
    console.log(
      "\n" +
        ghost["name"] +
        " with " +
        ghost["character"] +
        " character was eaten!"
    );
    score += 200;
    ghost["edible"] = false;
  }
  endGame();
};

const endGame = () => {
  if (lives < 0) {
    process.exit();
  }
};

const eatPowerPellet = () => {
  score += 50;
  for (let ghost of ghosts) {
    ghost["edible"] = true;
  }
  powerPellets -= 1;
};

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on("data", key => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on("exit", () => {
  console.log("\n\nGame Over!\n");
});
