const readline = require('readline-sync');
const crypto = require('crypto');
const GameRules = require('./rules'); // Import GameRules class
const HmacGenerator = require('./hmacGenerator'); // Import HmacGenerator class

class Game {
  constructor(moves) {
    if (moves.length < 3 || moves.length % 2 === 0) {
      throw new Error('You must provide an odd number of moves (>= 3). Example: rock paper scissors.');
    }
    this.moves = moves;
    this.rules = new GameRules(moves);
  }

  start() {
    const computerMove = this.getRandomMove();
    const key = HmacGenerator.generateKey();
    const hmac = HmacGenerator.generateHmac(key, computerMove);

    console.log(`HMAC: ${hmac}`);
    this.printMoves();

    const userMove = this.getUserMove();
    if (userMove === 'help') {
      HelpTable.printHelp(this.moves);
      return this.start();
    } else if (userMove === 'exit') {
      console.log('Exiting game...');
      return;
    }

    console.log(`Your move: ${this.moves[userMove - 1]}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(this.rules.getWinner(this.moves[userMove - 1], computerMove));
    console.log(`HMAC key: ${key}`);
  }

  printMoves() {
    console.log('Available moves:');
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('? - help');
  }

  getUserMove() {
    let choice;
    do {
      choice = readline.question('Enter your move: ').trim();
      if (choice === '?') return 'help';
      if (choice === '0') return 'exit';
      if (!isNaN(choice) && choice >= 1 && choice <= this.moves.length) {
        return parseInt(choice);
      }
      console.log('Invalid input, please try again.');
    } while (true);
  }

  getRandomMove() {
    const randomBytes = crypto.randomBytes(4);  // 4 bytes = 32 bits
    const randomNumber = randomBytes.readUInt32BE(0); // Convert bytes to unsigned integer
    return this.moves[randomNumber % this.moves.length];
  }
}

// Main Script
if (require.main === module) {
  const moves = process.argv.slice(2); // Collect command line arguments starting from the third one
  if (moves.length < 3 || moves.length % 2 === 0) {
    console.error('Error: You must provide an odd number of moves (>= 3). Example: rock paper scissors.');
    process.exit(1);
  }

  try {
    const game = new Game(moves); // Create Game instance
    game.start(); // Start the game
  } catch (error) {
    console.error(error.message);
  }
}
