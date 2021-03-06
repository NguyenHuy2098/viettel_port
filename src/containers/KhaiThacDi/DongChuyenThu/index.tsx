import React, { useEffect, useState } from 'react';
import { Badge, Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { isEmpty, toString } from 'lodash';
import { getPageItems } from 'utils/common';

import TabView from 'components/Tab/TabView';
import CreateForwardingItemModal from 'components/Modal/ModalTaoMoi';
import { toastError } from 'components/Toast';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import { action_ZTMI236 } from 'redux/ZTMI236/actions';
import { makeSelectorZTMI236OUTRowCount } from 'redux/ZTMI236/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import ChuyenThuChuaHoanThanh from './ChuyenThuChuaHoanThanh';
import TaiChuaDongChuyenThu from './TaiChuaDongChuyenThu';
import KienChuaDongChuyenThu from './KienChuaDongChuyenThu';
import ChuyenThuDaDong from './ChuyenThuDaDong';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);
  const countChuyenThuChuaHoanThanh = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.CHUA_HOAN_THANH),
  );
  const countChuyenThuDaDong = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.HOAN_THANH_CHUYEN_THU),
  );
  const countTaiChuaHoanThanh = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const countKienChuaDongChuyenThu = useSelector(makeSelectorZTMI236OUTRowCount);

  const toastErrorOnSearch = (error: Error, torId: string): void => {
    if (!isEmpty(torId)) {
      toastError(error.message);
    }
  };

  const pageItems = getPageItems();

  const getListChuyenThuTaoMoi = (IV_PAGENO = 1, IV_TOR_ID = ''): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_ID,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {
          onFailure: (error: Error) => {
            toastErrorOnSearch(error, IV_TOR_ID);
          },
        },
        {
          flow: SipFlowType.KHAI_THAC_DI,
        },
      ),
    );
  };

  const getListTaiChuaDongChuyenThu = (IV_PAGENO = 1, IV_TOR_ID = ''): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_ID,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {
          onFailure: (error: Error) => {
            toastErrorOnSearch(error, IV_TOR_ID);
          },
        },
        {
          flow: SipFlowType.KHAI_THAC_DI,
        },
      ),
    );
  };

  const getListKienChuaDongChuyenThu = (IV_PAGE_NO = 1, IV_PACKAGE_ID = ''): void => {
    dispatch(
      action_ZTMI236(
        {
          IV_PACKAGE_ID,
          IV_FREIGHT_UNIT_TYPE: SipDataType.KIEN,
          IV_FREIGHT_UNIT_STATUS: ['306', '402'],
          IV_PAGE_NO: toString(IV_PAGE_NO),
          IV_NO_PER_PAGE: pageItems,
        },
        {
          onFailure: (error: Error) => {
            toastErrorOnSearch(error, IV_PACKAGE_ID);
          },
        },
      ),
    );
  };

  const getListChuyenThuDaDong = (IV_PAGENO = 1, IV_TOR_ID = ''): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_ID,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.HOAN_THANH_CHUYEN_THU,
          IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {
          onFailure: (error: Error) => {
            toastErrorOnSearch(error, IV_TOR_ID);
          },
        },
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  useEffect((): void => {
    getListKienChuaDongChuyenThu();
    dispatch(
      action_MIOA_ZTMI045({
        row: [
          {
            IV_LOCTYPE: 'V001',
          },
          {
            IV_LOCTYPE: 'V004',
          },
        ],
        IV_BP: '',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '200',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  const toggleCreateForwardingItemModal = (): void => {
    setCreateForwardingItemModal(!createForwardingItemModal);
  };

  const renderTitle = (): JSX.Element => {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('????ng chuy???n th??')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-plus mr-2" />
            {t('T???o chuy???n th??')}
          </Button>
          <CreateForwardingItemModal
            onSuccessCreated={getListChuyenThuTaoMoi}
            visible={createForwardingItemModal}
            onHide={toggleCreateForwardingItemModal}
            modalTitle={t('T???o chuy???n th??')}
            IV_TOR_TYPE="ZC3"
          />
        </div>
      </Row>
    );
  };

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <TabView
          navs={[
            {
              children: (
                <>
                  {t('Chuy???n th?? ch??a ho??n th??nh')}
                  <Badge color="primary">{countChuyenThuChuaHoanThanh}</Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('T???i ch??a ????ng chuy???n th??')}
                  <Badge color="primary">{countTaiChuaHoanThanh}</Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('Ki???n ch??a ????ng chuy???n th??')}
                  <Badge color="primary">{countKienChuaDongChuyenThu}</Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('Chuy???n th?? ???? ????ng')}
                  <Badge color="primary">{countChuyenThuDaDong}</Badge>
                </>
              ),
            },
          ]}
          tabs={[
            {
              children: <ChuyenThuChuaHoanThanh getListChuyenThuTaoMoi={getListChuyenThuTaoMoi} />,
            },
            {
              children: <TaiChuaDongChuyenThu getListTaiChuaDongChuyenThu={getListTaiChuaDongChuyenThu} />,
            },
            {
              children: <KienChuaDongChuyenThu getListKienChuaDongChuyenThu={getListKienChuaDongChuyenThu} />,
            },
            {
              children: <ChuyenThuDaDong getListChuyenThuDaDong={getListChuyenThuDaDong} />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default DongChuyenThu;
