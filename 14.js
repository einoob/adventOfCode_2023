const { input, testInput } = require("./inputs/14");

const tiltMapToNorth = (map) => {
  for (let y = 1; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        let new_y = y - 1;
        while (new_y >= 0 && map[new_y][x] === ".") {
          map[new_y + 1][x] = ".";
          map[new_y][x] = "O";
          new_y--;
        }
      }
    }
  }
  return map;
};

const getLoadSum = (map) => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    sum += map[i].filter((character) => character === "O").length * (map.length - i);
  }
  return sum;
};

const calculateLoadSum = (input, part) => {
  let map = input.split("\n").map((line) => line.split(""));
  map = tiltMapToNorth(map);
  return getLoadSum(map);
};

console.log("test input p1", calculateLoadSum(testInput));
console.log("input", calculateLoadSum(input));

