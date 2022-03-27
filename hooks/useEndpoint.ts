import * as React from 'react';

import invariant from 'tiny-invariant';

import api from '@/api';
import { ReqOptions } from '@/types';

const useEndpoint = (
  endpoint: string,
  options: ReqOptions = {
    method: 'get',
    params: {},
    immediate: true,
    onSuccess: () => {},
    onError: () => {},
  },
) => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [status, setStatus] = React.useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const { method = 'get', params, immediate, onSuccess, onError } = options;

  const execute = React.useCallback(
    async (body = {}) => {
      setData(null);
      setError(null);
      setStatus('pending');
      try {
        let response;
        if (method === 'get' || method === 'delete') {
          response = await api.get(endpoint, { params });
        } else {
          response = await api[method](endpoint, body, { params });
        }
        setData(response.data);
        setStatus('success');
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err) {
        invariant(err instanceof Error, 'err must be an Error');
        setError(err);
        setStatus('error');
        if (onError) {
          onError(err);
        }
      }
    },
    [endpoint, method, onError, onSuccess, params],
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
