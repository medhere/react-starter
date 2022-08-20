
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LinearProgress } from '@mui/material';
import { ScrollToTop } from '../app/scroll';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';


export default function Loadables({children}){
  return(
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {console.log('app reset')}}>
        <Suspense fallback={<LinearProgress color="success" />}>
            <ScrollToTop/>
            <AxiousUI>
              {children}
            </AxiousUI>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

function ErrorFallback ({ error, resetErrorBoundary }) {
  return (
    <div className='text-center mx-auto mt-[20vh]'>
      <p>Something went wrong:</p><pre>{error.message}</pre>
      <button className='btn' onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};


function AxiousUI({children}){
  const [axiosState, setAxiosState] = useState(false)
  const [loadingtext, setLoadingtext] = useState('Please Wait...')
  const [spinner, setSpinner] = useState(true)

  axios.interceptors.request.use(
    (req) => {
      setSpinner(true)
      setAxiosState(true)
      setLoadingtext('Please Wait...')
      return req;
    },
    (err) => { 
      setSpinner(true)
      setAxiosState(false)
      setLoadingtext('Please Wait...')
      return Promise.reject(err) } 
  );
  
  axios.interceptors.response.use(
    (res) => {
      setSpinner(true)
      setAxiosState(false)
      setLoadingtext('Please Wait...')
      return res;
    },
    (err) => { 
      setSpinner(false)
      setAxiosState(false)
      setLoadingtext('Server Error! Reload Page')      
      return Promise.reject(err) 
    }
  );
  
  return(
    <LoadingOverlay active={axiosState} fadeSpeed={100} spinner={spinner} text={loadingtext} styles={{
      overlay: (base) => ({ ...base, background: 'rgba(0, 0, 128, 0.8)', height: '93vh' })
    }}>
      {children}
    </LoadingOverlay>
  )
}
