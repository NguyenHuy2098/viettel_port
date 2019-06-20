import { useState } from 'react';

export interface FormInputType {
  value: any;
  onChange: Function;
}

function useFormInput(initialValue: any): FormInputType {
  const [value, setValue] = useState(initialValue);
  function handleChange(e: React.MouseEvent): void {
    setValue(e.currentTarget.nodeValue);
  }
  return {
    value,
    onChange: handleChange,
  };
}

export default useFormInput;
