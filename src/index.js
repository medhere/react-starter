import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { store } from './data/reduxStore';
import { Provider } from 'react-redux';
import { ConfirmProvider } from 'material-ui-confirm';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
// import './ionic.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root'))
  .render(
      <Provider store={store}>
          <ConfirmProvider>
            <App/>
          </ConfirmProvider>
      </Provider>
  )


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.uegister();
defineCustomElements(window);
