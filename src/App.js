import React, { Component } from 'react';
import './App.css';
import { RouterTierOne } from './Router';
import { ProviderScope } from './global';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ProviderScope>
          <RouterTierOne />
        </ProviderScope>
      </React.Fragment>
    );
  }
}

export default App;
