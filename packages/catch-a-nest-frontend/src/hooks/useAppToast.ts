import React from 'react';
import { toast } from 'react-toastify';

type NotifyType = 'info' | 'success' | 'error';

export default function useAppToast() {
  const notify = (text: string, notifyType?: NotifyType) => {
    if (notifyType === 'info') return toast.info(text);
    else if (notifyType === 'error') return toast.error(text);
    else if (notifyType === 'success') return toast.success(text);

    return () => toast(text);
  };

  const clearAllToast = () => toast.dismiss();

  return { notify, clearAllToast };
}
