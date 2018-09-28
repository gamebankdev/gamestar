import fetch from 'dva/fetch';
import config from '../config'


function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {

  if(response.success){
    return response.data
  }else{
    
    try{
      if(response.data.message){
        throw response.data.message
      }      
      const errordata=response.data.data.stack[0].data.err_op_id
      throw errordata
    }catch(err){
      throw err
    }
  }
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
          .then(parseJSON)
          .then(checkStatus)
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
        .then(parseJSON)
        .then(checkStatus)
        .then(res=>{

          resolve(res)
        })
        .catch(err=>{
          reject(err)
        })
      }) 
     
    }
}
