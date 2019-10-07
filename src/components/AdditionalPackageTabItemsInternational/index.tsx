/* eslint-disable max-lines */
import React, { useState, FormEvent } from 'react';
import { find, get, map, size, toString, trim } from 'lodash';
import { TabContent, TabPane, Nav, NavLink, Button, Row, Col, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

interface Props {
  removePackageItem: (index: number) => void;
  data: PackageItemInputType[];
  onChangeValue: (valueName: string, value: string | undefined, index: number) => void;
  isSubmit: boolean;
  packageItemErrorsList: PackageItemErrors[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const AdditionalPackageTabItemsInternational: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab, data, isSubmit, onChangeValue, packageItemErrorsList } = props;

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
      onChangeValue(valueName, trim(event.currentTarget.value), index);
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
                  value="V99"
                  name={`packageType_${index}`}
                  defaultChecked
                  onChange={handleChangeTextboxValue('COMMODITY_CODE', index)}
                />{' '}
                {t('Hàng hóa')}
              </Label>
            </Col>
            <Col lg="3" xs="12" className="pr-0">
              <Label check xs="12" className="pl-0 pr-0">
                <Input
                  type="radio"
                  value="V04"
                  name={`packageType_${index}`}
                  onChange={handleChangeTextboxValue('COMMODITY_CODE', index)}
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
            />
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
              value={item.GOODS_VALUE}
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
              value={item.QUANTITY_OF_PACKAGE}
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
              value={item.GROSS_WEIGHT}
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
    </>
  );
};
export default AdditionalPackageTabItemsInternational;
