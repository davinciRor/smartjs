
export function checkMessage(msg) {
  let message = msg.message;
  let matches = message.match('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');
  
  return matches && matches[0] ? matches[0] : null;
}
