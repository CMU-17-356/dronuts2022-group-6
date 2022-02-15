import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {CssBaseline} from '@geist-ui/react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import HomeComponent from './components/pages/home';
import AboutComponent from './components/pages/about';
import ExploreComponent from './components/pages/explore';
import CheckoutComponent from './components/pages/checkout';
import ConfirmationComponent from './components/pages/confirmation';


ReactDOM.render(
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="about" element={<AboutComponent />} />
        <Route path="explore" element={<ExploreComponent />} />
        <Route path="checkout" element={<CheckoutComponent />} />
        <Route path="confirmation" element={<ConfirmationComponent />}/>
      </Routes>
    </Router>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
