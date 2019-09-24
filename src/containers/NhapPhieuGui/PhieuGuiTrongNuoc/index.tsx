/* eslint-disable max-lines */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import * as yup from 'yup';
import produce from 'immer';
import { match } from 'react-router-dom';
import { default as NumberFormat } from 'react-number-format';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import {
  drop,
  get,
  filter,
  find,
  findIndex,
  forEach,
  join,
  map,
  reduce,
  set,
  size,
  slice,
  toString,
  trim,
} from 'lodash';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { action_MIOA_ZTMI012 } from 'redux/MIOA_ZTMI012/actions';
import { action_MIOA_ZTMI011 } from 'redux/MIOA_ZTMI011/actions';
import { action_GET_TRANSPORT_METHOD } from 'redux/SIOA_ZTMI068/actions';
import { action_GET_ADDRESS } from 'redux/SearchLocation/actions';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT, select_MT_ZTMI031_INSTANE } from 'redux/MIOA_ZTMI031/selectors';
// import { makeSelectorProfile, makeSelectorUser, selectAuth } from 'redux/auth/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import ChoosingAddressPopup from 'components/ChoosingAddressPopup/Index';
import AdditionalPackageTabItems from 'components/AdditionalPackageTabItems/Index';
import ModalAddNewSuccess from './ModalAddNewSuccess';

interface Props {
  match: match;
}

