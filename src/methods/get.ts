import { isEmpty } from 'lodash';
import { RequesterConfig, RequesterResponse, RequesterUrlParameter } from '../types';
import sendRequest from '../utils/send-request';
import prepareParameters from '../utils/prepare-parameters';
import { HttpMethods } from '../types';
import Logger from '../utils/logger';

export default async (
  urlOrConfig: RequesterUrlParameter = {},
  requestConfig: RequesterConfig = {},
  initialConfig: RequesterConfig = {}
): Promise<RequesterResponse> => {
  const config = prepareParameters(urlOrConfig, requestConfig, initialConfig);
  if (config.payload && !isEmpty(config?.payload)) {
    Logger.warn('You are passing body to GET request. Are you sure?');
  }
  return await sendRequest(HttpMethods.GET, config);
};
