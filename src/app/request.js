import axios from "axios"
import { loadProgressBar } from 'axios-progress-bar'

// export const REQUEST_URI = `https://${window.location.hostname}:4000/api`
export const REQUEST_URI = '/api'

loadProgressBar()

export const useXHR_Request = (method,url,userdata) =>{
  const auth = localStorage.getItem('auth') || null;

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)

  async function startRequest (){
  setIsLoading(true)
  try {
    setResponse({
    success: await axios({
      url: url,
      method: method,
      baseURL: REQUEST_URI,
      headers: {'Authorization': auth ? `Bearer ${auth}` : undefined,},
      params: method === 'get' ? userdata : undefined,
      data: method !== 'get' ? userdata : undefined,
      timeout: 10000,
    })
    })
    setIsLoading(false)
  } catch (err) {
    setResponse({error: err})
    setIsLoading(false)
  }
  }
    
  return {isLoading, response, startRequest}
}

export const XHR_REQUEST = async(method, url, userdata=null, debugSetting=false) =>{
  XHRDebug(debugSetting)
  const auth = localStorage.getItem('auth') || null;
  return await axios({
      url: url,
      method: method,
      baseURL: REQUEST_URI,
      headers: {'Authorization': auth ? `Bearer ${auth}` : undefined,},
      params: method === 'get' ? userdata : undefined,
      data: method !== 'get' ? userdata : undefined,
      timeout: 10000,
  })
}


const XHRDebug = (setting=false) => {
  if(setting === true){
    axios.interceptors.request.use(
      (req) => {
        var data = req.method === 'get' ? req.params : req.data
        console.log(`Request method: '${req.method}', to ${req.url}, with data: ${JSON.stringify(data, true)}`)
        return req;
      },
      (err) => { return Promise.reject(err) } 
    );

    axios.interceptors.response.use(
      (res) => {
        console.log(`Status: ${res.status}:${res.statusText} - Data: ${JSON.stringify(res.data, true)}`)
        return res;
      },
      (err) => { return Promise.reject(err) }
    );
  }
  
}




