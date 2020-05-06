import { ResponseType, RequesterConfig, RequesterResponse, RequesterResponseType } from '../types';
import Logger from './logger';
import { buildBenchmark } from './helpers';
import { RequesterError } from '../constants';

const isRequestFailed = ({ status }: { status: number }): boolean => status >= 400;

const parseContent = (receivedData: string, contentType: RequesterResponseType): {} | string => {
  try {
    switch (contentType) {
      case ResponseType.JSON:
        return JSON.parse(receivedData);
      case ResponseType.TEXT:
        return receivedData;
      default:
        return JSON.parse(receivedData);
    }
  } catch (e) {
    Logger.warn('Can not convert response type to JSON. Text will be returned.');
    return contentType;
  }
};

const parseResponseHeaders = (xhr: XMLHttpRequest): {} => {
  const newLinePattern = (): RegExp => /[\r\n]+/;
  const splitToKeyValue = (value: string): string[] => value.split(/: /);
  const compileHeaders = (headers: any, header: any): {} => {
    headers[header[0]] = header[1];
    return headers;
  };

  return xhr
    .getAllResponseHeaders()
    .trim()
    .split(newLinePattern())
    .map(splitToKeyValue)
    .reduce(compileHeaders, {});
};

const buildResponse = (
  xhr: XMLHttpRequest,
  config: RequesterConfig,
  headers: any,
  timing: any,
  url: string
): RequesterResponse => {
  const requester: RequesterResponse = {
    status: xhr.status,
    timing: buildBenchmark(timing),
    responseHeaders: parseResponseHeaders(xhr),
    requestHeaders: headers,
    responseData: parseContent(xhr.responseText, config.responseType!),
    config,
    url
  };
  if (isRequestFailed(requester)) {
    throw new RequesterError(requester);
  }
  return requester;
};

export default (
  xhr: XMLHttpRequest,
  { config, headers, benchmarkStart, url }: any,
  { resolve, reject }: any
): (() => void) => {
  return (): void => {
    if (xhr.readyState === xhr.DONE) {
      try {
        const response = buildResponse(
          xhr,
          config,
          headers,
          {
            benchmarkStart,
            benchmarkEnd: Date.now()
          },
          url
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }
  };
};
