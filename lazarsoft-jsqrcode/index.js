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
  // TODO: Override `console` to avoid this thrashing the output
  return qrcode.decode(dataUrl);
}
