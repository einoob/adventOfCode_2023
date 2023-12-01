const { input, testInput, partTwoTestInput } = require("./inputs/01");

const initIndexObject = () => [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getValue = (word) => {
  if (word === "one") return "1";
  if (word === "two") return "2";
  if (word === "three") return "3";
  if (word === "four") return "4";
  if (word === "five") return "5";
  if (word === "six") return "6";
  if (word === "seven") return "7";
  if (word === "eight") return "8";
  if (word === "nine") return "9";
};

const getCalibrationValuePartOne = (map) => {
  const lines = map.split("\n");

  let values = [];
  for (y = 0; y < lines.length; y++) {
    let firstDigit;
    let lastDigit;
    for (i = 0; i < lines[y].length; i++) {
      if (Number.isInteger(+lines[y][i])) {
        if (!firstDigit) {
          firstDigit = lines[y][i];
        }
        lastDigit = lines[y][i];
      }
    }
    values.push(parseInt(firstDigit + lastDigit));
  }
  return values.reduce((a, b) => a + b, 0);
};

const getCalibrationValuePartTwo = (map) => {
  const lines = map.split("\n");

  let values = [];
  for (y = 0; y < lines.length; y++) {
    let firstDigit = { index: null, value: "" };
    let lastDigit = { index: -1, value: "" };
    let numbers = initIndexObject();
    for (i = 0; i < lines[y].length; i++) {
      if (Number.isInteger(+lines[y][i])) {
        if (!firstDigit.value) {
          firstDigit = { index: i, value: lines[y][i] };
        }
        lastDigit = { index: i, value: lines[y][i] };
      }
    }
    for (i = 0; i < numbers.length; i++) {
      let nbr = numbers[i]
      if (
        lines[y].indexOf(nbr) != -1 &&
        (firstDigit.index === null || lines[y].indexOf(nbr) < firstDigit.index)
      ) {
        firstDigit.index = lines[y].indexOf(nbr);
        firstDigit.value = getValue(nbr);
      }
      if (lines[y].indexOf(nbr) != -1 && lines[y].lastIndexOf(nbr) > lastDigit.index) {
        lastDigit.index = lines[y].lastIndexOf(nbr);
        lastDigit.value = getValue(nbr);
      }
    } 
    values.push(parseInt(firstDigit.value + lastDigit.value));
  }
  return values.reduce((a, b) => a + b, 0);
};

console.log("testInput", getCalibrationValuePartOne(testInput));
console.log("input", getCalibrationValuePartOne(input));

console.log("testInput", getCalibrationValuePartTwo(partTwoTestInput));
console.log("input", getCalibrationValuePartTwo(input));