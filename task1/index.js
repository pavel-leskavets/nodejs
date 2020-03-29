const { program } = require('commander');
const fs = require('fs');
const readline = require('readline');

const decoder = require('./decoder');
const setShift = require('./shiftHelper');
const { encodeOperation, decodeOperation } = require('./constants');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <number>', ' a shift')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input <string>', 'an input file')
  .option('-o, --output <string>', 'an output file')
  .parse(process.argv);

const { action, input, output, shift } = program.opts();
const currentShift = setShift(action, shift);

if (action === encodeOperation || action === decodeOperation) {
  readFile();
} else {
  process.stderr.write('Action argument is wrong');
}

function readFile() {
  if (input) {
    fs.access(input, error => {
      if (error) {
        process.stderr.write("input file doesn't exist");
      } else {
        const readableStream = fs.createReadStream(input, 'utf8');
        readableStream.on('data', chunk => {
          const encodedString = decoder(chunk, currentShift);
          writeFile(encodedString);
        });
      }
    });
  } else {
    createInputReadLine();
  }
}

function writeFile(encodedString) {
  if (output) {
    fs.access(output, error => {
      if (error) {
        process.stderr.write("output file doesn't exist");
      } else {
        fs.appendFile(output, `${encodedString}\n`, err => {
          if (err) console.error(err);
        });
      }
    });
  } else {
    process.stdout.write(encodedString);
  }
}

function createInputReadLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
  });
  console.log('Enter the text you want to transform');
  rl.on('line', line => {
    const encodedString = decoder(line, currentShift);
    writeFile(encodedString);
  });
}
