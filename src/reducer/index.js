import {combineReducers} from 'redux';
// import { USER_LOGOUT } from '../actionConstant';
import SampleReducer from './SampleReducer';

const appReducer = combineReducers({
  SampleReducer,
});

const rootReducer = (state, action) => {
  //   if (action.type === USER_LOGOUT) {
  //     state = {};
  //   }
  return appReducer(state, action);
};

export default rootReducer;
