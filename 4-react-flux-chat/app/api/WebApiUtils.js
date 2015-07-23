
export function checkMessage(msg) {
  return new Promise((resolve, reject) => {
    let message = msg.message;
    let matches = message.match('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');

    if(!matches) reject(null);

    let image = new Image(400);
    image.src = matches[0];

    image.onload = () => resolve([image]);
    image.onerror = () => reject(null);
  });
}