let loaiHinhDichVu = '';
let dichVuCongThem: string[] = [];
// eslint-disable-next-line max-lines-per-function
const PhieuGuiTrongNuoc: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const dataSelectProfile = useSelector(makeSelectorProfile);
  // const dataSelectUser = useSelector(makeSelectorUser);
  // const dataSelectAuth = useSelector(selectAuth);
  // console.log(dataSelectProfile);
  // console.log(dataSelectUser);
  // console.log(dataSelectAuth);

  const idDonHang = get(props, 'match.params.idDonHang', '');
  const isCreateNewForwardingOrder: boolean = idDonHang === '';

  const payloadOrderInfoFirstLoad = {
    FWO_ID: idDonHang,
    BUYER_REFERENCE_NUMBER: '',
  };
  //________________success popup enable
  const [modalApiCreateSuccess, setModalApiCreateSuccess] = React.useState<boolean>(false);

  function toggleModalApiCreateSuccess(): void {
    setModalApiCreateSuccess(!modalApiCreateSuccess);
  }

  //_____________________________________________________________

  const orderInformationSelector = useSelector(select_MT_ZTMI031_OUT);
  const orderInformationInstaneSelector = useSelector(select_MT_ZTMI031_INSTANE);

  const orderInformation = isCreateNewForwardingOrder ? [] : orderInformationSelector;
  const orderInformationInstane = isCreateNewForwardingOrder ? {} : orderInformationInstaneSelector;

  const [provinceSenderEdit, setProvinceSenderEdit] = useState<string>('');
  const [districtSenderEdit, setDistrictSenderEdit] = useState<string>('');
  const [wardSenderEdit, setWardSenderEdit] = useState<string>('');
  const [provinceReceiverEdit, setProvinceReceiverEdit] = useState<string>('');
  const [districtReceiverEdit, setDistrictReceiverEdit] = useState<string>('');
  const [wardReceiverEdit, setWardReceiverEdit] = useState<string>('');

  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (orderInformationInstane.PROVINCE_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.PROVINCE_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setProvinceSenderEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstane.DISTRICT_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.DISTRICT_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setDistrictSenderEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstane.WARD_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.WARD_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setWardSenderEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstane.PROVINCE_ID_DES) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.PROVINCE_ID_DES },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setProvinceReceiverEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstane.DISTRICT_ID_DES) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.DISTRICT_ID_DES },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setDistrictReceiverEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstane.WARD_ID_DES) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.WARD_ID_DES },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setWardReceiverEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInformationInstane]);

  React.useEffect((): void => {
    if (!isCreateNewForwardingOrder) {
      dispatch(action_MIOA_ZTMI031(payloadOrderInfoFirstLoad));
    } else {
      handleClearData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDonHang]);

  const isVnPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

  const schema = yup.object().shape({
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

  const packageItemErrors: PackageItemErrors[] = [];
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
  //________hook to trigger get Summary Information
  const [countGetSummaryInformation, setCountGetSummaryInformation] = useState<number>(0);
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
  const [provinceIdSender, setProvinceIdSender] = useState<string>('');
  const [districtIdSender, setDistrictIdSender] = useState<string>('');
  const [wardIdSender, setWardIdSender] = useState<string>('');
  const [detailAddressSender, setDetailAddressSender] = useState<string>('');
  const [dienThoaiReceiver, setDienThoaiReceiver] = useState<string>('');
  const [hoTenReceiver, setHoTenReceiver] = useState<string>('');
  const [diaChiReceiver, setDiaChiReceiver] = useState<string>('');
  const [provinceReceiver, setProvinceReceiver] = useState<string>('');
  const [districtReceiver, setDistrictReceiver] = useState<string>('');
  const [wardReceiver, setWardReceiver] = useState<string>('');
  const [provinceIdReceiver, setProvinceIdReceiver] = useState<string>('');
  const [districtIdReceiver, setDistrictIdReceiver] = useState<string>('');
  const [wardIdReceiver, setWardIdReceiver] = useState<string>('');
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
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState<string>('');
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('V3');
  const [nguoiThanhToan, setNguoiThanhToan] = useState<string>('PP');
  const [choXemHang, setChoXemHang] = useState<string>('choXem');
  const [diemGiaoNhan, setDiemGiaoNhan] = useState<string>('ZDD');
  const [ghiChu, setGhiChu] = useState<string>('');
  //______ Transport method

  const [loaiHinhDichVuList, setLoaiHinhDichVuList] = useState<TransportMethodItem[]>([]);
  const [dichVuCongThemList, setDichVuCongThemList] = useState<TransportMethodItem[]>([]);
  const [uncheckAllAdditionalCheckbox, setUncheckAllAdditionalCheckbox] = useState<boolean | undefined>(undefined);
  //_______open Address modal
  const [modalSender, setModalSender] = useState<boolean>(false);
  const [modalReceiver, setModalReceiver] = useState<boolean>(false);
  //______ Package item tab

  const [activeTab, setActiveTab] = useState<string>('1');
  const [packageItemArr, setPackageItemArr] = useState<PackageItemInputType[]>([]);
  const [packageItemErrorsList, setPackageItemErrorsList] = useState<PackageItemErrors[]>([]);
  //________packageItem valid checking
  let tabValid = true;
  //_______summary order amount
  const [cuocChinh, setCuocChinh] = useState<string>('0 đ');
  const [cuocCongThem, setCuocCongThem] = useState<string>('0 đ');
  const [tongCuoc, setTongCuoc] = useState<string>('0 đ');

  //__________________ package item partial events

  const newPackageItem: PackageItemInputType = {
    Width: '',
    COMMODITY_CODE: 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
    COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
    PACKAGE_TYPE: '', // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các (O)
    QUANTITY_OF_UNIT: 'EA', // Đơn vị bưu gửi, luôn là EA
    GOODS_VALUE: '',
    GROSS_WEIGHT: '',
    Length: '',
    Hight: '',
    PACKAGING_MATERIAL: '',
    QUANTITY_OF_PACKAGE: '',
    Description: '',
    NET_WEIGHT_OF_UNIT: '',
    Currency: '',
    GROSS_WEIGHT_OF_UNIT: 'G',
    Flag: '', // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
    COD: '',
    NET_WEIGHT: '',
  };
  const firstPackageItem = {
    Width: kichThuocRong,
    COMMODITY_CODE: 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
    COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
    PACKAGE_TYPE: '', // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các (O)
    QUANTITY_OF_UNIT: 'EA', // Đơn vị bưu gửi, luôn là EA
    GOODS_VALUE: giaTri,
    GROSS_WEIGHT: trongLuong,
    Length: kichThuocDai,
    Hight: kichThuocCao,
    PACKAGING_MATERIAL: '',
    QUANTITY_OF_PACKAGE: soLuong,
    Description: tenHang,
    NET_WEIGHT_OF_UNIT: '',
    Currency: '',
    GROSS_WEIGHT_OF_UNIT: 'G',
    Flag: '', // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
    COD: tienThuHo,
    NET_WEIGHT: '',
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
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
  }
  function adjustPackageItemValue(valueName: string, value: string | undefined, index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], valueName, value);
    });
    setPackageItemArr(newArr);
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
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

  function handleSenderAddressData(data: AddressPopupData): void {
    setProvinceSender(data.province);
    setDistrictSender(data.district);
    setWardSender(data.ward);
    setProvinceIdSender(data.provinceId);
    setDistrictIdSender(data.districtId);
    setWardIdSender(data.wardId);
    setDetailAddressSender(data.detailAddress);
    setDiaChiSender(data.fullAddress);
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }
  function handleReceiverAddressData(data: AddressPopupData): void {
    setProvinceReceiver(data.province);
    setDistrictReceiver(data.district);
    setWardReceiver(data.ward);
    setProvinceIdReceiver(data.provinceId);
    setDistrictIdReceiver(data.districtId);
    setWardIdReceiver(data.wardId);
    setDetailAddressReceiver(data.detailAddress);
    setDiaChiReceiver(data.fullAddress);
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }

  const validateData = {
    maKhachHang: trim(maKhachHang) === '' ? '9999999999' : trim(maKhachHang),
    dienThoaiSender: trim(dienThoaiSender),
    hoTenSender: trim(hoTenSender),
    diaChiSender: trim(diaChiSender),
    dienThoaiReceiver: trim(dienThoaiReceiver),
    hoTenReceiver: trim(hoTenReceiver),
    diaChiReceiver: trim(diaChiReceiver),
    tenHang: trim(tenHang),
    soLuong: trim(soLuong) === '' ? undefined : trim(soLuong),
    giaTri: trim(giaTri) === '' ? undefined : trim(giaTri),
    tienThuHo: trim(tienThuHo) === '' ? undefined : trim(tienThuHo),
    trongLuong: trim(trongLuong) === '' ? undefined : trim(trongLuong),
    kichThuocDai: trim(kichThuocDai) === '' ? undefined : trim(kichThuocDai),
    kichThuocRong: trim(kichThuocRong) === '' ? undefined : trim(kichThuocRong),
    kichThuocCao: trim(kichThuocCao) === '' ? undefined : trim(kichThuocCao),
    // maKhuyenMai,
    thoiGianPhat,
    //_____non-validated items
    loaiHangHoa: trim(loaiHangHoa),
    nguoiThanhToan: trim(nguoiThanhToan),
    choXemHang: trim(choXemHang),
    diemGiaoNhan: trim(diemGiaoNhan),
  };

  //______________check if Order Information exist
  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (size(orderInformation)) {
      setMaPhieuGui(get(orderInformationInstane, 'FWO', ''));
      setDienThoaiSender(get(orderInformationInstane, 'MOBILE_PHONE_SRC', ''));
      setHoTenSender(get(orderInformationInstane, 'SHIPER_NAME', ''));
      const thisDetailAddressSender =
        (orderInformationInstane.HOUSE_NO_SOURCE ? toString(orderInformationInstane.HOUSE_NO_SOURCE) + ' ' : '') +
        (orderInformationInstane.STREET_ID_SOURCE ? toString(orderInformationInstane.STREET_ID_SOURCE) : '');
      setDetailAddressSender(thisDetailAddressSender);
      setDiaChiSender(
        `${thisDetailAddressSender}${' '}${wardSenderEdit}${' '}${districtSenderEdit}${' '}${provinceSenderEdit}`,
      );
      setProvinceIdSender(get(orderInformationInstane, 'PROVINCE_ID_SOURCE', ''));
      setDistrictIdSender(get(orderInformationInstane, 'DISTRICT_ID_SOURCE', ''));
      setWardIdSender(toString(get(orderInformationInstane, 'WARD_ID_SOURCE', '')));
      setProvinceSender(provinceSenderEdit);
      setDistrictSender(districtSenderEdit);
      setWardSender(wardSenderEdit);
      //__________________________________________________________

      setDienThoaiReceiver(get(orderInformationInstane, 'MOBILE_PHONE_DES', ''));
      setHoTenReceiver(get(orderInformationInstane, 'CONSIGNEE_NAME', ''));
      const thisDetailAddressReceiver =
        (orderInformationInstane.HOUSE_NO_DES ? toString(orderInformationInstane.HOUSE_NO_DES) + ' ' : '') +
        (orderInformationInstane.STREET_ID_DES ? toString(orderInformationInstane.STREET_ID_DES) : '');
      setDetailAddressReceiver(thisDetailAddressReceiver);
      setDiaChiReceiver(
        `${thisDetailAddressReceiver}${' '}${wardReceiverEdit}${' '}${districtReceiverEdit}${' '}${provinceReceiverEdit}`,
      );
      setProvinceIdReceiver(get(orderInformationInstane, 'PROVINCE_ID_DES', ''));
      setDistrictIdReceiver(get(orderInformationInstane, 'DISTRICT_ID_DES', ''));
      setWardIdReceiver(toString(get(orderInformationInstane, 'WARD_ID_DES', '')));
      setProvinceReceiver(provinceReceiverEdit);
      setDistrictReceiver(districtReceiverEdit);
      setWardReceiver(wardReceiverEdit);
      setTenHang(get(orderInformationInstane, 'ITEM_DESCRIPTION', ''));
      setSoLuong(orderInformationInstane.Quantity ? parseFloat(orderInformationInstane.Quantity).toFixed(2) : '');
      setGiaTri('');
      setTienThuHo(orderInformationInstane.COD ? toString(parseInt(orderInformationInstane.COD)) : '');
      setTrongLuong(
        orderInformationInstane.GROSS_WEIGHT ? parseFloat(orderInformationInstane.GROSS_WEIGHT).toFixed(2) : '',
      );
      setKichThuocDai(orderInformationInstane.Length ? parseFloat(orderInformationInstane.Length).toFixed(2) : '');
      setKichThuocRong(orderInformationInstane.Width ? parseFloat(orderInformationInstane.Width).toFixed(2) : '');
      setKichThuocCao(orderInformationInstane.Height ? parseFloat(orderInformationInstane.Height).toFixed(2) : '');
      const thisServiceType: string[] = drop(get(orderInformationInstane, 'SERVICE_TYPE', ''), 1);
      const thisTransportServiceType =
        findIndex(thisServiceType, (item: string): boolean => {
          return item === '/';
        }) !== -1
          ? slice(
              thisServiceType,
              0,
              findIndex(thisServiceType, (item: string): boolean => {
                return item === '/';
              }),
            )
          : thisServiceType;
      loaiHinhDichVu = join(thisTransportServiceType, '');
      setPhuongThucVanChuyen(loaiHinhDichVu);
      // dichVuCongThem = [];
      // setThoiGianPhat(get(orderInformationInstane, 'TIME_DATE', ''));
      // setUncheckAllAdditionalCheckbox(false);
      // setChoXemHang(get(orderInformationInstane, 'FWO', ''));
      let newPackageItemEdit: PackageItemInputType = {
        Width: '',
        COMMODITY_CODE: 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
        COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
        PACKAGE_TYPE: '', // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các (O)
        QUANTITY_OF_UNIT: 'EA', // Đơn vị bưu gửi, luôn là EA
        GOODS_VALUE: '',
        GROSS_WEIGHT: '',
        Length: '',
        Hight: '',
        PACKAGING_MATERIAL: '',
        QUANTITY_OF_PACKAGE: '',
        Description: '',
        NET_WEIGHT_OF_UNIT: '',
        Currency: '',
        GROSS_WEIGHT_OF_UNIT: 'G',
        Flag: '', // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
        COD: '',
        NET_WEIGHT: '',
      };
      if (size(orderInformation) >= 2) {
        const newArrEdit: API.RowMTZTMI031OUT[] = [];
        forEach(drop(orderInformation), (item: API.RowMTZTMI031OUT): void => {
          newPackageItemEdit = {
            COMMODITY_CODE: 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
            COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
            PACKAGE_TYPE: '', // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các (O)
            QUANTITY_OF_UNIT: 'EA', // Đơn vị bưu gửi, luôn là EA
            GOODS_VALUE: '',
            PACKAGING_MATERIAL: '',
            Description: '',
            NET_WEIGHT_OF_UNIT: '',
            Currency: '',
            GROSS_WEIGHT_OF_UNIT: 'G',
            Flag: '', // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
            NET_WEIGHT: '',
            QUANTITY_OF_PACKAGE: item.Quantity ? toString(parseInt(item.Quantity)) : '',
            GROSS_WEIGHT: item.GROSS_WEIGHT ? toString(parseFloat(item.GROSS_WEIGHT).toFixed(2)) : '',
            Length: item.Length ? toString(parseFloat(item.Length).toFixed(2)) : '',
            Hight: item.Height ? toString(parseFloat(item.Height).toFixed(2)) : '',
            Width: item.Width ? toString(parseFloat(item.Width).toFixed(2)) : '',
            COD: item.COD ? toString(parseInt(item.COD)) : '',
          };
          newArrEdit.push(newPackageItemEdit);
        });
        setPackageItemArr(newArrEdit);
      }
      //___________trigger call api for cost calculating
      setCountGetSummaryInformation(countGetSummaryInformation + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderInformationInstane,
    orderInformation,
    provinceSenderEdit,
    provinceReceiverEdit,
    districtReceiverEdit,
    districtSenderEdit,
    wardReceiverEdit,
    wardSenderEdit,
  ]);

  // eslint-disable-next-line max-lines-per-function
  function dispatchGetSummaryInformation(): void {
    const payloadPackageItemArr = produce(packageItemArr, (draftState): void => {
      draftState.unshift(firstPackageItem);
    });
    const servicePayload = find(
      loaiHinhDichVuList,
      (item: TransportMethodItem): boolean => item.SERVICE_TYPE === phuongThucVanChuyen,
    );
    let newPackageItem011 = {
      COD: '',
      Currency: '',
      Dimension_UoM: '',
      Goods_value: '',
      Gross_weight: '200',
      item_cat: 'PKG',
      Service_type: '',
      Weight_UoM: 'G',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newArr011: any = [];
    if (size(payloadPackageItemArr) >= 1) {
      forEach(payloadPackageItemArr, (item: PackageItemInputType): void => {
        newPackageItem011 = {
          COD: item.COD ? toString(parseInt(item.COD)) : '',
          Currency: '',
          Dimension_UoM: '',
          Gross_weight: item.GROSS_WEIGHT ? toString(parseInt(item.GROSS_WEIGHT)) : '',
          Goods_value: '',
          Service_type: loaiHinhDichVu,
          item_cat: 'PKG',
          Weight_UoM: 'G',
        };
        newArr011.push(newPackageItem011);
      });
    }

    const api011Payload = {
      COMMODITY_type: 'V3',
      Destination_city: provinceIdReceiver,
      Destination_country: 'VN',
      Destination_district: districtIdReceiver,
      Destination_Ward: wardIdReceiver,
      loc_id: '',
      Movement_type: diemGiaoNhan,
      Ordering_party: '9999999999',
      item: newArr011,
      Sales_org: '50000005',
      Service_group: servicePayload ? servicePayload.SERVICE_GROUP : '',
      // Service_group: 'V01/V02/V04',
      Source_city: provinceIdSender,
      Source_country: 'VN',
      Source_district: districtIdSender,
      Source_Ward: wardIdSender,
    };
    dispatch(
      action_MIOA_ZTMI011(api011Payload, {
        onSuccess: (data: API.ItemMTZTMI011OUT[]): void => {
          const cuocChinhAmount = reduce(
            data,
            (total: number, item: API.ItemMTZTMI011OUT): number => {
              return item.CHARGE_TYPE === phuongThucVanChuyen ? total + parseInt(item.AMOUNT_ITEM || '') : total;
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
                ? total + parseInt(item.AMOUNT_ITEM || '')
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
    dispatchGetSummaryInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countGetSummaryInformation]);

  React.useEffect((): void => {
    dispatch(
      action_GET_TRANSPORT_METHOD(
        { GET: null },
        {
          onFailure: (error: HttpRequestErrorType): void => {
            alert(error.message);
          },
          onSuccess: (data: API.SIOAZTMI068Response): void => {
            const thisData = get(data, 'MT_ZTMI068_OUT.Row', []);
            const thisLoaiHinhDichVuList = filter(
              thisData,
              (item: TransportMethodItem): boolean => item.SERVICE_GROUP === 'V01' || item.SERVICE_GROUP === 'V02',
            );
            setLoaiHinhDichVuList(thisLoaiHinhDichVuList);
            const thisDichVuCongThemList = filter(
              thisData,
              (item: TransportMethodItem): boolean => item.SERVICE_GROUP === 'V04',
            );
            setDichVuCongThemList(thisDichVuCongThemList);
            loaiHinhDichVu = get(thisLoaiHinhDichVuList, '[0]', '');
            setPhuongThucVanChuyen(loaiHinhDichVu);
          },
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      map(packageItemArr, (item: PackageItemInputType, index: number): void => {
        const packageItemValidate = {
          Flag: 'I',
          PACKAGING_MATERIAL: '',
          Description: item.Description,
          PACKAGE_TYPE: '',
          QUANTITY_OF_PACKAGE: item.QUANTITY_OF_PACKAGE === '' ? undefined : item.QUANTITY_OF_PACKAGE,
          QUANTITY_OF_UNIT: '',
          GROSS_WEIGHT: item.GROSS_WEIGHT === '' ? undefined : item.GROSS_WEIGHT,
          GROSS_WEIGHT_OF_UNIT: 'G',
          NET_WEIGHT: '',
          NET_WEIGHT_OF_UNIT: 'g',
          Length: item.Length === '' ? undefined : item.Length,
          Hight: item.Hight === '' ? undefined : item.Hight,
          Width: item.Width === '' ? undefined : item.Width,
          Note: '',
          GOODS_VALUE: item.GOODS_VALUE === '' ? undefined : item.GOODS_VALUE,
          Currency: 'VN',
          COMMODITY_CODE: 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
          COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
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
      //trigger get Summary information dispatch
      setCountGetSummaryInformation(countGetSummaryInformation + 1);
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
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
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
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
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
      ADDRESS_CONSIG: '',
      ADDRESS_OP: trim(diaChiSender),
      ADDRESS_SHIPPER: trim(diaChiSender),
      BUYERS_REFERENCE_NUMBER: trim(maPhieuGui),
      CAMPAIGN: '',
      CITY_DES: trim(provinceIdReceiver), // nhận trong trường hợp khách hàng vãng lai
      CITY_SRC: trim(provinceIdSender), // trong trường hợp khách hàng vãng lai
      CONSIGNEE: '9999999999',
      CONTRACT_DISCOUNT_AMOUNT: 0,
      CONTRACT_DISCOUNT_TYPE: '0',
      COUNTRY_DES: 'VN',
      COUNTRY_SRC: 'VN', // Mã đất nước gửi trong trường hợp khách hàng vãng lai
      CUS_ID: '', // Mã user trên hệ thống APP/Web
      DISTRICT_DES: trim(districtIdReceiver), // nhận trong trường hợp khách hàng vãng lai
      DISTRICT_SRC: trim(districtIdSender), // trong trường hợp khách hàng vãng lai
      EMAIL_CONSIG: '',
      EMAIL_OP: '',
      EMAIL_SHIPPER: '',
      FREIGH_TERM: '', // bên CMC đang sửa, tạm thời bỏ trống
      // FREIGH_TERM: trim(nguoiThanhToan), // Điều khoàn gửi hàng  PP : Trả bời người gửi, CC: trả bởi người nhận
      HOUSE_ID_SRC: '',
      HOUSE_ID_DES: '',
      ITEM: payloadPackageItemArr,
      LOCATION_ID_SRC: '',
      MOVEMENT_TYPE: trim(diemGiaoNhan), // Loại hình gia nhận hàng hóa  ZDD: Điểm đến điểm,  ZDP: Điểm đến bưu cục, ZPD: Bưu cục đến điểm, ZPP: Bưu cục đến bưu cục
      NAME_CONSIG: trim(hoTenReceiver),
      NAME_OP: trim(hoTenSender),
      NAME_SHIPPER: trim(hoTenSender),
      NOTE: trim(ghiChu), // Ghi chú cho bưu gửi
      OLD_CAMPAIGN_ID: 0,
      ORDERING_PARTY: '9999999999', // Mã đối tác sử dụng dịch vụ
      ORDER_TYPE: 'V001', // Loại đơn gửi  V001 : Phiếu gửi nội địa, V002 : Phiếu gửi nội địa theo lô(hiện tại app không sử dụng), V003 : Phiều gửi quốc tế (tờ khai riêng, hiện tại app chưa có tính năng này), V004 : Phiếu gửi quốc tế (tờ khai chung)
      PHONE_CONSIG: trim(dienThoaiReceiver),
      PHONE_OP: trim(dienThoaiSender),
      PHONE_SHIPPER: trim(dienThoaiSender),
      POSTAL_CODE_DES: '', // Mã thánh phố nhận trong trường hợp khách hàng vãng lai
      POSTAL_CODE_SRC: '', // Mã thành phố trong trường hợp khách hàng vãng lai – nếu is null then default is 1000
      REQUEST_PICK_DATE: '',
      REQUEST_DELIV_DATE: thoiGianPhat ? '' : null, // tạm thời để trống field này, khi có yêu cầu cú pháp thì dùng moment để format
      SHIPPER: trim(maKhachHang) === '' ? '9999999999' : trim(maKhachHang), // Người gửi hàng- mã BP
      SOURCE_TYPE: '03', // nguồn tạo từ APP/Web hoặc từ ecommerce
      STREET_NAME_DES: trim(detailAddressReceiver), // Địa chỉ nhận trong trường hợp vãng lai
      STREET_NAME_SRC: trim(detailAddressSender), // trong trường hợp khách hàng vãng lai
      TEL_DES: trim(dienThoaiReceiver),
      TEL_SRC: trim(dienThoaiSender),
      TRANSPORTATION_MODE: '01', // Loại lịch trình 01: Lịch trình xe; 02: Lịch trình tàu bay; 03: Lịch trình tàu lửa; 04: Lịch trình tàu thủy
      WARD_DES: trim(wardIdReceiver), // Mã xã phường nhận trong trường hợp vãng lai
      WARD_SRC: trim(wardIdSender), // trong trường hợp khách hàng vãng lai
      //_______________________________________
      // SALE_ORG: '',
      // FWO_NO: '', // bắt buộc với sửa/xóa
      // LOCATION_ID_DES: '',
      // VAT_NO_PAYER: '', // Mã số thuế đối tác sử dụng
      // PromoCode: '',
      // FLAG_HEADER: '', // Cờ phân biệt trường hợp hủy đơn hàng để khác null là block
      // Disctype: '', // Loại khuyến mại
      // Description: '', // Mô tả chương trình khuyến mại
      // VOUCHER_ID: '',
      // POSTAL_CODE_DES: '', // Mã thánh phố nhận trong trường hợp khách hàng vãng lai
      // SALE_OFFICE: 'BDH', // mã bưu cục, đang fake tạm là BDH
      // house_id_des: '12', // Số nhà nhận trong trường hợp vãng lai
    };
    // if (!window.confirm('Bạn có chắc chắn?')) return;
    dispatch(
      action_MIOA_ZTMI012(payload, {
        onSuccess: (data: API.MIOAZTMI012Response): void => {
          const idPhieuGuiSuccess = get(data, 'MT_ZTMI012_OUT.FWO_ID', '');
          setMaPhieuGui(idPhieuGuiSuccess);
          toggleModalApiCreateSuccess();
        },
        onFailure: (error: HttpRequestErrorType): void => {
          alert(error.message);
        },
      }),
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function handleValidate(e: FormEvent): void {
    e.preventDefault();
    setIsSubmit(true);
    tabValid = true;
    if (packageItemArr.length) {
      // eslint-disable-next-line max-lines-per-function
      map(packageItemArr, (item: PackageItemInputType, index: number): void => {
        const packageItemValidate = {
          Flag: 'I',
          PACKAGING_MATERIAL: '',
          Description: item.Description,
          PACKAGE_TYPE: '',
          QUANTITY_OF_PACKAGE: item.QUANTITY_OF_PACKAGE === '' ? undefined : item.QUANTITY_OF_PACKAGE,
          QUANTITY_OF_UNIT: '',
          GROSS_WEIGHT: item.GROSS_WEIGHT === '' ? undefined : item.GROSS_WEIGHT,
          GROSS_WEIGHT_OF_UNIT: 'G',
          NET_WEIGHT: '',
          NET_WEIGHT_OF_UNIT: 'g',
          Length: item.Length === '' ? undefined : item.Length,
          Hight: item.Hight === '' ? undefined : item.Hight,
          Width: item.Width === '' ? undefined : item.Width,
          Note: '',
          GOODS_VALUE: item.GOODS_VALUE === '' ? undefined : item.GOODS_VALUE,
          Currency: 'VN',
          COMMODITY_CODE: 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
          COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
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
    setPhuongThucVanChuyen(get(loaiHinhDichVuList, '[0].SERVICE_TYPE', ''));
    loaiHinhDichVu = get(loaiHinhDichVuList, '[0].SERVICE_TYPE', '');
    dichVuCongThem = [];
    setUncheckAllAdditionalCheckbox(false);
    // setLoaiHangHoa('V3');
    // setNguoiThanhToan('PP');
    setChoXemHang('');
    setDiemGiaoNhan('ZDD');
    setGhiChu('');
    setActiveTab('1');
    setPackageItemArr([]);
    setPackageItemErrorsList([]);
    tabValid = true;
    setCuocChinh('0 đ');
    setCuocCongThem('0 đ');
    setTongCuoc('0 đ');
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
                loaiHinhDichVuList,
                (item: TransportMethodItem): JSX.Element => {
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
            dichVuCongThemList,
            (item: TransportMethodItem): JSX.Element => {
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
              </Label>
              <Col lg="8">
                <Input type="text" value={maPhieuGui} onChange={handleChangeTextboxValue(setMaPhieuGui)} />
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
              value="V3"
              name="packageType"
              defaultChecked
              onChange={handleChangeTextboxValue(setLoaiHangHoa)}
            />{' '}
            {t('Hàng hóa')}
          </Label>
        </Col>
        <Col lg="3" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input type="radio" value="V2" name="packageType" onChange={handleChangeTextboxValue(setLoaiHangHoa)} />{' '}
            {t('Thư')}
          </Label>
        </Col>
        <Col lg="4" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input type="radio" value="V1" name="packageType" onChange={handleChangeTextboxValue(setLoaiHangHoa)} />{' '}
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
          {t('Làm mới')}
        </Button>
        <Button onClick={handleValidate}>
          <i className="fa fa-download" />
          {t('Ghi lại')}
        </Button>
      </div>
      <ModalAddNewSuccess
        modalApiCreateSuccess={modalApiCreateSuccess}
        isCreateNewForwardingOrder={isCreateNewForwardingOrder}
        toggle={toggleModalApiCreateSuccess}
        idPhieuGuiSuccess={maPhieuGui}
      />
    </>
  );
};

export default PhieuGuiTrongNuoc;
