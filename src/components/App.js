import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Verify from './Verify';

class App extends React.PureComponent {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route
              path='/signin'
              component={Signin}
            />
            <Route
              path='/signup'
              component={Signup}
            />
            <Route
              path='/verify'
              component={Verify}
            />
            <Route
              path='/'
              component={Home}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
