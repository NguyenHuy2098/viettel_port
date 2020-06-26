import React, { FormEvent, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { defaultTo, get, isFunction, isNil } from 'lodash';
import XLSX, { WorkBook } from 'xlsx';
import { toastError } from '../Toast';

interface Props {
  children?: React.ReactNode;
  extension: 'xlsx';
  leftIcon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (data: WorkBook, fileName: any) => void;
  shouldConfirm: boolean;
}

const v4options = {
  random: [0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36],
};

// eslint-disable-next-line max-lines-per-function
const ButtonInputXlsxFile = (props: Props): JSX.Element => {
  const { children, extension, leftIcon, onChange, shouldConfirm } = props;
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileName = get(event, 'target.files[0].name', '');
    const id = uuidv4(v4options);
    const infoExcel = {
      fileName: fileName,
      id: id,
    };
    setOverrideConfirmModal(false);
    try {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        const data = new Uint8Array(get(event, 'target.result'));
        let workbook;

        if (extension === 'xlsx') {
          workbook = XLSX.read(data, { type: 'array' });
        }

        if (isFunction(onChange) && !isNil(workbook)) {
          onChange(workbook, infoExcel);
        }
      };
      reader.readAsArrayBuffer(get(event, 'target.files[0]'));
    } catch (error) {
      toastError(error.message);
    } finally {
      // Allow continuously upload a same file
      event.target.value = '';
    }
  };

  const [overrideConfirmModal, setOverrideConfirmModal] = useState<boolean>(false);

  function toggleOverrideConfirmModal(): void {
    setOverrideConfirmModal(!overrideConfirmModal);
  }

  function handleConfirmOverride(event: FormEvent): void {
    if (shouldConfirm) {
      event.preventDefault();
      toggleOverrideConfirmModal();
    }
  }

  return (
    <>
      <Input
        accept=".xls,.xlsx,.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        className="hide"
        id="xlsx-input"
        onChange={handleChange}
        type="file"
      />
      <Label htmlFor="xlsx-input" className="btn btn-primary ml-2 mb-0 cursor-pointer" onClick={handleConfirmOverride}>
        {defaultTo(leftIcon, <i className="fa fa-upload mr-2" />)}
        {defaultTo(children, t('Tải lên'))}
      </Label>

      <Modal isOpen={overrideConfirmModal} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggleOverrideConfirmModal}>{t('Xác nhận')}</ModalHeader>
        <ModalBody>
          <p>{t('Dữ liệu hiện tại sẽ bị mất, bạn có muốn tiếp tục?')}</p>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <Label htmlFor="xlsx-input" className="mb-0 btn btn-primary" onClick={toggleOverrideConfirmModal}>
            {t('Tải lên')}
          </Label>
          <Button onClick={toggleOverrideConfirmModal}>{t('Hủy')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonInputXlsxFile;
