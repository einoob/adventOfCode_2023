const { input, testInput } = require("./inputs/09");

let valuesOfNextNumbers = [];
let valuesOfPreviousNumbers = [];

const getNextNumberOfFirstArray = (arrays) => {
  let y = arrays.length - 1;
  while (y > 0) {
    let lastIndexA = arrays[y].length - 1;
    let lastIndexB = arrays[y - 1].length - 1;
    arrays[y - 1].push(arrays[y][lastIndexA] + arrays[y - 1][lastIndexB]);
    y--;
  }
  return arrays[0][arrays[0].length - 1];
};

const extrapolateArray = (arrays, tab) => {
  let nextArray = [];
  if (arrays[tab].filter((nbr) => nbr !== 0).length === 0) {
    valuesOfNextNumbers.push(getNextNumberOfFirstArray(arrays));
    return;
  }
  for (let i = 0; i + 1 < arrays[tab].length; i++) {
    nextArray[i] = arrays[tab][i + 1] - arrays[tab][i];
  }
  arrays.push(nextArray);
  extrapolateArray(arrays, tab + 1);
};

const getPreviousNumberOfFirstArray = (arrays) => {
  
  let y = arrays.length - 1;
  while (y > 0) {
    arrays[y - 1].unshift(arrays[y - 1][0] - arrays[y][0]);
    y--;
  }
  return arrays[0][0];
};

const extrapolateArrayBackwards = (arrays, tab) => {
  let nextArray = [];
  if (arrays[tab].filter((nbr) => nbr !== 0).length === 0) {
    valuesOfPreviousNumbers.push(getPreviousNumberOfFirstArray(arrays));
    return;
  }
  for (let i = arrays[tab].length - 1; i > 0; i--) {
    nextArray.unshift(arrays[tab][i] - arrays[tab][i - 1]);
  }
  arrays.push(nextArray);
  extrapolateArrayBackwards(arrays, tab + 1);
};

const countSumOfNextNumbers = (input) => {
  const nbrArrays = input.split("\n").map((line) => line.split(" ").map((nbr) => +nbr));
  const nbrArrays2 = input.split("\n").map((line) => line.split(" ").map((nbr) => +nbr));
  for (let i = 0; i < nbrArrays.length; i++) {
    extrapolateArray([nbrArrays[i]], 0);
  }
  for (let i = 0; i < nbrArrays2.length; i++) {
    extrapolateArrayBackwards([nbrArrays2[i]], 0);
  }
  return [
    valuesOfNextNumbers.reduce((a, b) => a + b, 0),
    valuesOfPreviousNumbers.reduce((a, b) => a + b, 0),
  ];
};

console.log("test input", countSumOfNextNumbers(testInput));
valuesOfNextNumbers = [];
valuesOfPreviousNumbers = [];
console.log("input", countSumOfNextNumbers(input));
