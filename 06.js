const { input, testInput } = require("./inputs/06");

const countMargin = (time, distance) => {
  let margin = 0;
  for (let i = 1; i < time; i++) {
    if ((time - i) * i > distance) margin++;
  }
  return margin;
};

const countPowerOfMargins = (input) => {
  const [times, distances] = input.split("\n").map((line) =>
    line
      .slice(line.indexOf(":") + 1)
      .trim()
      .split(" ")
      .map((nbr) => nbr.trim())
      .filter((element) => element !== "")
  );
  let recordMargins = [];
  for (let i = 0; i < times.length; i++) {
    recordMargins.push(countMargin(+times[i], +distances[i]));
  }
  const timePartTwo = times.join("");
  const distancePartTwo = distances.join("");
  const marginPartTwo = countMargin(+timePartTwo, +distancePartTwo);
  return { "part 1": recordMargins.reduce((a, b) => a * b), "part 2": marginPartTwo };
};

console.log("test input", countPowerOfMargins(testInput));
console.log("input", countPowerOfMargins(input));
