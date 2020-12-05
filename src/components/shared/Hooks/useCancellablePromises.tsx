import React, { useRef } from 'react';

const useCancellablePromises = () => {
  const pendingPromises = useRef([]);

  const appendPendingPromise = (promise: any) =>
    (pendingPromises.current = [...pendingPromises.current, promise]);

  const removePendingPromise = (promise: any) =>
    (pendingPromises.current = pendingPromises.current.filter((p) => p !== promise));

  const clearPendingPromises = () => pendingPromises.current.map((p) => p.cancel());

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };

  return api;
};

export default useCancellablePromises;
