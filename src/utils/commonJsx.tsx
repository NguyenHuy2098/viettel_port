import { toast } from 'react-toastify';
import React from 'react';

export function toastError(message: string): void {
  toast(
    <>
      <i className="fa fa-window-close-o mr-2" />
      {message}
    </>,
    {
      containerId: 'ModalDivideConpon',
      type: 'error',
    },
  );
}
