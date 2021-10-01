import BaseAPI from '../api/BaseAPI';
import {TRANSACTION_LIST_API} from '../constant/ApiConstants';
import {TransactionListResponseAction} from '../actions/SampleAction';

export const GetTransactionListFromAPI = data => {
  return dispatch => {
    let option = {};
    BaseAPI.get(TRANSACTION_LIST_API, option)
      .then(response => {
        if (response.status === 200) {
          dispatch(TransactionListResponseAction(response.data));
        }
      })
      .catch(err => {
        console.log('error', err);
        dispatch(TransactionListResponseAction('error'));
      });
  };
};
