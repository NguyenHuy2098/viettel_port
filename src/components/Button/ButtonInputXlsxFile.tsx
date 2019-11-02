import React, { FormEvent, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { defaultTo, get, isFunction, isNil } from 'lodash';
import XLSX, { WorkBook } from 'xlsx';

interface Props {
  children?: React.ReactNode;
  extension: 'xlsx';
  leftIcon?: React.ReactNode;
  onChange?: (data: WorkBook) => void;
  isConfirm: boolean;
}

// eslint-disable-next-line max-lines-per-function
const ButtonInputXlsxFile = (props: Props): JSX.Element => {
  const { children, extension, leftIcon, onChange, isConfirm } = props;
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOverrideConfirmModal(false);
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

  const [overrideConfirmModal, setOverrideConfirmModal] = useState<boolean>(false);

  function toggleOverrideConfirmModal(): void {
    setOverrideConfirmModal(!overrideConfirmModal);
  }

  function handleConfirmOverride(e: FormEvent): void {
    toggleOverrideConfirmModal();
  }

  return (
    <>
      <Input
        accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        className="hide"
        id="xlsx-input"
        onChange={handleChange}
        type="file"
      />
      {isConfirm ? (
        <button className="btn btn-primary ml-2 mb-0 cursor-pointer" onClick={handleConfirmOverride}>
          {defaultTo(leftIcon, <i className="fa fa-upload mr-2" />)}
          {defaultTo(children, t('Tải lên'))}
        </button>
      ) : (
        <Label htmlFor="xlsx-input" className="btn btn-primary ml-2 mb-0 cursor-pointer">
          {defaultTo(leftIcon, <i className="fa fa-upload mr-2" />)}
          {defaultTo(children, t('Tải lên'))}
        </Label>
      )}

      <Modal isOpen={overrideConfirmModal} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggleOverrideConfirmModal}>{t('Xác nhận')}</ModalHeader>
        <ModalBody>
          <p>{t('Dữ liệu hiện tại sẽ bị mất, bạn có muốn tiếp tục?')}</p>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <Label htmlFor="xlsx-input" className="mb-0 btn btn-primary">
            {t('Tải lên')}
          </Label>
          <Button onClick={toggleOverrideConfirmModal}>{t('Hủy')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonInputXlsxFile;
