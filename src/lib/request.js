import axios from "axios"
import { loadProgressBar } from 'axios-progress-bar'

// React-query
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'


// export const REQUEST_URI = `https://${window.location.hostname}:4000/api`
export const REQUEST_URI = '/api'

loadProgressBar()

const XHRDebug = (setting = false) => {
  if (setting === true) {
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

const XHR = async (method, url, userdata = null, debugSetting = false) => {
  XHRDebug(debugSetting)
  const auth = localStorage.getItem('auth') || null;
  return await axios({
    url: url,
    method: method,
    baseURL: REQUEST_URI,
    headers: { 'Authorization': auth ? `Bearer ${auth}` : undefined, },
    params: method === 'get' ? userdata : undefined,
    data: method !== 'get' ? userdata : undefined,
    timeout: 10000,
  })
}


export const useXHR = (method, url, userdata, debugSetting = false) => {
  XHRDebug(debugSetting)
  const auth = localStorage.getItem('auth') || null;

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)

  async function startRequest() {
    setIsLoading(true)
    try {
      setResponse({
        success: await axios({
          url: url,
          method: method,
          baseURL: REQUEST_URI,
          headers: { 'Authorization': auth ? `Bearer ${auth}` : undefined, },
          params: method === 'get' ? userdata : undefined,
          data: method !== 'get' ? userdata : undefined,
          timeout: 10000,
        })
      })
      setIsLoading(false)
    } catch (err) {
      setResponse({ error: err })
      setIsLoading(false)
    }
  }

  return { isLoading, response, startRequest }
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      retry: 0,
      retryDelay: attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
      cacheTime: 24 * 60 * 60 * 1000,
      onSettled: (data, error) => { data && error && console.log(error) },
    },
  },
})


export function ReactQueryClient({ children, persist }) {
  persist === true && persistQueryClient({ queryClient, persistor: createWebStoragePersistor({ storage: window.sessionStorage }), })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}


export const ReactQuery = {
  fetch: (queryName, method, url, userdata = null, debugSetting = false) => {
    XHRDebug(debugSetting)
    return queryClient.fetchQuery(queryName, async () => {
      const { data } = await axios(XHR(method, url, userdata))
      return data;
    })
  },
  data: (queryName) => { return queryClient.getQueryData(queryName) },
  clear: () => queryClient.clear()
}


export function useReactQuery(queryName, method, url, userdata = null, debugSetting = false) {
  XHRDebug(debugSetting)
  return useQuery(queryName, async () => {
    const { data } = await axios(XHR(method, url, userdata))
    return data;
  });
}


export function useReactQueryData(queryName, debugSetting = false) {
  XHRDebug(debugSetting)
  const query = useQueryClient()
  return {
    fetch: query.fetchQuery(queryName),
    data: query.getQueryData(queryName),
    clear: query.clear()
  }
}



