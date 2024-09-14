class GameRules {
  constructor(moves) {
    this.moves = moves;
  }

  getWinner(userMove, computerMove) {
    const totalMoves = this.moves.length;
    const userIndex = this.moves.indexOf(userMove);
    const compIndex = this.moves.indexOf(computerMove);

    // Determine half the moves
    const half = Math.floor(totalMoves / 2);

    // Calculate win/loss conditions in circular order
    if (userIndex === compIndex) {
      return "Draw";
    } else if (
      (compIndex > userIndex && compIndex - userIndex <= half) ||
      (compIndex < userIndex && userIndex - compIndex > half)
    ) {
      return "Computer wins";
    } else {
      return "You win";
    }
  }
}

module.exports = GameRules;