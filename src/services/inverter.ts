import request from '../utils/request';
import { API, MODEL } from '../../@types/model';

export const getListInverterService = (): Promise<
  API.IAPIResponse<API.IPaging<MODEL.IItemInverter>>
> =>
  request(
    'https://jangpong.vn/api/Inverter/GetAll?pageIndex=1&pageSize=10000',
    {
      method: 'GET',
    },
  );

export const getInverterRoutineService = (
  params: MODEL.IQueryRoutine,
): Promise<API.IAPIResponse<MODEL.IInverterRountineDetail>> =>
  request(
    `https://jangpong.vn/api/InverterRoutine?InputCreatedOn=${params.createOn}&InverterId=${params.inverterId}`,
    {
      method: 'GET',
    },
  );

export const updateInverterRoutineService = (
  params: MODEL.IUpdateInverterRoutineParams,
): Promise<API.IAPIResponse<boolean>> =>
  request(`https://jangpong.vn/api/InverterRoutine`, {
    method: 'PUT',
    data: params,
  });
