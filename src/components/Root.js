import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const Root = ({ initial = {}, children }) => {
  const store = createStore(
    reducers,
    initial,
    applyMiddleware(thunk)
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export { Root };
