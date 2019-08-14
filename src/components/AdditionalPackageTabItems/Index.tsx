/* eslint-disable max-lines */
import React, { useState, FormEvent } from 'react';
import { find, get, map, size, toString } from 'lodash';
import { TabContent, TabPane, Nav, NavLink, Button, Row, Col, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

interface Props {
  removePackageItem: (index: number) => void;
  data: API.PackageItem[];
  onChangeValue: (valueName: string, value: string | undefined, index: number) => void;
  isSubmit: boolean;
  parentCount: number;
  packageItemErrorsList: API.PackageItemErrors[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const AdditionalPackageTabItems: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab, data, isSubmit, onChangeValue, packageItemErrorsList, parentCount } = props;

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

  React.useEffect((): void => {
    if (isSubmit) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, parentCount, isSubmit]);

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

  function renderPackageSize(item: API.PackageItem, index: number): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Dài (cm)')}
            value={item.Length}
            onChange={handleChangeTextboxValue('Length', index)}
          />
          <div className="sipInputItemError">{handleErrorMessage(index, 'Length')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Rộng (cm)')}
            value={item.Width}
            onChange={handleChangeTextboxValue('Width', index)}
          />
          <div className="sipInputItemError">{handleErrorMessage(index, 'Width')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Cao (cm)')}
            value={item.Hight}
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
                  onChange={handleChangeTextboxValue('COMODITY_CODE', index)}
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
                  onChange={handleChangeTextboxValue('COMODITY_CODE', index)}
                />{' '}
                {t('Thư')}
              </Label>
            </Col>
            <Col lg="4" xs="12" className="pr-0">
              <Label check xs="12" className="pl-0 pr-0">
                <Input
                  type="radio"
                  value="V01"
                  name={`packageType_${index}`}
                  onChange={handleChangeTextboxValue('COMODITY_CODE', index)}
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
  function renderTabContent(index: number, item: API.PackageItem): JSX.Element {
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
            {t('Giá trị & thu hộ')}
          </Label>
          <Col lg="8">
            <Row className="sipInputItemGroup">
              <Col xs="12" md="6" className="mb-2">
                <Input
                  type="text"
                  placeholder={t('Nhập giá trị (đ)')}
                  value={item.GOODS_VALUE}
                  onChange={handleChangeTextboxValue('GOODS_VALUE', index)}
                />
                <div className="sipInputItemError">{handleErrorMessage(index, 'GOODS_VALUE')}</div>
              </Col>
              <Col xs="12" md="6" className="mb-2">
                <Input
                  type="text"
                  placeholder={t('Nhập tiền thu hộ (đ)')}
                  value={item.COD}
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
              value={item.GROSS_WEIGHT}
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
          (item: API.PackageItem, index: number): JSX.Element => {
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
          (item: API.PackageItem, index: number): JSX.Element => {
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
export default AdditionalPackageTabItems;
