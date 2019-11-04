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
const AdditionalPackageTabItemsInternational: React.FC<Props> = (props: Props): JSX.Element => {
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
                {t('Hàng hóa')}
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
            {t('Giá trị')}
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
            <div className="sipInputItemError">{handleErrorMessage(index, 'GOODS_VALUE')}</div>
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
export default AdditionalPackageTabItemsInternational;
