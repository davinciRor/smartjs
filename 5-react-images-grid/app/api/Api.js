import request from 'superagent';

export function getImages() {
  return new Promise(
    (resolve, reject) => {
      request
        .get('/images.json')
        .on('error', error => reject(error))
        .end(
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.body, result);
            }
          }
        )
    }
  )
}
