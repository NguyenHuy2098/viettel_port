import { toast, ToastContent, ToastId, ToastOptions } from 'react-toastify';

export const toastError = (content: ToastContent, options?: ToastOptions): ToastId => {
  options && delete options.type;
  return toast(content, {
    type: 'error',
    ...options,
  });
};

export const toastInfo = (content: ToastContent, options?: ToastOptions): ToastId => {
  options && delete options.type;
  return toast(content, {
    type: 'info',
    ...options,
  });
};

export const toastSuccess = (content: ToastContent, options?: ToastOptions): ToastId => {
  options && delete options.type;
  return toast(content, {
    type: 'success',
    ...options,
  });
};

export const toastWarning = (content: ToastContent, options?: ToastOptions): ToastId => {
  options && delete options.type;
  return toast(content, {
    type: 'warning',
    ...options,
  });
};
