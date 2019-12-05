import React, { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { get, isEmpty } from 'lodash';

import { select_ZFI001_list } from 'redux/ZFI001/selectors';
import { cleanAccents } from 'utils/common';
import { action_ZFI001 } from 'redux/ZFI001/actions';

interface Props {
  handleSubmit?: Function;
}

// eslint-disable-next-line max-lines-per-function
function ThemMoiKhoanMuc(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = useSelector(select_ZFI001_list);

  useEffect(() => {
    const payloads = {
      KM_FLAG: 'X',
    };
    dispatch(action_ZFI001(payloads));
  }, [dispatch]);

  const [search, setSearch] = React.useState<string>('');
  function handleSearch(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  const [list, setList] = React.useState<API.LIST[]>([]);
  useEffect((): void => {
    const list = data.filter(
      item =>
        cleanAccents(get(item, 'km_text', '').toLowerCase()).includes(cleanAccents(search).toLowerCase()) ||
        !search ||
        get(item, 'km_id', '').includes(cleanAccents(search).toLowerCase()),
    );
    setList(list);
  }, [search, data]);

  // eslint-disable-next-line max-lines-per-function
  function renderAddNewItem(): JSX.Element {
    return (
      <div className="p-0 col-12 khoan-muc">
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
    setItemSelect(null);
    setList(data);
  }

  const [itemSelect, setItemSelect] = React.useState<API.LIST | null>(null);
  function handleSelectKhoanMuc(item: API.LIST): void {
    setItemSelect(item);
  }

  function handleSubmit(): void {
    props.handleSubmit && itemSelect && props.handleSubmit(itemSelect);
    setThemKhoanMuc(false);
  }

  return (
    <>
      <Button color="primary" className="ml-2" onClick={handleThemKhoanMuc}>
        <i className="fa fa-plus mr-2" />
        {t('Thêm khoản mục')}
      </Button>
      <Modal isOpen={themKhoanMuc} toggle={handleThemKhoanMuc} className="">
        <ModalHeader toggle={handleThemKhoanMuc} className="no-border pb-2" charCode="x">
          <strong>{t('Chọn khoản mục')}</strong>
        </ModalHeader>
        <ModalBody>
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <input
              placeholder="Tìm kiếm khoản mục"
              type="text"
              className="form-control search-khoan-muc"
              onChange={handleSearch}
            />
          </div>
          <Scrollbars className="scrollbar-khoan-muc" style={{ height: 300 }}>
            {renderAddNewItem()}
          </Scrollbars>
        </ModalBody>
        <ModalFooter className="no-border pt-2">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
            disabled={isEmpty(itemSelect)}
          >
            THÊM
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ThemMoiKhoanMuc;
