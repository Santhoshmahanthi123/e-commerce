import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
// import Navigation from './Navigation';

ReactDOM.render( <BrowserRouter>
    <div>
       <Route path = "/" component = {App} />
     </div>
 </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
