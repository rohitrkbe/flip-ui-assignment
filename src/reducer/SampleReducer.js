import {TRANSACTION_LIST_RESPONSE} from '../constant/ActionConstants';

const initialState = {
  transactionList: [],
  transactionListLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_LIST_RESPONSE:
      let tempList = [];
      if (action.data && action.data !== 'error') {
        Object.keys(action.data).forEach(function (key) {
          tempList.push(action.data[key]);
        });
      } else {
        tempList = 'error';
      }
      return {
        transactionList: tempList,
        transactionListLoaded: true,
      };
    default:
      return state;
  }
};
