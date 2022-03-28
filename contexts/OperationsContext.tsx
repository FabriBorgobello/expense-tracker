/** Operation CRUD handler
 * It creates a context, a provider and a consumer hook for CRUD operations.
 *
 * Stores the operations's list in the 'operations' state
 * and the specific element in the 'operation' state.
 *
 * Stores GET's errors in the error/operationError states.
 *
 * Provides functions to perform GET, POST, PUT and DELETE operations
 * and update the state directly without having to recall the GET function.
 */

import * as React from 'react';

import invariant from 'tiny-invariant';

import api from '@/api';
import { Operation } from '@/types';
import { checkIfObjectIsEmpty } from '@/utils';

interface ContextInterface {
  operations: Operation[];
  error: Error | null;
  status: StatusType;

  postOperation: (body: any) => Promise<any>;
  putOperation: (id: number, body: any) => Promise<any>;
  deleteOperation: (id: number) => Promise<any>;
}

interface ProviderProps {
  children: React.ReactNode;
}

type StatusType = 'idle' | 'pending' | 'success' | 'error';

const OperationsContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
);
OperationsContext.displayName = 'OperationsContext';

export const OperationsProvider = ({ children }: ProviderProps) => {
  const [operations, setOperations] = React.useState<Operation[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [status, setStatus] = React.useState<StatusType>('idle');

  /* Get all elements as soon as the component is mounted */
  React.useEffect(() => {
    const getOperations = async () => {
      setStatus('pending');
      setError(null);
      setOperations([]);

      try {
        const response = await api.get('/operations');
        setOperations(response.data);
        setStatus('success');
      } catch (err) {
        invariant(err instanceof Error, 'err must be an Error');
        setError(err);
        setStatus('error');
      }
    };
    getOperations();
  }, []);

  /* Create an element and add it to the list */
  const postOperation = React.useCallback(async (body: any) => {
    try {
      const response = await api.post('/operations', body);
      setOperations((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      invariant(err instanceof Error, 'err must be an Error');
      throw err;
    }
  }, []);

  /* Update an element and add it to the list */
  const putOperation = React.useCallback(async (id: number, body: any) => {
    try {
      const response = await api.put(`/operations/${id}`, body);
      setOperations((prev) =>
        prev.map((element: Operation) =>
          element.id === id ? response.data : element,
        ),
      );
      return response.data;
    } catch (err) {
      invariant(err instanceof Error, 'err must be an Error');
      throw err;
    }
  }, []);

  /* Delete an element and remove it from the list */
  const deleteOperation = React.useCallback(async (id: number) => {
    try {
      const response = await api.delete(`/operations/${id}`);
      setOperations((prev) =>
        prev.filter((element: Operation) => element.id !== id),
      );
      return response.data;
    } catch (err) {
      invariant(err instanceof Error, 'err must be an Error');
      throw err;
    }
  }, []);

  const value = {
    //   LIST
    operations,
    error,
    status,

    //  ACTIONS
    postOperation,
    putOperation,
    deleteOperation,
  };

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
};
export const useOperations = () => {
  const context = React.useContext(OperationsContext);
  if (checkIfObjectIsEmpty(context)) {
    throw new Error('useOperations must be used within OperationsProvider');
  }

  return context;
};
