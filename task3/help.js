class HelpTable {
  static printHelp(moves) {
    const n = moves.length;
    console.log("Help Table:");
    console.log(" ".repeat(8) + moves.join("  "));
    for (let i = 0; i < n; i++) {
      let row = moves[i].padEnd(8);
      for (let j = 0; j < n; j++) {
        if (i === j) {
          row += "Draw".padEnd(8);
        } else if (
          (j > i && j - i <= Math.floor(n / 2)) ||
          (j < i && i - j > Math.floor(n / 2))
        ) {
          row += "Lose".padEnd(8);
        } else {
          row += "Win".padEnd(8);
        }
      }
      console.log(row);
    }
  }
}

module.exports = HelpTable;