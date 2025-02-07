const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let score = 0;

const startGame = () => {
  sequence = [];
  playerSequence = [];
  score = 0;
};

const nextRound = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
};

const checkSequence = () => {
  const index = playerSequence.length - 1;
  return playerSequence[index] === sequence[index];
};

module.exports = {
  startGame,
  nextRound,
  checkSequence,
  getScore: () => score,
  sequence, // Export sequence
  playerSequence, // Export playerSequence
};
