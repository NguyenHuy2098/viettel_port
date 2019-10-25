/* eslint-disable max-lines */
import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
// import { Cell } from 'react-table';
// import { ceil, get, isEmpty } from 'lodash';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007 } from 'redux/ZFI007/selectors';
// import DataTable from 'components/DataTable';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line max-lines-per-function
const InBangKe = (): JSX.Element => {
  const { t } = useTranslation();
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();

  function toggle(): void {
    setModal(!modal);
  }

  React.useEffect(() => {
    const payload = {
      MA_BUU_CUC: 'BDH',
      BK_ID: 'CPTX_2019_0001',
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZFI007(payload));
  }, [dispatch]);

  const data = useSelector(select_ZFI007);

  // eslint-disable-next-line max-lines-per-function
  function renderTable(): JSX.Element {
    return (
      <Table bordered id="bang-ke">
        <thead>
          <tr className="text-center">
            <th rowSpan={3}>STT</th>
            <th colSpan={11}>Bưu cục kê khai</th>
            <th colSpan={4}>Chờ phê duyệth</th>
            <th rowSpan={3}>Không duyệt</th>
            <th rowSpan={3}>Lý do</th>
          </tr>

          <tr className="text-center">
            <th colSpan={3}>Hóa đơn mua hàng</th>
            <th rowSpan={2}>Tên người bán</th>
            <th rowSpan={2}>Mã số thuế người bán</th>
            <th rowSpan={2}>Hàng hóa, Dịch vụ</th>
            <th rowSpan={2}>Hàng hóa dịch vụ chưa thuế</th>
            <th rowSpan={2}>Phụ phí</th>
            <th rowSpan={2}>Thuế suất</th>
            <th rowSpan={2}>thuế GTGT</th>
            <th rowSpan={2}>Tổng cộng</th>
            <th rowSpan={2}>hàng hóa dịch vụ chưa thuế</th>
            <th rowSpan={2}>Phụ phí </th>
            <th rowSpan={2}>Thuế GTGT</th>
            <th rowSpan={2}>Cộng </th>
          </tr>

          <tr className="text-center">
            <th>Ký hiệu</th>
            <th>Ngày</th>
            <th>Số</th>
          </tr>
          <tr className="text-center">
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th colSpan={18}> 0324 - Chi phí bằng tiền khác</th>
          </tr>
          {data.map(
            (item: API.LISTMTDETAILRECEIVER, index: number): JSX.Element => {
              return (
                <tr key={index}>
                  <td>{item.LINE_ITEM}</td>
                  <td>{item.KIHIEU_HD}</td>
                  <td>{item.NGAY_HD}</td>
                  <td>{item.SO_HD}</td>
                  <td>{item.NGUOI_BAN}</td>
                  <td>{item.MST}</td>
                  <td>{item.DESCR}</td>
                  <td>{item.AMOUNT}</td>
                  <td>{item.PHU_PHI}</td>
                  <td>{item.TAX}</td>
                  <td>{item.TAX_AMOUNT}</td>
                  <td>{item.SUM_AMOUNT}</td>
                  <td>{item.AMOUNT_INIT}</td>
                  <td>{item.PHU_PHI_INIT}</td>
                  <td>{item.TAX_AMOUNT_INIT}</td>
                  <td>{item.LINE_ITEM}</td>
                  <td>{item.LINE_ITEM}</td>
                  <td>{item.LINE_ITEM}</td>
                </tr>
              );
            },
          )}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-center">
            <th colSpan={7}>Tổng nhóm </th>
            <th>600,000</th>
            <th>0</th>
            <th></th>
            <th>0</th>
            <th>600,000</th>
            <th>500,00</th>
            <th>0</th>
            <th>0</th>
            <th>500,000</th>
            <th>10000</th>
            <th></th>
          </tr>
          <tr>
            <th colSpan={18}> 0324 - Chi phí bằng tiền khác</th>
          </tr>
          <tr>
            <td>1</td>
            <td>31AA/18P</td>
            <td>27/04/2019</td>
            <td>0016341</td>
            <td>Nguyen Van Lan</td>
            <td>0021543584</td>
            <td>Thanh toán chi phí đổ mực, thay thế linh kiện máy in T4/2019</td>
            <td>600,000</td>
            <td>0</td>
            <td>0%</td>
            <td>0</td>
            <td>600,000</td>
            <td>500,000</td>
            <td>0</td>
            <td>0</td>
            <td>500,000</td>
            <td>100000</td>
            <td>Quá hạn mức</td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="text-center">
            <th colSpan={7}>Tổng nhóm </th>
            <th>600,000</th>
            <th>0</th>
            <th></th>
            <th>0</th>
            <th>600,000</th>
            <th>500,00</th>
            <th>0</th>
            <th>0</th>
            <th>500,000</th>
            <th>10000</th>
            <th></th>
          </tr>
          <tr className="text-center">
            <th colSpan={7}>Tổng cộng</th>
            <th>1,200,000</th>
            <th>0</th>
            <th></th>
            <th>0</th>
            <th>1,200,000</th>
            <th>1,100,000</th>
            <th>0</th>
            <th>0</th>
            <th>1,100,000</th>
            <th>10000</th>
            <th></th>
          </tr>
        </tbody>
      </Table>
    );
  }

  function renderTotal(): JSX.Element {
    return (
      <Row>
        <Col className="pl-5">
          <div>
            <i>Số tiền đề nghị thanh toán: Một triệu hai trăm nghìn đồng</i>
          </div>
          <div>
            <i>Số tiền được duyệt: Một triệu một trăm nghìn đồng</i>
          </div>
          <div>
            <i>Số tiền không được duyệt: Một trăm nghìn đồng</i>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Button color="primary" className="ml-2" onClick={toggle}>
        <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
        {t('In bảng kê')}
      </Button>
      <Modal isOpen={modal} size="xl" toggle={toggle} className="bang-ke">
        <ModalHeader toggle={toggle} charCode="x">
          {t('In bảng kê')}
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <div className="col-4">
              <div>Tổng công ty cổ phần Bưu chính Viettel</div>
              <div className="pl-5">Bưu cục Đống Da </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4 text-right">Số: CPTX_2019_002</div>
          </div>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className={'text-center'}>
              <h5>BẢNG KÊ DUYỆT CHỨNG TỪ GỐC THANH TOÁN CHI PHÍ</h5>
              <p>Tháng 5 năm 2019</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="info pb-3">
              <div className="col-6 pl-0">Về việc thanh toán chi phí theo ngân sách T04/2019</div>
              <div className="col-6 pl-0">Họ và Tên: Nguyễn Minh Trang</div>
              <div className="col-6 pl-0">Chức danh: Nhân viên chăm sóc khách hàng</div>
              <div className="col-6 pl-0">Đề nghị thanh toán số tiền theo bảng kê như sau:</div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <div className="text-right">ĐVT: VNĐ</div>
            </Col>
          </Row>
          {renderTable()}
          {renderTotal()}
          <Row className="text-center pt-5 pb-5">
            <div className="col-4">KẾ TOÁN CHUYÊN QUẢN</div>
            <div className="col-4">TRƯỞNG PHÒNG TÀI CHÍNH</div>
            <div className="col-4">TỔNG GIÁM ĐỐC</div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-primary btn-lg">
            <i className="fa fa-print"></i> In
          </button>
          <button type="button" className="btn btn-secondary btn-lg">
            <i className="fa fa-remove"></i> Huỷ
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InBangKe;
