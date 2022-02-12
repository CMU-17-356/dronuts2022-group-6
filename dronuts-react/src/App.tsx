import React from 'react';

import {Page} from '@geist-ui/react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import HomeComponent from './components/pages/home';
import NavComponent from './components/common/nav';
import AboutComponent from './components/pages/about';
import ExploreComponent from './components/pages/explore';

function App() {
  return (
    <Router>
      <NavComponent />
      <Page>
        <Page.Content>
          <Route path="/">
            <HomeComponent />
          </Route>
          <Route path="/about">
            <AboutComponent />
          </Route>
          <Route path="/explore">
            <ExploreComponent />
          </Route>
        </Page.Content>
      </Page>
    </Router>
  );
}

export default App;
