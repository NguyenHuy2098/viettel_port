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
import { map, get } from 'lodash';

import { makeSelectorGet_MT_ZTMI045_OUT } from 'redux/MIOA_ZTMI045/selectors';

interface Props {
  onHide: () => void;
  visible: boolean;
  modalTitle: string;
  firstTabTitle: string;
  secondTabTitle: string;
  onSubmitButton1: (taiId: string) => void;
  onSubmitButton2: (dichvu: string, ghiChu: string) => void;
  tab1Contents: API.RowMTZTMI047OUT[];
}

// eslint-disable-next-line max-lines-per-function
const ModalTwoTab: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { onHide, visible } = props;

  const [tab, setTab] = useState<number>(1);
  const [selectedTai, setSelectedTai] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const listDichVu = useSelector(makeSelectorGet_MT_ZTMI045_OUT);
  const [ghiChu, setGhiChu] = useState<string>('');
  const [selectedPlace, setSelselectedPlace] = useState<string>('');

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const handleChooseTai = useCallback(
    (tai: API.RowMTZTMI047OUT) => (): void => {
      setSelectedTai(tai);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleOnSubmitButton1 = useCallback((): void => {
    props.onSubmitButton1(get(selectedTai, 'TOR_ID', ''));
  }, [selectedTai, props.onSubmitButton1]);

  const handleOnSubmitButton2 = (): void => {
    props.onSubmitButton2(selectedPlace, ghiChu);
  };

  const renderTab1 = (): React.ReactNode => {
    return (
      <>
        {map(props.tab1Contents, item => {
          return (
            <Label key={item.TOR_ID} check className="selectForwardingItem row">
              <Input type="radio" name="selectForwardingItem" value="klajsdlk" onChange={handleChooseTai(item)} />
              <p>
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
        <Button color="primary" onClick={handleOnSubmitButton1} style={{ float: 'right' }}>
          {t('Hoàn tất')}
        </Button>
      </>
    );
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelselectedPlace(event.currentTarget.value);
  };

  const renderTab2 = (): JSX.Element => {
    return (
      <div>
        <Form>
          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
            <Label for="exampleSelect" className="col-4">
              <p>
                Chọn điểm đến<span className="color-red pl-2">*</span>
              </p>
            </Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              defaultValue={'2'}
              className="col-8"
              onChange={handleChangeOption}
            >
              {map(listDichVu, dv => {
                return <option key={dv.LOCNO}>{dv.DESCR40}</option>;
              })}
            </Input>
          </FormGroup>
          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
            <Label for="exampleText" className="col-4">
              Ghi chú
            </Label>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              placeholder="Nhập ghi chú...(Không bắt buộc)"
              className="col-8"
              onChange={handleChangeGhiChu}
            />
          </FormGroup>
          <Button color="primary" onClick={handleOnSubmitButton2} style={{ float: 'right' }}>
            {t('Hoàn tất')}
          </Button>
        </Form>
      </div>
    );
  };

  function handleChangeGhiChu(e: ChangeEvent<HTMLInputElement>): void {
    setGhiChu(e.currentTarget.value);
  }

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew" toggle={onHide}>
      <ModalHeader style={{ background: 'white' }}>
        <p style={{ color: 'black', fontWeight: 300 }}>{props.modalTitle}</p>
      </ModalHeader>
      <ModalBody>
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
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>{renderTab1()}</TabPane>
          <TabPane tabId={2}>{renderTab2()}</TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter className="justify-content-end"></ModalFooter>
    </Modal>
  );
};

export default ModalTwoTab;
