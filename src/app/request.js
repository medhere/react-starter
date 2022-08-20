import axios from "axios"
import { loadProgressBar } from 'axios-progress-bar'

// export const REQUEST_URI = 'https://localhost:4000'
export const REQUEST_URI = '/api'

loadProgressBar()

function XHR(method,url,userdata=null){
  const token = localStorage.getItem('token') || null;

  const XHR_OBJECT = {
      url: url,
      method: method,
      baseURL: REQUEST_URI,
      headers: {'Authorization': token ? `Bearer ${token}` : undefined,},
      params: method === 'get' ? userdata : undefined,
      data: method !== 'get' ? userdata : undefined,
      timeout: 10000,
      onUploadProgress: function (progressEvent) {
        var {loaded,total}=progressEvent,
        percent = Math.floor((loaded*100)/total)
        // console.log(`uploaded: ${loaded}kb of ${total}kb | ${percent}%`)
        // console.log(`${method} request to ${REQUEST_URI}/${url}.`)
      },
      onDownloadProgress: function (progressEvent) {
        var {loaded,total}=progressEvent,   
        percent = Math.floor((loaded*100)/total)
        // console.log(`downloaded: ${loaded}kb of ${total}kb | ${percent}%`)
      }
  }
  return XHR_OBJECT;
}


function XHRDebug(request=false,response=false){
  request === true && axios.interceptors.request.use(
    (req) => {
      var data = req.method === 'get' ? req.params : req.data
      console.log(`Request method: '${req.method}', to ${req.url}, with data: ${JSON.stringify(data, true)}`)
      return req;
    },
    (err) => { return Promise.reject(err) } 
  );

  response === true && axios.interceptors.response.use(
    (res) => {
      console.log(`Status: ${res.status}:${res.statusText} - Data: ${JSON.stringify(res.data, true)}`)
      return res;
    },
    (err) => { return Promise.reject(err) }
  );
}


export async function XHR_REQUEST(method,url,userdata=null,debugRequest=false,debugResponse=false){
  XHRDebug(debugRequest,debugResponse)
  return await axios(XHR(method,url,userdata))
}

