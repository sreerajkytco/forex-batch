import { ApiRequest } from '../interfaces/api-request';
import axios from 'axios';

export class ApiProviderService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(apiCallConfig: ApiRequest): Promise<any> {
  // console.info('ApiProviderService::request')
    const { url, method, params, data, headers, auth, timeout } = apiCallConfig;
    const mandatoryHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const requestHeaders = { ...mandatoryHeaders, ...headers };
    const config = {
      method,
      headers: requestHeaders,
      data,
      params,
      url,
      auth,
      timeout: timeout || 3000,
    };

    if (auth) {
      config['auth'] = auth;
    }

    try {
      const response = await axios.request(config);
      
      return response;
    } catch (error) {
      if( error.response && error.response.data ){
        return error.response;
      }
     console.log(error);
     throw new Error(JSON.stringify(error));
    }
  }
}
