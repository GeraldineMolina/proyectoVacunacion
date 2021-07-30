import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <firebase firebase={firebase}>
      <Suspense fallback={'Conectando la app..'}>
        <App />
      </Suspense>
  </firebase>,
  document.getElementById('root')
);



