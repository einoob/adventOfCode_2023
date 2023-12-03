const { input, testInput } = require("./inputs/03");

const isNotNumberOrDot = (character) => character !== "." && !Number.isInteger(+character);

const hasAdjacentSymbol = (lines, y, x) => {
  if (y > 0) {
    if (x > 0 && lines[y - 1][x - 1] && isNotNumberOrDot(lines[y - 1][x - 1])) return true;
    if (isNotNumberOrDot(lines[y - 1][x])) return true;
    if (x + 1 < lines[y].length && isNotNumberOrDot(lines[y - 1][x + 1])) return true;
  }

  if (x > 0 && isNotNumberOrDot(lines[y][x - 1])) return true;
  if (x + 1 < lines[y].length && isNotNumberOrDot(lines[y][x + 1])) return true;

  if (y < lines.length - 1) {
    if (x > 0 && isNotNumberOrDot(lines[y + 1][x - 1])) return true;
    if (isNotNumberOrDot(lines[y + 1][x])) return true;
    if (x + 1 < lines[y + 1].length && isNotNumberOrDot(lines[y + 1][x + 1])) return true;
  }
  return false;
};

const removeNumberIfNotAdjacentToSymbol = (lines, y, x) => {
  let i = x;

  while (Number.isInteger(+lines[y][i])) {
    if (hasAdjacentSymbol(lines, y, i)) return lines;
    i++;
  }
  while (Number.isInteger(+lines[y][x])) {
    lines[y][x] = ".";
    x++;
  }
  return lines;
};

const countSumOfNumbers = (input) => {
  let lines = input.split("\n").map((line) => line.split(""));
  let partNumbers = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (Number.isInteger(+lines[y][x])) {
        lines = removeNumberIfNotAdjacentToSymbol(lines, y, x);
      }
      while (Number.isInteger(+lines[y][x])) x++;
    }
  }
  lines = lines.map((line) => line.join(""));

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (Number.isInteger(+lines[y][x])) {
        let tab = x;
        while (Number.isInteger(+lines[y][tab])) {
          tab++;
        }
        partNumbers.push(parseInt(lines[y].substring(x, tab)));
        x = tab;
      }
    }
  }
  return partNumbers.reduce((a, b) => a + b, 0);
};

const getNumber = (lines, y, x) => {
  let start = x;

  while (start >= 0 && Number.isInteger(+lines[y][start])) {
    start--;
  }
  start++;
  while (x < lines[y].length && Number.isInteger(+lines[y][x])) {
    x++;
  }
  return parseInt(lines[y].join("").substring(start, x));
};

const hasTwoAdjacentNumbers = (lines, start_y, start_x) => {
  let amountOfNumbers = 0;
  let x = start_x === 0 ? 0 : start_x - 1;
  let limit_x = start_x < lines[start_y].length - 1 ? start_x + 1 : start_x;
  let y = start_y === 0 ? 0 : start_y - 1;
  let limit_y = start_y < lines.length - 1 ? start_y + 1 : start_y;
  let row = y === start_y ? 0 : -1;

  while (y <= limit_y) {
    let numbersOnLine = 0;
    while (x <= limit_x) {
      if (Number.isInteger(+lines[y][x])) {
        numbersOnLine++;
      }
      x++;
    }
    if (row !== 0) {
      if (
        numbersOnLine === 2 &&
        start_x !== 0 &&
        start_x < lines[y].length &&
        !Number.isInteger(+lines[y][start_x])
      ) {
        amountOfNumbers += 2;
      } else if (numbersOnLine > 0) {
        amountOfNumbers++;
      }
    }
    if (row === 0 && numbersOnLine === 2) {
      amountOfNumbers += 2;
    } else if (row === 0 && numbersOnLine === 1) {
      amountOfNumbers++;
    }
    y++;
    row++;
    x = start_x === 0 ? 0 : start_x - 1;
  }
  return amountOfNumbers === 2;
};

const countPowerOfAdjacentNumbers = (lines, y, x) => {
  let nbrA = null;
  let nbrB = null;
  if (!hasTwoAdjacentNumbers(lines, y, x)) {
    return 0;
  }
  if (y > 0) {
    if (x > 0 && Number.isInteger(+lines[y - 1][x - 1])) {
      nbrA = getNumber(lines, y - 1, x - 1);
    }
    if (Number.isInteger(+lines[y - 1][x]) && !nbrA) {
      nbrA = getNumber(lines, y - 1, x);
    }
    if (x + 1 < lines[y].length && Number.isInteger(+lines[y - 1][x + 1]) && !nbrA) {
      nbrA = getNumber(lines, y - 1, x + 1);
    } else if (
      nbrA &&
      !Number.isInteger(+lines[y - 1][x]) &&
      Number.isInteger(+lines[y - 1][x + 1])
    ) {
      nbrB = getNumber(lines, y - 1, x + 1);
    }
  }

  if (x > 0 && Number.isInteger(+lines[y][x - 1]) && !nbrA) {
    nbrA = getNumber(lines, y, x - 1);
  } else if (x > 0 && Number.isInteger(+lines[y][x - 1]) && nbrA) {
    nbrB = getNumber(lines, y, x - 1);
  }
  if (x + 1 < lines[y].length && Number.isInteger(+lines[y][x + 1]) && !nbrA) {
    nbrA = getNumber(lines, y, x + 1);
  } else if (x + 1 < lines[y].length && Number.isInteger(+lines[y][x + 1]) && nbrA) {
    nbrB = getNumber(lines, y, x + 1);
  }

  if (y + 1 < lines.length) {
    if (x > 0 && Number.isInteger(+lines[y + 1][x - 1]) && !nbrA) {
      nbrA = getNumber(lines, y + 1, x - 1);
    } else if (x > 0 && Number.isInteger(+lines[y + 1][x - 1]) && nbrA) {
      nbrB = getNumber(lines, y + 1, x - 1);
    }
    if (Number.isInteger(+lines[y + 1][x]) && !Number.isInteger(+lines[y + 1][x - 1]) && !nbrB) {
      nbrB = getNumber(lines, y + 1, x);
    }
    if (x + 1 < lines[y].length && Number.isInteger(+lines[y + 1][x + 1]) && !nbrB) {
      nbrB = getNumber(lines, y + 1, x + 1);
    }
  }
  if (nbrA === null || nbrB === null) return 0;
  return nbrA * nbrB;
};

const countPowersOfNumbersAdjacentToStar = (input) => {
  let lines = input.split("\n").map((line) => line.split(""));

  let powers = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "*") {
        powers.push(countPowerOfAdjacentNumbers(lines, y, x));
      }
    }
  }
  return powers.reduce((a, b) => a + b, 0);
};

console.log("part 1", "testInput", countSumOfNumbers(testInput), "input", countSumOfNumbers(input));
console.log(
  "part 2",
  "testInput",
  countPowersOfNumbersAdjacentToStar(testInput),
  "input",
  countPowersOfNumbersAdjacentToStar(input)
);
