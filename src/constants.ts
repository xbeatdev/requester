import { RequesterConfig, RequesterResponse, HttpMethods, ResponseType } from './types';

export const DEFAULT_REQUESTER_CONFIG: RequesterConfig = {
  url: '',
  method: HttpMethods.GET,
  baseUrl: location.origin,
  responseType: ResponseType.JSON,
  params: {},
  payload: null,
  headers: {},
  auth: {
    username: '',
    password: ''
  },
  cache: false,
  authRequired: false
};

export const MILLISECONDS_IN_SECOND = 1000;

export class RequesterError extends Error {
  requester: any;
  constructor(requester: RequesterResponse) {
    super(`Request failed with error ${requester.status}`);
    this.name = 'Requester Error';
    this.requester = requester;
  }
}
