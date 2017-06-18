import { createStore, applyMiddleware } from 'redux';
import rootReducer from  './reducers/root.js';
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

export default (initialState) => {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
        thunkMiddleware,
        logger
      )
    );
}
