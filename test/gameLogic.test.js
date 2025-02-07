const { expect } = require('chai');
const { startGame, nextRound, checkSequence, getScore, sequence, playerSequence } = require('../gameLogic');

describe('Game Logic Tests', () => {
  beforeEach(() => {
    startGame();
    sequence.length = 0; // Explicitly reset sequence
    playerSequence.length = 0; // Explicitly reset playerSequence
  });

  it('should initialize the game state correctly', () => {
    expect(getScore()).to.equal(0);
    expect(sequence).to.be.an('array').that.is.empty;
    expect(playerSequence).to.be.an('array').that.is.empty;
  });

  it('should check the player sequence correctly', () => {
    nextRound(); // Add a color to the sequence
    playerSequence.push(sequence[0]); // Simulate the player's input
    expect(checkSequence()).to.be.true; // The sequences should match
  });
});