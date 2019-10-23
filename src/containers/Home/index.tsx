// eslint-disable-next-line max-lines
import React from 'react';
import {
  Row,
  Col,
  // Button,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // Container,
  // Table,
  // Form,
  // FormGroup,
  // Label,
  // Input,
  // FormText,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
// import { Scrollbars } from 'react-custom-scrollbars';

import Chart1 from './chart1';
import Chart2 from './chart2';

// eslint-disable-next-line max-lines-per-function
const Home: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const renderTopDashBoard = (): JSX.Element => {
    return (
      <Row className="topDashBroad mb-4">
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconBangKe1.svg'} alt="VTPostek" />
            {t('Bảng kê chưa đóng')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconTai1.svg'} alt="VTPostek" />
            {t('Tải chưa đóng')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">02</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconChuyenThu.svg'} alt="VTPostek" />
            {t('Chuyến thư chưa đóng')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">01</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconBangKe2.svg'} alt="VTPostek" />
            {t('Bảng kê chưa nhận')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconTai2.svg'} alt="VTPostek" />
            {t('Tải chưa nhận')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {renderTopDashBoard()}
      <Chart1 />
      <Chart2 />
    </>
  );
};

// eslint - disable - next - line max - lines - per - function
// function renderBillInfo(): JSX.Element {
//   return (
//     <Form>
//       <FormGroup>
//         <Input type="email" name="email" id="exampleEmail" placeholder="Mã số thuế" />
//       </FormGroup>
//       <FormGroup>
//         <Input type="password" name="password" id="examplePassword" placeholder="Tên người bán" />
//       </FormGroup>
//       <FormGroup>
//         <Input type="email" name="email" id="exampleEmail" placeholder="Mẫu hóa đơn" />
//       </FormGroup>
//       <FormGroup>
//         <Input type="password" name="password" id="examplePassword" placeholder="Ký hiệu" />
//       </FormGroup>
//       <FormGroup>
//         <Input type="select" name="select" id="exampleSelect">
//           <option>Ngày</option>
//           <option>2</option>
//           <option>3</option>
//           <option>4</option>
//           <option>5</option>
//         </Input>
//       </FormGroup>
//       <FormGroup>
//         <Input type="password" name="password" id="examplePassword" placeholder="Số hoá đơn" />
//       </FormGroup>
//       <FormGroup>
//         <Input type="textarea" placeholder="Hàng hóa(Tối đa 250 ký tự)" name="text" id="exampleText" />
//       </FormGroup>
//       <Row form>
//         <Col md={6}>
//           <FormGroup>
//             <Input type="email" name="email" id="exampleEmail" placeholder="Tiền hàng hóa, dịch vụ" />
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//           <FormGroup>
//             <Input type="password" name="password" id="examplePassword" placeholder="Phụ phí" />
//           </FormGroup>
//         </Col>
//       </Row>
//       <Row form>
//         <Col md={6}>
//           <FormGroup>
//             <Input type="select" name="select" id="exampleSelect">
//               <option>Thuế suất</option>
//               <option>2</option>
//               <option>3</option>
//               <option>4</option>
//               <option>5</option>
//             </Input>
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//           <FormGroup>
//             <Input type="password" name="password" id="examplePassword" placeholder="Thuế GTGT" />
//           </FormGroup>
//         </Col>
//       </Row>
//       <FormGroup>
//         <Input type="password" name="password" id="examplePassword" placeholder="Link " />
//       </FormGroup>
//     </Form>
//   );
// }

// const ModalExample = (): JSX.Element => {
//   const [modal, setModal] = React.useState(false);

//   function toggle(): void {
//     setModal(!modal);
//   }
//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>
//         Button titl
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} className="">
//         <ModalHeader toggle={toggle} charCode="x">
//           Thông tin hóa
//         </ModalHeader>
//         <ModalBody>{renderBillInfo()}</ModalBody>
//         <ModalFooter className="footer-no-boder">
//           <div className="text-left col-6">
//             <p className="mb-0">Tổng tiền thanh toán: 0đ</p>
//           </div>
//           <div className="text-right col-6">
//             <button type="button" className="btn btn-primary btn-lg">
//               Ghi lại
//             </button>
//           </div>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

export default Home;
