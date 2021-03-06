/* eslint-disable max-lines */
import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { filter, find, get, map } from 'lodash';
import {
  Col,
  Input,
  Label,
  Row,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { action_GET_PROVINCE, action_GET_DISTRICT, action_GET_WARD } from 'redux/LocationSearch/actions';
import * as yup from 'yup';
import { getAddressNameById } from 'utils/common';

interface Props {
  onHide: () => void;
  onChoose: (data: AddressPopupData) => void;
  visible: boolean;
  province?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;
}
// eslint-disable-next-line max-lines-per-function
const ChoosingAddressPopup: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onHide, onChoose, visible } = props;

  //________when submit button clicked, enable input focus to validate
  const [isSubmit, setIsSubmit] = useState(false);
  //________hook to trigger input focus validating
  const [count, setCount] = useState(0);
  //________Yup errors list after executing validating
  const [errors, setErrors] = useState<yup.ValidationError[]>([]);
  //________return corresponding error according to field name
  function handleErrorMessage(errors: yup.ValidationError[], errorName: string): string | undefined {
    return get(
      find(errors, (item: yup.ValidationError): boolean => {
        return item.path === errorName;
      }),
      'message',
    );
  }

  const [filteredProvince, setFilteredProvince] = useState<VtpAddress[]>([]);
  const [fullDistrict, setFullDistrict] = useState<VtpAddress[]>([]);
  const [filteredDistrict, setFilteredDistrict] = useState<VtpAddress[]>([]);
  const [filteredWard, setFilteredWard] = useState<VtpAddress[]>([]);
  const [province, setProvince] = useState<string>(props.province || '0');
  const [district, setDistrict] = useState<string>(props.district || '0');
  const [ward, setWard] = useState<string>(props.ward || '0');
  const [detailAddress, setDetailAddress] = useState<string>(props.detailAddress || '');

  const addressData = {
    province: '',
    district: '',
    ward: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    detailAddress: '',
    fullAddress: '',
  };

  const schema = yup.object().shape({
    province: yup.string().required('Vui l??ng nh???p t???nh / th??nh ph???'),
    district: yup.string().required('Vui l??ng nh???p qu???n / huy???n'),
    ward: yup.string().required('Vui l??ng nh???p ph?????ng / x??'),
    detailAddress: yup.string().required('Vui l??ng nh???p ?????a ch??? c??? th???'),
  });

  const handleClearData = (): void => {
    setIsSubmit(false);
    setErrors([]);
    onHide();
  };

  const handleSave = (): void => {
    onChoose(addressData);
    onHide();
  };

  const payloadProvince = {
    TypeLocation: 1,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 200,
  };
  const payloadDistrict = {
    TypeLocation: 2,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 1000,
  };
  const payloadWard = {
    TypeLocation: 3,
    Id: '',
    ParentId: district !== '0' ? district : '',
    PageIndex: 0,
    PageSize: 500,
  };

  useEffect((): void => {
    if (!props.province) {
      setProvince('0');
    } else {
      setProvince(props.province);
    }
    if (!props.district) {
      setDistrict('0');
    } else {
      setDistrict(props.district);
    }
    if (!props.ward) {
      setWard('0');
    } else {
      setWard(props.ward);
    }
    if (!props.detailAddress) {
      setDetailAddress('');
    } else {
      setDetailAddress(props.detailAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, props.province, props.district, props.ward, props.detailAddress]);

  useEffect((): void => {
    dispatch(
      action_GET_PROVINCE(payloadProvince, {
        onSuccess: (data: VtpAddressResponse): void => {
          setFilteredProvince(get(data, 'LocationModels'));
        },
      }),
    );
    dispatch(
      action_GET_DISTRICT(payloadDistrict, {
        onSuccess: (data: VtpAddressResponse): void => {
          setFullDistrict(get(data, 'LocationModels'));
          if (province !== '0') {
            setFilteredDistrict(filter(get(data, 'LocationModels'), { P: province }));
          }
        },
      }),
    );
    if (district !== '0') {
      dispatch(
        action_GET_WARD(payloadWard, {
          onSuccess: (data: VtpAddressResponse): void => {
            setFilteredWard(get(data, 'LocationModels'));
          },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, visible]);

  const handleChangeProvince = (event: React.FormEvent<HTMLInputElement>): void => {
    setProvince(event.currentTarget.value);
    setDistrict('0');
    setWard('0');
    if (event.currentTarget.value !== '0') {
      setFilteredDistrict(filter(fullDistrict, { P: event.currentTarget.value }));
    } else {
      setFilteredDistrict([]);
    }
    setFilteredWard([]);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  };

  const handleChangeDistrict = (event: React.FormEvent<HTMLInputElement>): void => {
    setDistrict(event.currentTarget.value);
    if (event.currentTarget.value !== '0') {
      payloadWard.ParentId = event.currentTarget.value;
      dispatch(
        action_GET_WARD(payloadWard, {
          onSuccess: (data: VtpAddressResponse): void => {
            setFilteredWard(get(data, 'LocationModels'));
          },
        }),
      );
    } else {
      setFilteredWard([]);
    }
    setWard('0');
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  };

  const handleChangeWard = (event: React.FormEvent<HTMLInputElement>): void => {
    setWard(event.currentTarget.value);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  };

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }

  function setAddressData(): void {
    const provinceName = getAddressNameById(province, filteredProvince);
    const districtName = getAddressNameById(district, filteredDistrict);
    const wardName = getAddressNameById(ward, filteredWard);
    addressData.province = provinceName;
    addressData.district = districtName;
    addressData.ward = wardName;
    addressData.provinceId = province;
    addressData.districtId = district;
    addressData.wardId = ward;
    addressData.detailAddress = detailAddress;
    addressData.fullAddress = `${detailAddress} - ${wardName} - ${districtName} - ${provinceName}`;
  }

  React.useEffect((): void => {
    if (isSubmit) {
      setAddressData();
      schema
        .validate(addressData, { abortEarly: false })
        .then((): void => setErrors([]))
        .catch((error: yup.ValidationError): void => {
          setErrors(error.inner);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function handleValidate(e: FormEvent): void {
    e.preventDefault();
    setAddressData();
    setIsSubmit(true);
    // check validate
    schema
      .validate(addressData, { abortEarly: false })
      .then((): void => {
        setErrors([]);
        handleSave();
      })
      .catch((error: yup.ValidationError): void => {
        setErrors(error.inner);
      });
  }

  // eslint-disable-next-line max-lines-per-function
  function renderFormLocation(): JSX.Element {
    return (
      <Form className="w-100">
        <FormGroup className="w-100">
          <Row>
            <Col xs="12 mb-3">
              <Label for="provinceSelect">{t('Th??nh ph???/ T???nh')}</Label>
              <Input
                type="select"
                id="provinceSelect"
                defaultValue={province}
                value={province}
                onChange={handleChangeProvince}
              >
                <option value="0">{t('Ch???n Th??nh ph???/ T???nh')}</option>
                {map(
                  filteredProvince,
                  (item: VtpAddress, index: number): JSX.Element => {
                    return (
                      <option key={index} value={item.I || undefined}>
                        {item.N}
                      </option>
                    );
                  },
                )}
              </Input>
              <div className="sipInputItemError">{handleErrorMessage(errors, 'province')}</div>
            </Col>
            <Col xs="12 mb-3">
              <Label for="districtSelect">{t('Ch???n Qu???n / Huy???n')}</Label>
              <Input
                type="select"
                id="districtSelect"
                value={district}
                defaultValue={district}
                onChange={handleChangeDistrict}
              >
                <option value="0">{t('Qu???n / Huy???n')}</option>
                {map(
                  filteredDistrict,
                  (item: VtpAddress, index: number): JSX.Element => {
                    return (
                      <option key={index} value={item.I || undefined}>
                        {item.N}
                      </option>
                    );
                  },
                )}
              </Input>
              <div className="sipInputItemError">{handleErrorMessage(errors, 'district')}</div>
            </Col>
            <Col xs="12 mb-3">
              <Label for="wardSelect">{t('Ph?????ng/ X??')}</Label>
              <Input type="select" id="wardSelect" value={ward} defaultValue={ward} onChange={handleChangeWard}>
                <option value="0">{t('Ch???n Ph?????ng/ X??')}</option>
                {map(
                  filteredWard,
                  (item: VtpAddress, index: number): JSX.Element => {
                    return (
                      <option key={index} value={item.I || undefined}>
                        {item.N}
                      </option>
                    );
                  },
                )}
              </Input>
              <div className="sipInputItemError">{handleErrorMessage(errors, 'ward')}</div>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="w-100">
          <Row>
            <Col md="12">
              <Input
                type="text"
                placeholder={t('Nh???p ?????a ch???(t??n ???????ng, ng?? h???m, s??? nh??)')}
                value={detailAddress}
                defaultValue={detailAddress}
                onChange={handleChangeTextboxValue(setDetailAddress)}
              />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'detailAddress')}</div>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }

  return (
    <Modal className="sipTitleModalCreateNew" isOpen={visible}>
      <ModalHeader toggle={handleClearData}>Nh???p ?????a ch???</ModalHeader>
      <ModalBody>{renderFormLocation()}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleValidate}>
          {t('Ghi l???i')}
        </Button>{' '}
        <Button onClick={handleClearData}>{t('H???y')}</Button>
      </ModalFooter>
    </Modal>
  );
};
export default ChoosingAddressPopup;
