const { input, testInputA, testInputB, testInputC } = require("./inputs/08");

const traverseMap = (instructions, map) => {
  let current = "AAA";
  let steps = 0;
  let i = 0;

  while (current !== "ZZZ") {
    if (instructions[i] === "L") {
      current = map[current][0];
    } else {
      current = map[current][1];
    }
    steps++;
    i = i + 1 === instructions.length ? 0 : i + 1;
  }
  return steps;
};

const getPrimeFactors = (primeFactors, number) => {
  let factor = 2
  while (number / factor !== 1) {
    if (number % factor === 0) {
      primeFactors.push(factor)
      number /= factor
    }
    factor++;
  }
  primeFactors.push(factor)
}

const traverseMapWithMultipleStarts = (instructions, map, nodes) => {
  let goalsReached = [];
  for (let n = 0; n < nodes.length; n++) {
    let i = 0;
    let steps = 0;
    while (nodes[n][2] !== "Z") {
      if (instructions[i] === "L") {
        nodes[n] = map[nodes[n]][0];
      } else {
        nodes[n] = map[nodes[n]][1];
      }
      steps++;
      i = i + 1 === instructions.length ? 0 : i + 1;
    }
    goalsReached.push(steps);
  }
  let primeFactors = []
  for (let n = 0; n < goalsReached.length; n++) {
    getPrimeFactors(primeFactors, goalsReached[n])
  }
  primeFactors = Array.from(new Set(primeFactors))
  return primeFactors.reduce((a, b) => a * b)
};

const countStepsToGoal = (input, part) => {
  let [instructions, map] = input.split("\n\n");
  map = map.split("\n").map((line) => {
    [currentNode, links] = line.replaceAll("(", "").replaceAll(")", "").split(" = ");
    links = links.split(", ");
    return [currentNode, links];
  });
  map = Object.fromEntries(map);
  let startNodes = Object.keys(map).filter((key) => key[2] === "A");
  let steps =
    part === "part1"
      ? traverseMap(instructions, map)
      : traverseMapWithMultipleStarts(instructions, map, startNodes);
  return steps;
};

console.log(
  "test input",
  countStepsToGoal(testInputA, "part1"),
  countStepsToGoal(testInputB, "part1"),
  countStepsToGoal(testInputC, "part2")
);
console.log("input", countStepsToGoal(input, "part1"), countStepsToGoal(input, "part2"));
