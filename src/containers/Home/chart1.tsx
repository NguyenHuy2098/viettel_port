import React from 'react';
import * as HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { Row, Col } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const Chart1: React.FC<HighChartsReact.Props> = (props: HighChartsReact.Props): JSX.Element => {
  const [pieOptions1] = React.useState<HighCharts.Options>({
    title: {
      text: 'Đơn cần nhận',
      align: 'left',
    },
    xAxis: {
      categories: ['Chờ nhận', 'Chưa nhận được'],
    },
    series: [
      {
        type: 'pie',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
        data: [
          {
            y: 2,
            name: 'Chờ nhận',
          },
          {
            y: 4,
            name: 'Chưa nhận được',
          },
        ],
      },
    ],
    plotOptions: {
      pie: {
        innerSize: '80%',
        shadow: false,
        borderWidth: 0,
        size: '60%',
      },
    },
    colors: ['#f5a623', '#43ab4a'],
    legend: {
      symbolWidth: 12,
      symbolRadius: 0,
      useHTML: true,
    },
  });

  const [pieOptions] = React.useState<HighCharts.Options>({
    title: {
      text: 'Đơn cần phát',
      align: 'left',
    },
    xAxis: {
      categories: ['Chưa hoàn được', 'Chờ phát', 'Chờ hoàn', 'Chưa phát được'],
    },
    series: [
      {
        type: 'pie',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
        data: [
          {
            y: 1,
            name: 'Chưa hoàn được',
          },
          {
            y: 2,
            name: 'Chờ phát',
          },
          {
            y: 3,
            name: 'Chờ hoàn',
          },
          {
            y: 4,
            name: 'Chưa phát được',
          },
        ],
      },
    ],
    plotOptions: {
      pie: {
        innerSize: '80%',
        shadow: false,
        borderWidth: 0,
        size: '60%',
      },
    },
    colors: ['#007aff', '#f5a623', '#5dc2f0', '#43ab4a'],
    legend: {
      symbolWidth: 12,
      symbolRadius: 0,
    },
  });

  const [barOptions] = React.useState<HighCharts.Options>({
    chart: {
      type: 'column',
    },
    title: {
      text: 'Báo Cáo Thời Gian Phát',
      align: 'left',
    },
    xAxis: {
      categories: ['1/1', '2/1', '3/1', '4/1', '5/1', '6/1', '7/1'],
    },
    yAxis: {
      min: 0,
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray',
        },
      },
    },
    legend: {
      symbolWidth: 12,
      symbolRadius: 0,
      useHTML: true,
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          // enabled: true,
          color: 'white',
        },
      },
      series: {
        borderWidth: 0,
      },
    },
    colors: ['#f5a623', '#43ab4a'],
    series: [
      {
        type: 'column',
        name: 'Phát chậm giờ',
        data: [5, 3, 4, 7, 2, 2, 1],
      },
      {
        type: 'column',
        name: 'Phát đúng giờ',
        data: [2, 2, 3, 2, 1, 3, 4],
      },
    ],
  });

  return (
    <Row className="sipOrderInputRow">
      <Col xs="12" sm="4" md="4" className="sipOrderInputCol mb-4">
        <div className="sipGenDashBoard">
          <HighChartsReact highcharts={HighCharts} options={pieOptions1} {...props} />
        </div>
      </Col>
      <Col xs="12" sm="4" md="4" className="sipOrderInputCol mb-4">
        <div className="sipGenDashBoard">
          <HighChartsReact highcharts={HighCharts} options={pieOptions} {...props} />
        </div>
      </Col>
      <Col xs="12" sm="4" md="4" className="sipOrderInputCol mb-4">
        <div className="sipGenDashBoard">
          <HighChartsReact highcharts={HighCharts} options={barOptions} {...props} />
        </div>
      </Col>
    </Row>
  );
};

export default Chart1;
