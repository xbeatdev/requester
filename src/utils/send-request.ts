import { RequesterConfig, RequesterPromise, HttpMethods, HttpMethodsType } from '../types';
import buildUrl from '../utils/build-url';
import buildHeaders from '../utils/build-headers';
import handleRequest from './handle-request';

const setRequestHeaders = (xhr: XMLHttpRequest, headers: any): void => {
  const unwrappedHeaders = Object.entries(headers);
  if (!unwrappedHeaders.length) return;
  const setHeader = (header: any): void => xhr.setRequestHeader(header[0], header[1]);
  unwrappedHeaders.map(setHeader);
};

export default (
  method: HttpMethodsType = HttpMethods.GET,
  config: RequesterConfig
): RequesterPromise => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const headers = buildHeaders(config);
    const url = buildUrl(config);
    const authParams = config.authRequired
      ? [config.auth!.username, config.auth!.password]
      : [null, null];
    const benchmarkStart = Date.now();
    xhr.open(method, url, true, ...authParams);
    setRequestHeaders(xhr, headers);
    xhr.send(config.payload);

    xhr.onreadystatechange = handleRequest(
      xhr,
      {
        url,
        config,
        headers,
        benchmarkStart
      },
      { resolve, reject }
    );

    xhr.onerror = (info) => {
      reject({ url, config, headers });
    };
  });
};
