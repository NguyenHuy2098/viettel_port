import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Row, Table, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const LapBienBan: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalCreateNew, setModalCreateNew] = React.useState<boolean>(false);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  function renderTableThongTinBienBan(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <Table bordered>
          <thead>
            <tr>
              <th>Mã lỗi</th>
              <th>Ghi chú</th>
              <th>Điểm phạt cá nhân</th>
              <th>Điểm phạt GD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1007</td>
              <td>Phát bưu gửi chậm thời gian quy định</td>
              <td>10</td>
              <td>5</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  function renderTableDSPhieuGui(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <Table bordered>
          <thead>
            <tr>
              <th>Mã vận đơn</th>
              <th>Mã chuyển thư</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>515324586</td>
              <td>CT_371029_TTHNI</td>
              <td>Bưu phẩm được phân công ngày 11/04 chưa đi phát</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  function renderTableKetLuanBienBan(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <Table bordered>
          <thead>
            <tr>
              <th>Ngày kết luận</th>
              <th>Bưu cục kết luận</th>
              <th>Người kết luận</th>
              <th>Người phạm lỗi</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>14/04/2019</td>
              <td>KAH</td>
              <td>Nguyễn Mạnh Quang</td>
              <td>Đỗ Minh Tú</td>
              <td>Bưu phẩm được phân công ngày 11/04 chưa đi phát</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  function renderModal(): JSX.Element {
    return (
      <Modal isOpen={modalCreateNew} toggle={toggle} className="sipTitleModalCreateNew sipModalReportLookUp">
        <ModalHeader toggle={toggle}>{t('Tra cứu biên bản')}</ModalHeader>
        <ModalBody>
          <Row className="mb-3 sipTitleContainer">
            <h1 className="sipTitle">{t('Thông tin biên bản')}</h1>
          </Row>
          {renderTableThongTinBienBan()}
          <div className="mt-3" />
          <Row className="mb-3 sipTitleContainer">
            <h1 className="sipTitle">{t('Danh sách phiếu gửi của biên bản')}</h1>
          </Row>
          {renderTableDSPhieuGui()}
          <div className="mt-3" />
          <Row className="mb-3 sipTitleContainer">
            <h1 className="sipTitle">{t('Kết luận biên bản')}</h1>
          </Row>
          {renderTableKetLuanBienBan()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('Ghi lại')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-eye fa-lg color-orange" />
        </Button>
        <Button>
          <i className="fa fa-check fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
      </>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderReportFilterSearch(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <Row>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Từ ngày
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Đến ngày
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Bưu cục lập
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Bưu cục bị lập
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
          <Col md={2} xs={12} className="mb-3">
            <Button color="primary">Tìm kiếm</Button>
            {/* fake button to open Report popup - please delete when finish popup function */}
            <Button onClick={toggle} className="ml-3">
              Open popup
            </Button>
          </Col>
        </Row>
        <Row className="sipLine mt-2 mb-3" />
        <Row>
          <Col>
            Tổng số: <span>1</span>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Tra cứu biên bản')}</h1>
      </Row>
      {renderReportFilterSearch()}
      {renderModal()}
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Số BB')}</th>
              <th>{t('Ngày lập')}</th>
              <th>{t('BC lập')}</th>
              <th>{t('BC bị lập')}</th>
              <th>{t('Lỗi')}</th>
              <th>{t('TT')}</th>
              <th>{t('Điểm CN')}</th>
              <th>{t('Điểm GĐ')}</th>
              <th>{t('Nội dung')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 0041800013</td>
              <td>19/6/2019 12:03:00</td>
              <td>TTKT3</td>
              <td>A98</td>
              <td>Phát hiện nhiều ghạch</td>
              <td>Lập biên bản</td>
              <td>10</td>
              <td>5</td>
              <td>Yêu cầu duyệt hoàn trong hôm nay</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default LapBienBan;
