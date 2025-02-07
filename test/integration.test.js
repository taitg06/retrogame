const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load your HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// Set up jsdom
const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.document = dom.window.document;
global.window = dom.window;

// Mock localStorage
global.localStorage = {
  _data: {},
  setItem: function (key, value) {
    this._data[key] = value;
  },
  getItem: function (key) {
    return this._data[key] || null;
  },
  removeItem: function (key) {
    delete this._data[key];
  },
  clear: function () {
    this._data = {};
  },
};

// Load your script.js file
require('../script.js');

describe('Simon Game Integration Tests', () => {
    beforeEach(() => {
        // Reset the DOM and localStorage before each test
        document.body.innerHTML = html;
        localStorage.clear();
      
        // Reinitialize the game state
        sequence = [];
        playerSequence = [];
        score = 0;
      
        // Reinitialize the button references
        startButton = document.getElementById('start-button');
        playerNameInput = document.getElementById('player-name');
        scoreDisplay = document.getElementById('score');
      });

  it('should display the game title', () => {
    const title = document.querySelector('h1').textContent;
    expect(title).to.equal('Simon Game');
  });



 

});