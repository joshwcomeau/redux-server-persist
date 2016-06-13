import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import persistState from '../../src/client/persist-state';
import reducer from './sample-redux-bits';

export default function createEnhancedStore(persistStateConfig = {}) {
  const middlewares = [
    thunkMiddleware,
  ];

  const store = createStore(
    reducer,
    compose(
      persistState(persistStateConfig),
      applyMiddleware.apply(this, middlewares)
    )
  );

  return store;
}
