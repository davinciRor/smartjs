
export function checkLinks(link) {
  return new Promise((resolve, reject) => {
    let image = new Image(400);
    image.src = link;

    image.onload = () => resolve([image]);
    image.onerror = () => reject(null);
  });
}
