import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Label,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Form,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { map, get, first } from 'lodash';

import { makeSelectorGet_MT_ZTMI045_OUT } from 'redux/MIOA_ZTMI045/selectors';
import { toast } from 'react-toastify';
import TypeaheadDiemDen from 'components/Input/TypeaheadDiemDen';

interface Props {
  onHide: () => void;
  visible: boolean;
  modalTitle: string;
  firstTabTitle: string;
  secondTabTitle: string;
  onSubmitButton1: () => void;
  onSubmitButton2: (locNo: string, ghiChu: string) => void;
  tab1Contents: API.RowMTZTMI047OUT[];
  onChooseItemInFirstTab: (item: API.RowMTZTMI047OUT) => void;
  selectedChildInTab1: API.RowMTZTMI047OUT | undefined;
}

// eslint-disable-next-line max-lines-per-function
const ModalTwoTab: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { onHide, visible } = props;

  const [tab, setTab] = useState<number>(1);
  const listDiemDen = useSelector(makeSelectorGet_MT_ZTMI045_OUT);
  const [ghiChu, setGhiChu] = useState<string>('');
  const [selectedPlace, setSelselectedPlace] = useState<string>('');

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  React.useEffect((): void => {
    setSelselectedPlace(get(listDiemDen, '[0].LOCNO', ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDiemDen]);

  const handleChooseItem = useCallback(
    (item: API.RowMTZTMI047OUT) => (): void => {
      props.onChooseItemInFirstTab(item);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const handleOnSubmitButton1 = useCallback((): void => {
    props.onSubmitButton1();
  }, [props]);

  const handleOnSubmitButton2 = (): void => {
    if (ghiChu.length > 40) {
      toast(
        <>
          <i className="fa window-close-o mr-2" />
          {t('Ghi ch?? kh??ng ???????c v?????t qu?? 40 k?? t???')}
        </>,
        {
          type: 'error',
        },
      );
    } else props.onSubmitButton2(selectedPlace, ghiChu);
  };

  const renderTab1 = (): React.ReactNode => {
    return (
      <>
        {map(props.tab1Contents, item => {
          return (
            <Label key={item.TOR_ID} check className="selectForwardingItem row">
              <Input
                type="radio"
                name="selectForwardingItem"
                onChange={handleChooseItem(item)}
                checked={get(props, 'selectedChildInTab1.TOR_ID') === item.TOR_ID}
              />
              <p className="temporaryP">
                <span>{item.TOR_ID}</span>
                <span>{item.CREATED_BY}</span>
              </p>
              <span>
                <span>SL:{item.ITEM_NO}</span>
                <span style={{ background: 'darkgray', padding: '0px 4px 0px 4px', borderRadius: '4px' }}>
                  {item.LOG_LOCID_TO}
                </span>
              </span>
            </Label>
          );
        })}
      </>
    );
  };

  // const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   setSelselectedPlace(event.currentTarget.value);
  // };

  const handleChangePostOffice = (items: TypeaheadOption[]): void => {
    setSelselectedPlace(get(first(items), 'id', ''));
  };

  const renderTab2 = (): JSX.Element => {
    return (
      <div>
        <Form>
          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
            <Label for="exampleSelect" className="col-4">
              <p>
                {t('Ch???n ??i???m ?????n')}
                <span className="color-red pl-2">*</span>
              </p>
            </Label>
            <div className="col-8">
              <TypeaheadDiemDen postOfficeList={listDiemDen} onChange={handleChangePostOffice} value={selectedPlace} />
            </div>
            {/* <Input
              type="select"
              name="select"
              id="exampleSelect"
              defaultValue={get(listDiemDen[0], 'LOCNO', '')}
              className="col-8"
              onChange={handleChangeOption}
            >
              {map(listDiemDen, dd => {
                return (
                  <option key={dd.LOCNO} value={dd.LOCNO}>
                    {dd.DESCR40}
                  </option>
                );
              })}
            </Input> */}
          </FormGroup>
          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
            <Label for="exampleText" className="col-4">
              {t('Ghi ch??')}
            </Label>
            <div className="col-8">
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="Nh???p ghi ch??...(Kh??ng b???t bu???c)"
                onChange={handleChangeGhiChu}
              />
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  };

  function handleChangeGhiChu(e: ChangeEvent<HTMLInputElement>): void {
    setGhiChu(e.currentTarget.value);
  }

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew" toggle={onHide}>
      <ModalHeader className="custom-background-white">
        <div className="custom-header">
          <p className="mb-0">{props.modalTitle}</p>
          <i className="fa fa-close fa-lg" onClick={onHide} />
        </div>
        <div className="sipTabContainer sipFlatContainer ganBangKeVaoTaiPopUp">
          <Nav tabs>
            <NavItem>
              <NavLink
                onClick={React.useCallback((): void => handleChangeTab(1), [])}
                className={classNames({ active: tab === 1 })}
              >
                {props.firstTabTitle}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={React.useCallback((): void => handleChangeTab(2), [])}
                className={classNames({ active: tab === 2 })}
              >
                {props.secondTabTitle}
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </ModalHeader>
      <ModalBody className="overflow-auto pt-0 heighFourHundredPx ">
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>{renderTab1()}</TabPane>
          <TabPane tabId={2}>{renderTab2()}</TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter className="justify-content-end pt-4">
        <Button
          color="primary"
          onClick={tab === 1 ? handleOnSubmitButton1 : handleOnSubmitButton2}
          className="float-right"
        >
          {t('Ho??n t???t')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalTwoTab;
