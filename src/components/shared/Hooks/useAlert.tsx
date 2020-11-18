import React, { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState<{ message: string; status: string }>();
  const unMountAlert = () => {
    setAlert(null);
  };

  return [alert, setAlert, unMountAlert];
};
