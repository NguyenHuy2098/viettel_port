/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { push } from 'connected-react-router';
import moment from 'moment';
import { filter, map, get, groupBy, toNumber, toString, isEmpty, replace, size, sumBy } from 'lodash';

import { action_ZFI002 } from 'redux/ZFI002/actions';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import ExportExcelWithTemplate from 'components/Button/ExportExcelWithTemplate';
import { makeSelectorBPRoleId } from 'redux/auth/selectors';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
import convertMoneyToString from 'utils/convertMoneyToString';
import { numberFormat } from 'utils/common';
import { renderHeader } from 'utils/exportExcelHelper';
import routesMap from 'utils/routesMap';
import { action_ZFI007M } from 'redux/ZFI007M/actions';
import { select_ZFI007M_collection } from 'redux/ZFI007M/selectors';
import { REACT_APP_DRIVE_URL } from 'utils/env';
import PrintableBangKe from '../PrintableBangKe';

interface PostOfficeType {
  PostOfficeCode: string;
  PostOfficeName: string;
}

interface ProfileUserType {
  BPCode: string;
  BPOrg: string;
  Roles: string[];
  PostOffices: PostOfficeType[];
}

interface PostOfficeType {
  PostOfficeCode: string;
  PostOfficeName: string;
}

interface Props {
  checkedBangKe: string[];
  noBangKeChecked?: boolean;
}

const SHEET_0 = 'Status 2,3';
const SHEET_1 = 'status 0,1';

