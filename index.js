import * as nimiqqrscanner from './nimiq-qr-scanner/index.js';
import * as cozmojsqr from './cozmojsqr/index.js';
import * as lazarsoftjsqrcode from './lazarsoftjsqrcode/index.js';
import * as schmichinstascan from './schmich-instascan/index.js';

const libraries = [
  nimiqqrscanner,
  cozmojsqr,
  lazarsoftjsqrcode,
];

const results = {};

// Add script tags and register web workers for libraries which require it and
// register the library in the results collector object
for (const library of libraries) {
  library.install();
  results[library.name] = [];
}

// TODO: Fill this up by capturing a sequence from the web camera
const frames = [];

for (const library of libraries) {
  for (const frame of frames) {
    const now = performance.now();
    // TODO: Measure how long this took
    // TODO: Find out if there was a match and if it was correct
    library(frame);

    // TODO: Insert the result - match is 'none', 'incorrect' or 'correct'
    results[library.name].push({ match: 'none', time: performance.now() - now });
  }
}
