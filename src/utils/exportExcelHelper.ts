import { get } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderHeader = (workbook: any, data: API.ZFI007Response, maBP: string, BPRoleId: string): void => {
  workbook
    .sheet(0)
    .cell('A2')
    .value(maBP);
  workbook
    .sheet(0)
    .cell('R1')
    .value(get(data, 'MT_DETAIL_RECEIVER.header.BK_ID', ''));
  workbook
    .sheet(0)
    .cell('A5')
    .value(
      `Tháng ${get(data, 'MT_DETAIL_RECEIVER.header.BK_MONTH', '')} năm ${get(
        data,
        'MT_DETAIL_RECEIVER.header.BK_YEAR',
        '',
      )}`,
    );
  workbook
    .sheet(0)
    .cell('A8')
    .value(
      `${workbook
        .sheet(0)
        .cell('A8')
        .value()} ${get(data, 'MT_DETAIL_RECEIVER.header.CRE_BY', '')}`,
    );
  workbook
    .sheet(0)
    .cell('A9')
    .value(
      `${workbook
        .sheet(0)
        .cell('A9')
        .value()} ${BPRoleId}`,
    );



};
