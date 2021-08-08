'use strict';
import axios from 'axios';
import { ALERT_TYPE, BASE_URL } from '../constants';
const CancelToken = axios.CancelToken;

let terminateAPI = null;
const CONTENT_TYPE = {
  FORM_DATA: 'form-data',
  URLENCODED: 'urlencoded',
};

export class Api {
  async _request(request) {
    const baseUrl = BASE_URL.LIVE;
    let options = {
      url: request.url,
      method: request.method ? request.method : 'get', // default
      baseURL: baseUrl,
      timeout: request.timeout == 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
      cancelToken: new CancelToken(function (cancel) { }),
    };

    if (request.auth) {
      options.auth = request.auth;
    }

    let optionsHeader;
    // const token = await Helper.getToken();
    // if (token) {
    //   const userToken = `Bearer ${token}`;
    //   optionsHeader = { Authorization: userToken };
    // }

    if (request.contentType) {
      if (request.contentType === CONTENT_TYPE.URLENCODED) {
        optionsHeader = {
          ...optionsHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        };
      } else if (request.contentType === CONTENT_TYPE.FORM_DATA) {
        optionsHeader = {
          ...optionsHeader,
          'Content-Type': 'multipart/form-data',
        };
      }
    }

    options.headers = { ...optionsHeader };

    if (request.params) {
      options.params = request.params;
    }

    if (request.data) {
      options.data = request.data;
    }

    const result = new axios.request(options);
    console.log(`REQUEST => `, options);
    return result;
  }

  singleRequest(request) {
    return new Promise(function (resolve, reject) {
      request
        .then(response => {
          console.log(` RESPONSE => `, response);
          resolve(response);
        })
        .catch(error => {
          const dataMessage = _handleError(error);
          reject(dataMessage);
        });
    });
  }

  requestMultiple(requests) {
    return new Promise(function (resolve, reject) {
      new axios.all(requests)
        .then(response => {
          console.log(`RESPONSE => `, response);
          resolve(response);
        })
        .catch(error => {
          const dataMessage = _handleError(error);
          reject(dataMessage);
        });
    });
  }

  async userGet() {
    return this._request({
      method: 'get',
      url: 'v1/user',
    });
  }

  async userAdd(args) {
    return this._request({
      method: 'post',
      url: 'v1/user',
      data: args,
    });
  }

  async userEdit(args) {
    return this._request({
      method: 'put',
      url: 'v1/user',
      data: args,
    });
  }

  async userDelete(args) {
    return this._request({
      method: 'delete',
      url: 'v1/user',
      data: args,
    });
  }

  async transactionGet(args) {
    return this._request({
      method: 'get',
      url: 'v1/transaction',
      params: args
    });
  }

  async transactionAdd(args) {
    return this._request({
      method: 'post',
      url: 'v1/transaction',
      data: args,
    });
  }

  async transactionTotalGetByUserId(args) {
    return this._request({
      method: 'get',
      url: 'v1/transaction/total/byUserId',
      params: args
    });
  }
}

function _handleError(error) {
  console.log(`ERROR => `, error?.response ?? null);
  const status = error?.response?.status ?? null;
  let message = null;
  if (error.response && error.response.data) {
    message = error.response.data.message;
  }
  if (status === 401) {
    message = '401';
  }
  if (status === 404) {
    message = 'Server not found';
  }
  if (status >= 500 || !message) {
    message = 'Oops! Something went wrong.\nPlease try again in a few minutes.';
  }

  const dataMessage = {
    message: message,
    type: ALERT_TYPE.ERROR,
    status: status,
  };
  return dataMessage;
}

const API = new Api();

export { API, terminateAPI };
