/* eslint-disable max-lines */
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import produce from 'immer';
import { match } from 'react-router-dom';
import { default as NumberFormat } from 'react-number-format';
import { Button, Col, Input, Label, Nav, NavItem, NavLink, Row } from 'reactstrap';
import {
  Menu,
  MenuItem,
  Typeahead as RootTypeahead,
  TypeaheadMenuProps,
  TypeaheadResult,
} from 'react-bootstrap-typeahead';
import {
  concat,
  drop,
  filter,
  find,
  findIndex,
  first,
  forEach,
  get,
  isEmpty,
  join,
  map,
  reduce,
  set,
  size,
  slice,
  toString,
  trim,
} from 'lodash';
import moment from 'moment';
import useIsMounted from 'react-is-mounted-hook';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import AdditionalPackageTabItems from 'components/AdditionalPackageTabItems';
import Typeahead from 'components/Input/Typeahead';
import TypeaheadFullAddress from 'components/Input/TypeaheadFullAdress';
import TypeaheadLoaiHang from 'components/Input/TypeaheadLoaiHang';
import TypeaheadTenHang from 'components/Input/TypeaheadTenHang';
import { action_MIOA_ZTMI012 } from 'redux/MIOA_ZTMI012/actions';
import { action_MIOA_ZTMI011 } from 'redux/MIOA_ZTMI011/actions';
import { action_LOCATIONSUGGEST } from 'redux/LocationSuggest/actions';
import { action_LOCATIONSUGGEST_DETAIL } from 'redux/LocationSuggestDetail/actions';
import { action_GET_TRANSPORT_METHOD } from 'redux/SIOA_ZTMI068/actions';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_INSTANE, select_MT_ZTMI031_OUT } from 'redux/MIOA_ZTMI031/selectors';
import {
  action_GET_ADDRESS,
  action_GET_DISTRICT,
  action_GET_PROVINCE,
  action_GET_WARD,
} from 'redux/LocationSearch/actions';
import { action_COMMODITY_SUGGEST } from 'redux/CommoditySuggest/actions';
import { makeSelectorBPOrg, makeSelectorCurrentPostOffice } from 'redux/GetProfileByUsername/selectors';
import { action_MOST_ORDER_SUGGEST, action_RECENT_ORDER_SUGGEST } from 'redux/OrderSuggest/actions';
import { action_SENDER_SUGGEST, action_RECEIVER_SUGGEST } from 'redux/PersonSuggest/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { formatNumber, getAddressNameById, getValueOfNumberFormat, numberFormat } from 'utils/common';
import ModalAddNewSuccess from './ModalAddNewSuccess';
import './style.scss';
import { action_ZTMI229 } from '../../../redux/ZTMI229/actions';

interface Props {
  match: match;
}

