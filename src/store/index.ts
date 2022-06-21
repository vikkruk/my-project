import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import mainReducer from './main-reducer';

const combinedEnhancers = compose(applyMiddleware(thunk), composeWithDevTools());

const store = createStore(mainReducer, combinedEnhancers);

export default store;
