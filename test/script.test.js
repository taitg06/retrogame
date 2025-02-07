const { expect } = require('chai');
const { startGame, nextRound, checkSequence, endGame, updateTopScores, resetScores } = require('../script.js');

describe('Simon Game Unit Tests', () => {
    describe('startGame()', () => {
        it('should initialize the game state correctly', () => {
            startGame();
            expect(sequence).to.be.an('array').that.is.empty;
            expect(playerSequence).to.be.an('array').that.is.empty;
            expect(score).to.equal(0);
        });
    });

    describe('nextRound()', () => {
        it('should add a new color to the sequence', () => {
            sequence = [];
            nextRound();
            expect(sequence.length).to.equal(1);
            expect(colors).to.include(sequence[0]);
        });
    });

    describe('checkSequence()', () => {
        it('should return true if the player sequence matches the game sequence', () => {
            sequence = ['red', 'green'];
            playerSequence = ['red', 'green'];
            expect(checkSequence()).to.be.true;
        });

        it('should return false if the player sequence does not match the game sequence', () => {
            sequence = ['red', 'green'];
            playerSequence = ['red', 'blue'];
            expect(checkSequence()).to.be.false;
        });
    });

    describe('updateTopScores()', () => {
        it('should add a new score to the top scores list', () => {
            topScores = [];
            updateTopScores('Player1', 5);
            expect(topScores).to.deep.include({ name: 'Player1', score: 5 });
        });

        it('should keep only the top 10 scores', () => {
            topScores = [];
            for (let i = 1; i <= 15; i++) {
                updateTopScores(`Player${i}`, i);
            }
            expect(topScores.length).to.equal(10);
            expect(topScores[0].score).to.equal(15); // Highest score should be first
        });
    });

    describe('resetScores()', () => {
        it('should clear the top scores list', () => {
            topScores = [{ name: 'Player1', score: 5 }];
            resetScores();
            expect(topScores).to.be.an('array').that.is.empty;
        });
    });
});

