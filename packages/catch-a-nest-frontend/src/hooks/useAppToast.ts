import { toast } from 'react-toastify';

type NotifyType = 'info' | 'success' | 'error';

export default function useAppToast() {
  const notify = (text: string, notifyType?: NotifyType) => {
    if (notifyType === 'info') return toast.info(text, { toastId: text });
    else if (notifyType === 'error')
      return toast.error(text, { toastId: text });
    else if (notifyType === 'success')
      return toast.success(text, { toastId: text });

    return () => toast(text, { toastId: text });
  };

  const clearAllToast = () => toast.dismiss();

  return { notify, clearAllToast };
}
