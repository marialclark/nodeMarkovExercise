/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!(word in this.chains)) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = MarkovMachine.choice(keys);
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }
    return output.join(" ");
  }

  /** utility function to select a random element from an array */
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

module.exports = {
  MarkovMachine,
};
