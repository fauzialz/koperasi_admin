import React, { Component } from 'react';
import './App.css';
import { RouterTierOne } from './Router';
import { ProviderScope, AppContext } from './global';
import { LoadingBig, LoadingMini } from './components/loading';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ProviderScope>

          <AppContext.Consumer>
            {context => (
              <React.Fragment>
                {context.loading && <LoadingBig />}
                {context.loadingMini && <LoadingMini />}
              </React.Fragment>
            )}
          </AppContext.Consumer>

          <RouterTierOne />
        </ProviderScope>
      </React.Fragment>
    );
  }
}

export default App;
