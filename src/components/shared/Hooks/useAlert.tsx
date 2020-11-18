import { useState } from 'react';

export interface useAlertProps {
  message: string;
  status: string;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<useAlertProps>();
  const unMountAlert = () => {
    setAlert(null);
  };

  return [alert, setAlert, unMountAlert] as const;
};
