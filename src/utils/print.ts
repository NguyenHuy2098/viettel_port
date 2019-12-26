import printJS from 'print-js';
// eslint-disable-next-line max-lines-per-function
export const printHtml = (options: printJS.Configuration): void => {
  printJS({
    css: ['https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', 'printable.css'],
    scanStyles: false,
    type: 'html',
    ...options,
    style: `
    @page {
      size: A4 landscape;
      margin: 0;
    }
    .page-break {
      display: block;
      page-break-before: always;
    }
    .in-bang-ke th {
      font-size: 10px;
    }
    .in-bang-ke td {
      font-size: 10px;
    }
    body {
      font-size: 11px;
      font-family: 'Arial';
    }
    .sipTableBangKeFicoTr:not(.text-right) td:nth-child(5){
      width: 100px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(6){
      width: 50px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(8){
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(10){
      width: 15px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(11){
      text-align: right;
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(12){
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(13){
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(14){
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(15){
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(16){
      width: 30px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(17){
      text-align: right;
      width: 80px !important;
    }
    .sipTableBangKeFicoTr td:nth-child(18){
      width: 70px !important;
    }
    `,
  });
};
