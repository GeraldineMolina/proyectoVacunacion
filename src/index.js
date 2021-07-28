import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App';
import 'bootswatch/dist/united/bootstrap.min.css'
import firebase from './config/firebase'

ReactDOM.render(
  <firebase firebase={firebase}>
      <Suspense fallback={'Conectando la app..'}>
        <App />
      </Suspense>
  </firebase>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

export default firebase;