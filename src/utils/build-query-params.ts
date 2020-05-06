import { isEmpty } from 'lodash';

function queryObjectToString(params: {}): string {
  const propToQueryParam = (prop: any): string => `${prop[0]}=${encodeURIComponent(prop[1])}`;
  const unwrappedParams = Object.entries(params);
  return unwrappedParams.map(propToQueryParam).join('&');
}

export default (params: {}): string => {
  if (isEmpty(params)) {
    return '';
  }
  return `?${queryObjectToString(params)}`;
};
