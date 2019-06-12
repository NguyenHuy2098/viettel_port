import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { AppState } from '../../redux/store';

interface Props {
  text: string;
}

interface State {
  modalCreateNew: boolean;
}

const mapStateToProps = (state: AppState): Props => {
  return {
    text: state.hello.text,
  };
};

class Dashboard extends React.PureComponent<Props, State> {
  public state: State = {
    modalCreateNew: false,
  };

  private toggle = (): void => {
    this.setState(prevState => ({
      modalCreateNew: !prevState.modalCreateNew,
    }));
  };

  public renderSipHeader(): React.ReactElement {
    return (
      <div>
        <h1 className="sipTitle">Đóng bảng kê {this.props.text}</h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder="Tìm kiếm bảng kê" />
          </div>
          <Button onClick={this.toggle}>
            <i className="fa fa-plus" />
            Tạo bảng kê
          </Button>
          <Button>
            <i className="fa fa-download" />
            Ghi lại
          </Button>
          <Modal isOpen={this.state.modalCreateNew} toggle={this.toggle} className="sipTitleModalCreateNew">
            <ModalHeader toggle={this.toggle}>Tạo bảng kê nội tỉnh</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Bưu cục đến</Label>
                <Input type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Ghi chú</Label>
                <Input type="textarea" placeholder="Nhập ghi chú" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggle}>Ghi lại</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div className="row mt-3" />
      </div>
    );
  }

  public render(): React.ReactNode {
    // const { t, i18n } = useTranslation();
    return (
      <div>
        {this.renderSipHeader()}
        <p className="text-right">
          Tổng số: <span>56</span>
        </p>
        <div className="mt-3" />
        <div className="sipTableContainer">
          <Table striped hover>
            <thead>
              <tr>
                <th>Mã bảng kê</th>
                <th>Bưu cục đi</th>
                <th>Bưu cục đến</th>
                <th>Số lượng</th>
                <th>Người nhập</th>
                <th>Ngày nhập</th>
                <th>Ghi chú</th>
                <th>Quản trị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BK-2683077-TTKT1</td>
                <td>TTKT1</td>
                <td>TTKT3</td>
                <td>25</td>
                <td>Nguyễn Văn An</td>
                <td>19/6/2019</td>
                <td>Hàng giá trị cao</td>
                <td className="SipTableFunctionIcon">
                  <Button>
                    <i className="fa fa-print fa-lg color-green" />
                  </Button>
                  <Button>
                    <i className="fa fa-pencil fa-lg color-blue" />
                  </Button>
                  <Button>
                    <i className="fa fa-trash-o fa-lg color-red" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
