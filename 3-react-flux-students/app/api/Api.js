import request from 'superagent';

const URL = 'http://jb5.smartjs.academy/api/users';

export function getRequest() {
  return new Promise(
    function(resolve, reject) {
      request
        .get(URL)
        .on('error',
          function(error) {
            reject(error);
          }
        )
        .end(
          function(error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result.body, result);
            }
          }
        );
    }
  );
}

export function postRequest(data) {
  return new Promise(
    function(resolve, reject) {
      request
        .post(URL + '/' + data.id)
        .set('Content-Type', 'application/json')
        .send(data)
        .end(
          function(error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result.body, result);
            }
          }
        );
    }
  );
}
