import React, { useMemo } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const DongBangKeNoiTinh: React.FC = (): JSX.Element => {
  const [modalCreateNew, setmodalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();

  function toggle(): void {
    setmodalCreateNew(!modalCreateNew);
  }

  function renderModal(): JSX.Element {
    return (
      <Modal isOpen={modalCreateNew} toggle={toggle} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggle}>{t('Tạo bảng kê nội tỉnh')}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{t('Bưu cục đến')}</Label>
            <Input type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>{t('Ghi chú')}</Label>
            <Input type="textarea" placeholder={t('Nhập ghi chú')} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('Ghi lại')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: t('Mã bảng kê'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'DES_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Người nhập'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ngày nhập'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <Button>
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng bảng kê nội tỉnh')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tìm kiếm bảng kê')} />
          </div>
          <Button onClick={toggle}>
            <i className="fa fa-plus" />
            {t('Tạo bảng kê nội tỉnh')}
          </Button>
          {renderModal()}
        </div>
      </Row>
      <p className="text-right">
        {t('Tổng số')}: <span>56</span>
      </p>
      <Row className="mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={[]} />
      </Row>
    </>
  );
};

export default DongBangKeNoiTinh;
