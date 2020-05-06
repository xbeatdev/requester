import { RequesterConfig } from '../types';
import { getLastChar, getFirstChar, removeLastSlash, removeFirstSlash } from './helpers';
import buildQueryParams from './build-query-params';

export default ({ url, baseUrl, params }: RequesterConfig): string => {
  if (!url && !baseUrl) {
    throw new Error('URL not specified');
  }
  let combinedUrl = '';
  if (baseUrl) {
    combinedUrl = getLastChar(baseUrl) === '/' ? removeLastSlash(baseUrl) : baseUrl;
  }

  if (url) {
    const path = getFirstChar(url) === '/' ? removeFirstSlash(url) : url;
    combinedUrl += `/${path}`;
  }

  if (params) {
    combinedUrl += buildQueryParams(params);
  }

  return combinedUrl;
};
