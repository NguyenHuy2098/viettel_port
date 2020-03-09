import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import { filter, map } from 'lodash';
import Typeahead from './Typeahead';

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

  const mapVtpAddressToTypeaheadOption = (item: VtpAddress): TypeaheadOption => ({
    id: item.I,
    label: item.N,
  });

  const selectedProvince = React.useMemo(() => {
    return map(filter(props.filteredProvinces, { I: props.provinceId }), mapVtpAddressToTypeaheadOption);
  }, [props.provinceId, props.filteredProvinces]);

  const selectedDistrict = React.useMemo(() => {
    return map(filter(props.filteredDistricts, { I: props.districtId }), mapVtpAddressToTypeaheadOption);
  }, [props.districtId, props.filteredDistricts]);

  const selectedWard = React.useMemo(() => {
    return map(filter(props.filteredWards, { I: props.wardId }), mapVtpAddressToTypeaheadOption);
  }, [props.wardId, props.filteredWards]);

  return (
    <>
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Typeahead
            id="provinceSelect"
            selected={selectedProvince}
            options={map(props.filteredProvinces, mapVtpAddressToTypeaheadOption)}
            placeholder={t('Thành Phố / Tỉnh')}
          />
          <div className="sipInputItemError">{props.provinceErrorMessages}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Typeahead
            id="districtSelect"
            selected={selectedDistrict}
            options={map(props.filteredDistricts, mapVtpAddressToTypeaheadOption)}
            placeholder={t('Quận / Huyện')}
          />
          <div className="sipInputItemError">{props.districtErrorMessages}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Typeahead
            id="wardSelect"
            selected={selectedWard}
            options={map(props.filteredWards, mapVtpAddressToTypeaheadOption)}
            placeholder={t('Phường / Xã')}
          />
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
