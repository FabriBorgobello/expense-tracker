import { Method } from '@/types';
import axios from 'axios';
import * as React from 'react';
import api from '../api';

const useEndpoint = (
  method: Method,
  endpoint: string,
  params: Object = {},
  immediate: boolean = true,
) => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [status, setStatus] = React.useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');

  const execute = React.useCallback(
    async (body = {}) => {
      setData(null);
      setError(null);
      setStatus('pending');
      try {
        let response;
        if (method === 'get') {
          response = await api.get(endpoint, { params });
        } else {
          response = await api[method](endpoint, body, { params });
        }
        console.log('Params', params);
        console.log(response);
        setData(response.data);
        setStatus('success');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
          setStatus('error');
        }
      }
    },
    [endpoint, method, params],
  );

  React.useEffect(() => {
    if (immediate) {
      execute(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    error,
    status,
    execute,
  };
};

export default useEndpoint;
