import React, { useMemo, useState } from 'react';
import { Button, Row, Input, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const ModalThemPhieugui: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }
  const dataModal = [
    {
      TOR_ID_M: 4545,
      TO_LOG_M: 'abc',
      TO_NUMBER_M: 1,
      TO_WEIGHT_M: 1200,
    },
    {
      TOR_ID_M: 4545,
      TO_LOG_M: 'abc',
      TO_NUMBER_M: 1,
      TO_WEIGHT_M: 1200,
    },
  ];
  const columnsModal = useMemo(
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Label check>
                <Input type="checkbox" />
              </Label>
            </>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'TOR_ID_M',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'TO_LOG_M',
      },
      {
        Header: t('Số lượng'),
        accessor: 'TO_NUMBER_M',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'TO_WEIGHT_M',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-trash-o fa-lg color-red" />
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
      <Button onClick={toggle}>
        <i className="fa fa-plus" />
        Thêm phiếu gửi
      </Button>
      <Modal isOpen={modalCreateNew} toggle={toggle} className="sipModalAddPG">
        <ModalHeader toggle={toggle}>{t('Thêm phiếu gửi')}</ModalHeader>
        <ModalBody>
          <Row className="sipContentContainer">
            <Col lg={10} xs={12} className="p-0">
              <div className="d-flex">
                <div className="sipTitleRightBlockInput m-0">
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <i className="fa fa-search" />
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="text" placeholder={t('Quét mã phiếu gửi')} />
                </div>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <Button color="primary" className="ml-2">
                  {t('Tìm kiếm')}
                </Button>
              </div>
            </Col>
            <Col>
              <p className="text-right mt-2 mb-0">
                {/* eslint-disable-next-line react/jsx-max-depth */}
                {t('Tổng số')}: <span>1</span>
              </p>
            </Col>
          </Row>
          <Row className="sipContentContainer sipTableContainer sipTableModal p-0 shadow-lg">
            <DataTable columns={columnsModal} data={dataModal} />
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('Phân công')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default withRouter(ModalThemPhieugui);