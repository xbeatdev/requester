import { RequesterConfig } from '../types';
import { buildBasicAuth } from './helpers';

export default ({ headers, cache, auth, authRequired }: RequesterConfig): {} => {
  const preparedHeaders: any = {};
  if (!cache) {
    preparedHeaders['Cache-Control'] = 'no-cache';
  }

  for (const header in headers) {
    preparedHeaders[header] = headers[header];
  }

  if (authRequired) {
    const basicAuth = buildBasicAuth(auth);
    preparedHeaders['Authorization'] = basicAuth;
  }

  return { ...preparedHeaders };
};
