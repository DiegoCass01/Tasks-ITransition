let input = process.argv.slice(2);
if (!input.length) {
  console.log("");
} else {
  let firstString = input[0];
  for (let i = 1; i < input.length; i++) {
    if (input[i].length < firstString.length) firstString = input[i];
  }
  for (let l = firstString.length; l > 0; l--)
    for (let i = 0; i <= firstString.length - l; i++) {
      let sub = firstString.slice(i, i + l);
      let foundInAll = true;
      for (let j = 0; j < input.length; j++) {
        if (!input[j].includes(sub)) {
          foundInAll = false;
          break;
        }
      }

      if (foundInAll) {
        console.log(sub);
        return;
      }
    }
  console.log("");
}
