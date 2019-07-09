import React from 'react';
import * as HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
// import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';

// eslint-disable-next-line max-lines-per-function
const Home: React.FC = (props: HighChartsReact.Props): JSX.Element => {
  const [pieOptions1, setPieOptions1] = React.useState<HighCharts.Options>({
    title: {
      text: 'Đơn cần nhận',
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
      // labelFormatter: function() {
      //   console.log(this);
      //   return this.name;
      // },
    },
  });

  const [pieOptions, setPieOptions] = React.useState<HighCharts.Options>({
    title: {
      text: 'Đơn cần phát',
    },
    xAxis: {
      categories: ['Chưa hoàn được', 'Chờ phát', 'Chờ hoàn', 'Chưa phát được'],
    },
    series: [
      {
        type: 'pie',
        showInLegend: true,
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

  const [barOptions, setBarOptions] = React.useState<HighCharts.Options>({
    chart: {
      type: 'column',
    },
    title: {
      text: 'Stacked column chart',
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption',
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray',
        },
      },
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: 'white',
        },
      },
    },
    series: [
      {
        type: 'column',
        name: 'John',
        data: [5, 3, 4, 7, 2],
      },
      {
        type: 'column',
        name: 'Jane',
        data: [2, 2, 3, 2, 1],
      },
      {
        type: 'column',
        name: 'Joe',
        data: [3, 4, 4, 2, 5],
      },
    ],
  });

  function renderTopDashBoard(): JSX.Element {
    return (
      //top dashbroad
      <div className="topDashBroad">
        <div className="itemCol">
          <span>
            <i className="fa fa-file-text-o fa-lg mt-4 icon-1"></i>Bảng kê chưa đóng
          </span>
          <div className="numCol">20</div>
        </div>
        <div className="itemCol">
          <span>
            <i className="fa fa-refresh fa-lg mt-4 icon-2"></i>Tải chưa đóng
          </span>
          <div className="numCol">02</div>
        </div>
        <div className="itemCol">
          <span>
            <i className="fa fa-bus fa-lg mt-4 icon-3"></i>Chuyến thư chưa đóng
          </span>
          <div className="numCol">01</div>
        </div>
        <div className="itemCol">
          <span>
            <i className="fa fa-file-text-o fa-lg mt-4 icon-4"></i>Bảng kê chưa nhận
          </span>
          <div className="numCol">20</div>
        </div>
        <div className="itemCol">
          <span>
            <i className="fa fa-refresh fa-lg mt-4 icon-5"></i>Tải chưa nhận
          </span>
          <div className="numCol">20</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderTopDashBoard()}
      {/*//chart 1*/}
      <div className="chartLine">
        <div className="chart-item">
          <HighChartsReact highcharts={HighCharts} options={pieOptions1} {...props} />
        </div>
        <div className="chart-item">
          <HighChartsReact highcharts={HighCharts} options={pieOptions} {...props} />
        </div>
        <div className="chart-item">
          <HighChartsReact highcharts={HighCharts} options={barOptions} {...props} />
        </div>
      </div>
    </div>
    //chart 1
  );
};

export default Home;
