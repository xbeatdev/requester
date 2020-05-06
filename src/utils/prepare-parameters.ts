import { RequesterConfig } from '../types';
import { DEFAULT_REQUESTER_CONFIG } from '../constants';
import { merge } from 'lodash';

export default (
  urlOrConfig: string | RequesterConfig = {},
  config: RequesterConfig = {},
  initialConfig: RequesterConfig = {}
): RequesterConfig => {
  let requestConfig: any = {};
  switch (typeof urlOrConfig) {
    case 'string': {
      requestConfig.url = urlOrConfig;
      requestConfig = merge(config, requestConfig);
      break;
    }
    case 'object': {
      requestConfig = merge(config, urlOrConfig);
      break;
    }
  }

  requestConfig = merge(initialConfig, requestConfig);

  return merge({ ...DEFAULT_REQUESTER_CONFIG }, requestConfig);
};
