import printJS from 'print-js';

export const printHtml = (options: printJS.Configuration): void => {
  printJS({
    css: ['https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'],
    scanStyles: false,
    type: 'html',
    style: '@page { size: A4 landscape; } .pagebreak { display: block; page-break-before: always; }',
    ...options,
  });
};
