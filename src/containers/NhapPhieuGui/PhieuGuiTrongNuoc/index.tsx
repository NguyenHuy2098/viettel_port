/* eslint-disable max-lines */
import React from 'react';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import * as yup from 'yup';
import produce from 'immer';
import { default as NumberFormat } from 'react-number-format';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { get, find, findIndex, forEach, map, noop, reduce, set, size, toString } from 'lodash';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { action_MIOA_ZTMI012 } from 'redux/MIOA_ZTMI012/actions';
import { action_MIOA_ZTMI011 } from 'redux/MIOA_ZTMI011/actions';
import { action_GET_TRANSPORT_METHOD } from 'redux/SIOA_ZTMI068/actions';
// import { makeSelectProfile } from 'redux/auth/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import ChoosingAddressPopup from 'components/ChoosingAddressPopup/Index';
import AdditionalPackageTabItems from 'components/AdditionalPackageTabItems/Index';

let dichVuCongThem: string[] = [];
// eslint-disable-next-line max-lines-per-function
const PhieuGuiTrongNuoc: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const dataSelectProfile = useSelector(makeSelectProfile, shallowEqual);

  const isVnPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

  const schema = yup.object().shape({
    maPhieuGui: yup.string().required(t('Vui lòng nhập mã phiếu gửi')),
    maKhachHang: yup.string().required(t('Vui lòng nhập mã khách hàng')),
    dienThoaiSender: yup
      .string()
      .required(t('Vui lòng nhập số điện thoại'))
      .matches(isVnPhoneMobile, t('Vui lòng nhập đúng định dạng số điện thoại')),
    hoTenSender: yup.string().required(t('Vui lòng nhập họ tên')),
    diaChiSender: yup.string().required(t('Vui lòng nhập địa chỉ')),
    dienThoaiReceiver: yup
      .string()
      .required(t('Vui lòng nhập số điện thoại'))
      .matches(isVnPhoneMobile, t('Vui lòng nhập đúng định dạng số điện thoại')),
    hoTenReceiver: yup.string().required(t('Vui lòng nhập họ tên')),
    diaChiReceiver: yup.string().required(t('Vui lòng nhập địa chỉ')),
    tenHang: yup.string().required(t('Vui lòng nhập tên hàng hóa')),
    soLuong: yup
      .number()
      .required(t('Vui lòng nhập số lượng'))
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số'))
      .integer(t('Vui lòng nhập số nguyên')),
    giaTri: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    tienThuHo: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    trongLuong: yup
      .number()
      .required(t('Vui lòng nhập trọng lượng'))
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    kichThuocDai: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    kichThuocRong: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    kichThuocCao: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
  });

  const packageItemErrors: API.PackageItemErrors[] = [];
  const packageTabSchema = yup.object().shape({
    Description: yup.string().required(t('Vui lòng nhập tên hàng hóa')),
    GOODS_VALUE: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    QUANTITY_OF_PACKAGE: yup
      .number()
      .required(t('Vui lòng nhập số lượng'))
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số'))
      .integer(t('Vui lòng nhập số nguyên')),
    COD: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    GROSS_WEIGHT: yup
      .number()
      .required(t('Vui lòng nhập trọng lượng'))
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    Length: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    Width: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
    Hight: yup
      .number()
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .typeError(t('Vui lòng nhập định dạng số')),
  });

  //________when submit button clicked, enable input focus to validate
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  //________hook to trigger input focus validating
  const [count, setCount] = useState<number>(0);
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
  //__________________________________________________________
  const [maPhieuGui, setMaPhieuGui] = useState<string>('');
  const [maKhachHang, setMaKhachHang] = useState<string>('');
  const [dienThoaiSender, setDienThoaiSender] = useState<string>('');
  const [hoTenSender, setHoTenSender] = useState<string>('');
  const [diaChiSender, setDiaChiSender] = useState<string>('');
  const [provinceSender, setProvinceSender] = useState<string>('');
  const [districtSender, setDistrictSender] = useState<string>('');
  const [wardSender, setWardSender] = useState<string>('');
  const [detailAddressSender, setDetailAddressSender] = useState<string>('');
  const [dienThoaiReceiver, setDienThoaiReceiver] = useState<string>('');
  const [hoTenReceiver, setHoTenReceiver] = useState<string>('');
  const [diaChiReceiver, setDiaChiReceiver] = useState<string>('');
  const [provinceReceiver, setProvinceReceiver] = useState<string>('');
  const [districtReceiver, setDistrictReceiver] = useState<string>('');
  const [wardReceiver, setWardReceiver] = useState<string>('');
  const [detailAddressReceiver, setDetailAddressReceiver] = useState<string>('');
  const [tenHang, setTenHang] = useState<string>('');
  const [soLuong, setSoLuong] = useState<string>('');
  const [giaTri, setGiaTri] = useState<string>('');
  const [tienThuHo, setTienThuHo] = useState<string>('');
  const [trongLuong, setTrongLuong] = useState<string>('');
  const [kichThuocDai, setKichThuocDai] = useState<string>('');
  const [kichThuocRong, setKichThuocRong] = useState<string>('');
  const [kichThuocCao, setKichThuocCao] = useState<string>('');
  // const [maKhuyenMai, setMaKhuyenMai] = useState<string>('');
  const [thoiGianPhat, setThoiGianPhat] = useState<Date>(new Date());
  //_____non-validated items
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState<string>('VCN');
  let loaiHinhDichVu = 'VCN';
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('V99');
  const [nguoiThanhToan, setNguoiThanhToan] = useState<string>('PP');
  const [choXemHang, setChoXemHang] = useState<string>('choXem');
  const [diemGiaoNhan, setDiemGiaoNhan] = useState<string>('ZDD');
  const [ghiChu, setGhiChu] = useState<string>('');
  //______ Transport method

  const [transportMethodArr, setTransportMethodArr] = useState<API.TransportMethodItem[]>([]);
  const [uncheckAllAdditionalCheckbox, setUncheckAllAdditionalCheckbox] = useState<boolean | undefined>(undefined);
  //_______open Address modal
  const [modalSender, setModalSender] = useState<boolean>(false);
  const [modalReceiver, setModalReceiver] = useState<boolean>(false);
  //______ Package item tab

  const [activeTab, setActiveTab] = useState<string>('1');
  const [packageItemArr, setPackageItemArr] = useState<API.PackageItem[]>([]);
  const [packageItemErrorsList, setPackageItemErrorsList] = useState<API.PackageItemErrors[]>([]);
  //________packageItem valid checking
  let tabValid = true;
  //_______summary order amount
  const [cuocChinh, setCuocChinh] = useState<string>('0 đ');
  const [cuocCongThem, setCuocCongThem] = useState<string>('0 đ');
  const [tongCuoc, setTongCuoc] = useState<string>('0 đ');

  //__________________ package item partial events

  const newPackageItem: API.PackageItem = {
    Flag: 'I',
    PACKAGING_MATERIAL: '',
    Description: '',
    PACKAGE_TYPE: '',
    QUANTITY_OF_PACKAGE: '',
    QUANTITY_OF_UNIT: '',
    GROSS_WEIGHT: '',
    GROSS_WEIGHT_OF_UNIT: 'g',
    NET_WEIGHT: '100',
    NET_WEIGHT_OF_UNIT: 'g',
    Length: '',
    Hight: '',
    Width: '',
    Note: '',
    GOODS_VALUE: '',
    Currency: 'VN',
    COMODITY_CODE: 'V04',
    COD: '',
  };
  const firstPackageItem = {
    Flag: 'I',
    PACKAGING_MATERIAL: '',
    Description: tenHang,
    PACKAGE_TYPE: '',
    QUANTITY_OF_PACKAGE: soLuong,
    QUANTITY_OF_UNIT: 'EA',
    GROSS_WEIGHT: trongLuong,
    GROSS_WEIGHT_OF_UNIT: 'g',
    NET_WEIGHT: '100',
    NET_WEIGHT_OF_UNIT: 'g',
    Length: kichThuocDai,
    Hight: kichThuocCao,
    Width: kichThuocRong,
    Note: ghiChu,
    GOODS_VALUE: giaTri,
    Currency: 'VND',
    COMODITY_CODE: loaiHangHoa,
    COD: tienThuHo,
  };
  function addNewPackageItem(): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      draftState.push(newPackageItem);
    });
    setPackageItemArr(newArr);
  }
  function removePackageItem(index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      draftState.splice(index, 1);
    });
    setPackageItemArr(newArr);
    dispatchGetSummaryInformation();
  }
  function adjustPackageItemValue(valueName: string, value: string | undefined, index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], valueName, value);
    });
    setPackageItemArr(newArr);
    dispatchGetSummaryInformation();
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }
  function handleActiveTab(tab: string): void {
    setActiveTab(tab);
  }

  //__________________ address popup events

  function toggleSenderAddress(): void {
    setModalSender(!modalSender);
  }
  function toggleReceiverAddress(): void {
    setModalReceiver(!modalReceiver);
  }

  function handleSenderAddressData(data: API.AddressPopupData): void {
    setProvinceSender(data.province);
    setDistrictSender(data.district);
    setWardSender(data.ward);
    setDetailAddressSender(data.detailAddress);
    setDiaChiSender(data.fullAddress);
    dispatchGetSummaryInformation();
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }
  function handleReceiverAddressData(data: API.AddressPopupData): void {
    setProvinceReceiver(data.province);
    setDistrictReceiver(data.district);
    setWardReceiver(data.ward);
    setDetailAddressReceiver(data.detailAddress);
    setDiaChiReceiver(data.fullAddress);
    dispatchGetSummaryInformation();
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }

  const validateData = {
    maPhieuGui,
    maKhachHang: maKhachHang === '' ? '9999999999' : maKhachHang,
    dienThoaiSender,
    hoTenSender,
    diaChiSender,
    dienThoaiReceiver,
    hoTenReceiver,
    diaChiReceiver,
    tenHang,
    soLuong: soLuong === '' ? undefined : soLuong,
    giaTri: giaTri === '' ? undefined : giaTri,
    tienThuHo: tienThuHo === '' ? undefined : tienThuHo,
    trongLuong: trongLuong === '' ? undefined : trongLuong,
    kichThuocDai: kichThuocDai === '' ? undefined : kichThuocDai,
    kichThuocRong: kichThuocRong === '' ? undefined : kichThuocRong,
    kichThuocCao: kichThuocCao === '' ? undefined : kichThuocCao,
    // maKhuyenMai,
    thoiGianPhat,
    //_____non-validated items
    loaiHangHoa,
    nguoiThanhToan,
    choXemHang,
    diemGiaoNhan,
  };
  // let packageItemValidate: API.PackageItem = {
  //   Flag: 'I',
  //   PACKAGING_MATERIAL: '',
  //   Description: '',
  //   PACKAGE_TYPE: '',
  //   QUANTITY_OF_PACKAGE: '',
  //   QUANTITY_OF_UNIT: '',
  //   GROSS_WEIGHT: '',
  //   GROSS_WEIGHT_OF_UNIT: 'g',
  //   NET_WEIGHT: '100',
  //   NET_WEIGHT_OF_UNIT: 'g',
  //   Length: '',
  //   Hight: '',
  //   Width: '',
  //   Note: '',
  //   GOODS_VALUE: '',
  //   Currency: 'VN',
  //   COMODITY_CODE: 'V04',
  //   COD: '',
  // };

  // eslint-disable-next-line max-lines-per-function
  function dispatchGetSummaryInformation(): void {
    const payloadPackageItemArr = produce(packageItemArr, (draftState): void => {
      draftState.unshift(firstPackageItem);
    });
    const servicePayload = find(
      transportMethodArr,
      (item: API.TransportMethodItem): boolean => item.SERVICE_GROUP === phuongThucVanChuyen,
    );
    const api011Payload = {
      Movement_type: 'ZDD',
      Ordering_party: 'TRUNGVT',
      Sales_org: '',
      Service_group: servicePayload ? servicePayload.SERVICE_TYPE : '',
      Source_country: 'VN',
      Source_city: provinceSender,
      Source_district: districtSender,
      Source_Ward: wardSender,
      Destination_country: 'VN',
      Destination_city: provinceReceiver,
      Destination_district: districtReceiver,
      Destination_Ward: wardReceiver,
      FWO_type: 'V001',
      Item: payloadPackageItemArr,
    };
    dispatch(
      action_MIOA_ZTMI011(api011Payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          // console.log(error);
        },
        onSuccess: (data: API.ItemMTZTMI011OUT[]): void => {
          const cuocChinhAmount = reduce(
            data,
            (total: number, item: API.ItemMTZTMI011OUT): number => {
              return item.CHARGE_TYPE === phuongThucVanChuyen ? total + parseInt(item.AMOUNT_ITEM) : total;
            },
            0,
          );
          setCuocChinh(toString(cuocChinhAmount) + ' đ');
          const cuocCongThemAmount = reduce(
            data,
            (total: number, item: API.ItemMTZTMI011OUT): number => {
              return findIndex(dichVuCongThem, (itemDichVuCongThem: string): boolean => {
                return itemDichVuCongThem === item.CHARGE_TYPE;
              }) !== -1
                ? total + parseInt(item.AMOUNT_ITEM)
                : total;
            },
            0,
          );
          setCuocCongThem(toString(cuocCongThemAmount) + ' đ');
          setTongCuoc(cuocChinhAmount + cuocCongThemAmount + ' đ');
        },
      }),
    );
  }

  React.useEffect((): void => {
    dispatch(
      action_GET_TRANSPORT_METHOD(
        { GET: null },
        {
          onFailure: (error: HttpRequestErrorType): void => {
            noop(error);
          },
          onSuccess: (data: API.MTZTMI068Response): void => {
            setTransportMethodArr(get(data, 'MT_ZTMI068_OUT.Row'));
          },
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatchGetSummaryInformation();
  }, [dispatch]);

  // eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (isSubmit) {
      schema
        .validate(validateData, { abortEarly: false })
        .then((): void => setErrors([]))
        .catch((error: yup.ValidationError): void => {
          setErrors(error.inner);
        });
      map(packageItemArr, (item: API.PackageItem, index: number): void => {
        const packageItemValidate = {
          Flag: 'I',
          PACKAGING_MATERIAL: '',
          Description: item.Description,
          PACKAGE_TYPE: '',
          QUANTITY_OF_PACKAGE: item.QUANTITY_OF_PACKAGE === '' ? undefined : item.QUANTITY_OF_PACKAGE,
          QUANTITY_OF_UNIT: '',
          GROSS_WEIGHT: item.GROSS_WEIGHT === '' ? undefined : item.GROSS_WEIGHT,
          GROSS_WEIGHT_OF_UNIT: 'g',
          NET_WEIGHT: '100',
          NET_WEIGHT_OF_UNIT: 'g',
          Length: item.Length === '' ? undefined : item.Length,
          Hight: item.Hight === '' ? undefined : item.Hight,
          Width: item.Width === '' ? undefined : item.Width,
          Note: '',
          GOODS_VALUE: item.GOODS_VALUE === '' ? undefined : item.GOODS_VALUE,
          Currency: 'VN',
          COMODITY_CODE: '',
          COD: item.COD === '' ? undefined : item.COD,
        };
        packageTabSchema
          .validate(packageItemValidate, { abortEarly: false })
          .then((): void => {
            packageItemErrors[index] = {
              index,
              errors: [],
            };
            if (index + 1 === size(packageItemArr)) {
              setPackageItemErrorsList(packageItemErrors);
            }
          })
          .catch((error: yup.ValidationError): void => {
            packageItemErrors[index] = {
              index,
              errors: error.inner,
            };
            if (index + 1 === size(packageItemArr)) {
              setPackageItemErrorsList(packageItemErrors);
            }
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      dispatchGetSummaryInformation();
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }

  function handleGenerateServiceType(transportMethod: string): void {
    loaiHinhDichVu = transportMethod;
    forEach(dichVuCongThem, (item: string, index: number): void => {
      loaiHinhDichVu += '/' + item;
    });
    dispatchGetSummaryInformation();
  }

  function handleChangeTransportMethod(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      handleGenerateServiceType(event.currentTarget.value);
    };
  }

  function handleChangeAdditionalService(event: React.FormEvent<HTMLInputElement>): void {
    const value = event.currentTarget.value;
    setUncheckAllAdditionalCheckbox(undefined);
    if (event.currentTarget.checked) {
      dichVuCongThem.push(value);
    } else {
      forEach(dichVuCongThem, (item: string, index: number): void => {
        if (item === value) {
          dichVuCongThem.splice(index, 1);
        }
      });
    }
    handleGenerateServiceType(phuongThucVanChuyen);
  }

  function handleChangeDeliveryTime(date: Date): void {
    setThoiGianPhat(date);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  function handleSaveForwardingOrder(): void {
    const paramsPackageItem = {
      SERVICE_TYPE: loaiHinhDichVu,
      QUANTITY_OF_PACKAGE: '1',
      QUANTITY_OF_UNIT: 'ST',
    };
    const payloadPackageItemArr = produce(packageItemArr, (draftState): void => {
      draftState.unshift(firstPackageItem);
      draftState.push(paramsPackageItem);
    });
    const payload = {
      ORDER_TYPE: 'V001',
      BUYERS_REFERENCE_NUMBER: maPhieuGui,
      SALE_ORG: null,
      SALE_OFFICE: null,
      SOURCE_TYPE: '50000119', // nguồn tạo từ APP/Web hoặc từ ecommerce
      FWO_NO: null,
      ORDERING_PARTY: '306', // Mã đối tác sử dụng dịch vụ
      NAME_OP: hoTenSender,
      ADDRESS_OP: diaChiSender,
      PHONE_OP: dienThoaiSender,
      EMAIL_OP: null,
      Shipper: '2', // Người gửi hàng- mã BP
      NAME_SHIPPER: null,
      ADDRESS_SHIPPER: null,
      PHONE_SHIPPER: null,
      EMAIL_SHIPPER: null,
      Consignee: '306', // Người nhận hàng
      NAME_CONSIG: hoTenReceiver,
      ADDRESS_CONSIG: diaChiReceiver,
      PHONE_CONSIG: dienThoaiReceiver,
      EMAIL_CONSIG: null,
      VAT_NO_PAYER: null, // Mã số thuế đối tác sử dụng
      MOVEMENT_TYPE: 'ZDD', // Loại hình gia nhận hàng hóa  ZDD: Điểm đến điểm,  ZDP: Điểm đến bưu cục, ZPD: Bưu cục đến điểm, ZPP: Bưu cục đến bưu cục
      POSTAL_CODE_SRC: null, // Mã thành phố trong trường hợp khách hàng vãng lai – nếu is null then default is 1000
      TEL_SRC: dienThoaiSender,
      COUNTRY_SRC: null, // Mã đất nước gửi trong trường hợp khách hàng vãng lai
      CITY_SRC: provinceSender, // trong trường hợp khách hàng vãng lai
      DISTRICT_SRC: districtSender, // trong trường hợp khách hàng vãng lai
      WARD_SRC: wardSender, // trong trường hợp khách hàng vãng lai
      STREET_NAME_SRC: detailAddressSender, // trong trường hợp khách hàng vãng lai
      HOUSE_ID_SRC: null, // trong trường hợp khách hàng vãng lai
      POSTAL_CODE_DES: null, // Mã thánh phố nhận trong trường hợp khách hàng vãng lai
      TEL_DES: dienThoaiReceiver,
      COUNTRY_DES: null, // nhận trong trường hợp khách hàng vãng lai
      CITY_DES: provinceReceiver, // nhận trong trường hợp khách hàng vãng lai
      DISTRICT_DES: districtReceiver, // nhận trong trường hợp khách hàng vãng lai
      WARD_DES: wardReceiver, // Mã xã phường nhận trong trường hợp vãng lai
      STREET_NAME_DES: detailAddressReceiver, // Địa chỉ nhận trong trường hợp vãng lai
      FLAG_HEADER: '',
      PromoCode: '',
      VOUCHER_ID: null,
      Campaign: null,
      Disctype: null,
      Description: null,
      LOCATION_ID_SRC: null,
      LOCATION_ID_DES: null,
      REQUEST_PICK_DATE: null,
      CONFIRM_PICK_DATE: null,
      REQUEST_DELIV_DATE: thoiGianPhat,
      CONFIRM_DELIV_DATE: null,
      FREIGH_TERM: nguoiThanhToan,
      CUS_ID: null, // Mã user trên hệ thống APP/Web
      Item: payloadPackageItemArr,
      LanguageId: null,
      LanguageDefaultId: null,
    };
    // if (!window.confirm('Bạn có chắc chắn?')) return;
    dispatch(action_MIOA_ZTMI012(payload));
  }

  // eslint-disable-next-line max-lines-per-function
  function handleValidate(e: FormEvent): void {
    e.preventDefault();
    setIsSubmit(true);
    tabValid = true;
    if (packageItemArr.length) {
      // eslint-disable-next-line max-lines-per-function
      map(packageItemArr, (item: API.PackageItem, index: number): void => {
        const packageItemValidate = {
          Flag: 'I',
          PACKAGING_MATERIAL: '',
          Description: item.Description,
          PACKAGE_TYPE: '',
          QUANTITY_OF_PACKAGE: item.QUANTITY_OF_PACKAGE === '' ? undefined : item.QUANTITY_OF_PACKAGE,
          QUANTITY_OF_UNIT: '',
          GROSS_WEIGHT: item.GROSS_WEIGHT === '' ? undefined : item.GROSS_WEIGHT,
          GROSS_WEIGHT_OF_UNIT: 'g',
          NET_WEIGHT: '100',
          NET_WEIGHT_OF_UNIT: 'g',
          Length: item.Length === '' ? undefined : item.Length,
          Hight: item.Hight === '' ? undefined : item.Hight,
          Width: item.Width === '' ? undefined : item.Width,
          Note: '',
          GOODS_VALUE: item.GOODS_VALUE === '' ? undefined : item.GOODS_VALUE,
          Currency: 'VN',
          COMODITY_CODE: '',
          COD: item.COD === '' ? undefined : item.COD,
        };
        packageTabSchema
          .validate(packageItemValidate, { abortEarly: false })
          .then((): void => {
            packageItemErrors[index] = {
              index,
              errors: [],
            };
            if (index + 1 === size(packageItemArr)) {
              setPackageItemErrorsList(packageItemErrors);
              schema
                .validate(validateData, { abortEarly: false })
                .then((): void => {
                  setErrors([]);
                  if (tabValid) {
                    handleSaveForwardingOrder();
                  }
                })
                .catch((error: yup.ValidationError): void => {
                  setErrors(error.inner);
                });
            }
          })
          .catch((error: yup.ValidationError): void => {
            tabValid = false;
            packageItemErrors[index] = {
              index,
              errors: error.inner,
            };
            if (index + 1 === size(packageItemArr)) {
              setPackageItemErrorsList(packageItemErrors);
              schema
                .validate(validateData, { abortEarly: false })
                .then((): void => {
                  setErrors([]);
                  if (tabValid) {
                    handleSaveForwardingOrder();
                  }
                })
                .catch((error: yup.ValidationError): void => {
                  setErrors(error.inner);
                });
            }
          });
      });
    } else {
      schema
        .validate(validateData, { abortEarly: false })
        .then((): void => {
          setErrors([]);
          if (tabValid) {
            handleSaveForwardingOrder();
          }
        })
        .catch((error: yup.ValidationError): void => {
          setErrors(error.inner);
        });
    }
  }

  function handleClearData(): void {
    setIsSubmit(false);
    setErrors([]);
    setMaPhieuGui('');
    setMaKhachHang('');
    setDienThoaiSender('');
    setHoTenSender('');
    setDiaChiSender('');
    setProvinceSender('');
    setDistrictSender('');
    setWardSender('');
    setDetailAddressSender('');
    setDienThoaiReceiver('');
    setHoTenReceiver('');
    setDiaChiReceiver('');
    setProvinceReceiver('');
    setDistrictReceiver('');
    setWardReceiver('');
    setDetailAddressReceiver('');
    setTenHang('');
    setSoLuong('');
    setGiaTri('');
    setTienThuHo('');
    setTrongLuong('');
    setKichThuocDai('');
    setKichThuocRong('');
    setKichThuocCao('');
    setThoiGianPhat(new Date());
    setPhuongThucVanChuyen('VCN');
    loaiHinhDichVu = 'VCN';
    dichVuCongThem = [];
    setUncheckAllAdditionalCheckbox(false);
    // setLoaiHangHoa('V99');
    // setNguoiThanhToan('PP');
    setChoXemHang('');
    setDiemGiaoNhan('ZDD');
    setGhiChu('');
    setActiveTab('1');
    setPackageItemArr([]);
    setPackageItemErrorsList([]);
    tabValid = true;
  }

  function renderSendingCoupon(): JSX.Element {
    return (
      <Row className="sipSendingCoupon sipContentContainer no-padding">
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">
              {t('Cước chính')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" className="text-semibold">
              <NumberFormat value={cuocChinh} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">
              {t('Cước cộng thêm')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" className="text-semibold">
              <NumberFormat value={cuocCongThem} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </Col>
          </Row>
        </Row>
        <div className="sipLine row" />
        <Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="6">{t('Tổng cước')}</Col>
            <Col xs="6" className="color-orange text-semibold">
              <NumberFormat value={tongCuoc} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </Col>
          </Row>
        </Row>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderSenderInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Người gửi')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã khách hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập mã khách hàng')}
              value={maKhachHang}
              onChange={handleChangeTextboxValue(setMaKhachHang)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'maKhachHang')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập số điện thoại')}
              value={dienThoaiSender}
              onChange={handleChangeTextboxValue(setDienThoaiSender)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'dienThoaiSender')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Họ tên')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập họ tên')}
              value={hoTenSender}
              onChange={handleChangeTextboxValue(setHoTenSender)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenSender')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
              value={diaChiSender}
              onChange={handleChangeTextboxValue(setDiaChiSender)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiSender')}</div>
            <p className="sipInputItemDescription">
              ({t('Nếu bạn không tìm thấy địa chỉ gợi ý')},{' '}
              <Button onClick={toggleSenderAddress} className="sipFlatBtn">
                {t('nhấn vào đây')}
              </Button>{' '}
              {t('để tự nhập')})
            </p>
            <ChoosingAddressPopup
              visible={modalSender}
              onChoose={handleSenderAddressData}
              onHide={toggleSenderAddress}
              province={provinceSender}
              district={districtSender}
              ward={wardSender}
              detailAddress={detailAddressSender}
            />
          </Col>
        </Row>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderReceiverInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Người nhận')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập số điện thoại')}
              value={dienThoaiReceiver}
              onChange={handleChangeTextboxValue(setDienThoaiReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'dienThoaiReceiver')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Họ tên')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập họ tên')}
              value={hoTenReceiver}
              onChange={handleChangeTextboxValue(setHoTenReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenReceiver')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            {t('Địa chỉ')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
              value={diaChiReceiver}
              onChange={handleChangeTextboxValue(setDiaChiReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiReceiver')}</div>
            <p className="sipInputItemDescription">
              ({t('Nếu bạn không tìm thấy địa chỉ gợi ý')},{' '}
              <Button onClick={toggleReceiverAddress} className="sipFlatBtn">
                {t('nhấn vào đây')}
              </Button>{' '}
              {t('để tự nhập')})
            </p>
            <ChoosingAddressPopup
              visible={modalReceiver}
              onChoose={handleReceiverAddressData}
              onHide={toggleReceiverAddress}
              province={provinceReceiver}
              district={districtReceiver}
              ward={wardReceiver}
              detailAddress={detailAddressReceiver}
            />
          </Col>
        </Row>
      </div>
    );
  }

  function renderSendingServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Dịch vụ')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Chọn dịch vụ')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="select"
              value={phuongThucVanChuyen}
              onChange={handleChangeTransportMethod(setPhuongThucVanChuyen)}
            >
              {map(
                transportMethodArr,
                (item: API.TransportMethodItem): JSX.Element => {
                  return (
                    <option key={item.SERVICE_TYPE} value={item.SERVICE_TYPE}>
                      {item.SERVICE_TYPE_DES}
                    </option>
                  );
                },
              )}
            </Input>
          </Col>
        </Row>
      </div>
    );
  }

  function renderAdditionalServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>
          {t('Dịch vụ cộng thêm')}
          <Button className="sipFlatBtn pull-right text-normal">
            {t('Xem bảng giá')}
            <i className="fa fa-angle-right ml-1 fa-lg" />
          </Button>
        </h3>
        <Row className="sipInputItem">
          {map(
            transportMethodArr,
            (item: API.TransportMethodItem): JSX.Element => {
              return (
                <Label key={item.SERVICE_TYPE} check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
                  <Input
                    checked={uncheckAllAdditionalCheckbox}
                    type="checkbox"
                    value={item.SERVICE_TYPE}
                    onChange={handleChangeAdditionalService}
                  />
                  <span className="font-xs">{item.SERVICE_TYPE_DES}</span>
                </Label>
              );
            },
          )}
        </Row>
      </div>
    );
  }

  function renderSendingCouponInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3>{t('Thông tin phiếu gửi')}</h3>
            <Row className="sipInputItem">
              <Label xs="12" lg="4">
                {t('Mã phiếu gửi')}
                <span className="color-red"> *</span>
              </Label>
              <Col lg="8">
                <Input type="text" value={maPhieuGui} onChange={handleChangeTextboxValue(setMaPhieuGui)} />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'maPhieuGui')}</div>
              </Col>
            </Row>
          </div>
          {renderSenderInput()}
          {renderReceiverInput()}
          {renderDeliveryRequirement()}
        </div>
      </Col>
    );
  }

  function renderPackageSize(): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Dài (cm)')}
            value={kichThuocDai}
            onChange={handleChangeTextboxValue(setKichThuocDai)}
          />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocDai')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Rộng (cm)')}
            value={kichThuocRong}
            onChange={handleChangeTextboxValue(setKichThuocRong)}
          />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocRong')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Cao (cm)')}
            value={kichThuocCao}
            onChange={handleChangeTextboxValue(setKichThuocCao)}
          />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocCao')}</div>
        </Col>
      </Row>
    );
  }

  function renderPackageType(): JSX.Element {
    return (
      <Row>
        <Col lg="5" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input
              type="radio"
              value="V99"
              name="packageType"
              defaultChecked
              onChange={handleChangeTextboxValue(setLoaiHangHoa)}
            />{' '}
            {t('Hàng hóa')}
          </Label>
        </Col>
        <Col lg="3" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input type="radio" value="V04" name="packageType" onChange={handleChangeTextboxValue(setLoaiHangHoa)} />{' '}
            {t('Thư')}
          </Label>
        </Col>
        <Col lg="4" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input type="radio" value="V01" name="packageType" onChange={handleChangeTextboxValue(setLoaiHangHoa)} />{' '}
            {t('Kiện')}
          </Label>
        </Col>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInfoDetail(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>
          {t('Thông tin hàng hóa')}
          <Button className="addNewPackageTabItemBtn" onClick={addNewPackageItem}>
            <i className="fa fa-plus" />
            {t('Thêm')}
          </Button>
        </h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Loại hàng')}
          </Label>
          <Col lg={8} xs={12}>
            {renderPackageType()}
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
              value={tenHang}
              onChange={handleChangeTextboxValue(setTenHang)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tenHang')}</div>
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
              value={soLuong}
              onChange={handleChangeTextboxValue(setSoLuong)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'soLuong')}</div>
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
                  value={giaTri}
                  onChange={handleChangeTextboxValue(setGiaTri)}
                />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'giaTri')}</div>
              </Col>
              <Col xs="12" md="6" className="mb-2">
                <Input
                  type="text"
                  placeholder={t('Nhập tiền thu hộ (đ)')}
                  value={tienThuHo}
                  onChange={handleChangeTextboxValue(setTienThuHo)}
                />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'tienThuHo')}</div>
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
              value={trongLuong}
              onChange={handleChangeTextboxValue(setTrongLuong)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'trongLuong')}</div>
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
          <Col lg="8">{renderPackageSize()}</Col>
        </Row>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderFeePayment(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Tiền phải thu & thanh toán cước')}</h3>
        {/*<Row className="sipInputItem">*/}
        {/*  <Label xs="12" lg="4">*/}
        {/*    {t('Mã khuyến mãi')}*/}
        {/*  </Label>*/}
        {/*  <Col lg="8">*/}
        {/*    <Input*/}
        {/*      type="text"*/}
        {/*      placeholder={t('Mã khuyến mãi')}*/}
        {/*      value={maKhuyenMai}*/}
        {/*      onChange={handleChangeTextboxValue(setMaKhuyenMai)}*/}
        {/*    />*/}
        {/*    <div className="sipInputItemError">{handleErrorMessage(errors, 'maKhuyenMai')}</div>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Thanh toán cước')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                value="PP"
                name="payer"
                defaultChecked
                onChange={handleChangeTextboxValue(setNguoiThanhToan)}
              />{' '}
              {t('Người gửi')}
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" value="CC" name="payer" onChange={handleChangeTextboxValue(setNguoiThanhToan)} />{' '}
              {t('Người nhận')}
            </Label>
          </Col>
        </Row>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderDeliveryRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Yêu cầu giao bưu gửi')}</h3>
        <Row className="sipInputItem">
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                name="deliveryRequirement"
                value="choXem"
                defaultChecked
                onChange={handleChangeTextboxValue(setChoXemHang)}
              />{' '}
              {t('Cho khách xem hàng')}
            </Label>
          </Col>
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                name="deliveryRequirement"
                value="khongChoXem"
                onChange={handleChangeTextboxValue(setChoXemHang)}
              />{' '}
              {t('Không cho khách xem hàng')}
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Thời gian phát')}
          </Label>
          <Col lg="8">
            <DatePicker
              placeholderText={t('Nhập thời gian')}
              className="form-control"
              selected={thoiGianPhat}
              onChange={handleChangeDeliveryTime}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'thoiGianPhat')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điểm giao nhận')}
          </Label>
          <Col lg="8">
            <Input type="select" value={diemGiaoNhan} onChange={handleChangeTextboxValue(setDiemGiaoNhan)}>
              <option value="ZDD">{t('Giao, gửi hàng tại nhà')}</option>
              <option value="ZPP">{t('Giao, gửi hàng tại bưu cục')}</option>
              <option value="ZDP">{t('Giao hàng tại bưu cục')}</option>
              <option value="ZPD">{t('Gửi hàng tại bưu cục')}</option>
            </Input>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Ghi chú khác')}
          </Label>
          <Col lg="8">
            <Input
              type="text"
              value={ghiChu}
              onChange={handleChangeTextboxValue(setGhiChu)}
              placeholder={t('Nhập ghi chú')}
            />
          </Col>
        </Row>
      </div>
    );
  }

  // function renderSplitPackage(): JSX.Element {
  //   return (
  //     <div className="sipInputBlock">
  //       <h3>{t('Tách kiện')}</h3>
  //       <Row className="sipInputItem">
  //         <Label xs="12" lg="4">
  //           {t('Số lượng tách')}
  //         </Label>
  //         <Col lg="8">
  //           <Row className="sipInputItemGroup">
  //             <Col xs="12" md="6" className="mb-2">
  //               <Input type="text" value={soLuongTach} onChange={handleChangeTextboxValue(setSoLuongTach)} />
  //               <div className="sipInputItemError">{handleErrorMessage(errors, 'soLuongTach')}</div>
  //             </Col>
  //             <Col xs="12" md="6" className="mb-2">
  //               <Button color="primary">{t('Tách kiện')}</Button>
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // }

  function renderPackageInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          {renderPackageInfoDetail()}
          <AdditionalPackageTabItems
            removePackageItem={removePackageItem}
            data={packageItemArr}
            onChangeValue={adjustPackageItemValue}
            isSubmit={isSubmit}
            packageItemErrorsList={packageItemErrorsList}
            parentCount={count}
            activeTab={activeTab}
            setActiveTab={handleActiveTab}
          />
          {renderSendingServices()}
          {renderAdditionalServices()}
          {renderFeePayment()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Phiếu gửi trong nước')}</h1>
      </Row>
      {renderSendingCoupon()}
      <Row className="mb-3">
        {renderSendingCouponInfo()}
        {renderPackageInfo()}
      </Row>
      <div className="display-block sipTitleRightBlock text-right">
        <Button onClick={handleClearData}>
          <i className="fa fa-refresh" />
          Làm mới
        </Button>
        <Button onClick={handleValidate}>
          <i className="fa fa-download" />
          Ghi lại
        </Button>
      </div>
    </>
  );
};

export default PhieuGuiTrongNuoc;
