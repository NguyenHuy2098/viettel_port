import React from 'react';
import { Row, Col } from 'reactstrap';
import Chart1 from './chart1';
import Chart2 from './chart2';

// eslint-disable-next-line max-lines-per-function
const Home: React.FC = (): JSX.Element => {
  function renderTopDashBoard(): JSX.Element {
    return (
      <Row className="topDashBroad mb-4">
        <Col xs="12" className=" col-sm itemCol">
          <span className="background-color-primary">
            <i className="fa fa-file-text-o fa-lg mt-4 icon-1" />
            Bảng kê chưa đóng
          </span>
          <div className="numCol">20</div>
        </Col>
        <Col xs="12" className=" col-sm itemCol">
          <span>
            <i className="fa fa-refresh fa-lg mt-4 icon-2" />
            Tải chưa đóng
          </span>
          <div className="numCol">02</div>
        </Col>
        <Col xs="12" className=" col-sm itemCol">
          <span>
            <i className="fa fa-bus fa-lg mt-4 icon-3" />
            Chuyến thư chưa đóng
          </span>
          <div className="numCol">01</div>
        </Col>
        <Col xs="12" className=" col-sm itemCol">
          <span>
            <i className="fa fa-file-text-o fa-lg mt-4 icon-4" />
            Bảng kê chưa nhận
          </span>
          <div className="numCol">20</div>
        </Col>
        <Col xs="12" className=" col-sm itemCol">
          <span>
            <i className="fa fa-refresh fa-lg mt-4 icon-5" />
            Tải chưa nhận
          </span>
          <div className="numCol">20</div>
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
