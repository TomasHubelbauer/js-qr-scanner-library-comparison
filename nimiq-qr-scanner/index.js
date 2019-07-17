import QrScanner from './qr-scanner.min.js';

export const name = 'Nimiq QR Scanner';

export async function install() {
  // https://github.com/nimiq/qr-scanner#setup
  QrScanner.WORKER_PATH = 'nimiq-qr-scanner/qr-scanner-worker.min.js';
}

export async function scan({ img }) {
  // TODO: https://github.com/nimiq/qr-scanner#single-image-scanning
  // TODO: Figure out the best input type to use for single and continuous scanning
  // TODO: Do worked and workless
  return QrScanner.scanImage(img);
}
