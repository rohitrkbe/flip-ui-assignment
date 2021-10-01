import {TRANSACTION_LIST_RESPONSE} from '../constant/ActionConstants';

export const TransactionListResponseAction = payload => ({
  type: TRANSACTION_LIST_RESPONSE,
  data: payload,
});
