import React from 'react';
import XlsxPopulate from 'xlsx-populate';

function ExportExcel(props) {
  const name = props.name || 'out.xlsx';

  function exportExcel() {
    XlsxPopulate.fromBlankAsync().then(workbook => {
      props.handleData(workbook);
      workbook.outputAsync().then(function(blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // If IE, you must uses a different method.
          window.navigator.msSaveOrOpenBlob(blob, name);
        } else {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.href = url;
          a.download = name;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      });
    });
  }

  return <div onClick={exportExcel}>{props.children}</div>;
}

export default ExportExcel;
