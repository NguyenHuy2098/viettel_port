import React from 'react';
import { Row, Col } from 'reactstrap';
import Chart1 from './chart1';
import Chart2 from './chart2';

// eslint-disable-next-line max-lines-per-function
const Home: React.FC = (): JSX.Element => {
  function renderTopDashBoard(): JSX.Element {
    return (
      <Row className="topDashBroad mb-4">
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <i className="fa fa-file-text-o fa-lg color-red mr-2" />
            Bảng kê chưa đóng
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <i className="fa fa-refresh fa-lg color-violet mr-2" />
            Tải chưa đóng
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">02</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <i className="fa fa-bus fa-lg color-bluegreen mr-2" />
            Chuyến thư chưa đóng
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">01</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <i className="fa fa-file-text-o fa-lg color-blue mr-2" />
            Bảng kê chưa nhận
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <i className="fa fa-refresh fa-lg color-orange mr-2" />
            Tải chưa nhận
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
      </Row>
    );
  }

  return (
    <>
      {renderTopDashBoard()}
      <Chart1 />
      <Chart2 />
    </>
  );
};

export default Home;
