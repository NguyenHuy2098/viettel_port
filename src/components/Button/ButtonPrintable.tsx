import React, { useState } from 'react';
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalProps,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { printHtml } from 'utils/print';

interface Props {
  btnCancelProps?: ButtonProps;
  btnPrintProps?: ButtonProps;
  btnProps?: ButtonProps;
  modalProps?: ModalProps;
  modalFooterProps?: ModalFooterProps;
  modalHeaderProps?: ModalHeaderProps;
  modalBodyProps?: ModalBodyProps;
}

// eslint-disable-next-line max-lines-per-function
const ButtonPrintable = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    btnCancelProps,
    btnPrintProps,
    btnProps,
    modalBodyProps,
    modalFooterProps,
    modalHeaderProps,
    modalProps,
  } = props;
  const defaultPrintableId = 'printableBody';
  const [visible, setVisible] = useState<boolean>(false);

  const handlePrint = (): void => {
    printHtml({
      printable: defaultPrintableId,
    });
  };

  const handleToggleShowModal = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setVisible(!visible);
  };

  const handleToggleVisible = (): void => {
    setVisible(!visible);
  };

  return (
    <>
      <Button title={get(btnProps, 'title')} onClick={handleToggleShowModal} {...btnProps} />
      <Modal isOpen={visible} size="xl" toggle={handleToggleVisible} {...modalProps}>
        <ModalHeader toggle={handleToggleVisible} {...modalHeaderProps}>
          {get(modalHeaderProps, 'children', 'Title')}
        </ModalHeader>
        <ModalBody id={defaultPrintableId} {...modalBodyProps}>
          {get(modalBodyProps, 'children', 'Printable content')}
        </ModalBody>
        <ModalFooter {...modalFooterProps}>
          <Button color="primary" onClick={handlePrint} size="lg" {...btnPrintProps}>
            {get(
              btnPrintProps,
              'children',
              <>
                <i className="fa fa-print" />
                {t(' ')}
                {t('In')}
              </>,
            )}
          </Button>
          <Button color="secondary" onClick={handleToggleVisible} size="lg" {...btnCancelProps}>
            {get(
              btnCancelProps,
              'children',
              <>
                <i className="fa fa-remove" />
                {t(' ')}
                {t('Huỷ')}
              </>,
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonPrintable;
