import * as nimiqqrscanner from './nimiq-qr-scanner/index.js';
import * as cozmojsqr from './cozmo-jsqr/index.js';
import * as lazarsoftjsqrcode from './lazarsoft-jsqrcode/index.js';
import * as schmichinstascan from './schmich-instascan/index.js';

const libraries = [
  nimiqqrscanner,
  cozmojsqr,
  //lazarsoftjsqrcode,
  //schmichinstascan,
];

// Install all libraries beforehand so they all have the same DOM / ~memory
for (const library of libraries) {
  // Add script tags and register web workers for libraries which require it
  library.install();
}

// TODO: Fill this up by capturing a sequence from the web camera
const frames = [];

void async function () {
  const img = document.createElement('img');
  for (let index = 1; index <= 4; index++) {
    img.src = 'test' + index + '.png';
    // Use `onload` to keep replacing the handler with the latest `resolve`
    await new Promise(resolve => img.onload = resolve);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    frames.push({ img, imageData });
  }

  // TODO: UI
  for await (const s of sample()) {
    console.log(s);
  }
}()

async function* sample() {
  for (const library of libraries) {
    for (const frame of frames) {
      const now = performance.now();
      try {
        // not-found, not-match, match, error
        const result = await library.scan(frame);
        yield { library: library.name, result, time: performance.now() - now };
      } catch (error) {
        yield { library: library.name, result: 'error', error, time: performance.now() - now };
      }
    }
  }
}
