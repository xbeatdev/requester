export type HttpMethodsType = HttpMethods | string;
export type RequesterPromise<T = any> = Promise<RequesterResponse<T>>;
export type RequesterHeaders = RequestHeaders | any;
export type RequesterUrlParameter = string | RequesterConfig;
export type RequesterResponseType = ResponseType;

interface RequestHeaders {
  Authorization: string;
}

export enum ResponseType {
  JSON = 'json',
  TEXT = 'text'
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTION = 'OPTION'
}

interface RequesterAuthCredentials {
  username: string;
  password: string;
}

export interface RequesterTimeBenchmark {
  startTimestamp: number;
  endTimestamp: number;
  totalRequestTime: string;
}

export interface RequesterConfig {
  url?: string;
  method?: HttpMethods;
  baseUrl?: string;
  responseType?: RequesterResponseType;
  params?: any;
  payload?: any;
  headers?: RequesterHeaders;
  auth?: RequesterAuthCredentials | null;
  cache?: boolean;
  authRequired?: boolean;
}

export interface RequesterResponse<T = any> {
  status: number;
  timing: RequesterTimeBenchmark;
  config: RequesterConfig;
  requestHeaders: any;
  responseHeaders: any;
  responseData: T;
  url: string;
}
