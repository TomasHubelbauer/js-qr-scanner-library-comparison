export const name = 'Cozmo jsqR';

export function install() {
  const script = document.createElement('script');
  script.src = 'cozmo-jsqr/jsQR.js';
  document.head.append(script);
}

export async function scan({ imageData }) {
  return jsQR(imageData.data, imageData.width, imageData.height);
}
