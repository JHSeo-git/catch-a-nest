import { toast, ToastOptions } from 'react-toastify';

type NotifyType = 'info' | 'success' | 'error';

export default function useAppToast() {
  const notify = (
    text: string,
    notifyType?: NotifyType,
    options?: ToastOptions
  ) => {
    if (notifyType === 'info')
      return toast.info(text, {
        toastId: text,
        ...options,
      });
    else if (notifyType === 'error')
      return toast.error(text, {
        toastId: text,
        ...options,
      });
    else if (notifyType === 'success')
      return toast.success(text, {
        toastId: text,
        ...options,
      });

    return toast(text, {
      toastId: text,
      ...options,
    });
  };

  const clearAllToast = () => toast.dismiss();

  return { notify, clearAllToast };
}
