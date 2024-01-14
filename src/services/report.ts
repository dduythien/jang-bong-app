import request from '../utils/request';
import { API } from '../../@types/model';

export const getEnergyAuditReportService = (
  params: MODEL.IEnergyAuditReportParams,
): Promise<API.IAPIResponse<MODEL.IEnergyAuditReport[]>> => {
  const { month, reportType, year, period } = params;
  return request(
    `https://jangpong.vn/api/EnergyAudit/EnergyAuditReport?Month=${month}&ReportType=${reportType}&Year=${year}${
      period !== 0 ? `&Period=${period}` : ''
    }`,
    {
      method: 'GET',
    },
  );
};
