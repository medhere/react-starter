import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazyWithPreload } from './app/lazyWithPreload';
import { Notifications } from './app/notification';
import { Nav } from './components/Nav';
import { IonicPage } from './pages/Ionic';
import { setupIonicReact } from '@ionic/react';

setupIonicReact({
  mode: 'md'
});

const Loadables = lazyWithPreload(() => import(/* webpackMode: "lazy" *//* webpackPrefetch: true */ './components/Loadables'));

export default function App() {

  return(
    
    <BrowserRouter>
        <Loadables>
        <Notifications/>
        <Routes>
          <Route path='/' element={<IonicPage/>}></Route>            
          <Route path='/admin' element={<Nav/>} >
            <Route index element={<>Index Admin</>}/>
            <Route path=':id' element={<>Route</>}/>
          </Route>
          <Route path='*' element={<>No route found</>}></Route>
        </Routes>
        </Loadables>
    </BrowserRouter>
  )
}
