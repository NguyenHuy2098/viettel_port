/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { find, get, map, size, toString } from 'lodash';
import { TabContent, TabPane, Nav, NavLink, Button, Row, Col, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { getValueOfNumberFormat, numberFormat } from 'utils/common';
import { action_COMMODITY_SUGGEST } from 'redux/CommoditySuggest/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import TypeaheadLoaiHoang from '../Input/TypeaheadLoaiHang';
import TypeaheadTenHang from '../Input/TypeaheadTenHang';

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

  function handleChangeTypeaheadInput(valueName: string, index: number) {
    return (input: string): void => {
      setCurrentTab(index);
      onChangeValue(valueName, input, index);
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }

  function handleChangeTypeaheadValue(valueName: string, index: number): (items: TypeaheadOption[]) => void {
    return (items: TypeaheadOption[]): void => {
      onChangeValue(valueName, get(items, '0.id', ''), index);
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

  const [commoditySuggest, setCommoditySuggest] = useState<CommoditySuggestedItem[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleHideChooseDropdown = (): void => {
    setCommoditySuggest([]);
  };

  useEffect((): void => {
    const thisDescription = get(data, `[${currentTab}].Description`, '');
    if (size(thisDescription) > 0) {
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
  }, [data, currentTab]);

  function handleChooseCommoditySuggest(index: number): (items: TypeaheadOption[]) => void {
    return (items: TypeaheadOption[]): void => {
      setCommoditySuggest([]);
      onChangeValue('Description', get(items, '0.id', ''), index);
      onChangeValue('GOODS_VALUE', toString(get(items, '0.price', '')), index);
      onChangeSuggestCommodity(get(items, '0.id', ''), toString(get(items, '0.price', '')), index);
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
        <p className="sipInputItemDescription text-left" style={{ paddingLeft: '0.35rem' }}>
          Trọng lượng quy đổi: &nbsp;
          <span className="text-semibold color-bluegreen font-italic" style={{ color: 'green' }}>
            {get(item, 'DIMENSION_WEIGHT', '0 G')}
          </span>
        </p>
      </Row>
    );
  }

  function renderPackageType(index: number): JSX.Element {
    return (
      <Row className="sipInputItem">
        <Label xs="12" lg="4">
          {t('Loại hàng')}
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
      <div>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã bưu phẩm')}
          </Label>
          <Col lg="8">
            <Input
              name={`maBuuPhamInput_${index}`}
              type="text"
              onChange={handleChangeTextboxValue('package_ID', index)}
            />
          </Col>
        </Row>
        {renderPackageType(index)}
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tên hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <TypeaheadTenHang
              onChange={handleChooseCommoditySuggest(index)}
              onInputChange={handleChangeTypeaheadInput('Description', index)}
              suggestions={commoditySuggest}
            />
            <div className="sipInputItemError">{handleErrorMessage(index, 'Description')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Nhóm hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg={8} xs={12}>
            <TypeaheadLoaiHoang
              loaiKienHang={item.COMMODITY_TYPE}
              value={get(item, 'COMMODITY_CODE')}
              onChange={handleChangeTypeaheadValue('COMMODITY_CODE', index)}
            />
            <div className="sipInputItemError">{handleErrorMessage(index, 'COMMODITY_CODE')}</div>
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
            {t('Giá trị hàng hóa')}
          </Label>
          <Col lg="8">
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
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Tiền thu hộ')}
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập tiền thu hộ (đ)')}
              value={get(item, 'COD') === '' ? '' : numberFormat(getValueOfNumberFormat(get(item, 'COD', '')))}
              onChange={handleChangeTextboxValue('COD', index)}
            />
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
                  deletablePackageItem: true,
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
        <button className="sipInputAddressDropdownOverlay hide" onClick={handleHideChooseDropdown}></button>
      ) : (
        <></>
      )}
    </>
  );
};
export default AdditionalPackageTabItems;
