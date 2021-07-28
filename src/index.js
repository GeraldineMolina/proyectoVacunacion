import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import firebaseConfig from './firebase-config'

ReactDOM.render(
  (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={'Conectando la app...'}>
    <App />
    </Suspense>
    </FirebaseAppProvider>
    
  ), document.getElementById('root')
);


