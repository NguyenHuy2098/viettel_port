/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// @ts-ignore
import XlsxPopulate from 'xlsx-populate';
// @ts-ignore
import { saveAs } from 'file-saver';

interface Props {
  children: JSX.Element;
  handleData: Function;
  urlTemplate: string;
  fileName: string;
}

function ExportExcelWithTemplate(props: Props): JSX.Element {
  function handleExport(): void {
    const req = new XMLHttpRequest();
    const url = props.urlTemplate;
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onreadystatechange = function(): void {
      if (req.readyState === 4) {
        if (req.status === 200) {
          XlsxPopulate.fromDataAsync(req.response).then((workbook: any) => {
            props.handleData(workbook);
            workbook.outputAsync().then((blob: any) => {
              saveAs(blob, props.fileName);
            });
          });
        }
      }
    };
    req.send();
  }

  return <div onClick={handleExport}>{props.children}</div>;
}

export default ExportExcelWithTemplate;
