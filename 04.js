const { input, testInput } = require("./inputs/04");

const calculateCardValue = (card) => {
  let [winningNumbers, drawnNumbers] = card;
  let cardValue = 0;
  for (let i = 0; i < winningNumbers.length; i++) {
    if (drawnNumbers.includes(winningNumbers[i])) {
      if (cardValue === 0) cardValue = 1;
      else cardValue *= 2;
    }
  }
  return cardValue;
};

const addToCardPile = (cards, i, amountOfCards) => {
  let [winningNumbers, drawnNumbers] = cards[i];
  let wins = 0;
  winningNumbers.forEach((nbr) => {
    if (drawnNumbers.includes(nbr)) wins += 1;
  });
  for (let x = i + 1; x <= wins + i; x++) {
    if (x < amountOfCards.length) {
      amountOfCards[x] += amountOfCards[i];
    }
  }
};

const countValuesOfCards = (input) => {
  let cards = input.split("\n").map((line) =>
    line
      .slice(line.indexOf(":") + 2)
      .trim()
      .split(" | ")
      .map((nbrs) => nbrs.replaceAll("  ", " ").split(" "))
  );

  let cardValues = [];
  let amountOfCards = Array.from(Array(cards.length), (x) => 1);
  for (let i = 0; i < cards.length; i++) {
    cardValues.push(calculateCardValue(cards[i]));
    addToCardPile(cards, i, amountOfCards);
  }
  return {
    "part 1": cardValues.reduce((a, b) => a + b, 0),
    "part 2": amountOfCards.reduce((a, b) => a + b, 0),
  };
};

console.log("test input", countValuesOfCards(testInput));
console.log("input", countValuesOfCards(input));
