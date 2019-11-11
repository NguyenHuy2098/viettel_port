/* eslint-disable max-lines */
import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { find, get, map, size, toString } from 'lodash';
import {
  TabContent,
  TabPane,
  Nav,
  NavLink,
  Button,
  Row,
  Col,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { default as NumberFormat } from 'react-number-format';

import { getValueOfNumberFormat, numberFormat } from 'utils/common';
import { action_COMMODITY_SUGGEST } from 'redux/CommoditySuggest/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';

interface Props {
  removePackageItem: (index: number) => void;
  data: PackageItemInputType[];
  onChangeValue: (valueName: string, value: string | undefined, index: number) => void;
  onChangeCommodityType: (value: string, index: number) => void;
  onChangeSuggestCommodity: (descriptionValue: string, goodsValue: string, index: number) => void;
  isSubmit: boolean;
  packageItemErrorsList: PackageItemErrors[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const AdditionalPackageTabItems: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    activeTab,
    setActiveTab,
    data,
    isSubmit,
    onChangeValue,
    packageItemErrorsList,
    onChangeCommodityType,
    onChangeSuggestCommodity,
  } = props;

  //________hook to trigger input focus validating
  const [count, setCount] = useState<number>(0);

  //________Yup errors list after executing validating
  //________return corresponding error according to field name
  function handleErrorMessage(errorTabIndex: number, errorName: string): string | undefined {
    if (packageItemErrorsList.length) {
      return get(
        find(get(packageItemErrorsList, `[${errorTabIndex}].errors`), (item: yup.ValidationError): boolean => {
          return item.path === errorName;
        }),
        'message',
      );
    }
    return '';
  }

  function handleChangeTextboxValue(
    valueName: string,
    index: number,
  ): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      onChangeValue(valueName, event.currentTarget.value, index);
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }

  function handleChangeCommodityType(index: number): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      onChangeCommodityType(event.currentTarget.value, index);
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }
  //______________________tab events

  function toggleTab(tab: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setActiveTab(tab);
    };
  }

  function removePackageItem(index: number): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      if (index + 1 < parseInt(activeTab)) {
        setActiveTab(toString(parseInt(activeTab) - 1));
      }
      props.removePackageItem(index);
    };
  }

  //_________________COMMODITY suggest event handle__________________________

  const [countCommoditySuggest, setCountCommoditySuggest] = useState<number>(0);
  const [commoditySuggest, setCommoditySuggest] = useState<CommoditySuggestedItem[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleHideChooseDropdown = (): void => {
    setCommoditySuggest([]);
  };

  function handleKeyPressHangHoa(index: number): (event: React.KeyboardEvent<HTMLInputElement>) => void {
    return (event: React.KeyboardEvent<HTMLInputElement>): void => {
      setCountCommoditySuggest(countCommoditySuggest + 1);
      setCurrentTab(index);
    };
  }

  React.useEffect((): void => {
    const thisDescription = get(data, `[${currentTab}].Description`, '');
    if (countCommoditySuggest > 0 && size(thisDescription) > 0) {
      dispatch(
        action_COMMODITY_SUGGEST(
          { q: thisDescription },
          {
            onSuccess: (data: SuggestedCommodity): void => {
              setCommoditySuggest(get(data, 'items'));
            },
            onFailure: (error: HttpRequestErrorType): void => {
              setCommoditySuggest([]);
            },
          },
        ),
      );
    } else {
      setCommoditySuggest([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countCommoditySuggest, currentTab]);

  function handleChooseCommoditySuggest(
    name: string,
    price: number,
    index: number,
  ): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setCommoditySuggest([]);
      onChangeValue('Description', name, index);
      onChangeValue('GOODS_VALUE', toString(price), index);
      onChangeSuggestCommodity(name, toString(price), index);
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }

  //___________________________________________

  function renderPackageSize(item: PackageItemInputType, index: number): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Dài (cm)')}
            value={get(item, 'Length') === '' ? '' : numberFormat(getValueOfNumberFormat(get(item, 'Length', '')))}
            onChange={handleChangeTextboxValue('Length', index)}
          />
          <div className="sipInputItemError">{handleErrorMessage(index, 'Length')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Rộng (cm)')}
            value={get(item, 'Width') === '' ? '' : numberFormat(getValueOfNumberFormat(get(item, 'Width', '')))}
            onChange={handleChangeTextboxValue('Width', index)}
          />
          <div className="sipInputItemError">{handleErrorMessage(index, 'Width')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Cao (cm)')}
            value={get(item, 'Hight') === '' ? '' : numberFormat(getValueOfNumberFormat(get(item, 'Hight', '')))}
            onChange={handleChangeTextboxValue('Hight', index)}
          />
          <div className="sipInputItemError">{handleErrorMessage(index, 'Hight')}</div>
        </Col>
      </Row>
    );
  }

  function renderPackageType(index: number): JSX.Element {
    return (
      <Row className="sipInputItem">
        <Label xs="12" lg="4">
          {t('Loại kiện hàng')}
        </Label>
        <Col lg={8} xs={12}>
          <Row>
            <Col lg="5" xs="12" className="pr-0">
              <Label check xs="12" className="pl-0 pr-0">
                <Input
                  type="radio"
                  value="V3"
                  name={`packageType_${index}`}
                  defaultChecked
                  onChange={handleChangeCommodityType(index)}
                />{' '}
                {t('Bưu gửi nhỏ')}
              </Label>
            </Col>
            <Col lg="3" xs="12" className="pr-0">
              <Label check xs="12" className="pl-0 pr-0">
                <Input
                  type="radio"
                  value="V2"
                  name={`packageType_${index}`}
                  onChange={handleChangeCommodityType(index)}
                />{' '}
                {t('Thư')}
              </Label>
            </Col>
            <Col lg="4" xs="12" className="pr-0">
              <Label check xs="12" className="pl-0 pr-0">
                <Input
                  type="radio"
                  value="V1"
                  name={`packageType_${index}`}
                  onChange={handleChangeCommodityType(index)}
                />{' '}
                {t('Kiện')}
              </Label>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderTabContent(index: number, item: PackageItemInputType): JSX.Element {
    return (
      <div className="sipInputBlock">
        {renderPackageType(index)}
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Loại hàng')}
          </Label>
          <Col lg={8} xs={12}>
            <Input
              type="select"
              value={item.COMMODITY_CODE}
              onChange={handleChangeTextboxValue('COMMODITY_CODE', index)}
            >
              {item.COMMODITY_TYPE === 'V2' ? (
                <option value="V04">{t('Thư/ Tài liệu')}</option>
              ) : (
                <>
                  <option value="V01">{t('Thực phẩm')}</option>
                  <option value="V02">{t('Đồ uống')}</option>
                  <option value="V03">{t('Thiết bị điện tử')}</option>
                  <option value="V04">{t('Thư/ Tài liệu')}</option>
                  <option value="V05">{t('Vải, quần áo')}</option>
                  <option value="V06">{t('Vắc xin')}</option>
                  <option value="V07">{t('Hàng đông lạnh')}</option>
                  <option value="V99">{t('Khác')}</option>
                </>
              )}
            </Input>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tên hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nội dung hàng hoá')}
              value={item.Description}
              onChange={handleChangeTextboxValue('Description', index)}
              onKeyUp={handleKeyPressHangHoa(index)}
            />
            <ListGroup className="sipInputAddressDropdown">
              {map(
                commoditySuggest,
                (item: CommoditySuggestedItem, suggestedIndex: number): JSX.Element => {
                  return (
                    <ListGroupItem
                      tag="button"
                      key={suggestedIndex}
                      onClick={handleChooseCommoditySuggest(item.name, item.price, index)}
                    >
                      {get(item, 'name', '')} -{' '}
                      <NumberFormat
                        value={get(item, 'price', '')}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' đ'}
                      />
                    </ListGroupItem>
                  );
                },
              )}
            </ListGroup>
            <div className="sipInputItemError">{handleErrorMessage(index, 'Description')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Số lượng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Số lượng')}
              value={
                get(item, 'QUANTITY_OF_PACKAGE') === ''
                  ? ''
                  : numberFormat(getValueOfNumberFormat(get(item, 'QUANTITY_OF_PACKAGE', '')))
              }
              onChange={handleChangeTextboxValue('QUANTITY_OF_PACKAGE', index)}
            />
            <div className="sipInputItemError">{handleErrorMessage(index, 'QUANTITY_OF_PACKAGE')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Giá trị & thu hộ')}
          </Label>
          <Col lg="8">
            <Row className="sipInputItemGroup">
              <Col xs="12" md="6" className="mb-2">
                <Input
                  type="text"
                  placeholder={t('Nhập giá trị (đ)')}
                  value={
                    get(item, 'GOODS_VALUE') === ''
                      ? ''
                      : numberFormat(getValueOfNumberFormat(get(item, 'GOODS_VALUE', '')))
                  }
                  onChange={handleChangeTextboxValue('GOODS_VALUE', index)}
                />
                <div className="sipInputItemError">{handleErrorMessage(index, 'GOODS_VALUE')}</div>
              </Col>
              <Col xs="12" md="6" className="mb-2">
                <Input
                  type="text"
                  placeholder={t('Nhập tiền thu hộ (đ)')}
                  value={get(item, 'COD') === '' ? '' : numberFormat(getValueOfNumberFormat(get(item, 'COD', '')))}
                  onChange={handleChangeTextboxValue('COD', index)}
                />
                <div className="sipInputItemError">{handleErrorMessage(index, 'COD')}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Trọng lượng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập  trọng lượng (g)')}
              value={
                get(item, 'GROSS_WEIGHT') === ''
                  ? ''
                  : numberFormat(getValueOfNumberFormat(get(item, 'GROSS_WEIGHT', '')))
              }
              onChange={handleChangeTextboxValue('GROSS_WEIGHT', index)}
            />
            <div className="sipInputItemError">{handleErrorMessage(index, 'GROSS_WEIGHT')}</div>
            <p className="sipInputItemDescription text-right">
              Trọng lượng quy đổi: &nbsp;
              <span className="text-semibold color-bluegreen font-italic">500g</span>
            </p>
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            {t('Kích thước')}
          </Label>
          <Col lg="8">{renderPackageSize(item, index)}</Col>
        </Row>
      </div>
    );
  }

  return size(data) === 0 ? (
    <></>
  ) : (
    <>
      <Nav tabs className="packageTabTitle">
        {map(
          data,
          (item: PackageItemInputType, index: number): JSX.Element => {
            return (
              <NavLink
                className={classnames({
                  active: activeTab === toString(index + 1),
                  deletablePackageItem: size(data) === 1,
                })}
                onClick={toggleTab(toString(index + 1))}
                key={index}
              >
                {t('Hàng hóa')} {toString(index + 2)}
                <Button onClick={removePackageItem(index)}>
                  <i className="fa fa-close" />
                </Button>
              </NavLink>
            );
          },
        )}
      </Nav>
      <TabContent activeTab={activeTab} className="packageTabContent">
        {map(
          data,
          (item: PackageItemInputType, index: number): JSX.Element => {
            return (
              <TabPane tabId={toString(index + 1)} key={index}>
                {renderTabContent(index, item)}
              </TabPane>
            );
          },
        )}
      </TabContent>
      {size(commoditySuggest) > 0 ? (
        <button className="sipInputAddressDropdownOverlay" onClick={handleHideChooseDropdown}></button>
      ) : (
        <></>
      )}
    </>
  );
};
export default AdditionalPackageTabItems;
