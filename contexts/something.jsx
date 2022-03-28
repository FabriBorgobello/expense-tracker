/** Operations CRUD handler
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

import api from '@/api';

const OperationsContext = React.createContext({});
OperationsContext.displayName = 'OperationsContext';

export const OperationsProvider = ({ children }) => {
  const [operations, setOperations] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState('idle');

  const [operation, setOperation] = React.useState(null);
  const [operationError, setOperationError] = React.useState(null);
  const [operationStatus, setOperationStatus] = React.useState('idle');

  /* Get all elements */
  const getOperations = React.useCallback(async () => {
    setStatus('pending');
    setError(null);
    setOperations([]);

    try {
      const response = await api.get('/operations');
      setOperations(response.data);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  /* Get an specific element */
  const getOperationsById = React.useCallback(async (id) => {
    setOperationStatus('pending');
    setOperationError(null);
    setOperation(null);

    try {
      const response = await api.get(`/operations/${id}`);
      setOperation(response.data);
      setOperationStatus('success');
    } catch (err) {
      setOperationError(err);
      setOperationStatus('error');
    }
  }, []);

  /* Create an element and add it to the list */
  const postOperations = React.useCallback(
    async (body) => {
      try {
        const response = await api.post('/operations', body);
        setOperations([...operations, response.data]);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    [operations],
  );

  /* Update an element and add it to the list */
  const putOperations = React.useCallback(
    async (id, body) => {
      try {
        const response = await api.put(`/operations/${id}`, body);
        setOperations(
          operations.map((element) =>
            element.id === id ? response.data : element,
          ),
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    [operations],
  );

  /* Delete an element and remove it from the list */
  const deleteOperations = React.useCallback(
    async (id) => {
      try {
        const response = await api.delete(`/operations/${id}`);
        setOperations(operations.filter((element) => element.id !== id));
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    [operations],
  );

  /* Deselect entity (to be used as soon as the entity detail component is unmounted) */
  const deselectOperation = React.useCallback(() => {
    setOperation(null);
    setOperationStatus('idle');
    setOperationError(null);
  }, []);

  const value = {
    //   LIST
    operations,
    error,
    status,

    //  ENTITY
    operation,
    operationError,
    operationStatus,

    //  ACTIONS
    getOperations,
    getOperationsById,
    postOperations,
    putOperations,
    deleteOperations,
    deselectOperation,
  };

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
};
export const useOperations = () => {
  const context = React.useContext(OperationsContext);
  if (!context) {
    throw new Error('useOperations must be used within OperationsProvider');
  }

  return context;
};
