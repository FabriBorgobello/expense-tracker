import { Method } from 'axios';
import useAxios from 'axios-hooks';
import { URL_BASE } from '../constants';

export const useAxiosManual = (
  url: string,
  method: Method = 'GET',
  payload: any = {},
) => {
  const handlers = useAxios(
    {
      url: `${URL_BASE}${url}`,
      method: method,
      data: payload,
    },
    { manual: true },
  );

  return handlers;
};
