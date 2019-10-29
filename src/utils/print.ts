import printJS from 'print-js';

export const printHtml = (options: printJS.Configuration): void => {
  printJS({
    css: ['https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', 'printable.css'],
    scanStyles: false,
    type: 'html',
    ...options,
  });
};
