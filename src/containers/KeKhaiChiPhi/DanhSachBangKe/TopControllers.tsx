/* eslint-disable max-lines */
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { push } from 'connected-react-router';
import moment from 'moment';
import { filter, map, get, groupBy, toNumber, isEmpty, replace, size, sumBy } from 'lodash';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import ExportExcelWithTemplate from 'components/Button/ExportExcelWithTemplate';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007 } from 'redux/ZFI007/selectors';
import { makeSelectorBPRoleId, makeSelectorMaBP } from 'redux/auth/selectors';
import convertMoneyToString from 'utils/convertMoneyToString';
import { renderHeader } from 'utils/exportExcelHelper';
import routesMap from 'utils/routesMap';
import PrintableBangKe from '../PrintableBangKe';

interface Props {
  noBangKeChecked?: boolean;
  checkedBangKe: string[];
}

// eslint-disable-next-line max-lines-per-function
const TopControllers = (props: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checkedBangKe, noBangKeChecked } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const maBP = useSelector(makeSelectorMaBP);
  const data = useSelector(select_ZFI007);
  const BPRoleId = useSelector(makeSelectorBPRoleId);

  const redirectToTaoMoiBangKe = (): void => {
    dispatch(push(routesMap.TAO_MOI_BANG_KE));
  };

  useEffect(() => {
    if (size(checkedBangKe) > 0)
      dispatch(
        action_ZFI007({
          BK_ID: checkedBangKe[0],
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedBangKe]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tempList = useMemo((): any => {
    const rawMtDetailReceiverList = get(data, 'MT_DETAIL_RECEIVER.list', []);
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
          return toNumber(subItem.SUM_AMOUNT);
        }) -
        sumBy(groupItem, subItem => {
          return toNumber(subItem.SUM_AMOUNT_INIT);
        }),
    }));
    return newGropList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // eslint-disable-next-line max-lines-per-function,@typescript-eslint/no-explicit-any
  function handleData(workbook: any): void {
    const status = get(data, 'MT_DETAIL_RECEIVER.header.BK_STATUS');
    if (status === 2 || status === 3) {
      workbook.sheet(0).name('bang_ke_cptx');
      renderHeader(workbook, data, maBP, BPRoleId);

      // sheet 1
      let flagIndex = 16;
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
        workbook
          .sheet(0)
          .cell(`R${flagIndex + size(tempList[itemKey].items)}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
        flagIndex = flagIndex + size(tempList[itemKey].items) + 1;
      }
      // tong tat cac nhom
      workbook
        .sheet(0)
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
        .sheet(0)
        .cell(`H${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_AMOUNT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`I${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_PHU_PHI', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`J${flagIndex}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`K${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`L${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_AMOUNT_INIT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`M${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_PHU_PHI_INIT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`N${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT_INIT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`O${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT_INIT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`P${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT_INIT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`R${flagIndex}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(0)
        .cell(`Q${flagIndex}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_KHONG_DUYET', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      flagIndex = flagIndex + 1;

      // render footer
      workbook
        .sheet(0)
        .cell(`B${flagIndex}`)
        .value(
          `Số tiền đề nghị thanh toán: ${convertMoneyToString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_AMOUNT', '0'));
            }),
          )}`,
        );
      flagIndex++;
      workbook
        .sheet(0)
        .cell(`B${flagIndex}`)
        .value(
          `Số tiền được duyệt: ${convertMoneyToString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT_INIT', '0'));
            }),
          )}`,
        );
      flagIndex++;
      workbook
        .sheet(0)
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
        .sheet(0)
        .cell(`B${flagIndex}`)
        .value(`KẾ TOÁN CHUYÊN QUẢN`);
      workbook
        .sheet(0)
        .cell(`H${flagIndex}`)
        .value(`TRƯỞNG PHÒNG TÀI CHÍNH`)
        .style({ wrapText: true });
      workbook
        .sheet(0)
        .cell(`O${flagIndex}`)
        .value(`TỔNG GIÁM ĐỐC`);

      workbook
        .sheet(0)
        .range(`A1:R${flagIndex}`)
        .style({ wrapText: false, fontFamily: 'Times New Roman' });
    }
    if (status === 0 || status === 1) {
      //sheet 2
      workbook.sheet(1).name('bang_ke_cptx');
      renderHeader(workbook, data, maBP, BPRoleId);

      let flagIndex1 = 16;
      for (const itemKey in tempList) {
        workbook
          .sheet(1)
          .range(`A${flagIndex1}:R${flagIndex1}`)
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
            .sheet(1)
            .cell(`A${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'LINE_ITEM', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`B${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'KIHIEU_HD', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`C${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'NGAY_HD', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`D${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'SO_HD', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`E${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'NGUOI_BAN', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`F${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'MST', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`G${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'DESCR', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000', wrapText: true });
          workbook
            .sheet(1)
            .cell(`H${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'AMOUNT', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`I${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'PHU_PHI', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`J${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'TAX', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`K${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'TAX_AMOUNT', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
          workbook
            .sheet(1)
            .cell(`L${flagIndex1 + i}`)
            .value(`${get(tempList[itemKey].items[i], 'SUM_AMOUNT', '')}`)
            .style({ borderStyle: 'thin', borderColor: '#000000' });
        }
        //// tong nhom
        workbook
          .sheet(1)
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
          .sheet(1)
          .cell(`H${flagIndex1 + size(tempList[itemKey].items)}`)
          .value(`${get(tempList[itemKey], 'TOTAL_AMOUNT', '')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
        workbook
          .sheet(1)
          .cell(`I${flagIndex1 + size(tempList[itemKey].items)}`)
          .value(`${get(tempList[itemKey], 'TOTAL_PHU_PHI', '')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
        workbook
          .sheet(1)
          .cell(`J${flagIndex1 + size(tempList[itemKey].items)}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
        workbook
          .sheet(1)
          .cell(`K${flagIndex1 + size(tempList[itemKey].items)}`)
          .value(`${get(tempList[itemKey], 'TOTAL_TAX_AMOUNT', '')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
        workbook
          .sheet(1)
          .cell(`L${flagIndex1 + size(tempList[itemKey].items)}`)
          .value(`${get(tempList[itemKey], 'TOTAL_AMOUNT_INIT', '')}`)
          .style({ borderStyle: 'thin', borderColor: '#000000' });
        flagIndex1 = flagIndex1 + size(tempList[itemKey].items) + 1;
      }
      // tong tat cac nhom
      workbook
        .sheet(1)
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
        .sheet(1)
        .cell(`H${flagIndex1}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_AMOUNT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(1)
        .cell(`I${flagIndex1}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_PHU_PHI', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(1)
        .cell(`J${flagIndex1}`)
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(1)
        .cell(`K${flagIndex1}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_TAX_AMOUNT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      workbook
        .sheet(1)
        .cell(`L${flagIndex1}`)
        .value(
          `${sumBy(tempList, subItem => {
            return toNumber(get(subItem, 'TOTAL_AMOUNT_INIT', '0'));
          })}`,
        )
        .style({ borderStyle: 'thin', borderColor: '#000000', fontFamily: 'Times New Roman', bold: true });
      flagIndex1 = flagIndex1 + 1;

      // render footer
      workbook
        .sheet(1)
        .cell(`B${flagIndex1}`)
        .value(
          `Số tiền đề nghị thanh toán: ${convertMoneyToString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_AMOUNT', '0'));
            }),
          )}`,
        );
      flagIndex1++;
      workbook
        .sheet(1)
        .cell(`B${flagIndex1}`)
        .value(
          `Số tiền được duyệt: ${convertMoneyToString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_SUM_AMOUNT_INIT', '0'));
            }),
          )}`,
        );
      flagIndex1++;
      workbook
        .sheet(1)
        .cell(`B${flagIndex1}`)
        .value(
          `Số tiền không được duyệt: ${convertMoneyToString(
            sumBy(tempList, subItem => {
              return toNumber(get(subItem, 'TOTAL_KHONG_DUYET', '0'));
            }),
          )}`,
        );
      flagIndex1 += 2;
      workbook
        .sheet(1)
        .cell(`B${flagIndex1}`)
        .value(`KẾ TOÁN CHUYÊN QUẢN`);
      workbook
        .sheet(1)
        .cell(`H${flagIndex1}`)
        .value(`TRƯỞNG PHÒNG TÀI CHÍNH`)
        .style({ wrapText: true });
      workbook
        .sheet(1)
        .cell(`K${flagIndex1}`)
        .value(`TỔNG GIÁM ĐỐC`);

      workbook
        .sheet(1)
        .range(`A1:R${flagIndex1}`)
        .style({ wrapText: false, fontFamily: 'Times New Roman' });
    }

    if (status === 2 || status === 3) {
      workbook.deleteSheet(1);
    }
    if (status === 0 || status === 1) {
      workbook.deleteSheet(0);
    }
  }
  return (
    <>
      {/*<ButtonExportExcelBangKe className="ml-2" disabled={noBangKeChecked} ids={checkedBangKe} />*/}
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
