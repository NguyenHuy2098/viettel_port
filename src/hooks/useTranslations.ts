import { useTranslation } from 'react-i18next';
import { TFunctionResult } from 'i18next';

import { SipDataType } from 'utils/enums';

export const useSipDataType = (torType: string): TFunctionResult => {
  const { t } = useTranslation();
  switch (torType) {
    case SipDataType.BANG_KE:
      return t('Bảng kê');
    case SipDataType.TAI:
      return t('Tải');
    case SipDataType.CHUYEN_THU:
      return t('Chuyến thư');
    case SipDataType.KIEN:
      return t('Kiện');
    case SipDataType.BUU_GUI:
      return t('Phiếu gửi');
  }
};
