import { ErrorBoundary } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <p>Something went wrong:</p><pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  );
};		

const MyComponent = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <div></div>			  
      </ErrorBoundary>
    </>
  );
};