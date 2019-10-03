import React, { useState } from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import { toastError } from 'components/Toast';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { SipDataState, SipDataType } from 'utils/enums';

interface Props extends ButtonProps {
  listTaiKienCanChuyen?: API.TITEM[];
  onSuccess?: (torId: string) => void;
}

const ButtonChuyenVaoChuyenThu = (props: Props): JSX.Element => {
  const { idChuyenThu, listTaiKienCanChuyen, onSuccess, ...rest } = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const userMaBp = useSelector(makeSelectorMaBP);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const handleChuyenVaoChuyenThu = (): void => {
    if (isEmpty(listTaiKienCanChuyen)) {
      toastError(t('Vui lòng chọn từ danh sách trước khi chuyển.'));
    } else {
      toggleModal();
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleChuyenVaoChuyenThu} {...rest}>
        {props.children || (
          <>
            <i className="fa fa-download rotate-90 mr-2" />
            {t('Chuyển vào CT')}
          </>
        )}
      </Button>
      <SelectForwardingItemModal
        onSuccessSelected={onSuccess}
        visible={showModal}
        onHide={toggleModal}
        modalTitle={t('Chọn chuyến thư')}
        forwardingItemList={listTaiKienCanChuyen || []}
        IV_TOR_TYPE={SipDataType.CHUYEN_THU}
        IV_FR_LOC_ID={userMaBp}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
      />
    </>
  );
};

ButtonChuyenVaoChuyenThu.defaultProps = {
  listTaiKienCanChuyen: [],
};

export default ButtonChuyenVaoChuyenThu;
