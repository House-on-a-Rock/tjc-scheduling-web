import { useState } from 'react';

export interface useAlertProps {
  message: string;
  status: string;
}

// this became unnecessary for now, but i'll leave it in case
export const useAlert = () => {
  const [alert, setAlert] = useState<useAlertProps>();

  return [alert, setAlert] as const;
};
