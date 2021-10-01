import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import reducer from '../reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Logs all actions and states after they are dispatched.
const logger = store => next => action => {
  if (__DEV__) {
    console.group(action.type);
    console.info('dispatching', action);
  }
  let result = next(action);
  if (__DEV__) {
    console.log('next state', store.getState());
    console.groupEnd(); // comment this console in build
  }
  return result;
};

const config = {
  key: 'root', // key is required
  storage: AsyncStorage, // storage is now required
  blacklist: ['SampleReducer'],
  whitelist: [],
};

const reducers = persistReducer(config, reducer);

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        thunk,
        logger,
        // crashReporter
      ),
    ),
  );
  let persistor = persistStore(store);
  // persistor.purge();
  return {store, persistor};
}
