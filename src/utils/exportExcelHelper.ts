import { get, toNumber, size } from 'lodash';

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

export const renderBody = (workbook: any, tempList: any, flagIndex: number): void => {
  for (const itemKey in tempList) {
    workbook
      .sheet(0)
      .range(`A${flagIndex}:R${flagIndex}`)
      .merged(true)
      .value(`${get(tempList[itemKey].items[0], 'KHOAN_MUC', '')}-${get(tempList[itemKey].items[0], 'TEN_KM')}`)
      .style({
        borderStyle: 'thin',
        borderColor: '#000000',
        horizontalAlignment: 'left',
        fontFamily: 'Times New Roman',
        bold: true,
        fontSize: 11,
      });
    flagIndex++;
    for (let i = 0; i < size(tempList[itemKey].items); i++) {
      workbook
        .sheet(0)
        .cell(`A${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'LINE_ITEM', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`B${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'KIHIEU_HD', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`C${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'NGAY_HD', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`D${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'SO_HD', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`E${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'NGUOI_BAN', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`F${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'MST', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`G${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'DESCR', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', wrapText: true });
      workbook
        .sheet(0)
        .cell(`H${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'AMOUNT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`I${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'PHU_PHI', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`J${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'TAX', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`K${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'TAX_AMOUNT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`L${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'SUM_AMOUNT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`M${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'AMOUNT_INIT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`N${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'PHU_PHI_INIT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`O${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'TAX_AMOUNT_INIT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`P${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT', '')}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`Q${flagIndex + i}`)
        .value(
          `${
            toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT')) -
              toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT')) >
            0
              ? toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT')) -
                toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT'))
              : 0
          }`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(0)
        .cell(`R${flagIndex + i}`)
        .value(`${get(tempList[itemKey].items[i], 'NOTE', '') || ''}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
    }
    //// tong nhom
    workbook
      .sheet(0)
      .range(`A${flagIndex + size(tempList[itemKey].items)}:G${flagIndex + size(tempList[itemKey].items)}`)
      .merged(true)
      .value('Tổng nhóm')
      .style({
        borderStyle: 'thin',
        borderColor: '#000000',
        horizontalAlignment: 'center',
        fontFamily: 'Times New Roman',
        bold: true,
      });
    workbook
      .sheet(0)
      .cell(`H${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_AMOUNT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`I${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_PHU_PHI', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`J${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_TAX', '')}%`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`K${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_TAX_AMOUNT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`L${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_AMOUNT_INIT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000' });
    workbook
      .sheet(0)
      .cell(`M${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_PHU_PHI_INIT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`N${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_TAX_AMOUNT_INIT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000' });
    workbook
      .sheet(0)
      .cell(`O${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_TAX_AMOUNT_INIT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`P${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_SUM_AMOUNT_INIT', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(0)
      .cell(`Q${flagIndex + size(tempList[itemKey].items)}`)
      .value(`${get(tempList[itemKey], 'TOTAL_KHONG_DUYET', '')}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    flagIndex = flagIndex + size(tempList[itemKey].items) + 1;
  }
};
