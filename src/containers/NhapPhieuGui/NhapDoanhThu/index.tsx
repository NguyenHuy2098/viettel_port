import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Input, Row, Table } from 'reactstrap';
import { AppState } from '../../../redux/store';

interface Props {
  text: string;
}

const mapStateToProps = (state: AppState): Props => {
  return {
    text: state.hello.text,
  };
};

// eslint-disable-next-line max-lines-per-function
const InputRevenue: React.FC<Props> = (props): JSX.Element => {
  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Nhập doanh thu {props.text}</h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <Button>
            <i className="fa fa-file-excel-o" />
            Lấy file mẫu
          </Button>
          <Button>
            <i className="fa fa-file-archive-o" />
            Nhập từ excel
          </Button>
          <Button>
            <i className="fa fa-download" />
            Hoàn thành
          </Button>
        </div>
      </Row>
      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
        <p className="pull-right">
          Tổng số phiếu gửi: <span>2</span>
        </p>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>Số vận đơn</th>
              <th>Bưu cục đến</th>
              <th>Số lượng</th>
              <th>Trọng lượng</th>
              <th>Ngày gửi</th>
              <th>Quản trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
            <tr>
              <td></td>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default connect(mapStateToProps)(InputRevenue);
