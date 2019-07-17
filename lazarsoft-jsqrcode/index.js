export const name = 'LazarSoft jsqrcode';

export async function install() {
  for (const url of ['grid', 'version', 'detector', 'formatinf', 'errorlevel', 'bitmat', 'datablock', 'bmparser', 'datamask', 'rsdecoder', 'gf256poly', 'gf256', 'decoder', 'qrcode', 'findpat', 'alignpat', 'databr']) {
    const script = document.createElement('script');
    script.src = 'lazarsoft-jsqrcode/' + url + '.js';
    const promise = new Promise(resolve => script.addEventListener('load', resolve));
    document.head.append(script);
    await promise;
  }
}

export async function scan({ dataUrl }) {
  // TODO: Find out why when overriding `console.log` the library never resolves
  const promise = new Promise(resolve => qrcode.callback = resolve);
  qrcode.decode(dataUrl);
  const result = await promise;
  if (result === 'error decoding QR Code') {
    throw result;
  }

  return result;
}
