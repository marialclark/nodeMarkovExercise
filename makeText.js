/** Command-line tool to generate Markov text. */
const fs = require('fs').promises;
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const process = require('process');

/** Creates new Markov machine and generates text from a given input source  */
async function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

/** reads file and generates text */
async function makeTextFromFile(path) {
	try {
    let data = await fs.readFile(path, 'utf8');
    await generateText(data);
  } catch (err) {
		console.error(`Error reading ${path}:`, `\n ${err}`);
		process.exit(1); 
	}
}

/** reads url and generates text */
async function makeTextFromURL(url) {
  try {
    let resp = await axios.get(url);
    await generateText(resp.data);
  } catch(err) {
    console.error(`Error fetching ${url}:`, `\n ${err}`);
    process.exit(1);
  }
}

/** Interprets command line arguments to decide action */
async function main() {
  const [sourceType, sourcePath] = process.argv.slice(2);

  if (sourceType === 'file') {
    await makeTextFromFile(sourcePath);
  } else if (sourceType === 'url') {
    await makeTextFromURL(sourcePath);
  } else {
    console.error(`Unknown Source Type: ${sourceType}`);
    process.exit(1);
  }
}

main();