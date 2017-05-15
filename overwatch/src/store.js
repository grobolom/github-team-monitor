import { createStore, applyMiddleware } from 'redux';
import rootReducer from  './reducers/root.js';
import thunkMiddleware from 'redux-thunk'

export default (initialState) => {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
        thunkMiddleware
      )
    );
}
