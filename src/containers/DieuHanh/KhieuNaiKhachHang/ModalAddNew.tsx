import * as React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  modalCreateNew: boolean;
  toggle: () => void;
}

// eslint-disable-next-line max-lines-per-function
const ModalAddNew: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  // eslint-disable-next-line max-lines-per-function
  function renderInformationTable(): JSX.Element {
    return (
      <div className="sipTableContainer">
        <Row className="mb-3">
          <h6>{t('Thông tin biên bản')}</h6>
        </Row>
        <Table bordered hover className="mb-3">
          <thead className="text-center">
            <tr>
              <th>{t('Mã lỗi')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Điểm phạt cá nhân')}</th>
              <th>{t('Điểm phạt GD')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('1007')}</td>
              <td>{t('Phát bưu gửi chậm thời gian quy định')}</td>
              <td>{t('10')}</td>
              <td>{t('5')}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="mb-3">
          <h6>{t('Danh sách phiếu gửi của biên bản')}</h6>
        </Row>
        <Table bordered hover className="mb-3">
          <thead className="text-center">
            <tr>
              <th>{t('Mã vận đơn')}</th>
              <th>{t('Mã chuyến thư')}</th>
              <th>{t('Ghi chú')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('515324586')}</td>
              <td>{t('CT_371029_TTHNI')}</td>
              <td>{t('Bưu phẩm được phân công ngày 11/04 chưa đi phát')}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="mb-3">
          <h6>{t('Kết luận biên bản')}</h6>
        </Row>
        <Table bordered hover className="mb-3">
          <thead className="text-center">
            <tr>
              <th>{t('Ngày kết luận')}</th>
              <th>{t('Bưu cục kết luận')}</th>
              <th>{t('Người kết luận')}</th>
              <th>{t('Người phạm lỗi')}</th>
              <th>{t('Ghi chú')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('14/04/2019')}</td>
              <td>{t('KAH')}</td>
              <td>{t('Nguyễn Mạnh Quang')}</td>
              <td>{t('Đỗ Minh Tú')}</td>
              <td>{t('Bưu phẩm được phân công ngày 11/04 chưa đi phát')}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  function renderModalAddNew(): JSX.Element {
    return (
      <div>
        <Modal isOpen={props.modalCreateNew} className="sipTitleModalCreateNew" toggle={props.toggle}>
          <ModalHeader toggle={props.toggle} className="text-center">
            {t('Tra cứu biên bản')}
          </ModalHeader>
          <ModalBody>{renderInformationTable()}</ModalBody>
        </Modal>
      </div>
    );
  }
  return <div>{renderModalAddNew()}</div>;
};

export default ModalAddNew;
