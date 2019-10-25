import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { action_ZFI001 } from 'redux/ZFI001/actions';
import { select_ZFI001 } from 'redux/ZFI001/selectors';
import { get } from 'lodash';
import { cleanAccents } from 'utils/common';

interface Props {
  handleSubmit?: Function;
}

// eslint-disable-next-line max-lines-per-function
function ThemMoiKhoanMuc(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const payloads = {
      KM_FLAG: 'X',
    };
    dispatch(action_ZFI001(payloads));
  }, [dispatch]);

  const data = useSelector(select_ZFI001);

  const [search, setSearch] = React.useState<string>('');
  function handleSearch(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  const [list, setList] = React.useState<API.LIST[]>([]);
  React.useEffect((): void => {
    const list = data.filter(
      item =>
        cleanAccents(get(item, 'km_text', '').toLowerCase()).includes(search) ||
        !search ||
        get(item, 'km_id', '').includes(search),
    );
    setList(list);
  }, [search, data]);

  // eslint-disable-next-line max-lines-per-function
  function renderAddNewItem(): JSX.Element {
    return (
      <div className="p-0 col-12 col-lg-8 col-xl-12 khoan-muc">
        {list.map(
          (item: API.LIST): JSX.Element => {
            return (
              <div className="pr-0 pl-0 pt-2 pb-2 col-12 border-bottom" key={item.km_id}>
                <label className="pl-0 pr-0 form-check-label col-12 col-form-label">
                  <input
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={(): void => handleSelectKhoanMuc(item)}
                    name="packageType"
                    type="radio"
                    className="form-check-input"
                    value="V3"
                  />{' '}
                  {item.km_id} - {item.km_text}
                </label>
              </div>
            );
          },
        )}
      </div>
    );
  }

  const [themKhoanMuc, setThemKhoanMuc] = React.useState<boolean>(false);
  function handleThemKhoanMuc(): void {
    setThemKhoanMuc(!themKhoanMuc);
  }

  const [itemSelect, setItemSelect] = React.useState<API.LIST | null>(null);
  function handleSelectKhoanMuc(item: API.LIST): void {
    setItemSelect(item);
  }

  function handleSubmit(): void {
    props.handleSubmit && props.handleSubmit(itemSelect);
    setThemKhoanMuc(false);
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
            <input placeholder="Tìm kiếm bảng kê" type="text" className="form-control" onChange={handleSearch} />
          </div>
          <Scrollbars style={{ height: 300 }}>{renderAddNewItem()}</Scrollbars>
        </ModalBody>
        <ModalFooter className="footer-no-boder">
          <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>
            Thêm
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ThemMoiKhoanMuc;
