const { input, testInput } = require("./inputs/05");

const parseRanges = (maps) => {
  let ranges = [];
  maps.forEach((map) => {
    let range = { source: {}, dest: {} };
    range.source["min"] = +map[1];
    range.source["max"] = +map[1] + (+map[2] - 1);
    range.dest["min"] = +map[0];
    range.dest["max"] = +map[0] + (+map[2] - 1);
    ranges.push(range);
  });
  return ranges;
};

const translateSeeds = (seeds, maps) => {
  let ranges = parseRanges(maps);
  for (let s = 0; s < seeds.length; s++) {
    for (let i = 0; i < ranges.length; i++) {
      if (seeds[s] <= ranges[i].source.max && seeds[s] >= ranges[i].source.min) {
        seeds[s] = ranges[i].dest.min + (seeds[s] - ranges[i].source.min);
        i = ranges.length;
      }
    }
  }
  return seeds;
};

const countNearestLocation = (input) => {
  let maps = input.split("\n\n").map((line) => line.split("\n"));
  let seeds = maps[0][0]
    .slice(maps[0][0].indexOf(":") + 1)
    .trim()
    .split(" ")
    .map((nbr) => +nbr);
  maps = maps.slice(1).map((map) => map.slice(1).map((nbrs) => nbrs.split(" ")));
  for (let i = 0; i < maps.length; i++) {
    seeds = translateSeeds(seeds, maps[i]);
  }
  return Math.min(...seeds);
};

console.log("test input", countNearestLocation(testInput));
console.log("input", countNearestLocation(input))