import fetch from 'dva/fetch';
import config from '../../config'
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json()
    .then(res=>{
      throw res.data.stack[0].format.split(':')[1]
    })
    .catch(err=>{
      throw err
    })
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    if(options.method=='POST'){
        return new Promise((resolve,reject)=>{
          fetch(`${config.gameBankServer}${url}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
               mode: 'cors',
            },
            body:JSON.stringify(options.payload)
          })
          .then(checkStatus)
          .then(parseJSON)
          .then(res=>{
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
        })
    }else if(options.method=='GET'){
      return new Promise((resolve,reject)=>{
        fetch(`${config.httpServer}${url}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(res=>{
          resolve(res)
        })
        .catch(err=>{
          reject(err)
        })
      }) 
     
    }
}
