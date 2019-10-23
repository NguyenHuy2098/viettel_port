import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
function ThemMoiKhoanMuc(): JSX.Element {
  const { t } = useTranslation();

  // eslint-disable-next-line max-lines-per-function
  function renderAddNewItem(): JSX.Element {
    return (
      <div className="p-0 col-12 col-lg-8 col-xl-12 khoan-muc">
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
        <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom">
          <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
            <input name="packageType" type="radio" className="form-check-input" value="V3" /> 0304 - Chi phí vận chuyển
          </label>
        </div>
      </div>
    );
  }

  const [themKhoanMuc, setThemKhoanMuc] = React.useState<boolean>(false);
  function handleThemKhoanMuc(): void {
    setThemKhoanMuc(!themKhoanMuc);
  }

  return (
    <>
      <Button color="primary" className="ml-2" onClick={handleThemKhoanMuc}>
        <i className="fa fa-plus mr-2" />
        {t('Thêm khoản mục')}
      </Button>
      <Modal isOpen={themKhoanMuc} toggle={handleThemKhoanMuc} className="">
        <ModalHeader toggle={handleThemKhoanMuc} charCode="x">
          Chọn khoản mục
        </ModalHeader>
        <ModalBody>
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <input placeholder="Tìm kiếm bảng kê" type="text" className="form-control" />
          </div>
          <Scrollbars style={{ height: 300 }}>{renderAddNewItem()}</Scrollbars>
        </ModalBody>
        <ModalFooter className="footer-no-boder">
          <button type="button" className="btn btn-primary btn-lg">
            Thêm
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ThemMoiKhoanMuc;
