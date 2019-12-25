import { get } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderHeader = (sheet: any, data: any, maBP: string, BPRoleId: string): void => {
  const status = get(data, 'BK_STATUS');
  sheet.cell('A2').value(maBP);
  if (status === 2 || status === 3) {
    sheet.cell('R1').value(`Số: ${get(data, 'BK_ID', '')}`);
  }
  if (status === 0 || status === 1) {
    sheet.cell('L1').value(`Số: ${get(data, 'BK_ID', '')}`);
  }
  sheet.cell('A5').value(`Tháng ${get(data, 'BK_MONTH', '')} năm ${get(data, 'BK_YEAR', '')}`);
  sheet
    .cell('A7')
    .value(`Về việc: Thanh toán chi phí theo ngân sách T${get(data, 'BK_MONTH', '')} năm ${get(data, 'BK_YEAR', '')}`);
  sheet.cell('A8').value(`Họ và tên: ${get(data, 'CRE_BY', '')}`);
  sheet.cell('A9').value(`Chức danh: ${BPRoleId}`);
};
