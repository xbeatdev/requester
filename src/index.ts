import { RequesterConfig, RequesterResponse, RequesterUrlParameter } from './types';
import getMethod from './methods/get';
import postMethod from './methods/post';
import putMethod from './methods/put';
import patchMethod from './methods/patch';
import deleteMethod from './methods/delete';
import headMethod from './methods/head';
import optionMethod from './methods/option';
import customMethod from './methods/custom';

export default class Requester {
  constructor(private initialConfig: RequesterConfig = {}) {}

  async get(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await getMethod(urlOrConfig, config, this.initialConfig);
  }

  static async get(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await getMethod(urlOrConfig, config);
  }

  async post(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await postMethod(urlOrConfig, config, this.initialConfig);
  }

  static async post(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await postMethod(urlOrConfig, config);
  }

  async put(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await putMethod(urlOrConfig, config, this.initialConfig);
  }

  static async put(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await putMethod(urlOrConfig, config);
  }

  async delete(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await deleteMethod(urlOrConfig, config, this.initialConfig);
  }

  static async delete(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await deleteMethod(urlOrConfig, config);
  }

  async patch(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await patchMethod(urlOrConfig, config, this.initialConfig);
  }

  static async patch(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await patchMethod(urlOrConfig, config);
  }

  async head(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await headMethod(urlOrConfig, config, this.initialConfig);
  }

  static async head(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await headMethod(urlOrConfig, config);
  }

  async option(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await optionMethod(urlOrConfig, config, this.initialConfig);
  }

  static async option(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await optionMethod(urlOrConfig, config);
  }

  async custom(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await customMethod(urlOrConfig, config, this.initialConfig);
  }

  static async custom(
    urlOrConfig: RequesterUrlParameter = {},
    config: RequesterConfig = {}
  ): Promise<RequesterResponse> {
    return await customMethod(urlOrConfig, config);
  }
}
