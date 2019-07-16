export function install() {
  const script = document.createElement('script');
  script.src = 'cozmo-jsqr/jsQR.js';
  document.head.append(script);
}

export async function scan(image) {
  return jsQR(image);
}
