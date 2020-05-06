import { RequesterConfig, RequesterResponse, ResponseType, RequesterResponseType } from '../types';
import { buildBenchmark } from './helpers';
import Logger from './logger';
import { RequesterError } from '../constants';

const isRequestFailed = ({ status }: { status: number }): boolean => status <= 100 || status >= 400;

const parseResponseHeaders = (xhr: XMLHttpRequest): {} => {
  const newLinePattern = (): RegExp => /[\r\n]+/;
  const splitToKeyValue = (value: string): string[] => value.split(/: /);
  const compileHeaders = (headers: any, header: any): {} => {
    headers[header[0]] = header[1];
    return headers;
  };

  const headers = xhr.getAllResponseHeaders();

  return (
    headers &&
    headers.trim().split(newLinePattern()).map(splitToKeyValue).reduce(compileHeaders, {})
  );
};

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

export default (
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
