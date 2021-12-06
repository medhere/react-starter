import { useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';


export function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {window.scrollTo(0, 0)}, [pathname]);
    return null;
}


export function PrivateRoute({element, path}){
    const loggedin=useGetState(['isLogged']);
    const ele = loggedin === true ? element : <Redirect to='/lol'/>;
    return <Route path={path}>{ele}</Route>
  }

export function PrivateRoute2 ({ children, ...rest }) {
    const loggedin=useGetState(['isLogged']);
    return (<Route {...rest} render={() => {return loggedin === true ? children : <Redirect to='/lol' />}} />)
  }

export function PrivateRoute3({ children, ...rest }) {
    const loggedin=useGetState(['isLogged']);
    return (
      <Route {...rest} render={({location})=> loggedin ? children : <Redirect to={{pathname: "/lol", state: { from: location }}}/>} />
    )
    //    const { state } = useLocation(); if (redirectToReferrer === true) { return <Redirect to={state?.from || '/'} />}
    // use for redirection to initial protected route
  }

  {/* {loggedin ? <Route path="/admin"><Admin /></Route>:''} */}
  {/* <PrivateRoute2 path="/admin"><Admin/></PrivateRoute2> */}
  {/* <PrivateRoute3 path="/admin"><Admin/></PrivateRoute3> */}
  {/* <PrivateRoute element={<Admin/>} path="/admin" /> */}


