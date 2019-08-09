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
import { action_GET_PROVINCE, action_GET_DISTRICT, action_GET_WARD } from 'redux/SearchLocation/actions';
import * as yup from 'yup';

interface Props {
  onHide: () => void;
  onChoose: (data: API.AddressPopupData) => void;
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

  const [filteredProvince, setFilteredProvince] = useState<API.VtpAddress[]>([]);
  const [fullDistrict, setFullDistrict] = useState<API.VtpAddress[]>([]);
  const [filteredDistrict, setFilteredDistrict] = useState<API.VtpAddress[]>([]);
  const [filteredWard, setFilteredWard] = useState<API.VtpAddress[]>([]);
  const [province, setProvince] = useState<string>(props.province || '0');
  const [district, setDistrict] = useState<string>(props.district || '0');
  const [ward, setWard] = useState<string>(props.ward || '0');
  const [detailAddress, setDetailAddress] = useState<string>(props.detailAddress || '');

  const getAddressNameById = (id: string, data: API.VtpAddress[]): string => {
    return get(find(data, { I: id }), 'N', '');
  };

  let addressData = {
    province: '',
    district: '',
    ward: '',
    detailAddress: '',
    fullAddress: '',
  };

  const schema = yup.object().shape({
    province: yup.string().required('Vui lòng nhập tỉnh / thành phố'),
    district: yup.string().required('Vui lòng nhập quận / huyện'),
    ward: yup.string().required('Vui lòng nhập phường / xã'),
    detailAddress: yup.string().required('Vui lòng nhập địa chỉ cụ thể'),
  });

  const handleSave = (): void => {
    onChoose(addressData);
    onHide();
  };

  let payloadProvince = {
    TypeLocation: 1,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 200,
  };
  let payloadDistrict = {
    TypeLocation: 2,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 1000,
  };
  let payloadWard = {
    TypeLocation: 3,
    Id: '',
    ParentId: district !== '0' ? district : '',
    PageIndex: 0,
    PageSize: 500,
  };

  useEffect((): void => {
    dispatch(
      action_GET_PROVINCE(payloadProvince, {
        onSuccess: (data: API.VtpAddressResponse): void => {
          setFilteredProvince(get(data, 'LocationModels'));
        },
      }),
    );
    dispatch(
      action_GET_DISTRICT(payloadDistrict, {
        onSuccess: (data: API.VtpAddressResponse): void => {
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
          onSuccess: (data: API.VtpAddressResponse): void => {
            setFilteredWard(get(data, 'LocationModels'));
          },
        }),
      );
    }
  }, [dispatch, district, payloadDistrict, payloadProvince, payloadWard, province]);

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
          onSuccess: (data: API.VtpAddressResponse): void => {
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
              <Label for="provinceSelect">{t('Thành phố/ Tỉnh')}</Label>
              <Input
                type="select"
                name="select"
                id="provinceSelect"
                defaultValue={province}
                onChange={handleChangeProvince}
              >
                <option value="0">{t('Chọn Thành phố/ Tỉnh')}</option>
                {map(
                  filteredProvince,
                  (item: API.VtpAddress, index: number): JSX.Element => {
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
              <Label for="districtSelect">{t('Chọn Quận / Huyện')}</Label>
              <Input type="select" name="select" id="districtSelect" value={district} onChange={handleChangeDistrict}>
                <option value="0">{t('Quận / Huyện')}</option>
                {map(
                  filteredDistrict,
                  (item: API.VtpAddress, index: number): JSX.Element => {
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
              <Label for="wardSelect">{t('Phường/ Xã')}</Label>
              <Input type="select" name="select" id="wardSelect" value={ward} onChange={handleChangeWard}>
                <option value="0">{t('Chọn Phường/ Xã')}</option>
                {map(
                  filteredWard,
                  (item: API.VtpAddress, index: number): JSX.Element => {
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
                placeholder={t('Nhập địa chỉ(tên đường, ngõ hẻm, số nhà)')}
                value={detailAddress}
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
    <>
      <Modal className="sipTitleModalCreateNew" isOpen={visible}>
        <ModalHeader toggle={onHide}>Nhập địa chỉ</ModalHeader>
        <ModalBody>{renderFormLocation()}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleValidate}>
            {t('Ghi lại')}
          </Button>{' '}
          <Button onClick={onHide}>{t('Hủy')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ChoosingAddressPopup;
