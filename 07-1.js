const { input, testInput } = require("./inputs/07");

const translateCard = (card) => {
  if (card === "A") return 14;
  if (card === "K") return 13;
  if (card === "Q") return 12;
  if (card === "J") return 11;
  if (card === "T") return 10;
  return +card;
};

const deductHand = (cards, hand) => {
  for (let i = 0; i < cards.length; i++) {
    let amountOfCard = 0;
    for (j = 0; j < hand.length; j++) {
      if (hand[j] === cards[i]) amountOfCard++;
    }
    if (cards.length === 2) return amountOfCard === 4 || amountOfCard === 1 ? 5 : 4;
    if (cards.length === 3 && amountOfCard === 3) return 3;
  }
  return 2;
};

const countStrength = (hand) => {
  let cardsInHand = Array.from(new Set(hand));
  if (cardsInHand.length === 1) return 6;
  if (cardsInHand.length === 4) return 1;
  if (cardsInHand.length === 5) return 0;
  return deductHand(cardsInHand, hand);
};

const sortCards = (a, b) => {
  if (a.strength === b.strength) {
    for (let i = 0; i < a.hand.length; i++) {
      if (a.hand[i] !== b.hand[i]) {
        return a.hand[i] - b.hand[i];
      }
    }
    return 0;
  }
  return a.strength - b.strength;
};

const countWinnigs = (cardSets) => {
  let winnings = [];
  for (let i = 0; i < cardSets.length; i++) {
    winnings.push(cardSets[i].bid * (i + 1));
  }
  return winnings;
};

const countHandStrengths = (input) => {
  let cardSets = input.split("\n").map((line) => {
    const [hand, bid] = line.split(" ");
    return { hand, bid };
  });

  cardSets.forEach((cardSet) => {
    cardSet.hand = cardSet.hand.split("");
    cardSet.bid = +cardSet.bid;
    for (let i = 0; i < cardSet.hand.length; i++) {
      cardSet.hand[i] = translateCard(cardSet.hand[i]);
    }
    cardSet["strength"] = countStrength(cardSet.hand);
  });
  cardSets.sort((a, b) => sortCards(a, b));
  let winnings = countWinnigs(cardSets);
  return winnings.reduce((a, b) => a + b, 0);
};

console.log("test input", countHandStrengths(testInput));
console.log("input", countHandStrengths(input))