import React from 'react';
import { Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { defaultTo, get, isFunction, isNil } from 'lodash';
import XLSX, { WorkBook } from 'xlsx';

interface Props {
  children?: React.ReactNode;
  extension: 'xlsx';
  leftIcon?: React.ReactNode;
  onChange?: (data: WorkBook) => void;
}

const ButtonInputXlsxFile = (props: Props): JSX.Element => {
  const { children, extension, leftIcon, onChange } = props;
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      const data = new Uint8Array(get(event, 'target.result'));
      let workbook;

      if (extension === 'xlsx') {
        workbook = XLSX.read(data, { type: 'array' });
      }

      if (isFunction(onChange) && !isNil(workbook)) {
        onChange(workbook);
      }
    };
    reader.readAsArrayBuffer(get(event, 'target.files[0]'));
  };

  return (
    <>
      <Input className="hide" id="xlsx-input" onChange={handleChange} type="file" />
      <Label className="btn btn-primary ml-2 mb-0" htmlFor="xlsx-input">
        {defaultTo(leftIcon, <i className="fa fa-upload mr-2" />)}
        {defaultTo(children, t('Tải lên'))}
      </Label>
    </>
  );
};

export default ButtonInputXlsxFile;
