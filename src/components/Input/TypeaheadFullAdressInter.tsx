import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import { filter, map } from 'lodash';
import Typeahead from './Typeahead';

interface Props {
  provinceId: string;
  handleChangeProvince: (options: TypeaheadOption[]) => void;
  filteredProvinces: VtpAddress[];
  provinceErrorMessages: string | undefined;
  districtId: string;
  handleChangeDistrict: (options: TypeaheadOption[]) => void;
  filteredDistricts: VtpAddress[];
  districtErrorMessages: string | undefined;
  wardId: string;
  handleChangeWard: (options: TypeaheadOption[]) => void;
  filteredWards: VtpAddress[];
  wardErrorMessages: string | undefined;
  detailAddress: string;
  onChangeDetailAddress: (event: React.FormEvent<HTMLInputElement>) => void;
  detailAddressErrorMessages: string | undefined;
  focus?: boolean;
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

  const filterByFields = ['label'];

  const filterByCallback = (): boolean => {
    return true;
  };

  return (
    <>
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Typeahead
            id="provinceSelect"
            selected={selectedProvince}
            onChange={props.handleChangeProvince}
            options={map(props.filteredProvinces, mapVtpAddressToTypeaheadOption)}
            placeholder={t('Th??nh Ph??? / T???nh')}
            filterBy={props.provinceId ? filterByCallback : filterByFields}
          />
          <div className="sipInputItemError">{props.provinceErrorMessages}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Typeahead
            id="districtSelect"
            selected={selectedDistrict}
            onChange={props.handleChangeDistrict}
            options={map(props.filteredDistricts, mapVtpAddressToTypeaheadOption)}
            placeholder={t('Qu???n / Huy???n')}
            filterBy={props.districtId ? filterByCallback : filterByFields}
          />
          <div className="sipInputItemError">{props.districtErrorMessages}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Typeahead
            id="wardSelect"
            selected={selectedWard}
            onChange={props.handleChangeWard}
            options={map(props.filteredWards, mapVtpAddressToTypeaheadOption)}
            placeholder={t('Ph?????ng / X??')}
            filterBy={props.wardId ? filterByCallback : filterByFields}
          />
          <div className="sipInputItemError">{props.wardErrorMessages}</div>
        </Col>
      </Row>
      <Input
        id="detailAddress"
        autoFocus={props.focus}
        type="text"
        placeholder={t('Nh???p ?????a ch??? (t??n ???????ng, ng?? h???m, s??? nh??)')}
        value={props.detailAddress}
        onChange={props.onChangeDetailAddress}
      />
      <div className="sipInputItemError">{props.detailAddressErrorMessages}</div>
    </>
  );
};

export default TypeaheadFullAddress;
