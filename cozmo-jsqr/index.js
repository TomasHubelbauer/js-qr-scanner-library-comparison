export const name = 'Cozmo jsqR';

export async function install() {
  const script = document.createElement('script');
  script.src = 'cozmo-jsqr/jsQR.js';
  document.head.append(script);
}

export async function scan({ imageData }) {
  const result = jsQR(imageData.data, imageData.width, imageData.height);
  return result === null ? null : result.data;
}
