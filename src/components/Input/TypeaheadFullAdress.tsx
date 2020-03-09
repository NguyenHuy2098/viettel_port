import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import { map } from 'lodash';

interface Props {
  provinceId: string;
  handleChangeProvince: (event: React.FormEvent<HTMLInputElement>) => void;
  filteredProvinces: VtpAddress[];
  provinceErrorMessages: string | undefined;
  districtId: string;
  handleChangeDistrict: (event: React.FormEvent<HTMLInputElement>) => void;
  filteredDistricts: VtpAddress[];
  districtErrorMessages: string | undefined;
  wardId: string;
  handleChangeWard: (event: React.FormEvent<HTMLInputElement>) => void;
  filteredWards: VtpAddress[];
  wardErrorMessages: string | undefined;
  detailAddress: string;
  onChangeDetailAddress: (event: React.FormEvent<HTMLInputElement>) => void;
  detailAddressErrorMessages: string | undefined;
}

// eslint-disable-next-line max-lines-per-function
const TypeaheadFullAddress = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input type="select" id="provinceSelect" value={props.provinceId} onChange={props.handleChangeProvince}>
            <option value="0">{t('Chọn Thành phố/ Tỉnh')}</option>
            {map(
              props.filteredProvinces,
              (item: VtpAddress, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.I || undefined}>
                    {item.N}
                  </option>
                );
              },
            )}
          </Input>
          <div className="sipInputItemError">{props.provinceErrorMessages}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="select" id="districtSelect" value={props.districtId} onChange={props.handleChangeDistrict}>
            <option value="0">{t('Quận / Huyện')}</option>
            {map(
              props.filteredDistricts,
              (item: VtpAddress, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.I || undefined}>
                    {item.N}
                  </option>
                );
              },
            )}
          </Input>
          <div className="sipInputItemError">{props.districtErrorMessages}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="select" id="wardSelect" value={props.wardId} onChange={props.handleChangeWard}>
            <option value="0">{t('Chọn Phường/ Xã')}</option>
            {map(
              props.filteredWards,
              (item: VtpAddress, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.I || undefined}>
                    {item.N}
                  </option>
                );
              },
            )}
          </Input>
          <div className="sipInputItemError">{props.wardErrorMessages}</div>
        </Col>
      </Row>
      <Input
        type="text"
        placeholder={t('Nhập địa chỉ (tên đường, ngõ hẻm, số nhà)')}
        value={props.detailAddress}
        onChange={props.onChangeDetailAddress}
      />
      <div className="sipInputItemError">{props.detailAddressErrorMessages}</div>
    </>
  );
};

export default TypeaheadFullAddress;
