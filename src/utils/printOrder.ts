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
      size: A5 landscape;
      margin: 0.1cm;
    }
    .page-break {
      display: block;
      page-break-before: always;
    }
    .container {
      background-color: #ffff;
      font-family: 'Times New Roman', Times, serif;
      font-size: 11px;
      overflow: scroll;
      p {
        margin: 0.05cm 0;
      }
      h5 {
        font-size: 11px;
      }
      .part-1 {
        height: 1.2cm;
        h5 {
          margin: 0.1cm 0!important;
        }
      }
      .part-2 {
        height: 2.5cm;
        p {
          margin: 0;
        }
      }
      .part-3 {
        height: 3.2cm;
        table {
          margin-top: 0.1cm;
        }
        table td {
          padding: 0 0.5cm
        }
        .part-3-right {
          padding: 0;
          p, strong {
            padding: 0 0.2cm;
          }
        }
      }
      .part-n-1 {
        height: 3.3cm;
        .sender-sign-box {
          height: 1.4cm;
        }
      }
      .part-end {
        height: 0.5cm;
        padding: 0!important;
        p {
          margin: 0;
          padding: 0;
        }
      }
    }
    `,
  });
};
