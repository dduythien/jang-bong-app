import request from '../utils/request';
import { API, MODEL } from '../../@types/model';

export const authenticateService = (
  params: API.IAuthenticateParams,
): Promise<API.IAPIResponse<MODEL.IAuthenticate>> =>
  request('https://jangpong.vn/api/Auth/login', {
    method: 'POST',
    data: params,
  });
