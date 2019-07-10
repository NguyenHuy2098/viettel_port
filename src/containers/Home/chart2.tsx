import React from 'react';
import * as HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { Form, Row, Col, FormGroup, Input } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const Chart2: React.FC<HighChartsReact.Props> = (props: HighChartsReact.Props): JSX.Element => {
  const [columnOptions] = React.useState<HighCharts.Options>({
    chart: {
      type: 'column',
    },
    title: {
      text: 'Báo Cáo phát & tồn',
      align: 'left',
      margin: 50,
    },
    xAxis: {
      categories: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      ],
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
      align: 'left',
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
    colors: ['#5dc2f0', '#007aff'],
    series: [
      {
        type: 'column',
        name: 'Tồn phát',
        data: [5, 3, 4, 7, 2, 2, 1, 5, 3, 4, 7, 2, 2, 1, 5, 3, 4, 7, 2, 2, 1, 5, 3, 4, 7, 2, 2, 1, 4, 5],
      },
      {
        type: 'column',
        name: 'Phát thành công ngày',
        data: [5, 3, 4, 7, 2, 2, 1, 5, 3, 4, 7, 2, 2, 1, 5, 3, 4, 7, 2, 2, 1, 5, 3, 4, 7, 2, 2, 1, 4, 5],
      },
    ],
  });

  function renderForm(): JSX.Element {
    return (
      <Form>
        <FormGroup>
          <Input type="select" name="select" className="pl-5">
            <option>Tháng 1/2019</option>
            <option>Tháng 2/2019</option>
            <option>Tháng 3/2019</option>
            <option>Tháng 4/2019</option>
            <option>Tháng 5/2019</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }

  return (
    <Row className="mb-3">
      <Col>
        <div className="sipGenDashBoard pt-4">
          <div className="sipFilter">
            <i className="fa fa-calendar-o fa-lg" />
            <i className="fa fa-caret-down fa-lg" />
            {renderForm()}
          </div>
          <HighChartsReact highcharts={HighCharts} options={columnOptions} {...props} />
        </div>
      </Col>
    </Row>
  );
};

export default Chart2;
