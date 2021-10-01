import axios from 'axios';
import {REST_END_POINT} from '../constant/ApiConstants';

const baseAxios = async options => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.header,
  };
  const baseUrl = REST_END_POINT;
  return axios.create({
    baseURL: baseUrl,
    timeout: options.timeout || 10000,
    headers: defaultHeaders,
  });
};

const executeRequest = async (method, pathname, data, options = {}) => {
  const body = !data ? {} : {data};
  const reqObj = {
    method,
    url: pathname,
    params: options,
    ...body,
  };
  console.log('BaseApi', reqObj);
  const baseAxiosRequest = await baseAxios(options);
  return new Promise((resolve, reject) => {
    return baseAxiosRequest
      .request(reqObj)
      .then(res => {
        console.log('Axios response', res);
        resolve(res);
      })
      .catch(error => {
        console.log('Axios error', error.response);
        reject(error);
      });
  });
};

export default {
  get(pathname, options) {
    return executeRequest('get', pathname, null, options);
  },

  post(pathname, data, options) {
    return executeRequest('post', pathname, data, options);
  },

  put(pathname, data, options) {
    return executeRequest('put', pathname, data, options);
  },

  patch(pathname, data, options) {
    return executeRequest('patch', pathname, data, options);
  },

  delete(pathname, data, options) {
    return executeRequest('delete', pathname, data, options);
  },

  all(promises) {
    return axios.all(promises);
  },
};