let dichVuCongThem: string[] = [];
// eslint-disable-next-line max-lines-per-function
const PhieuGuiTrongNuoc: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorBPOrg);
  const isMounted = useIsMounted();

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
  const orderInformationInstanceSelector = useSelector(select_MT_ZTMI031_INSTANE);

  const orderInformation = isCreateNewForwardingOrder ? [] : orderInformationSelector;
  const orderInformationInstance = isCreateNewForwardingOrder ? {} : orderInformationInstanceSelector;

  const [provinceSenderEdit, setProvinceSenderEdit] = useState<string>('');
  const [districtSenderEdit, setDistrictSenderEdit] = useState<string>('');
  const [wardSenderEdit, setWardSenderEdit] = useState<string>('');
  const [provinceReceiverEdit, setProvinceReceiverEdit] = useState<string>('');
  const [districtReceiverEdit, setDistrictReceiverEdit] = useState<string>('');
  const [wardReceiverEdit, setWardReceiverEdit] = useState<string>('');
  const [focusAddress, setFocusAdress] = useState<string>('');
  const [tab, setTab] = useState<number>(1);
  const [keywords, setKeywords] = useState<string>('');
  const [senderKeywords, setSenderKeywords] = useState<string>('');
  // const [selectedSenderSuggest, setSelectedSenderSuggest] = useState<Person>();
  const [senderSuggest, setSenderSuggest] = useState<Person[]>([]);

  const [receiverKeywords, setReceiverKeywords] = useState<string>('');
  // const [selectedReceiverSuggest, setReceiverSenderSuggest] = useState<Person>();
  const [receiverSuggest, setReceiverSuggest] = useState<Person[]>([]);

  const [listTemplates, setListTemplates] = useState<OrderSuggestedItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<OrderSuggestedItem[]>();

  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (orderInformationInstance.PROVINCE_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstance.PROVINCE_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
              setProvinceSenderEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstance.DISTRICT_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstance.DISTRICT_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
              setDistrictSenderEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstance.WARD_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstance.WARD_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
              setWardSenderEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstance.PROVINCE_ID_DES) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstance.PROVINCE_ID_DES },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
              setProvinceReceiverEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstance.DISTRICT_ID_DES) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstance.DISTRICT_ID_DES },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
              setDistrictReceiverEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (orderInformationInstance.WARD_ID_DES) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstance.WARD_ID_DES },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
              setWardReceiverEdit(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInformationInstance]);

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
    provinceIdSender: yup.string().required(t('Vui lòng nhập tỉnh/thành phố')),
    districtIdSender: yup.string().required(t('Vui lòng nhập quận/huyện')),
    wardIdSender: yup.string().required(t('Vui lòng nhập phường/xã')),
    detailAddressSender: yup.string().required(t('Vui lòng nhập địa chỉ chi tiết')),
    dienThoaiReceiver: yup
      .string()
      .required(t('Vui lòng nhập số điện thoại'))
      .matches(isVnPhoneMobile, t('Vui lòng nhập đúng định dạng số điện thoại')),
    hoTenReceiver: yup.string().required(t('Vui lòng nhập họ tên')),
    diaChiReceiver: yup.string().required(t('Vui lòng nhập địa chỉ')),
    provinceIdReceiver: yup.string().required(t('Vui lòng nhập tỉnh/thành phố')),
    districtIdReceiver: yup.string().required(t('Vui lòng nhập quận/huyện')),
    wardIdReceiver: yup.string().required(t('Vui lòng nhập phường/xã')),
    detailAddressReceiver: yup.string().required(t('Vui lòng nhập địa chỉ chi tiết')),
    tenHang: yup.string().required(t('Vui lòng nhập tên hàng hóa')),
    loaiHangHoa: yup.string().required(t('Vui lòng nhập nhóm hàng hóa')),
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
    COMMODITY_CODE: yup.string().required(t('Vui lòng nhập nhóm hàng hóa')),
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
  // const [maBuuPham, setMaBuuPham] = useState<string>('');
  const [maKhachHangGui, setMaKhachHangGui] = useState<string>('');
  const [maKhachHangNhan, setMaKhachHangNhan] = useState<string>('');
  const [dienThoaiSender, setDienThoaiSender] = useState<string>('');
  const [hoTenSender, setHoTenSender] = useState<string>('');
  const [diaChiSender, setDiaChiSender] = useState<string>('');
  const [provinceIdSender, setProvinceIdSender] = useState<string>('');
  const [districtIdSender, setDistrictIdSender] = useState<string>('');
  const [wardIdSender, setWardIdSender] = useState<string>('');
  const [detailAddressSender, setDetailAddressSender] = useState<string>('');
  const [dienThoaiReceiver, setDienThoaiReceiver] = useState<string>('');
  const [hoTenReceiver, setHoTenReceiver] = useState<string>('');
  const [diaChiReceiver, setDiaChiReceiver] = useState<string>('');
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
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState<string>('VCN');
  const [loaiKienHang, setLoaiKienHang] = useState<string>('V3');
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('V01');
  const [nguoiThanhToan, setNguoiThanhToan] = useState<string>('F1');
  const [choXemHang, setChoXemHang] = useState<string>('1');
  const [diemGiaoNhan, setDiemGiaoNhan] = useState<string>('ZPD');
  const [ghiChu, setGhiChu] = useState<string>('');
  //______ Transport method

  const [loaiHinhDichVuList, setLoaiHinhDichVuList] = useState<TransportMethodItem[]>([]);
  const [dichVuCongThemList, setDichVuCongThemList] = useState<TransportMethodItem[]>([]);
  const [uncheckAllAdditionalCheckbox, setUncheckAllAdditionalCheckbox] = useState<boolean | undefined>(undefined);
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
  const [tienPhuPhi, setTienPhuPhi] = useState<string>('');

  // _________________ handle state tab keyboard
  const [focusElement, setFocusElement] = React.useState<string>('');
  const handleKeyUp = (elementName: string) => (
    event: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>,
  ): void => {
    const key = event.key;
    if (['Tab', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      setFocusElement(elementName);
    }
  };

  const handleClearFocusElement = (): void => {
    setFocusElement('');
  };

  //__________________ package item partial events

  const newPackageItem: PackageItemInputType = {
    Width: '',
    COMMODITY_CODE: 'V01', // Nhóm hàng hóa (tham chiếu trong bảng)
    COMMODITY_TYPE: 'V1', // Nhóm hàng hóa (tham chiếu trong bảng)
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
    COMMODITY_CODE: loaiKienHang === 'V2' ? 'V04' : loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
    COMMODITY_TYPE: loaiKienHang, // Nhóm hàng hóa (tham chiếu trong bảng)
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

  //eslint-disable-next-line max-lines-per-function
  function adjustPackageItemValue(valueName: string, value: string | undefined, index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], valueName, value);
    });
    setPackageItemArr(newArr);
    switch (valueName) {
      case 'Length':
        callDimensionWeight(
          provinceIdSender,
          districtIdSender,
          wardIdSender,
          maKhachHangGui,
          phuongThucVanChuyen,
          value,
          get(packageItemArr[index], 'Width'),
          get(packageItemArr[index], 'Hight'),
          value,
          'Length',
          index,
        );
        break;
      case 'Width':
        callDimensionWeight(
          provinceIdSender,
          districtIdSender,
          wardIdSender,
          maKhachHangGui,
          phuongThucVanChuyen,
          get(packageItemArr[index], 'Length'),
          value,
          get(packageItemArr[index], 'Hight'),
          value,
          'Width',
          index,
        );
        break;
      case 'Hight':
        callDimensionWeight(
          provinceIdSender,
          districtIdSender,
          wardIdSender,
          maKhachHangGui,
          phuongThucVanChuyen,
          get(packageItemArr[index], 'Length'),
          get(packageItemArr[index], 'Width'),
          value,
          value,
          'Hight',
          index,
        );
        break;
      case 'COD':
        const checkItem = packageItemArr.filter(
          (it, indx) => !isEmpty(it.COD) && indx !== index && parseFloat(getValueOfNumberFormat(it.COD + '')) > 0,
        );
        if ((isEmpty(value) || value === '0') && (isEmpty(tienThuHo) || tienThuHo === '0') && isEmpty(checkItem)) {
          dichVuCongThem = dichVuCongThem.filter(it => it !== 'COD');
        } else if (!dichVuCongThem.includes('COD')) {
          dichVuCongThem.push('COD');
        }
        break;
    }
    triggerValidateAndPriceCalculate();
  }

  function setDimensionValue(value: string, sourceValue?: string, valueName?: string, index?: number): void {
    if (index !== undefined && index >= 0) {
      const newArr = produce(packageItemArr, (draftState): void => {
        set(draftState[index], 'DIMENSION_WEIGHT', value);
        if (valueName) {
          set(draftState[index], valueName, sourceValue);
        }
      });
      setPackageItemArr(newArr);
    } else {
      setTrongLuongQuyDoi(value);
    }
  }

  function adjustPackageItemCommodityType(value: string | undefined, index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], 'COMMODITY_TYPE', value);
      if (value === 'V2') {
        set(draftState[index], 'COMMODITY_CODE', 'V04');
      }
    });
    setPackageItemArr(newArr);
    triggerValidateAndPriceCalculate();
  }

  function adjustPackageItemSuggestCommodity(descriptionValue: string, goodsValue: string, index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], 'Description', descriptionValue);
      set(draftState[index], 'GOODS_VALUE', goodsValue);
    });
    setPackageItemArr(newArr);
    triggerValidateAndPriceCalculate();
  }

  function handleActiveTab(tab: string): void {
    setActiveTab(tab);
  }

  const validateData = {
    maKhachHang: trim(maKhachHangGui) === '' ? '9999999999' : trim(maKhachHangGui),
    dienThoaiSender: trim(dienThoaiSender),
    hoTenSender: trim(hoTenSender),
    diaChiSender: trim(diaChiSender),
    provinceIdSender,
    districtIdSender,
    wardIdSender,
    detailAddressSender: trim(detailAddressSender),
    dienThoaiReceiver: trim(dienThoaiReceiver),
    hoTenReceiver: trim(hoTenReceiver),
    diaChiReceiver: trim(diaChiReceiver),
    provinceIdReceiver,
    districtIdReceiver,
    wardIdReceiver,
    detailAddressReceiver: trim(detailAddressReceiver),
    tenHang: trim(tenHang),
    loaiHangHoa: trim(loaiHangHoa),
    soLuong: trim(soLuong) === '' ? undefined : trim(getValueOfNumberFormat(soLuong)),
    giaTri: trim(giaTri) === '' ? undefined : trim(getValueOfNumberFormat(giaTri)),
    tienThuHo: trim(tienThuHo) === '' ? undefined : trim(getValueOfNumberFormat(tienThuHo)),
    trongLuong: trim(trongLuong) === '' ? undefined : trim(getValueOfNumberFormat(trongLuong)),
    kichThuocDai: trim(kichThuocDai) === '' ? undefined : trim(getValueOfNumberFormat(kichThuocDai)),
    kichThuocRong: trim(kichThuocRong) === '' ? undefined : trim(getValueOfNumberFormat(kichThuocRong)),
    kichThuocCao: trim(kichThuocCao) === '' ? undefined : trim(getValueOfNumberFormat(kichThuocCao)),
    // maKhuyenMai,
    thoiGianPhat,
    //_____non-validated items
    diemGiaoNhan: trim(diemGiaoNhan),
  };

  //______________check if Order Information exist
  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (size(orderInformation)) {
      setMaPhieuGui(get(orderInformationInstance, 'FWO', ''));
      setMaKhachHangGui(get(orderInformationInstance, 'SHIPER_ID', ''));
      setDienThoaiSender(get(orderInformationInstance, 'MOBILE_PHONE_SRC', ''));
      setHoTenSender(get(orderInformationInstance, 'SHIPER_NAME', ''));
      const thisDetailAddressSender =
        (orderInformationInstance.HOUSE_NO_SOURCE ? toString(orderInformationInstance.HOUSE_NO_SOURCE) + ' ' : '') +
        (orderInformationInstance.STREET_ID_SOURCE ? toString(orderInformationInstance.STREET_ID_SOURCE) : '');
      setDetailAddressSender(thisDetailAddressSender);
      setDiaChiSender(
        `${thisDetailAddressSender}${' '}${wardSenderEdit}${' '}${districtSenderEdit}${' '}${provinceSenderEdit}`,
      );
      setDetailSender(true);
      setProvinceIdSender(get(orderInformationInstance, 'PROVINCE_ID_SOURCE', ''));
      setDistrictIdSender(get(orderInformationInstance, 'DISTRICT_ID_SOURCE', ''));
      setWardIdSender(toString(get(orderInformationInstance, 'WARD_ID_SOURCE', '')));
      //__________________________________________________________
      setMaKhachHangNhan(get(orderInformationInstance, 'CONSIGNEE_ID', ''));
      setDienThoaiReceiver(get(orderInformationInstance, 'MOBILE_PHONE_DES', ''));
      setHoTenReceiver(get(orderInformationInstance, 'CONSIGNEE_NAME', ''));
      const thisDetailAddressReceiver =
        (orderInformationInstance.HOUSE_NO_DES ? toString(orderInformationInstance.HOUSE_NO_DES) + ' ' : '') +
        (orderInformationInstance.STREET_ID_DES ? toString(orderInformationInstance.STREET_ID_DES) : '');
      setDetailAddressReceiver(thisDetailAddressReceiver);
      setDiaChiReceiver(
        `${thisDetailAddressReceiver}${' '}${wardReceiverEdit}${' '}${districtReceiverEdit}${' '}${provinceReceiverEdit}`,
      );
      setDetailReceiver(true);
      setProvinceIdReceiver(get(orderInformationInstance, 'PROVINCE_ID_DES', ''));
      setDistrictIdReceiver(get(orderInformationInstance, 'DISTRICT_ID_DES', ''));
      setWardIdReceiver(toString(get(orderInformationInstance, 'WARD_ID_DES', '')));
      // setMaBuuPham(get(orderInformationInstance, 'PACKAGE_ID', ''));
      setTenHang(get(orderInformationInstance, 'ITEM_DESCRIPTION', ''));
      setSoLuong(orderInformationInstance.Quantity ? parseFloat(orderInformationInstance.Quantity).toFixed(0) : '');
      setGiaTri(orderInformationInstance.GoodValue ? toString(parseInt(orderInformationInstance.GoodValue)) : '');
      if (tenHang === get(orderInformationInstance, 'ITEM_DESCRIPTION', '')) {
        setSelectedCommodity([{ id: tenHang, label: tenHang }]);
        setCommoditySuggest([{ name: tenHang, description: tenHang, price: 0 }]);
      }
      setTienThuHo(orderInformationInstance.COD ? toString(parseInt(orderInformationInstance.COD)) : '');
      if (orderInformationInstance.COD) {
        dichVuCongThem.push('COD');
      }
      setTrongLuong(
        orderInformationInstance.GROSS_WEIGHT ? parseFloat(orderInformationInstance.GROSS_WEIGHT).toFixed(0) : '',
      );
      setKichThuocDai(orderInformationInstance.Length ? parseFloat(orderInformationInstance.Length).toFixed(0) : '');
      setKichThuocRong(orderInformationInstance.Width ? parseFloat(orderInformationInstance.Width).toFixed(0) : '');
      setKichThuocCao(orderInformationInstance.Height ? parseFloat(orderInformationInstance.Height).toFixed(0) : '');
      const thisServiceType: string[] = drop(get(orderInformationInstance, 'SERVICE_TYPE', ''), 1);
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
      setPhuongThucVanChuyen(join(thisTransportServiceType, ''));
      // dichVuCongThem = [];
      // setThoiGianPhat(get(orderInformationInstane, 'TIME_DATE', ''));
      // setUncheckAllAdditionalCheckbox(false);
      // setChoXemHang(get(orderInformationInstane, 'FWO', ''));
      let newPackageItemEdit: PackageItemInputType = {
        Width: '',
        COMMODITY_CODE: 'V01', // Nhóm hàng hóa (tham chiếu trong bảng)
        COMMODITY_TYPE: 'V3', // Nhóm hàng hóa (tham chiếu trong bảng)
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
            COMMODITY_CODE: 'V01', // Nhóm hàng hóa (tham chiếu trong bảng)
            COMMODITY_TYPE: 'V3', // Nhóm hàng hóa (tham chiếu trong bảng)
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
            GROSS_WEIGHT: item.GROSS_WEIGHT ? toString(parseFloat(item.GROSS_WEIGHT).toFixed(0)) : '',
            Length: item.Length ? toString(parseFloat(item.Length).toFixed(0)) : '',
            Hight: item.Height ? toString(parseFloat(item.Height).toFixed(0)) : '',
            Width: item.Width ? toString(parseFloat(item.Width).toFixed(0)) : '',
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
    orderInformationInstance,
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
    let newPackageItem011 = {
      COD: '',
      Currency: '',
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
          COD: item.COD ? toString(parseInt(getValueOfNumberFormat(item.COD))) : '',
          Currency: '',
          Gross_weight: item.GROSS_WEIGHT ? toString(parseInt(getValueOfNumberFormat(item.GROSS_WEIGHT))) : '',
          Goods_value: '',
          Service_type: '',
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
      Ordering_party: trim(maKhachHangGui) === '' ? '9999999999' : trim(maKhachHangGui),
      Item: newArr011,
      Sales_org: '',
      // Service_group: servicePayload ? servicePayload.SERVICE_GROUP : '',
      Service_group: 'V01/V02/V04', // để theo yêu cầu của em Hường ngày 27/9/2019
      Source_city: provinceIdSender,
      Source_country: 'VN',
      Source_district: districtIdSender,
      Source_Ward: wardIdSender,
    };
    dispatch(
      action_MIOA_ZTMI011(api011Payload, {
        onSuccess: (data: API.ItemMTZTMI011OUT[]): void => {
          if (!isMounted()) return;
          const cuocChinhAmount = reduce(
            data,
            (total: number, item: API.ItemMTZTMI011OUT): number => {
              return item.CHARGE_TYPE === phuongThucVanChuyen ? total + parseInt(item.AMOUNT_ITEM || '') : total;
            },
            0,
          );
          setCuocChinh(toString(cuocChinhAmount) + ' đ');
          const ignoreAddedService = ['GBP'];
          const cuocCongThemAmount = reduce(
            data,
            (total: number, item: API.ItemMTZTMI011OUT): number => {
              return findIndex(dichVuCongThem, (itemDichVuCongThem: string): boolean => {
                return itemDichVuCongThem === item.CHARGE_TYPE && !ignoreAddedService.includes(item.CHARGE_TYPE);
              }) !== -1
                ? total + parseInt(item.AMOUNT_ITEM || '')
                : total;
            },
            0,
          );
          setCuocCongThem(toString(cuocCongThemAmount) + ' đ');
          const tienPhuPhiAmount = isEmpty(tienPhuPhi) ? 0 : parseInt(getValueOfNumberFormat(tienPhuPhi));
          setTongCuoc(cuocChinhAmount + cuocCongThemAmount + tienPhuPhiAmount + ' đ');
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
            // alert(error.message);
          },
          onSuccess: (data: API.SIOAZTMI068Response): void => {
            if (!isMounted()) return;
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
            setPhuongThucVanChuyen('VCN');
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
        .then((): void => {
          if (!isMounted()) return;
          setErrors([]);
        })
        .catch((error: yup.ValidationError): void => {
          if (!isMounted()) return;
          setErrors(error.inner);
        });
      map(packageItemArr, (item: PackageItemInputType, index: number): void => {
        const packageItemValidate = {
          Flag: 'I',
          PACKAGING_MATERIAL: '',
          Description: item.Description,
          PACKAGE_TYPE: '',
          COMMODITY_CODE: item.COMMODITY_CODE,
          QUANTITY_OF_PACKAGE:
            trim(item.QUANTITY_OF_PACKAGE) === ''
              ? undefined
              : getValueOfNumberFormat(trim(get(item, 'QUANTITY_OF_PACKAGE'))),
          QUANTITY_OF_UNIT: '',
          GROSS_WEIGHT:
            trim(item.GROSS_WEIGHT) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'GROSS_WEIGHT'))),
          GROSS_WEIGHT_OF_UNIT: 'G',
          NET_WEIGHT: '',
          NET_WEIGHT_OF_UNIT: '',
          Length: trim(item.Length) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'Length'))),
          Hight: trim(item.Hight) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'Hight'))),
          Width: trim(item.Width) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'Width'))),
          Note: '',
          GOODS_VALUE:
            trim(item.GOODS_VALUE) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'GOODS_VALUE'))),
          Currency: '',
          COD: trim(item.COD) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'COD'))),
        };
        packageTabSchema
          .validate(packageItemValidate, { abortEarly: false })
          .then((): void => {
            if (!isMounted()) return;
            packageItemErrors[index] = {
              index,
              errors: [],
            };
            if (index + 1 === size(packageItemArr)) {
              setPackageItemErrorsList(packageItemErrors);
            }
          })
          .catch((error: yup.ValidationError): void => {
            if (!isMounted()) return;
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

  function triggerValidateAndPriceCalculate(fieldName?: string): void {
    const ignoreFields = [
      'senderPhoneInput',
      'deliveryRequirementNoteInput',
      'locationSenderInput',
      'locationReceiverInput',
      'senderNameInput',
      'customerCodeInput',
      'maPhieuGuiInput',
    ];

    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }

    if (fieldName && ignoreFields.includes(fieldName)) {
      return;
    }

    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
  }

  function triggerFollow(fieldName: string, value: string): void {
    // Neu Loai kien hang la 'Thu', Loai hang = V04 - Thu tai lieu
    if (fieldName === 'packageType' && value === 'V2') {
      setLoaiHangHoa('V04');
    }
  }

  function handleChangeTextboxValue(
    setValueFunction: Function,
  ): (event: React.FormEvent<HTMLInputElement> | Event) => void {
    return (event: React.FormEvent<HTMLInputElement> | Event): void => {
      const value = get(event, 'currentTarget.value', '');
      const fieldName = get(event, 'currentTarget.name', '');
      setValueFunction(value);
      triggerValidateAndPriceCalculate(fieldName);
      triggerFollow(fieldName, value);
    };
  }

  function handleChangeTienThuHo(): (event: React.FormEvent<HTMLInputElement> | Event) => void {
    return (event: React.FormEvent<HTMLInputElement> | Event): void => {
      const value = get(event, 'currentTarget.value', '');
      const fieldName = get(event, 'currentTarget.name', '');
      setTienThuHo(value);
      const checkItem = packageItemArr.filter(
        it => !isEmpty(it.COD) && parseFloat(getValueOfNumberFormat(it.COD + '')) > 0,
      );
      if ((isEmpty(value) || value === '0') && isEmpty(checkItem)) {
        dichVuCongThem = dichVuCongThem.filter(it => it !== 'COD');
      } else if (!dichVuCongThem.includes('COD')) {
        dichVuCongThem.push('COD');
      }
      triggerValidateAndPriceCalculate(fieldName);
      triggerFollow(fieldName, value);
    };
  }

  // function handleChangeTienThuHo(): (event: React.FormEvent<HTMLInputElement> | Event) => void {
  //   return (event: React.FormEvent<HTMLInputElement> | Event): void => {
  //     const value = get(event, 'currentTarget.value', '');
  //     const fieldName = get(event, 'currentTarget.name', '');
  //     console.log('setTienThuHo', value);
  //     setTienThuHo(value);
  //     if (!dichVuCongThem.includes('COD')) {
  //       dichVuCongThem.push('COD');
  //     }
  //     // triggerValidateAndPriceCalculate(fieldName);
  //     // triggerFollow(fieldName, value);
  //   };
  // }

  function handleChangeTypeaheadInput(setValueFunction: Function, fieldName?: string) {
    return (input: string): void => {
      setValueFunction(input);
      triggerValidateAndPriceCalculate(fieldName);
    };
  }

  function handleChangeTypeaheadValue(setValueFunction: Function): (items: TypeaheadOption[]) => void {
    return (items: TypeaheadOption[]): void => {
      setValueFunction(get(first(items), `id`, ''));
      triggerValidateAndPriceCalculate();
    };
  }

  function handleChangeTransportMethod(setValueFunction: Function): (items: TypeaheadOption[]) => void {
    return (items: TypeaheadOption[]): void => {
      setValueFunction(get(items, '0.id', ''));
      callDimensionWeight(
        provinceIdSender,
        districtIdSender,
        wardIdSender,
        maKhachHangGui,
        get(items, '0.id', ''),
        kichThuocDai,
        kichThuocRong,
        kichThuocCao,
      );

      const newArr = produce(packageItemArr, (draftState): void => {
        draftState.map((it, idx) => {
          callDimensionWeight(
            provinceIdSender,
            districtIdSender,
            wardIdSender,
            maKhachHangGui,
            get(items, '0.id', ''),
            get(packageItemArr[idx], 'Length'),
            get(packageItemArr[idx], 'Width'),
            get(packageItemArr[idx], 'Hight'),
            undefined,
            undefined,
            idx,
          );
          return it;
        });
      });
      setPackageItemArr(newArr);
      //trigger get Summary information dispatch
      setCountGetSummaryInformation(countGetSummaryInformation + 1);
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
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
  }

  function handleChangeDeliveryTime(date: Date): void {
    setThoiGianPhat(date);
    triggerValidateAndPriceCalculate();
  }

  //_________________Location suggest event handle__________________________
  const [locationSuggestSender, setLocationSuggestSender] = useState<SuggestedItem[]>([]);

  React.useEffect((): void => {
    if (size(diaChiSender) > 0) {
      dispatch(
        action_LOCATIONSUGGEST(
          { q: diaChiSender },
          {
            onSuccess: (data: SuggestedLocation): void => {
              if (!isMounted()) return;
              setLocationSuggestSender(get(data, 'items'));
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
              setLocationSuggestSender([]);
            },
          },
        ),
      );
    } else {
      setLocationSuggestSender([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diaChiSender]);

  // eslint-disable-next-line max-lines-per-function
  function handleChooseLocationSuggestSender(items: TypeaheadOption[]): void {
    const thisItem = find(locationSuggestSender, (item: SuggestedItem): boolean => {
      return item.id === get(items, '0.id', '');
    });
    setDiaChiSender(get(thisItem, 'name', ''));
    dispatch(
      action_LOCATIONSUGGEST_DETAIL(
        { id: get(thisItem, 'id', '') },
        {
          onSuccess: (data: DetailSuggestedLocation): void => {
            if (!isMounted()) return;
            const dataComponents = get(data, 'components', []);
            const thisProvince = find(dataComponents, (item: Component): boolean => {
              return item.type === 'PROVINCE';
            });
            setProvinceIdSender(get(thisProvince, 'code', ''));
            const thisDistrict = find(dataComponents, (item: Component): boolean => {
              return item.type === 'DISTRICT';
            });
            setDistrictIdSender(get(thisDistrict, 'code', ''));
            const thisWard = find(dataComponents, (item: Component): boolean => {
              return item.type === 'WARD';
            });
            setWardIdSender(get(thisWard, 'code', ''));
            const thisDetailAddress = join(
              map(
                filter(dataComponents, (item: Component): boolean => {
                  return (
                    item.type !== 'PROVINCE' &&
                    item.type !== 'DISTRICT' &&
                    item.type !== 'WARD' &&
                    item.type !== 'COUNTRY'
                  );
                }),
                (item: Component): string => {
                  return item.name;
                },
              ),
            );
            setDetailAddressSender(trim(thisDetailAddress) ? thisDetailAddress : '');
            toggleSenderAddress();
            triggerValidateAndPriceCalculate();
          },
          onFailure: (error: HttpRequestErrorType): void => {
            if (!isMounted()) return;
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {t('Không lấy được thông tin địa chỉ.')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
    setLocationSuggestSender([]);
    setFocusAdress('sender');
  }

  //________________________________RECEIVER

  const [locationSuggestReceiver, setLocationSuggestReceiver] = useState<SuggestedItem[]>([]);
  const handleHideChooseLocationDropdown = (): void => {
    setLocationSuggestSender([]);
    setLocationSuggestReceiver([]);
    setCommoditySuggest([]);
  };

  React.useEffect((): void => {
    if (size(diaChiReceiver) > 0) {
      dispatch(
        action_LOCATIONSUGGEST(
          { q: diaChiReceiver },
          {
            onSuccess: (data: SuggestedLocation): void => {
              if (!isMounted()) return;
              setLocationSuggestReceiver(get(data, 'items'));
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
              setLocationSuggestReceiver([]);
            },
          },
        ),
      );
    } else {
      setLocationSuggestReceiver([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diaChiReceiver]);

  // eslint-disable-next-line max-lines-per-function
  function handleChooseLocationSuggestReceiver(items: TypeaheadOption[]): void {
    const thisItem = find(locationSuggestReceiver, (item: SuggestedItem): boolean => {
      return item.id === get(items, '0.id', '');
    });
    setDiaChiReceiver(get(thisItem, 'name', ''));
    dispatch(
      action_LOCATIONSUGGEST_DETAIL(
        { id: get(thisItem, 'id', '') },
        {
          onSuccess: (data: DetailSuggestedLocation): void => {
            if (!isMounted()) return;
            const dataComponents = get(data, 'components');
            const thisProvince = find(dataComponents, (item: Component): boolean => {
              return item.type === 'PROVINCE';
            });
            setProvinceIdReceiver(get(thisProvince, 'code', ''));
            const thisDistrict = find(dataComponents, (item: Component): boolean => {
              return item.type === 'DISTRICT';
            });
            setDistrictIdReceiver(get(thisDistrict, 'code', ''));
            const thisWard = find(dataComponents, (item: Component): boolean => {
              return item.type === 'WARD';
            });
            setWardIdReceiver(get(thisWard, 'code', ''));
            const thisDetailAddress = join(
              map(
                filter(dataComponents, (item: Component): boolean => {
                  return (
                    item.type !== 'PROVINCE' &&
                    item.type !== 'DISTRICT' &&
                    item.type !== 'WARD' &&
                    item.type !== 'COUNTRY'
                  );
                }),
                (item: Component): string => {
                  return item.name;
                },
              ),
            );
            setDetailAddressReceiver(trim(thisDetailAddress) ? thisDetailAddress : '');
            toggleReceiverAddress();
            triggerValidateAndPriceCalculate();
          },
          onFailure: (error: HttpRequestErrorType): void => {
            if (!isMounted()) return;
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {t('Không lấy được thông tin địa chỉ.')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
    setLocationSuggestReceiver([]);
    setFocusAdress('receiver');
  }

  //_________________COMMODITY suggest event handle__________________________

  const [commoditySuggest, setCommoditySuggest] = useState<CommoditySuggestedItem[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<TypeaheadOption[]>([]);

  React.useEffect((): void => {
    if (size(tenHang) > 0 && (size(selectedCommodity) === 0 || selectedCommodity[0].label !== tenHang)) {
      dispatch(
        action_COMMODITY_SUGGEST(
          { q: tenHang },
          {
            onSuccess: (data: SuggestedCommodity): void => {
              if (!isMounted()) return;
              setCommoditySuggest(get(data, 'items'));
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
            },
          },
        ),
      );
    } else {
      setCommoditySuggest([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenHang]);

  React.useEffect((): void => {
    templateOrderSuggest(keywords, tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, tab]);

  function templateOrderSuggest(keywords: string, type: number): void {
    if (currentPostOfficeInStore) {
      let payload = { postoffice: currentPostOfficeInStore.PostOfficeCode };
      switch (type) {
        case 1:
          break;
        case 2:
          if (size(keywords)) {
            payload = Object.assign(payload, { q: keywords });
          }
          dispatch(
            action_MOST_ORDER_SUGGEST(payload, {
              onSuccess: (data: OrderSuggestedItem[]): void => {
                if (!isMounted()) return;
                setListTemplates(data);
              },
              onFailure: (error: HttpRequestErrorType): void => {
                if (!isMounted()) return;
              },
            }),
          );
          break;
        case 3:
          if (size(keywords)) {
            payload = Object.assign(payload, { q: keywords });
          }
          dispatch(
            action_RECENT_ORDER_SUGGEST(payload, {
              onSuccess: (data: OrderSuggestedItem[]): void => {
                if (!isMounted()) return;
                setListTemplates(data);
              },
              onFailure: (error: HttpRequestErrorType): void => {
                if (!isMounted()) return;
              },
            }),
          );
          break;
        default:
          setListTemplates([]);
      }
    }
  }

  const currentPostOfficeInStore = useSelector(makeSelectorCurrentPostOffice);

  React.useEffect((): void => {
    if (size(senderKeywords) > 0 && currentPostOfficeInStore) {
      dispatch(
        action_SENDER_SUGGEST(
          { q: senderKeywords, postoffice: currentPostOfficeInStore.PostOfficeCode },
          {
            onSuccess: (data: Person[]): void => {
              if (!isMounted()) return;
              setSenderSuggest(data);
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
              setSenderSuggest([]);
            },
          },
        ),
      );
    } else {
      setSenderSuggest([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderKeywords, currentPostOfficeInStore]);

  React.useEffect((): void => {
    if (size(receiverKeywords) > 0 && currentPostOfficeInStore) {
      dispatch(
        action_RECEIVER_SUGGEST(
          { q: receiverKeywords, postoffice: currentPostOfficeInStore.PostOfficeCode, sender: maKhachHangGui },
          {
            onSuccess: (data: Person[]): void => {
              if (!isMounted()) return;
              if (size(data) > 0) {
                setReceiverSuggest(data);
              }
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
              setReceiverSuggest([]);
            },
          },
        ),
      );
    } else {
      setSenderSuggest([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverKeywords, currentPostOfficeInStore]);

  function handleChooseCommoditySuggest(items: TypeaheadOption[]): void {
    if (size(items)) {
      setTenHang(get(items, '0.id', ''));
      setGiaTri(toString(get(items, '0.price', '')));
      setCommoditySuggest([]);
      setSelectedCommodity(items);
      triggerValidateAndPriceCalculate();
    }
  }

  //___________________________________________________________________
  // eslint-disable-next-line max-lines-per-function
  function handleSaveForwardingOrder(): void {
    const additionalServicePayloadList: PackageItemInputType[] = [];
    additionalServicePayloadList.push({
      SERVICE_TYPE: phuongThucVanChuyen,
      QUANTITY_OF_PACKAGE: '1',
      QUANTITY_OF_UNIT: 'ST',
    });
    map(dichVuCongThem, (item: string): void => {
      additionalServicePayloadList.push({
        SERVICE_TYPE: item,
        QUANTITY_OF_PACKAGE: '1',
        QUANTITY_OF_UNIT: 'ST',
      });
    });
    const dataPackageItemArr = produce(packageItemArr, (draftState): void => {
      draftState.unshift(firstPackageItem);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataPackageItemArrUnformattedNumber: PackageItemInputType[] = [];
    if (size(dataPackageItemArr) >= 1) {
      forEach(dataPackageItemArr, (item: PackageItemInputType): void => {
        const newPackageItemTemp = {
          Width: item.Width ? trim(getValueOfNumberFormat(item.Width)) : '',
          package_ID: item.package_ID,
          COMMODITY_CODE: item.COMMODITY_CODE,
          COMMODITY_TYPE: item.COMMODITY_TYPE, // Nhóm hàng hóa (tham chiếu trong bảng)
          PACKAGE_TYPE: item.PACKAGE_TYPE, // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các (O)
          QUANTITY_OF_UNIT: item.QUANTITY_OF_UNIT, // Đơn vị bưu gửi, luôn là EA
          GOODS_VALUE: item.GOODS_VALUE ? trim(getValueOfNumberFormat(item.GOODS_VALUE)) : '',
          GROSS_WEIGHT: item.GROSS_WEIGHT ? trim(getValueOfNumberFormat(item.GROSS_WEIGHT)) : '',
          Length: item.Length ? trim(getValueOfNumberFormat(item.Length)) : '',
          Hight: item.Hight ? trim(getValueOfNumberFormat(item.Hight)) : '',
          PACKAGING_MATERIAL: item.PACKAGING_MATERIAL,
          QUANTITY_OF_PACKAGE: item.QUANTITY_OF_PACKAGE ? trim(getValueOfNumberFormat(item.QUANTITY_OF_PACKAGE)) : '',
          Description: item.Description,
          NET_WEIGHT_OF_UNIT: item.NET_WEIGHT_OF_UNIT,
          Currency: 'VND',
          GROSS_WEIGHT_OF_UNIT: item.GROSS_WEIGHT_OF_UNIT,
          Flag: item.Flag, // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
          COD: item.COD ? trim(getValueOfNumberFormat(item.COD)) : '',
          NET_WEIGHT: item.NET_WEIGHT,
        };
        dataPackageItemArrUnformattedNumber.push(newPackageItemTemp);
      });
    }
    const payloadPackageItemArr = concat(dataPackageItemArrUnformattedNumber, additionalServicePayloadList);
    const payload = {
      FWO: isCreateNewForwardingOrder ? null : get(orderInformationInstance, 'FWO'),
      ADDRESS_CONSIG: '',
      ADDRESS_OP: trim(diaChiSender),
      ADDRESS_SHIPPER: trim(diaChiSender),
      BUYERS_REFERENCE_NUMBER: trim(maPhieuGui),
      CAMPAIGN: '',
      CITY_DES: trim(provinceIdReceiver), // nhận trong trường hợp khách hàng vãng lai
      CITY_SRC: trim(provinceIdSender), // trong trường hợp khách hàng vãng lai
      CONSIGNEE: trim(maKhachHangNhan) === '' ? '9999999999' : trim(maKhachHangNhan),
      COUNTRY_DES: 'VN',
      COUNTRY_SRC: 'VN', // Mã đất nước gửi trong trường hợp khách hàng vãng lai
      CUS_ID: '', // Mã user trên hệ thống APP/Web
      DISTRICT_DES: trim(districtIdReceiver), // nhận trong trường hợp khách hàng vãng lai
      DISTRICT_SRC: trim(districtIdSender), // trong trường hợp khách hàng vãng lai
      EMAIL_CONSIG: '',
      EMAIL_OP: '',
      EMAIL_SHIPPER: '',
      FREIGH_TERM: trim(nguoiThanhToan), // Điều khoàn gửi hàng  F1 : Trả bời người gửi, F2: trả bởi người nhận
      HOUSE_ID_SRC: '',
      HOUSE_ID_DES: '',
      ITEM: payloadPackageItemArr,
      LOCATION_ID_SRC: '',
      MOVEMENT_TYPE: trim(diemGiaoNhan), // Loại hình gia nhận hàng hóa  ZDD: Điểm đến điểm,  ZDP: Điểm đến bưu cục, ZPD: Bưu cục đến điểm, ZPP: Bưu cục đến bưu cục
      NAME_CONSIG: trim(hoTenReceiver),
      NAME_OP: trim(hoTenSender),
      NAME_SHIPPER: trim(hoTenSender),
      NOTE: choXemHang === '1' ? trim(ghiChu) + ' - Cho xem hàng' : trim(ghiChu) + ' - Không cho xem hàng', // Ghi chú cho bưu gửi
      OLD_CAMPAIGN_ID: 0,
      ORDERING_PARTY: trim(maKhachHangGui) === '' ? '9999999999' : trim(maKhachHangGui), // Mã đối tác sử dụng dịch vụ
      ORDER_TYPE: 'V001', // Loại đơn gửi  V001 : Phiếu gửi nội địa, V002 : Phiếu gửi nội địa theo lô(hiện tại app không sử dụng), V003 : Phiều gửi quốc tế (tờ khai riêng, hiện tại app chưa có tính năng này), V004 : Phiếu gửi quốc tế (tờ khai chung)
      PHONE_CONSIG: trim(dienThoaiReceiver),
      PHONE_OP: trim(dienThoaiSender),
      PHONE_SHIPPER: trim(dienThoaiSender),
      POSTAL_CODE_DES: '', // Mã thánh phố nhận trong trường hợp khách hàng vãng lai
      POSTAL_CODE_SRC: '', // Mã thành phố trong trường hợp khách hàng vãng lai – nếu is null then default is 1000
      REQUEST_PICK_DATE: null,
      REQUEST_DELIV_DATE: moment(thoiGianPhat).format('YYYYMMDDHHmmss'),
      SALE_OFFICE: userMaBp, // mã bưu cục
      SHIPPER: trim(maKhachHangGui) === '' ? '9999999999' : trim(maKhachHangGui), // Người gửi hàng- mã BP
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
      // house_id_des: '12', // Số nhà nhận trong trường hợp vãng lai
    };
    // if (!window.confirm('Bạn có chắc chắn?')) return;
    dispatch(
      action_MIOA_ZTMI012(payload, {
        onSuccess: (data: API.MIOAZTMI012Response): void => {
          if (!isMounted()) return;
          if (get(data, 'MT_ZTMI012_OUT.EV_ERROR') === '00') {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {t('Dữ liệu không hợp lệ, vui lòng kiểm tra lại thông tin đơn hàng của bạn')}
              </>,
              {
                type: 'error',
              },
            );
          } else {
            const idPhieuGuiSuccess = get(data, 'MT_ZTMI012_OUT.FWO_ID', '');
            setMaPhieuGui(idPhieuGuiSuccess);
            toggleModalApiCreateSuccess();
          }
        },
        onFailure: (error: HttpRequestErrorType): void => {
          // alert(error.message);
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
          COMMODITY_CODE: item.COMMODITY_CODE,
          PACKAGE_TYPE: '',
          QUANTITY_OF_PACKAGE: item.QUANTITY_OF_PACKAGE === '' ? undefined : item.QUANTITY_OF_PACKAGE,
          QUANTITY_OF_UNIT: '',
          GROSS_WEIGHT:
            trim(item.GROSS_WEIGHT) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'GROSS_WEIGHT'))),
          GROSS_WEIGHT_OF_UNIT: 'G',
          NET_WEIGHT: '',
          NET_WEIGHT_OF_UNIT: '',
          Length: trim(item.Length) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'Length'))),
          Hight: trim(item.Hight) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'Hight'))),
          Width: trim(item.Width) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'Width'))),
          Note: '',
          GOODS_VALUE:
            trim(item.GOODS_VALUE) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'GOODS_VALUE'))),
          Currency: '',
          COD: trim(item.COD) === '' ? undefined : getValueOfNumberFormat(trim(get(item, 'COD'))),
        };
        packageTabSchema
          .validate(packageItemValidate, { abortEarly: false })
          .then((): void => {
            if (!isMounted()) return;
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
            if (!isMounted()) return;
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
          if (!isMounted()) return;
          setErrors([]);
          if (tabValid) {
            handleSaveForwardingOrder();
          }
        })
        .catch((error: yup.ValidationError): void => {
          if (!isMounted()) return;
          setErrors(error.inner);
        });
    }
  }

  // eslint-disable-next-line max-lines-per-function
  function handleClearData(): void {
    setIsSubmit(false);
    setErrors([]);
    setMaPhieuGui('');
    setMaKhachHangGui('');
    setMaKhachHangNhan('');
    setDienThoaiSender('');
    setHoTenSender('');
    setDiaChiSender('');
    setProvinceIdSender('');
    setDistrictIdSender('');
    setWardIdSender('');
    setDetailAddressSender('');
    setDienThoaiReceiver('');
    setHoTenReceiver('');
    setDiaChiReceiver('');
    setProvinceIdReceiver('');
    setDistrictIdReceiver('');
    setWardIdReceiver('');
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
    dichVuCongThem = [];
    setUncheckAllAdditionalCheckbox(false);
    // setMaBuuPham('');
    setLoaiKienHang('V3');
    setLoaiHangHoa('V01');
    setNguoiThanhToan('F1');
    setChoXemHang('1');
    setDiemGiaoNhan('ZPD');
    setGhiChu('');
    setActiveTab('1');
    setPackageItemArr([]);
    setPackageItemErrorsList([]);
    tabValid = true;
    setCuocChinh('0 đ');
    setCuocCongThem('0 đ');
    setTongCuoc('0 đ');
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
    setSelectedTemplate([]);
    setKeywords('');
    setTab(0);
    setDetailSender(false);
    setDetailReceiver(false);
  }

  //__________________________________________________________________________
  // _____________________Address choosing event______________________________
  //__________________________________________________________________________

  const payloadProvinceSender = {
    TypeLocation: 1,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 200,
  };
  const payloadDistrictSender = {
    TypeLocation: 2,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 1000,
  };
  const payloadWardSender = {
    TypeLocation: 3,
    Id: '',
    ParentId: districtIdSender !== '0' ? districtIdSender : '',
    PageIndex: 0,
    PageSize: 500,
  };

  const [filteredProvinceSender, setFilteredProvinceSender] = useState<VtpAddress[]>([]);
  const [fullDistrict, setFullDistrict] = useState<VtpAddress[]>([]);
  const [filteredDistrictSender, setFilteredDistrictSender] = useState<VtpAddress[]>([]);
  const [filteredWardSender, setFilteredWardSender] = useState<VtpAddress[]>([]);

  useEffect((): void => {
    dispatch(
      action_GET_PROVINCE(payloadProvinceSender, {
        onSuccess: (data: VtpAddressResponse): void => {
          if (!isMounted()) return;
          setFilteredProvinceSender(get(data, 'LocationModels'));
        },
      }),
    );
    dispatch(
      action_GET_DISTRICT(payloadDistrictSender, {
        onSuccess: (data: VtpAddressResponse): void => {
          if (!isMounted()) return;
          setFullDistrict(get(data, 'LocationModels'));
          if (provinceIdSender !== '') {
            setFilteredDistrictSender(filter(get(data, 'LocationModels'), { P: provinceIdSender }));
          }
        },
      }),
    );
    if (districtIdSender !== '') {
      dispatch(
        action_GET_WARD(payloadWardSender, {
          onSuccess: (data: VtpAddressResponse): void => {
            if (!isMounted()) return;
            setFilteredWardSender(get(data, 'LocationModels'));
          },
        }),
      );
    }
    //_________________set Detail address when choosing location from detail form
    if (
      (size(trim(detailAddressSender)) > 0 ||
        size(provinceIdSender) > 0 ||
        size(districtIdSender) > 0 ||
        size(wardIdSender) > 0) &&
      detailSender
    ) {
      const provinceNameSender = getAddressNameById(provinceIdSender, filteredProvinceSender);
      const districtNameSender = getAddressNameById(districtIdSender, filteredDistrictSender);
      const wardNameSender = getAddressNameById(wardIdSender, filteredWardSender);
      setDiaChiSender(
        `${detailAddressSender}${' '}${wardNameSender}${' '}${districtNameSender}${' '}${provinceNameSender}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, provinceIdSender, districtIdSender, wardIdSender, detailAddressSender]);

  const handleChangeProvinceSender = (options: TypeaheadOption[]): void => {
    const value = get(options, '0.id', '');
    setProvinceIdSender(value);
    setDistrictIdSender('');
    setWardIdSender('');
    if (value !== '') {
      setFilteredDistrictSender(filter(fullDistrict, { P: value }));
    } else {
      setFilteredDistrictSender([]);
    }
    setFilteredWardSender([]);
    triggerValidateAndPriceCalculate();
  };

  const handleChangeDistrictSender = (options: TypeaheadOption[]): void => {
    const value = get(options, '0.id', '');
    setDistrictIdSender(value);
    if (value !== '') {
      payloadWardSender.ParentId = value;
      dispatch(
        action_GET_WARD(payloadWardSender, {
          onSuccess: (data: VtpAddressResponse): void => {
            if (!isMounted()) return;
            setFilteredWardSender(get(data, 'LocationModels'));
          },
        }),
      );
    } else {
      setFilteredWardSender([]);
    }
    setWardIdSender('');
    triggerValidateAndPriceCalculate();
  };

  const handleChangeWardSender = (options: TypeaheadOption[]): void => {
    const value = get(options, '0.id', '');
    setWardIdSender(value);
    triggerValidateAndPriceCalculate();
  };

  //__________________ address popup events

  const [detailSender, setDetailSender] = useState<boolean>(false);

  function toggleSenderAddress(): void {
    setDetailSender(!detailSender);
  }

  //__________________________________________________________________________
  // _____________________Address choosing event - RECEIVER__________
  //__________________________________________________________________________

  const payloadProvinceReceiver = {
    TypeLocation: 1,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 200,
  };
  const payloadDistrictReceiver = {
    TypeLocation: 2,
    Id: '',
    ParentId: '',
    PageIndex: 0,
    PageSize: 1000,
  };
  const payloadWardReceiver = {
    TypeLocation: 3,
    Id: '',
    ParentId: districtIdReceiver !== '0' ? districtIdReceiver : '',
    PageIndex: 0,
    PageSize: 500,
  };

  const [filteredProvinceReceiver, setFilteredProvinceReceiver] = useState<VtpAddress[]>([]);
  const [filteredDistrictReceiver, setFilteredDistrictReceiver] = useState<VtpAddress[]>([]);
  const [filteredWardReceiver, setFilteredWardReceiver] = useState<VtpAddress[]>([]);

  useEffect((): void => {
    dispatch(
      action_GET_PROVINCE(payloadProvinceReceiver, {
        onSuccess: (data: VtpAddressResponse): void => {
          if (!isMounted()) return;
          setFilteredProvinceReceiver(get(data, 'LocationModels'));
        },
      }),
    );
    dispatch(
      action_GET_DISTRICT(payloadDistrictReceiver, {
        onSuccess: (data: VtpAddressResponse): void => {
          if (!isMounted()) return;
          setFullDistrict(get(data, 'LocationModels'));
          if (provinceIdReceiver !== '') {
            setFilteredDistrictReceiver(filter(get(data, 'LocationModels'), { P: provinceIdReceiver }));
          }
        },
      }),
    );
    if (districtIdReceiver !== '') {
      dispatch(
        action_GET_WARD(payloadWardReceiver, {
          onSuccess: (data: VtpAddressResponse): void => {
            if (!isMounted()) return;
            setFilteredWardReceiver(get(data, 'LocationModels'));
          },
        }),
      );
    }
    //_________________set Detail address when choosing location from detail form - Receiver
    if (
      (size(trim(detailAddressReceiver)) > 0 ||
        size(provinceIdReceiver) > 0 ||
        size(districtIdReceiver) > 0 ||
        size(wardIdReceiver) > 0) &&
      detailReceiver
    ) {
      const provinceNameReceiver = getAddressNameById(provinceIdReceiver, filteredProvinceReceiver);
      const districtNameReceiver = getAddressNameById(districtIdReceiver, filteredDistrictReceiver);
      const wardNameReceiver = getAddressNameById(wardIdReceiver, filteredWardReceiver);
      setDiaChiReceiver(
        `${detailAddressReceiver}${' '}${wardNameReceiver}${' '}${districtNameReceiver}${' '}${provinceNameReceiver}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, provinceIdReceiver, districtIdReceiver, wardIdReceiver, detailAddressReceiver]);

  const handleChangeProvinceReceiver = (options: TypeaheadOption[]): void => {
    const value = get(options, '0.id', '');
    setProvinceIdReceiver(value);
    setDistrictIdReceiver('');
    setWardIdReceiver('');
    if (value !== '') {
      setFilteredDistrictReceiver(filter(fullDistrict, { P: value }));
    } else {
      setFilteredDistrictReceiver([]);
    }
    setFilteredWardReceiver([]);
    triggerValidateAndPriceCalculate();
  };

  const handleChangeDistrictReceiver = (options: TypeaheadOption[]): void => {
    const value = get(options, '0.id', '');
    setDistrictIdReceiver(value);
    if (value !== '') {
      payloadWardReceiver.ParentId = value;
      dispatch(
        action_GET_WARD(payloadWardReceiver, {
          onSuccess: (data: VtpAddressResponse): void => {
            if (!isMounted()) return;
            setFilteredWardReceiver(get(data, 'LocationModels'));
          },
        }),
      );
    } else {
      setFilteredWardReceiver([]);
    }
    setWardIdReceiver('');
    triggerValidateAndPriceCalculate();
  };

  const handleChangeWardReceiver = (options: TypeaheadOption[]): void => {
    const value = get(options, '0.id', '');
    setWardIdReceiver(value);
    triggerValidateAndPriceCalculate();
  };

  //__________________ address popup events

  const [detailReceiver, setDetailReceiver] = useState<boolean>(false);

  function toggleReceiverAddress(): void {
    setDetailReceiver(!detailReceiver);
  }

  // _____________________________________________________________________________

  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }

  // eslint-disable-next-line max-lines-per-function
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
              <NumberFormat
                value={cuocChinh}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                suffix={' đ'}
              />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem" xl={4}>
            <Col xs="5" xl={7}>
              {t('Cước cộng thêm')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" xl={5} className="text-semibold">
              <NumberFormat
                value={cuocCongThem}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                suffix={' đ'}
              />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5" xl={4}>
              {t('Phụ phí')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" xl={8} className="text-semibold">
              <Input
                className="text-semibold"
                type="text"
                placeholder={t('Nhập phụ phí (đ)')}
                value={tienPhuPhi === '' ? tienPhuPhi : numberFormat(getValueOfNumberFormat(tienPhuPhi))}
                onChange={handleChangeTextboxValue(setTienPhuPhi)}
              />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="5">{t('Tổng cước')}</Col>
            <Col xs="7" className="color-orange text-semibold">
              <NumberFormat
                value={tongCuoc}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                suffix={' đ'}
              />
            </Col>
          </Row>
        </Row>
      </Row>
    );
  }

  function renderTypeaheadPerson(
    option: TypeaheadResult<Person>,
    props: TypeaheadMenuProps<Person>,
    index: number,
  ): JSX.Element {
    return (
      <div>
        <Row style={{ fontWeight: 'bold' }}>
          {get(option, 'phone') +
            (isEmpty(get(option, 'code')) ? '' : ' * ' + get(option, 'code')) +
            ' * ' +
            get(option, 'name')}
        </Row>
        <Row>{get(option, 'addr.formattedAddress')}</Row>
      </div>
    );
  }

  function handleSelectedSender(selected: Person[]): void {
    if (size(selected)) {
      setDienThoaiSender(get(selected, '0.phone'));
      setHoTenSender(get(selected, '0.name'));
      setMaKhachHangGui(get(selected, '0.code'));
      //address
      const dataComponents = get(selected, '0.addr.components', []);
      const thisProvince = find(dataComponents, (item: Component): boolean => {
        return item.type === 'PROVINCE';
      });
      setProvinceIdSender(get(thisProvince, 'code', ''));
      const thisDistrict = find(dataComponents, (item: Component): boolean => {
        return item.type === 'DISTRICT';
      });
      setDistrictIdSender(get(thisDistrict, 'code', ''));
      const thisWard = find(dataComponents, (item: Component): boolean => {
        return item.type === 'WARD';
      });
      setWardIdSender(get(thisWard, 'code', ''));
      const thisStreet = find(dataComponents, (item: Component): boolean => {
        return item.type === 'STREET';
      });
      setDetailAddressSender(get(thisStreet, 'name', ''));
      toggleSenderAddress();
      setSenderKeywords('');
      setFocusAdress('sender');
    }
  }

  function handleSelectedReceiver(selected: Person[]): void {
    if (size(selected)) {
      setDienThoaiReceiver(get(selected, '0.phone'));
      setHoTenReceiver(get(selected, '0.name'));
      setMaKhachHangNhan(get(selected, '0.code', '9999999999'));
      //address
      const dataComponents = get(selected, '0.addr.components', []);
      const thisProvince = find(dataComponents, (item: Component): boolean => {
        return item.type === 'PROVINCE';
      });
      setProvinceIdReceiver(get(thisProvince, 'code', ''));
      const thisDistrict = find(dataComponents, (item: Component): boolean => {
        return item.type === 'DISTRICT';
      });
      setDistrictIdReceiver(get(thisDistrict, 'code', ''));
      const thisWard = find(dataComponents, (item: Component): boolean => {
        return item.type === 'WARD';
      });
      setWardIdReceiver(get(thisWard, 'code', ''));
      const thisStreet = find(dataComponents, (item: Component): boolean => {
        return item.type === 'STREET';
      });
      setDetailAddressReceiver(get(thisStreet, 'name', ''));
      toggleReceiverAddress();
      setFocusAdress('receiver');
    }
  }

  function labelKeyPerson(option: Person): string {
    return `${option.phone} * ${option.code} * ${option.name}`;
  }

  // eslint-disable-next-line max-lines-per-function
  function renderSenderInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Người gửi')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Tìm kiếm nhanh')}
          </Label>
          <Col lg="8">
            <RootTypeahead
              id="suggestSender"
              labelKey={labelKeyPerson}
              onInputChange={setSenderKeywords}
              options={senderSuggest}
              selected={[]}
              onChange={handleSelectedSender}
              renderMenuItemChildren={renderTypeaheadPerson}
              placeholder={t('Nhập mã khách hàng/Tên/Số ĐT')}
            />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã khách hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              name="customerCodeInput"
              placeholder={t('Nhập mã khách hàng')}
              value={maKhachHangGui}
              onChange={handleChangeTextboxValue(setMaKhachHangGui)}
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
              name="senderPhoneInput"
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
              name="senderNameInput"
              placeholder={t('Nhập họ tên')}
              value={hoTenSender}
              onChange={handleChangeTextboxValue(setHoTenSender)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenSender')}</div>
          </Col>
        </Row>
        {!detailSender ? (
          <Row className="sipInputItem">
            <Label xs="12" lg="4">
              {t('Địa chỉ')}
              <span className="color-red"> *</span>
            </Label>
            <Col lg="8">
              <Typeahead
                id="locationSender"
                inputProps={{ name: 'locationSenderInput' }}
                onChange={handleChooseLocationSuggestSender}
                onInputChange={handleChangeTypeaheadInput(setDiaChiSender, 'locationSenderInput')}
                options={map(locationSuggestSender, location => ({
                  id: get(location, 'id'),
                  label: get(location, 'name'),
                }))}
                placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
              />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiSender')}</div>
              <p className="sipInputItemDescription">
                ({t('Nếu bạn không tìm thấy địa chỉ gợi ý')},{' '}
                <Button onClick={toggleSenderAddress} className="sipFlatBtn">
                  {t('nhấn vào đây')}
                </Button>{' '}
                {t('để tự nhập')})
              </p>
            </Col>
          </Row>
        ) : (
          <Row className="sipInputItem mb-0">
            <Label xs="12" lg="4">
              {t('Địa chỉ')}
              <span className="color-red"> *</span>
            </Label>
            <Col lg="8">
              <TypeaheadFullAddress
                focus={focusAddress === 'sender'}
                provinceId={provinceIdSender}
                handleChangeProvince={handleChangeProvinceSender}
                filteredProvinces={filteredProvinceSender}
                provinceErrorMessages={handleErrorMessage(errors, 'provinceIdSender')}
                districtId={districtIdSender}
                handleChangeDistrict={handleChangeDistrictSender}
                filteredDistricts={filteredDistrictSender}
                districtErrorMessages={handleErrorMessage(errors, 'districtIdSender')}
                wardId={wardIdSender}
                handleChangeWard={handleChangeWardSender}
                filteredWards={filteredWardSender}
                wardErrorMessages={handleErrorMessage(errors, 'wardIdSender')}
                detailAddress={detailAddressSender}
                onChangeDetailAddress={handleChangeTextboxValue(setDetailAddressSender)}
                detailAddressErrorMessages={handleErrorMessage(errors, 'detailAddressSender')}
              />
            </Col>
          </Row>
        )}
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
            {t('Tìm kiếm nhanh')}
          </Label>
          <Col lg="8">
            <RootTypeahead
              id="suggestSender"
              labelKey={labelKeyPerson}
              onInputChange={setReceiverKeywords}
              options={receiverSuggest}
              selected={[]}
              onChange={handleSelectedReceiver}
              renderMenuItemChildren={renderTypeaheadPerson}
              placeholder={t('Nhập mã khách hàng/Tên/Số ĐT')}
            />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã khách hàng')}
          </Label>
          <Col lg="8">
            <Input
              type="text"
              name="customerCodeInput"
              placeholder={t('Nhập mã khách hàng')}
              value={maKhachHangNhan}
              onChange={handleChangeTextboxValue(setMaKhachHangNhan)}
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
        {!detailReceiver ? (
          <Row className="sipInputItem">
            <Label xs="12" lg="4">
              {t('Địa chỉ')}
              <span className="color-red"> *</span>
            </Label>
            <Col lg="8">
              <Typeahead
                id="locationReceiver"
                inputProps={{ name: 'locationReceiverInput' }}
                onChange={handleChooseLocationSuggestReceiver}
                onInputChange={handleChangeTypeaheadInput(setDiaChiReceiver, 'locationReceiverInput')}
                options={map(locationSuggestReceiver, location => ({
                  id: get(location, 'id'),
                  label: get(location, 'name'),
                }))}
                placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
              />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiReceiver')}</div>
              <p className="sipInputItemDescription">
                ({t('Nếu bạn không tìm thấy địa chỉ gợi ý')},{' '}
                <Button onClick={toggleReceiverAddress} className="sipFlatBtn">
                  {t('nhấn vào đây')}
                </Button>{' '}
                {t('để tự nhập')})
              </p>
            </Col>
          </Row>
        ) : (
          <Row className="sipInputItem mb-0">
            <Label xs="12" lg="4">
              {t('Địa chỉ')}
              <span className="color-red"> *</span>
            </Label>
            <Col lg="8">
              <TypeaheadFullAddress
                provinceId={provinceIdReceiver}
                focus={focusAddress === 'receiver'}
                handleChangeProvince={handleChangeProvinceReceiver}
                filteredProvinces={filteredProvinceReceiver}
                provinceErrorMessages={handleErrorMessage(errors, 'provinceIdReceiver')}
                districtId={districtIdReceiver}
                handleChangeDistrict={handleChangeDistrictReceiver}
                filteredDistricts={filteredDistrictReceiver}
                districtErrorMessages={handleErrorMessage(errors, 'districtIdReceiver')}
                wardId={wardIdReceiver}
                handleChangeWard={handleChangeWardReceiver}
                filteredWards={filteredWardReceiver}
                wardErrorMessages={handleErrorMessage(errors, 'wardIdReceiver')}
                detailAddress={detailAddressReceiver}
                onChangeDetailAddress={handleChangeTextboxValue(setDetailAddressReceiver)}
                detailAddressErrorMessages={handleErrorMessage(errors, 'detailAddressReceiver')}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }

  const filterByFields = ['label'];

  const filterByCallback = (): boolean => {
    return true;
  };

  const loaiHinhDichVuListOptions: TypeaheadOption[] = React.useMemo(
    () =>
      map(loaiHinhDichVuList, (service: TransportMethodItem) => ({
        id: service.SERVICE_TYPE,
        label: service.SERVICE_TYPE_DES,
      })),
    [loaiHinhDichVuList],
  );

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
            <Typeahead
              id="selectService"
              labelKey={renderLabelKey}
              onChange={handleChangeTransportMethod(setPhuongThucVanChuyen)}
              options={loaiHinhDichVuListOptions}
              selected={loaiHinhDichVuListOptions.filter(item => {
                return item.id === phuongThucVanChuyen;
              })}
              filterBy={phuongThucVanChuyen ? filterByCallback : filterByFields}
              placeholder={t('Chọn dịch vụ')}
            />
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
        <Row className="sipInputItem sipOrderAdditionalServiceContainer" onClick={handleClearFocusElement}>
          {map(
            dichVuCongThemList,
            (item: TransportMethodItem): JSX.Element => {
              const isFocus = focusElement === item.SERVICE_TYPE;
              return (
                <Label
                  key={item.SERVICE_TYPE}
                  check
                  xl="4"
                  md="6"
                  xs="12"
                  className={classnames({
                    'pt-0 pb-0 mb-3': true,
                    'focus-item': isFocus,
                  })}
                >
                  <Input
                    checked={!uncheckAllAdditionalCheckbox && dichVuCongThem.includes(item.SERVICE_TYPE)}
                    type="checkbox"
                    value={item.SERVICE_TYPE}
                    onChange={handleChangeAdditionalService}
                    onKeyUp={handleKeyUp(item.SERVICE_TYPE)}
                    onKeyDown={handleClearFocusElement}
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
      <Col className="sipOrderInputCol" xl="6" xs="12">
        <div className="sipContentContainer2">
          <div className="sipInputBlock">
            <Row className="sipInputItem">
              <Label xs="12" lg="4" style={{ color: '#299f9a', fontSize: '14px', fontWeight: 600 }}>
                {t('Mã phiếu gửi')}
              </Label>
              <Col lg="8">
                <Input
                  name="maPhieuGuiInput"
                  type="text"
                  value={maPhieuGui}
                  onChange={handleChangeTextboxValue(setMaPhieuGui)}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="sipContentContainer2">{renderSenderInput()}</div>
        <div className="sipContentContainer2">{renderReceiverInput()}</div>
        <div className="sipContentContainer2">{renderDeliveryRequirement()}</div>
      </Col>
    );
  }

  const [trongLuongQuyDoi, setTrongLuongQuyDoi] = useState<string>('0 G');

  // eslint-disable-next-line max-lines-per-function
  const callDimensionWeight = async (
    provinceIdSender: string,
    districtIdSender: string,
    wardIdSender: string,
    maKhachHangGui: string,
    phuongThucVanChuyen: string,
    kichThuocDai: string | undefined,
    kichThuocRong: string | undefined,
    kichThuocCao: string | undefined,
    item?: string,
    valueName?: string,
    index?: number,
  ): Promise<void> => {
    if (
      size(kichThuocDai) > 0 &&
      size(kichThuocCao) > 0 &&
      size(kichThuocRong) > 0 &&
      size(provinceIdSender) > 0 &&
      size(districtIdSender) > 0 &&
      size(wardIdSender) > 0 &&
      size(phuongThucVanChuyen) > 0
    ) {
      dispatch(
        action_ZTMI229(
          {
            CityID: provinceIdSender,
            DistrictID: districtIdSender,
            Ward: wardIdSender,
            OrderingParty: maKhachHangGui,
            Length: kichThuocDai,
            Width: kichThuocRong,
            Height: kichThuocCao,
            ServiceType: phuongThucVanChuyen,
            Unit: 'CM',
          },
          {
            onSuccess: (data: API.ZTMI229Response): void => {
              if (!isMounted()) return;
              if (
                data.MT_ZTMI229_OUT &&
                data.MT_ZTMI229_OUT.RETURN_MESSAGE &&
                data.MT_ZTMI229_OUT.RETURN_MESSAGE.TYPE === 'E'
              ) {
                toast(
                  <>
                    <i className="fa fa-window-close-o mr-2" />
                    {t(data.MT_ZTMI229_OUT.RETURN_MESSAGE.MESSAGE || 'Lỗi quy đổi trọng lượng')}
                  </>,
                  {
                    type: 'error',
                  },
                );
                return;
              }
              if (data.MT_ZTMI229_OUT && data.MT_ZTMI229_OUT.DIMENSION_WEIGHT) {
                setDimensionValue(
                  data.MT_ZTMI229_OUT.WEIGHT_UOM === 'KG'
                    ? formatNumber(parseFloat(getValueOfNumberFormat(data.MT_ZTMI229_OUT.DIMENSION_WEIGHT)) * 1000) +
                        ' ' +
                        data.MT_ZTMI229_OUT.WEIGHT_UOM
                    : formatNumber(parseFloat(getValueOfNumberFormat(data.MT_ZTMI229_OUT.DIMENSION_WEIGHT))) +
                        ' ' +
                        data.MT_ZTMI229_OUT.WEIGHT_UOM,
                  item,
                  valueName,
                  index,
                );
              }
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
            },
          },
        ),
      );
    } else {
      setDimensionValue('0 G', item, valueName, index);
    }
  };

  React.useEffect((): void => {
    callDimensionWeight(
      provinceIdSender,
      districtIdSender,
      wardIdSender,
      maKhachHangGui,
      phuongThucVanChuyen,
      kichThuocDai,
      kichThuocRong,
      kichThuocCao,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    provinceIdSender,
    phuongThucVanChuyen,
    districtIdSender,
    wardIdSender,
    maKhachHangGui,
    kichThuocDai,
    kichThuocCao,
    kichThuocRong,
  ]);

  function renderPackageSize(): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Dài (cm)')}
            value={kichThuocDai === '' ? kichThuocDai : numberFormat(getValueOfNumberFormat(kichThuocDai))}
            onChange={handleChangeTextboxValue(setKichThuocDai)}
          />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocDai')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Rộng (cm)')}
            value={kichThuocRong === '' ? kichThuocRong : numberFormat(getValueOfNumberFormat(kichThuocRong))}
            onChange={handleChangeTextboxValue(setKichThuocRong)}
          />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocRong')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input
            type="text"
            placeholder={t('Cao (cm)')}
            value={kichThuocCao === '' ? kichThuocCao : numberFormat(getValueOfNumberFormat(kichThuocCao))}
            onChange={handleChangeTextboxValue(setKichThuocCao)}
          />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocCao')}</div>
        </Col>
        <p className="sipInputItemDescription text-left" style={{ paddingLeft: '0.35rem' }}>
          Trọng lượng quy đổi: &nbsp;
          <span className="text-semibold color-bluegreen font-italic" style={{ color: 'green' }}>
            {trongLuongQuyDoi}
          </span>
        </p>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageType(): JSX.Element {
    const isFocused = focusElement === 'packageType';
    const checkMap = {
      V3: loaiKienHang === 'V3',
      V2: loaiKienHang === 'V2',
      V1: loaiKienHang === 'V1',
    };
    return (
      <Row>
        <Col lg="5" xs="12" className="pr-0">
          <Label check xs="12" className={classnames({ 'pl-0 pr-0': true, 'focus-item': isFocused && checkMap['V3'] })}>
            <Input
              type="radio"
              value="V3"
              name="packageType"
              checked={checkMap['V3']}
              onKeyUp={handleKeyUp('packageType')}
              onKeyDown={handleClearFocusElement}
              onChange={handleChangeTextboxValue(setLoaiKienHang)}
            />{' '}
            {t('Bưu gửi nhỏ')}
          </Label>
        </Col>
        <Col lg="3" xs="12" className="pr-0">
          <Label check xs="12" className={classnames({ 'pl-0 pr-0': true, 'focus-item': isFocused && checkMap['V2'] })}>
            <Input
              type="radio"
              onKeyUp={handleKeyUp('packageType')}
              onKeyDown={handleClearFocusElement}
              onChange={handleChangeTextboxValue(setLoaiKienHang)}
              value="V2"
              checked={checkMap['V2']}
              name="packageType"
            />{' '}
            {t('Thư')}
          </Label>
        </Col>
        <Col lg="4" xs="12" className="pr-0">
          <Label check xs="12" className={classnames({ 'pl-0 pr-0': true, 'focus-item': isFocused && checkMap['V1'] })}>
            <Input
              onKeyUp={handleKeyUp('packageType')}
              onChange={handleChangeTextboxValue(setLoaiKienHang)}
              onKeyDown={handleClearFocusElement}
              type="radio"
              value="V1"
              checked={checkMap['V1']}
              name="packageType"
            />{' '}
            {t('Kiện')}
          </Label>
        </Col>
      </Row>
    );
  }

  function onChangeTenhang(input: string): void {
    setSelectedCommodity([]);
    setTenHang(input);
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInfoDetail(): JSX.Element {
    return (
      <div>
        <h3>{t('Thông tin hàng hóa')}</h3>
        {/*<Row className="sipInputItem">*/}
        {/*  <Label xs="12" lg="4">*/}
        {/*    {t('Mã bưu phẩm')}*/}
        {/*  </Label>*/}
        {/*  <Col lg="8">*/}
        {/*    <Input*/}
        {/*      name="maBuuPhamInput"*/}
        {/*      type="text"*/}
        {/*      value={maBuuPham}*/}
        {/*      onChange={handleChangeTextboxValue(setMaBuuPham)}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
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
            {t('Tên hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <TypeaheadTenHang
              onChange={handleChooseCommoditySuggest}
              onInputChange={handleChangeTypeaheadInput(onChangeTenhang)}
              selected={isEmpty(tenHang) ? [] : selectedCommodity}
              suggestions={commoditySuggest}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tenHang')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Nhóm hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg={8} xs={12}>
            <TypeaheadLoaiHang
              loaiKienHang={loaiKienHang}
              onChange={handleChangeTypeaheadValue(setLoaiHangHoa)}
              value={loaiHangHoa}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'loaiHangHoa')}</div>
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
              value={soLuong === '' ? soLuong : numberFormat(getValueOfNumberFormat(soLuong))}
              onChange={handleChangeTextboxValue(setSoLuong)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'soLuong')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Giá trị hàng hóa')}
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập giá trị (đ)')}
              value={giaTri === '' ? giaTri : numberFormat(getValueOfNumberFormat(giaTri))}
              onChange={handleChangeTextboxValue(setGiaTri)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'giaTri')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Tiền thu hộ')}
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập tiền thu hộ (đ)')}
              value={tienThuHo === '' ? tienThuHo : numberFormat(getValueOfNumberFormat(tienThuHo))}
              onChange={handleChangeTienThuHo()}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tienThuHo')}</div>
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
              value={trongLuong === '' ? trongLuong : numberFormat(getValueOfNumberFormat(trongLuong))}
              onChange={handleChangeTextboxValue(setTrongLuong)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'trongLuong')}</div>
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
    const visiting = focusElement === 'orderPayment';
    const checkMap = {
      F1: nguoiThanhToan === 'F1',
      F2: nguoiThanhToan === 'F2',
    };
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
          {/*<Label xs="12" lg="12">*/}
          {/*  {t('Thanh toán cước')}*/}
          {/*  <span className="color-red"> *</span>*/}
          {/*</Label>*/}
          <Col lg="12" xs="12">
            <Label
              check
              xs="12"
              className={classnames({ 'pl-0 pr-0': true, 'focus-item': visiting && checkMap['F1'] })}
            >
              <Input
                type="radio"
                value="F1"
                name="payer"
                onKeyUp={handleKeyUp('orderPayment')}
                onKeyDown={handleClearFocusElement}
                checked={checkMap['F1']}
                onChange={handleChangeTextboxValue(setNguoiThanhToan)}
              />{' '}
              {t('Người gửi')}
            </Label>
          </Col>
          <Col lg="12" xs="12">
            <Label
              check
              xs="12"
              className={classnames({ 'pl-0 pr-0': true, 'focus-item': visiting && checkMap['F2'] })}
            >
              <Input
                type="radio"
                onKeyUp={handleKeyUp('orderPayment')}
                onKeyDown={handleClearFocusElement}
                value="F2"
                name="payer"
                checked={checkMap['F2']}
                onChange={handleChangeTextboxValue(setNguoiThanhToan)}
              />{' '}
              {t('Người nhận')}
            </Label>
          </Col>
        </Row>
      </div>
    );
  }

  function renderBillBlock(): JSX.Element {
    const isFocus = focusElement === 'deliveryRequirement';
    const checkMap = {
      choXemHang: choXemHang === '1',
      khongChoXemHang: choXemHang === '2',
    };
    return (
      <Row className="sipInputItem">
        <Col lg="12" xs="12">
          <h3>{t('Yêu cầu giao bưu gửi')}</h3>
          <Label
            check
            xs="12"
            className={classnames({ 'pl-0 pr-0': true, 'focus-item': isFocus && checkMap['choXemHang'] })}
          >
            <Input
              type="radio"
              name="deliveryRequirement"
              value="1"
              checked={checkMap['choXemHang']}
              onChange={handleChangeTextboxValue(setChoXemHang)}
              onKeyUp={handleKeyUp('deliveryRequirement')}
              onKeyDown={handleClearFocusElement}
            />{' '}
            {t('Cho khách xem hàng')}
          </Label>
        </Col>
        <Col lg="12" xs="12">
          <Label
            check
            xs="12"
            className={classnames({ 'pl-0 pr-0': true, 'focus-item': isFocus && checkMap['khongChoXemHang'] })}
          >
            <Input
              type="radio"
              name="deliveryRequirement"
              value="2"
              checked={checkMap['khongChoXemHang']}
              onKeyUp={handleKeyUp('deliveryRequirement')}
              onKeyDown={handleClearFocusElement}
              onChange={handleChangeTextboxValue(setChoXemHang)}
            />{' '}
            {t('Không cho khách xem hàng')}
          </Label>
        </Col>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderDeliveryRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <Row>
          <Col lg="6" xs="6">
            {renderBillBlock()}
          </Col>
          <Col lg="6" xs="6">
            {renderFeePayment()}
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
              dateFormat="dd/MM/yyyy"
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
              <option value="ZPD">{t('Giao hàng tại nhà')}</option>
              <option value="ZPP">{t('Giao hàng tại bưu cục')}</option>
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
              name="deliveryRequirementNoteInput"
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

  function handleChangeTab(event: React.MouseEvent): void {
    setListTemplates([]);
    setTab(Number(event.currentTarget.getAttribute('value')));
  }

  // eslint-disable-next-line
  function renderSuggetTemplate(results: Array<TypeaheadResult<OrderSuggestedItem>>, menuProps: any): JSX.Element {
    return (
      <Menu {...menuProps}>
        <div className="sipTabContainer">
          <Nav tabs fill={true}>
            <NavItem>
              <NavLink value={1} className={classnames({ active: tab === 1 })} onClick={handleChangeTab}>
                {t('Mẫu')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink value={2} className={classnames({ active: tab === 2 })} onClick={handleChangeTab}>
                {t('Hay dùng')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink value={3} className={classnames({ active: tab === 3 })} onClick={handleChangeTab}>
                {t('Gần đây')}
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        {results.map((result, index) => (
          <MenuItem key={get(result, 'id')} option={result} position={index}>
            <Row>
              <div style={{ maxWidth: 250, whiteSpace: 'pre-wrap' }}>{get(result, 'packages.0.name', '')}</div>
              <div
                style={{
                  right: 0,
                  position: 'absolute',
                  color: 'green',
                  marginRight: '10px',
                }}
              >
                {get(result, 'packages.0.weight', '0') + '' + get(result, 'packages.0.weightUnit', '')}
              </div>
            </Row>
            <Row>
              <span style={{ color: '#a3a3a3' }}>
                {get(result, 'sender.name', '') + ' - ' + get(result, 'sender.phone', '')}
              </span>
            </Row>
          </MenuItem>
        ))}
      </Menu>
    );
  }

  function renderPackageInfo(): JSX.Element {
    return (
      <Col className="sipOrderInputCol" xl="6" xs="12">
        <div className="sipContentContainer2">
          <div className="sipInputBlock">
            {renderPackageInfoDetail()}
            <AdditionalPackageTabItems
              removePackageItem={removePackageItem}
              data={packageItemArr}
              onChangeValue={adjustPackageItemValue}
              onChangeCommodityType={adjustPackageItemCommodityType}
              onChangeSuggestCommodity={adjustPackageItemSuggestCommodity}
              isSubmit={isSubmit}
              packageItemErrorsList={packageItemErrorsList}
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
            />
            <h3 style={{ minHeight: '25px' }}>
              <Button className="addNewPackageTabItemBtn" onClick={addNewPackageItem}>
                <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
                {t('Thêm')}
              </Button>
            </h3>
          </div>
        </div>
        <div className="sipContentContainer2">
          {renderSendingServices()}
          {renderAdditionalServices()}
          {/*{renderFeePayment()}*/}
        </div>
      </Col>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (selectedTemplate && size(selectedTemplate)) {
      setDienThoaiSender(get(selectedTemplate, '0.sender.phone'));
      setHoTenSender(get(selectedTemplate, '0.sender.name'));
      setMaKhachHangGui(get(selectedTemplate, '0.sender.code', '9999999999'));
      //address
      const dataComponentsSender = get(selectedTemplate, '0.sender.addr.components', []);
      const thisProvinceSender = find(dataComponentsSender, (item: Component): boolean => {
        return item.type === 'PROVINCE';
      });
      setProvinceIdSender(get(thisProvinceSender, 'code', ''));
      const thisDistrictSender = find(dataComponentsSender, (item: Component): boolean => {
        return item.type === 'DISTRICT';
      });
      setDistrictIdSender(get(thisDistrictSender, 'code', ''));
      const thisWardSender = find(dataComponentsSender, (item: Component): boolean => {
        return item.type === 'WARD';
      });
      setWardIdSender(get(thisWardSender, 'code', ''));
      const thisStreetSender = find(dataComponentsSender, (item: Component): boolean => {
        return item.type === 'STREET';
      });
      setDetailAddressSender(get(thisStreetSender, 'name', ''));
      setDetailSender(true);
      //__________________________________________________________
      setDienThoaiReceiver(get(selectedTemplate, '0.receiver.phone'));
      setHoTenReceiver(get(selectedTemplate, '0.receiver.name'));
      setMaKhachHangNhan(get(selectedTemplate, '0.receiver.code', '9999999999'));
      //address
      const dataComponentsReceive = get(selectedTemplate, '0.receiver.addr.components', []);
      const thisProvinceReceive = find(dataComponentsReceive, (item: Component): boolean => {
        return item.type === 'PROVINCE';
      });
      setProvinceIdReceiver(get(thisProvinceReceive, 'code', ''));
      const thisDistrictReceive = find(dataComponentsReceive, (item: Component): boolean => {
        return item.type === 'DISTRICT';
      });
      setDistrictIdReceiver(get(thisDistrictReceive, 'code', ''));
      const thisWardReceive = find(dataComponentsReceive, (item: Component): boolean => {
        return item.type === 'WARD';
      });
      setWardIdReceiver(get(thisWardReceive, 'code', ''));
      const thisStreetReceive = find(dataComponentsReceive, (item: Component): boolean => {
        return item.type === 'STREET';
      });
      setDetailAddressReceiver(get(thisStreetReceive, 'name', ''));
      setDetailReceiver(true);
      setTenHang(get(selectedTemplate, '0.packages.0.name', ''));
      setCommoditySuggest([
        {
          name: get(selectedTemplate, '0.packages.0.name', ''),
          description: get(selectedTemplate, '0.packages.0.name', ''),
          price: 0,
        },
      ]);
      setSelectedCommodity([
        {
          id: get(selectedTemplate, '0.packages.0.name', ''),
          label: get(selectedTemplate, '0.packages.0.name', ''),
        },
      ]);
      setSoLuong(get(selectedTemplate, '0.packages.0.quantity', 0));
      setGiaTri(get(selectedTemplate, '0.packages.0.goodsValue', 0));
      setTienThuHo(get(selectedTemplate, '0.packages.0.cod', 0));
      if (get(selectedTemplate, '0.packages.0.cod', 0) > 0) {
        dichVuCongThem.push('COD');
      }
      setTrongLuong(get(selectedTemplate, '0.packages.0.weight', '0'));
      setKichThuocDai(get(selectedTemplate, '0.packages.0.length', ''));
      setKichThuocRong(get(selectedTemplate, '0.packages.0.width', ''));
      setKichThuocCao(get(selectedTemplate, '0.packages.0.height', ''));
      setPhuongThucVanChuyen(get(selectedTemplate, '0.services.0'));
      setDiemGiaoNhan(get(selectedTemplate, '0.movementType'));

      setNguoiThanhToan(get(selectedTemplate, '0.freightTerm'));
      const arr = get(selectedTemplate, '0.packages', []);
      arr.shift();
      setPackageItemArr(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arr.map((item: any) => {
          return {
            ...item,
            GROSS_WEIGHT: get(item, 'weight', ''),
            COD: get(item, 'cod', 0),
            GOODS_VALUE: get(item, 'goodsValue', 0),
            QUANTITY_OF_PACKAGE: get(item, 'quantity', 0),
            Description: get(item, 'name', ''),
            COMMODITY_CODE: get(item, 'commodityCode', 'V01'),
            COMMODITY_TYPE: get(item, 'commodityType', 'V3'),
            Flag: '',
            NET_WEIGHT_OF_UNIT: '',
            GROSS_WEIGHT_OF_UNIT: get(item, 'weightUnit', 'G'),
            NET_WEIGHT: '',
            PACKAGE_TYPE: get(item, 'packageType', ''),
            PACKAGING_MATERIAL: '',
            QUANTITY_OF_UNIT: 'EA',
            Width: get(item, 'width', '0'),
            Hight: get(item, 'height', '0'),
            Length: get(item, 'length', '0'),
          };
        }),
      );
      const services = get(selectedTemplate, '0.services', []);
      services.shift();
      dichVuCongThem = services;
      triggerValidateAndPriceCalculate();
      setSelectedTemplate([]);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate]);

  function handleSelectedTemplate(selected: OrderSuggestedItem[]): void {
    if (size(selected)) {
      setSelectedTemplate(selected);
    }
  }

  function labelKeyTemplate(option: OrderSuggestedItem): string {
    return `${get(option, 'id')}`;
  }

  return (
    <div className="phieuGuiTrongNuoc" onKeyDown={handleClearFocusElement} onClick={handleClearFocusElement}>
      <Row className="mb-3 sipTitleContainer">
        <Col lg="2" xs="3">
          <h1 className="sipTitle">{t('Phiếu gửi trong nước')}</h1>
        </Col>
        <Col lg="4" xs="3">
          <RootTypeahead
            id="tet"
            labelKey={labelKeyTemplate}
            options={listTemplates}
            placeholder={'Tạo phiếu gửi theo biểu mẫu'}
            // onInputChange={setKeywords('')}
            renderMenu={renderSuggetTemplate}
            onChange={handleSelectedTemplate}
            selected={selectedTemplate}
          >
            <span
              style={{
                position: 'absolute',
                right: '8px',
                top: '12px',
              }}
              className="fa fa-caret-down"
            />
          </RootTypeahead>
        </Col>
      </Row>
      <Row className="mb-3 sipOrderInputRow">
        {renderSendingCouponInfo()}
        {renderPackageInfo()}
      </Row>
      {renderSendingCoupon()}
      <div className="display-block sipTitleRightBlock text-right sipOrderBtnSave">
        <Button className="ml-2" color="primary" onClick={handleClearData}>
          <img className="mr-2" src={'../../assets/img/icon/iconRefreshWhite.svg'} alt="VTPostek" />
          {t('Làm mới')}
        </Button>
        <Button className="ml-2" color="primary" onClick={handleValidate}>
          <img className="mr-2" src={'../../assets/img/icon/iconComplete.svg'} alt="VTPostek" />
          {t('Ghi lại')}
        </Button>
      </div>
      <ModalAddNewSuccess
        modalApiCreateSuccess={modalApiCreateSuccess}
        isCreateNewForwardingOrder={isCreateNewForwardingOrder}
        toggle={toggleModalApiCreateSuccess}
        idPhieuGuiSuccess={maPhieuGui}
      />
      {size(locationSuggestSender) > 0 || size(locationSuggestReceiver) > 0 || size(commoditySuggest) > 0 ? (
        <button className="sipInputAddressDropdownOverlay hide" onClick={handleHideChooseLocationDropdown} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PhieuGuiTrongNuoc;
