import { Link, Route, useNavigate } from "react-router-dom"
import { userauth, userinfo } from "../stores/redux/reducers/user"
import { useSelector, useDispatch } from 'react-redux';

export const ProtectedRoute = ({ debug, user, perms, path, params, element }) =>{
    // const user = {
    //     auth: useSelector(userauth),
    //     perm: useSelector(userinfo).perm
    // }

    const nav = useNavigate()

    if (debug === true && params !== ''){
        return <Route path={path} children={<Route path={params} element={element} />} />
    }else if(debug === true  && params === ''){
        return <Route path={path} children={<Route index element={element} />} /> 
    }else{
        return null        
    }

    const userPermissions=perms.trim().split(',')
    if (user.auth !== true){
        nav('/signin')
    }

    if (userPermissions.includes(user.perm) && params !== ''){
        return <Route path={path} children={<Route path={params} element={element} />} />
    }else if(userPermissions.includes(user.perm) && params === ''){
        return <Route path={path} children={<Route index element={element} />} /> 
    }else{
        return null        
    }

}

export const ProtectedPath = ({debug, user, perms, to, children}) =>{
    if (debug === true){
        return  <Link to={to}> {children} </Link>
    }

    const userPermissions=perms.trim().split(',')
    if (user.auth === true && userPermissions.includes(user.perm)){
        return  <Link to={to}> {children} </Link>
    }
}

export const ProtectedComponent = ({debug, user, perms, children}) =>{
    if (debug === true){
        return  <> {children} </>
    }

    const userPermissions=perms.trim().split(',')
    if (user.auth !== true && userPermissions.includes(user.perm)){
        return  <> {children} </>
    }
}

export const useProtectedAuth = (user,perms) =>{
    const userPermissions=perms.trim().split(',')
    if (user.auth === true && userPermissions.includes(user.perm)){
        return true
    }else{
        return false
    }
}
