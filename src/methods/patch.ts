import { RequesterConfig, RequesterResponse, RequesterUrlParameter } from '../types';
import sendRequest from '../utils/send-request';
import prepareParameters from '../utils/prepare-parameters';
import { HttpMethods } from '../types';

export default async (
  urlOrConfig: RequesterUrlParameter = {},
  requestConfig: RequesterConfig = {},
  initialConfig: RequesterConfig = {}
): Promise<RequesterResponse> => {
  const config = prepareParameters(urlOrConfig, requestConfig, initialConfig);
  return await sendRequest(HttpMethods.PATCH, config);
};
