const { input, testInput } = require("./inputs/02");

const gameIsPossible = (cubes) => {
  for (i = 0; i < cubes.length; i++) {
    if (cubes[i][1] === "red" && +cubes[i][0] > 12) return false;
    if (cubes[i][1] === "green" && +cubes[i][0] > 13) return false;
    if (cubes[i][1] === "blue" && +cubes[i][0] > 14) return false;
  }
  return true;
};

const calculatePowerOfMinimumCubes = (cubes) => {
  let minimumAmounts = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (i = 0; i < cubes.length; i++) {
    if (cubes[i][1] === "red" && +cubes[i][0] > minimumAmounts.red) {
      minimumAmounts.red = +cubes[i][0];
    }
    if (cubes[i][1] === "green" && +cubes[i][0] > minimumAmounts.green) {
      minimumAmounts.green = +cubes[i][0];
    }
    if (cubes[i][1] === "blue" && +cubes[i][0] > minimumAmounts.blue) {
      minimumAmounts.blue = +cubes[i][0];
    }
  }
  return Object.values(minimumAmounts).reduce((a, b) => a * b);
};

const calculateSumOfPossibelGames = (games) => {
  let gameList = games
    .split("\n")
    .map((line) => line.replaceAll(";", ","))
    .map((line) => line.split(": "));
  let possibleGames = [];
  let powersOfMinimumCubes = [];
  for (y = 0; y < gameList.length; y++) {
    let cubes = gameList[y][1].split(", ").map((cubes) => cubes.split(" "));
    if (gameIsPossible(cubes)) {
      possibleGames.push(y + 1);
    }
    powersOfMinimumCubes.push(calculatePowerOfMinimumCubes(cubes));
  }
  return {
    part1: possibleGames.reduce((a, b) => a + b, 0),
    part2: powersOfMinimumCubes.reduce((a, b) => a + b, 0),
  };
};

console.log("test input", calculateSumOfPossibelGames(testInput));
console.log("input", calculateSumOfPossibelGames(input));