// eslint-disable-next-line max-lines-per-function
const TopControllers = (props: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checkedBangKe, noBangKeChecked } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const maBP = useSelector(makeSelectorBPOrg);
  const BPRoleId = useSelector(makeSelectorBPRoleId);
  const lists = useSelector(select_ZFI007M_collection);

  const redirectToTaoMoiBangKe = (): void => {
    dispatch(push(routesMap.TAO_MOI_BANG_KE));
  };

  useEffect(() => {
    if (size(checkedBangKe) > 0)
      dispatch(
        action_ZFI007M({
          BK_INPUT: map(checkedBangKe, (id: string) => ({ ID: id })),
        }),
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedBangKe]);

  // eslint-disable-next-line max-lines-per-function,@typescript-eslint/no-explicit-any
  const aggregateOrder = (list: any): any => {
    const rawMtDetailReceiverList = list;
    const mtDetailReceiverList = filter(rawMtDetailReceiverList, item => !isEmpty(item));
    const groupList = groupBy(mtDetailReceiverList, 'KHOAN_MUC');
    const newGropList = map(groupList, (groupItem: API.LISTMTDETAILRECEIVER[]) => ({
      items: [...groupItem],
      TOTAL_AMOUNT: sumBy(groupItem, subItem => {
        return toNumber(subItem.AMOUNT);
      }),
      TOTAL_PHU_PHI: sumBy(groupItem, subItem => {
        return toNumber(subItem.PHU_PHI);
      }),
      TOTAL_TAX: sumBy(groupItem, subItem => {
        return toNumber(replace(get(subItem, 'TAX', ''), /%/, ''));
      }),
      TOTAL_TAX_AMOUNT: sumBy(groupItem, subItem => {
        return toNumber(subItem.TAX_AMOUNT);
      }),
      TOTAL_SUM_AMOUNT: sumBy(groupItem, subItem => {
        return toNumber(subItem.SUM_AMOUNT);
      }),
      TOTAL_AMOUNT_INIT: sumBy(groupItem, subItem => {
        return toNumber(subItem.AMOUNT_INIT);
      }),
      TOTAL_PHU_PHI_INIT: sumBy(groupItem, subItem => {
        return toNumber(subItem.PHU_PHI_INIT);
      }),
      TOTAL_TAX_AMOUNT_INIT: sumBy(groupItem, subItem => {
        return toNumber(subItem.TAX_AMOUNT_INIT);
      }),
      TOTAL_SUM_AMOUNT_INIT: sumBy(groupItem, subItem => {
        return toNumber(subItem.SUM_AMOUNT_INIT);
      }),
      TOTAL_KHONG_DUYET:
        sumBy(groupItem, subItem => {
          return toNumber(subItem.SUM_AMOUNT_INIT);
        }) -
          sumBy(groupItem, subItem => {
            return toNumber(subItem.SUM_AMOUNT);
          }) >
        0
          ? sumBy(groupItem, subItem => {
              return toNumber(subItem.SUM_AMOUNT_INIT);
            }) -
            sumBy(groupItem, subItem => {
              return toNumber(subItem.SUM_AMOUNT);
            })
          : 0,
    }));
    return newGropList;
  };

  // eslint-disable-next-line max-lines-per-function,@typescript-eslint/no-explicit-any
  const renderTemplate1 = (workbook: any, tempList: any, index: number, headerInfo: any): void => {
    const BK_ID = get(headerInfo, 'BK_ID', '');
    workbook.cloneSheet(workbook.sheet(0), `${BK_ID}`);
    renderHeader(workbook.sheet(`${BK_ID}`), headerInfo, maBP, BPRoleId);

    // sheet 1
    let flagIndex = 16;
    for (const itemKey in tempList) {
      workbook
        .sheet(`${BK_ID}`)
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
          .sheet(`${BK_ID}`)
          .cell(`A${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'LINE_ITEM', '')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`B${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'KIHIEU_HD', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`C${flagIndex + i}`)
          .value(`${moment(get(tempList[itemKey].items[i], 'NGAY_HD', ''), 'YYYYMMDD').format('DD/MM/YYYY')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`D${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'SO_HD', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`E${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'NGUOI_BAN', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`F${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'MST', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`G${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'DESCR', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', wrapText: true });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`H${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'AMOUNT_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`I${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'PHU_PHI_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', shrinkToFit: true });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`J${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'TAX_INIT', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`K${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'TAX_AMOUNT_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`L${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`M${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'AMOUNT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`N${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'PHU_PHI', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`O${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'TAX_AMOUNT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`P${flagIndex + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'SUM_AMOUNT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`Q${flagIndex + i}`)
          .value(
            `${
              toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT')) -
                toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT')) >
              0
                ? numberFormat(
                    toString(
                      toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT')) -
                        toNumber(get(tempList[itemKey].items[i], 'SUM_AMOUNT')),
                    ),
                  )
                : 0
            }`,
          )
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`R${flagIndex + i}`)
          .value(`${get(tempList[itemKey].items[i], 'NOTE', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
      }
      //// tong nhom
      workbook
        .sheet(`${BK_ID}`)
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
        .sheet(`${BK_ID}`)
        .cell(`H${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_AMOUNT_INIT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`I${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_PHU_PHI_INIT', ''))}`)
        .style({
          borderStyle: 'thin',
          borderColor: '#000000',
          fontFamily: 'Times New Roman',
          bold: true,
          shrinkToFit: true,
        });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`J${flagIndex + size(tempList[itemKey].items)}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`K${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_TAX_AMOUNT_INIT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`L${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_SUM_AMOUNT_INIT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`M${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_AMOUNT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`N${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_PHU_PHI', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`O${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_TAX_AMOUNT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`P${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_SUM_AMOUNT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`Q${flagIndex + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_KHONG_DUYET', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`R${flagIndex + size(tempList[itemKey].items)}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      flagIndex = flagIndex + size(tempList[itemKey].items) + 1;
    }
    // tong tat cac nhom
    workbook
      .sheet(`${BK_ID}`)
      .range(`A${flagIndex}:G${flagIndex}`)
      .merged(true)
      .value('Tổng cộng')
      .style({
        borderStyle: 'thin',
        borderColor: '#000000',
        horizontalAlignment: 'center',
        fontFamily: 'Times New Roman',
        bold: true,
      });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`H${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_AMOUNT_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`I${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_PHU_PHI_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({
        borderStyle: 'thin',
        borderColor: '#000000',
        fontFamily: 'Times New Roman',
        bold: true,
        shrinkToFit: true,
      });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`J${flagIndex}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`K${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`L${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`M${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_AMOUNT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`N${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_PHU_PHI', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`O${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`P${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`R${flagIndex}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`Q${flagIndex}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_KHONG_DUYET', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .range(`A12:R${flagIndex}`)
      .style({ wrapText: true, verticalAlignment: 'center', fontSize: 8 });
    workbook
      .sheet(`${BK_ID}`)
      .range(`H17:Q${flagIndex}`)
      .style({ horizontalAlignment: 'right' });
    flagIndex = flagIndex + 1;

    // render footer
    workbook
      .sheet(`${BK_ID}`)
      .cell(`B${flagIndex}`)
      .value(
        `Số tiền đề nghị thanh toán: ${convertMoneyToString(
          sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT_INIT', '0'));
          }),
        )}`,
      );
    flagIndex++;
    workbook
      .sheet(`${BK_ID}`)
      .cell(`B${flagIndex}`)
      .value(
        `Số tiền được duyệt: ${convertMoneyToString(
          sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT', '0'));
          }),
        )}`,
      );
    flagIndex++;
    workbook
      .sheet(`${BK_ID}`)
      .cell(`B${flagIndex}`)
      .value(
        `Số tiền không được duyệt: ${convertMoneyToString(
          sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_KHONG_DUYET', '0'));
          }),
        )}`,
      );

    flagIndex += 2;
    workbook
      .sheet(`${BK_ID}`)
      .cell(`B${flagIndex}`)
      .value(`KẾ TOÁN CHUYÊN QUẢN`);
    workbook
      .sheet(`${BK_ID}`)
      .cell(`H${flagIndex}`)
      .value(`TRƯỞNG PHÒNG TÀI CHÍNH`);
    // .style({ wrapText: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`O${flagIndex}`)
      .value(`TỔNG GIÁM ĐỐC`);

    workbook
      .sheet(`${BK_ID}`)
      .range(`A1:R${flagIndex}`)
      .style({ fontFamily: 'Times New Roman' });
  };

  // eslint-disable-next-line max-lines-per-function,@typescript-eslint/no-explicit-any
  const renderTemplate2 = (workbook: any, tempList: any, index: number, headerInfo: any): void => {
    const BK_ID = get(headerInfo, 'BK_ID', '');
    workbook.cloneSheet(workbook.sheet(1), `${BK_ID}`);
    renderHeader(workbook.sheet(`${BK_ID}`), headerInfo, maBP, BPRoleId);

    let flagIndex1 = 16;
    for (const itemKey in tempList) {
      workbook
        .sheet(`${BK_ID}`)
        .range(`A${flagIndex1}:L${flagIndex1}`)
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
      flagIndex1++;
      for (let i = 0; i < size(tempList[itemKey].items); i++) {
        workbook
          .sheet(`${BK_ID}`)
          .cell(`A${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'LINE_ITEM', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`B${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'KIHIEU_HD', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });

        workbook
          .sheet(`${BK_ID}`)
          .cell(`C${flagIndex1 + i}`)
          .value(`${moment(get(tempList[itemKey].items[i], 'NGAY_HD', ''), 'YYYYMMDD').format('DD/MM/YYYY')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`D${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'SO_HD', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`E${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'NGUOI_BAN', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`F${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'MST', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`G${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'DESCR', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', wrapText: true });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`H${flagIndex1 + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'AMOUNT_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`I${flagIndex1 + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'PHU_PHI_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', shrinkToFit: true });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`J${flagIndex1 + i}`)
          .value(`${get(tempList[itemKey].items[i], 'TAX_INIT', '') || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`K${flagIndex1 + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'TAX_AMOUNT_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        workbook
          .sheet(`${BK_ID}`)
          .cell(`L${flagIndex1 + i}`)
          .value(`${numberFormat(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT', '')) || ''}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
      }
      //// tong nhom
      workbook
        .sheet(`${BK_ID}`)
        .range(`A${flagIndex1 + size(tempList[itemKey].items)}:G${flagIndex1 + size(tempList[itemKey].items)}`)
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
        .sheet(`${BK_ID}`)
        .cell(`H${flagIndex1 + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_AMOUNT_INIT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`I${flagIndex1 + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_PHU_PHI_INIT', ''))}`)
        .style({
          borderStyle: 'thin',
          borderColor: '#000000',
          fontFamily: 'Times New Roman',
          bold: true,
          shrinkToFit: true,
        });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`J${flagIndex1 + size(tempList[itemKey].items)}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`K${flagIndex1 + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_TAX_AMOUNT_INIT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(`${BK_ID}`)
        .cell(`L${flagIndex1 + size(tempList[itemKey].items)}`)
        .value(`${numberFormat(get(tempList[itemKey], 'TOTAL_SUM_AMOUNT_INIT', ''))}`)
        .style({ borderStyle: 'thin', borderColor: '#000000' });
      flagIndex1 = flagIndex1 + size(tempList[itemKey].items) + 1;
    }
    // tong tat cac nhom
    workbook
      .sheet(`${BK_ID}`)
      .range(`A${flagIndex1}:G${flagIndex1}`)
      .merged(true)
      .value('Tổng cộng')
      .style({
        borderStyle: 'thin',
        borderColor: '#000000',
        horizontalAlignment: 'center',
        fontFamily: 'Times New Roman',
        bold: true,
      });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`H${flagIndex1}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_AMOUNT_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`I${flagIndex1}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_PHU_PHI_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({
        borderStyle: 'thin',
        borderColor: '#000000',
        fontFamily: 'Times New Roman',
        bold: true,
        shrinkToFit: true,
      });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`J${flagIndex1}`)
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`K${flagIndex1}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .cell(`L${flagIndex1}`)
      .value(
        `${numberFormat(
          toString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT_INIT', '0'));
            }),
          ),
        )}`,
      )
      .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
    workbook
      .sheet(`${BK_ID}`)
      .range(`A12:R${flagIndex1}`)
      .style({ wrapText: true, verticalAlignment: 'center' });
    workbook
      .sheet(`${BK_ID}`)
      .range(`H17:L${flagIndex1}`)
      .style({ horizontalAlignment: 'right' });
    flagIndex1 = flagIndex1 + 1;

    // render footer
    workbook
      .sheet(`${BK_ID}`)
      .cell(`B${flagIndex1}`)
      .value(
        `Số tiền đề nghị thanh toán: ${convertMoneyToString(
          sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_AMOUNT', '0'));
          }),
        )}`,
      );
    flagIndex1 += 2;
    workbook
      .sheet(`${BK_ID}`)
      .cell(`B${flagIndex1}`)
      .value(`KẾ TOÁN CHUYÊN QUẢN`);
    workbook
      .sheet(`${BK_ID}`)
      .cell(`G${flagIndex1}`)
      .value(`TRƯỞNG PHÒNG TÀI CHÍNH`);
    workbook
      .sheet(`${BK_ID}`)
      .cell(`K${flagIndex1}`)
      .value(`TỔNG GIÁM ĐỐC`);

    workbook
      .sheet(`${BK_ID}`)
      .range(`A1:R${flagIndex1}`)
      .style({ fontFamily: 'Times New Roman' });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePrintBangKe = (data: any, workbook: any, index: number): void => {
    const status = get(data, 'header.BK_STATUS');
    const headerInfo = get(data, 'header');
    if (status === 2 || status === 3 || status === 4) {
      renderTemplate1(workbook, aggregateOrder(data.list), index, headerInfo);
    }
    if (status === 0 || status === 1) {
      renderTemplate2(workbook, aggregateOrder(data.list), index, headerInfo);
    }
  };

  // eslint-disable-next-line max-lines-per-function,@typescript-eslint/no-explicit-any
  function handleData(workbook: any): void {
    for (let i = size(lists) - 1, j = 0; i >= 0; i--, j++) {
      handlePrintBangKe(lists[i], workbook, j);
    }
    workbook.deleteSheet(SHEET_0);
    workbook.deleteSheet(SHEET_1);
  }

  useEffect(() => {
    dispatch(action_ZFI002());
  }, [maBP, dispatch]);

  return (
    <>
      <a
        className="ml-2 btn btn-primary uploadFile"
        target="_blank"
        rel="noopener noreferrer"
        href={REACT_APP_DRIVE_URL}
      >
        <i className="fa fa-cloud-upload" />
        {t('Tải file lên')}
      </a>
      <ExportExcelWithTemplate
        handleData={handleData}
        urlTemplate={`${window.location.origin}/CPTX-template.xlsx`}
        fileName={`bang_ke_CPTX-${moment().format('hhmmss-DDMMYYYY')}.xlsx`}
        disabled={!size(checkedBangKe)}
      >
        <>
          <img alt="VTPostek" className="mr-2" src={'../../assets/img/icon/iconExport.svg'} />
          {t('Xuất file Excel')}
        </>
      </ExportExcelWithTemplate>
      <ButtonPrintable
        btnProps={{
          disabled: !size(checkedBangKe),
          color: 'primary',
          className: 'ml-2',
          children: (
            <>
              <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
              {t('In bảng kê')}
            </>
          ),
        }}
        modalBodyProps={{
          children: <PrintableBangKe ids={checkedBangKe} />,
        }}
        modalHeaderProps={{
          children: t('In chi tiết bảng kê'),
        }}
      />
      <Button color="primary" className="ml-2" onClick={redirectToTaoMoiBangKe}>
        <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
        {t('Thêm mới')}
      </Button>
    </>
  );
};

TopControllers.defaultProps = {
  noBangKeChecked: false,
};

export default TopControllers;
