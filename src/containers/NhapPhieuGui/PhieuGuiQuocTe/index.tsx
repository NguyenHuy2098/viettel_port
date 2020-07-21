/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
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
  sortBy,
  toString,
  trim,
  isEmpty,
} from 'lodash';
import useIsMounted from 'react-is-mounted-hook';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import Typeahead from 'components/Input/Typeahead';
import TypeaheadLoaiHang from 'components/Input/TypeaheadLoaiHang';
import TypeaheadFullAddress from 'components/Input/TypeaheadFullAdressInter';
import TypeaheadTenHangInter from 'components/Input/TypeaheadTenHangInter';
import TypeaheadPhone from 'components/Input/TypeaheadPhone';
import { makeSelectorBPOrg, makeSelectorCurrentPostOffice } from 'redux/GetProfileByUsername/selectors';
import { action_MIOA_ZTMI012 } from 'redux/MIOA_ZTMI012/actions';
import { action_MIOA_ZTMI011 } from 'redux/MIOA_ZTMI011/actions';
import { action_LOCATIONSUGGEST } from 'redux/LocationSuggest/actions';
import { action_LOCATIONSUGGEST_DETAIL } from 'redux/LocationSuggestDetail/actions';
import { action_GET_TRANSPORT_METHOD } from 'redux/SIOA_ZTMI068/actions';
import {
  action_GET_ADDRESS,
  action_GET_PROVINCE,
  action_GET_DISTRICT,
  action_GET_WARD,
} from 'redux/LocationSearch/actions';
import { action_SENDER_SUGGEST, action_RECEIVER_SUGGEST } from 'redux/PersonSuggest/actions';
import { action_MOST_ORDER_SUGGEST, action_RECENT_ORDER_SUGGEST } from 'redux/OrderSuggest/actions';
import { action_COMMODITY_SUGGEST_INTER } from 'redux/CommoditySuggest/actions';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT, select_MT_ZTMI031_INSTANE } from 'redux/MIOA_ZTMI031/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { getAddressNameById, numberFormat, getValueOfNumberFormat } from 'utils/common';
import AdditionalPackageTabItemsInternational from 'components/AdditionalPackageTabItemsInternational';
import ModalAddNewSuccess from './ModalAddNewSuccess';
import { countryList } from './countryList';

import './style.scss';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhieuGuiQuocTe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorBPOrg);
  const isMounted = useIsMounted();
  const sortedCountryList = sortBy(countryList, ['NATIONAL_NAME']);

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

  const [senderKeywords, setSenderKeywords] = useState<string>('');

  const [provinceSenderEdit, setProvinceSenderEdit] = useState<string>('');
  const [districtSenderEdit, setDistrictSenderEdit] = useState<string>('');
  const [wardSenderEdit, setWardSenderEdit] = useState<string>('');
  const [provinceReceiverEdit, setProvinceReceiverEdit] = useState<string>('');
  const [districtReceiverEdit, setDistrictReceiverEdit] = useState<string>('');
  const [wardReceiverEdit, setWardReceiverEdit] = useState<string>('');
  const [focusAddress, setFocusAdress] = useState<string>('');

  const [keywords, setKeywords] = useState<string>('');
  const [tab, setTab] = useState<number>(1);

  const [tienPhuPhi, setTienPhuPhi] = useState<string>('');
  const [senderSuggest, setSenderSuggest] = useState<Person[]>([]);
  const [receiverSuggest, setReceiverSuggest] = useState<Person[]>([]);

  const [listTemplates, setListTemplates] = useState<OrderSuggestedItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<OrderSuggestedItem[]>();
  const [trongLuongTemplate, setTrongLuongTemplate] = useState<number>(0);
  // const [nhomHang, setNhomHang] = useState<string>('');

  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (orderInformationInstane.PROVINCE_ID_SOURCE) {
      dispatch(
        action_GET_ADDRESS(
          { Id: orderInformationInstane.PROVINCE_ID_SOURCE },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              if (!isMounted()) return;
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
              if (!isMounted()) return;
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
              if (!isMounted()) return;
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
              if (!isMounted()) return;
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
              if (!isMounted()) return;
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
              if (!isMounted()) return;
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

  const isWorldPhone = /^(\d)+(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
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
      .matches(isWorldPhone, t('Vui lòng nhập đúng định dạng số điện thoại')),
    hoTenReceiver: yup.string().required(t('Vui lòng nhập họ tên')),
    diaChiReceiver: yup.string().required(t('Vui lòng nhập địa chỉ')),
    quocGia: yup.string().required(t('Vui lòng nhập quốc gia')),
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
    trongLuong: yup
      .number()
      .required(t('Vui lòng nhập trọng lượng'))
      .min(0, t('Vui lòng nhập số lớn hơn 0'))
      .min(trongLuongTemplate, t('Vui lòng nhập trọng lượng lớn hơn hoặc bằng trọng lượng đơn hàng'))
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
  const [provinceIdSender, setProvinceIdSender] = useState<string>('');
  const [districtIdSender, setDistrictIdSender] = useState<string>('');
  const [wardIdSender, setWardIdSender] = useState<string>('');
  const [detailAddressSender, setDetailAddressSender] = useState<string>('');
  const [dienThoaiReceiver, setDienThoaiReceiver] = useState<string>('');
  const [hoTenReceiver, setHoTenReceiver] = useState<string>('');
  const [diaChiReceiver, setDiaChiReceiver] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [provinceIdReceiver, setProvinceIdReceiver] = useState<string>('');
  const [districtIdReceiver, setDistrictIdReceiver] = useState<string>('');
  const [wardIdReceiver, setWardIdReceiver] = useState<string>('');
  const [detailAddressReceiver, setDetailAddressReceiver] = useState<string>('');
  const [tenHang, setTenHang] = useState<string>('');
  const [soLuong, setSoLuong] = useState<string>('');
  const [giaTri, setGiaTri] = useState<string>('');
  const [trongLuong, setTrongLuong] = useState<string>('');

  //_____non-validated items
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState<string>('');
  const [quocGia, setQuocGia] = useState<string>('');
  const [nhomHang, setNhomHang] = useState<string>('V3');
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('V01');
  //const [choXemHang, setChoXemHang] = useState<string>('1');
  const [ghiChu, setGhiChu] = useState<string>('');
  //______ Transport method

  const [transportMethodArr, setTransportMethodArr] = useState<TransportMethodItem[]>([]);
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
    COMMODITY_CODE: nhomHang === 'V2' ? 'V04' : loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
    COMMODITY_TYPE: nhomHang, // Nhóm hàng hóa (tham chiếu trong bảng)
    PACKAGE_TYPE: '', // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các (O)
    QUANTITY_OF_UNIT: 'EA', // Đơn vị bưu gửi, luôn là EA
    GOODS_VALUE: getValueOfNumberFormat(giaTri),
    GROSS_WEIGHT: getValueOfNumberFormat(trongLuong),
    PACKAGING_MATERIAL: '',
    QUANTITY_OF_PACKAGE: getValueOfNumberFormat(soLuong),
    Description: trim(tenHang),
    NET_WEIGHT_OF_UNIT: '',
    Currency: '',
    GROSS_WEIGHT_OF_UNIT: 'G',
    Flag: '', // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
    COD: '',
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
    triggerValidateAndPriceCalculate();
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
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  function adjustPackageItemSuggestCommodity(item: any, index: number): void {
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], 'Description', get(item, '0.label', ''));
      set(draftState[index], 'GOODS_VALUE', toString(get(item, '0.goodsValue', '')));
      set(draftState[index], 'QUANTITY_OF_PACKAGE', toString(get(item, '0.quantity', '')));
      set(draftState[index], 'GROSS_WEIGHT', toString(get(item, '0.weight', '')));
      //  set(draftState[index], 'COMMODITY_CODE', toString(get(item, '0.commodityCode', nhomHang)));
    });
    setPackageItemArr(newArr);
    triggerValidateAndPriceCalculate();
  }
  function handleActiveTab(tab: string): void {
    setActiveTab(tab);
  }

  const validateData = {
    maPhieuGui: trim(maPhieuGui),
    maKhachHang: trim(maKhachHang) === '' ? '9999999999' : trim(maKhachHang),
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
    quocGia: trim(quocGia),
    tenHang: trim(tenHang),
    soLuong: trim(soLuong) === '' ? undefined : getValueOfNumberFormat(trim(soLuong)),
    giaTri: trim(giaTri) === '' ? undefined : getValueOfNumberFormat(trim(giaTri)),
    trongLuong: trim(trongLuong) === '' ? undefined : getValueOfNumberFormat(trim(trongLuong)),
  };

  //______________check if Order Information exist
  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (size(orderInformation)) {
      setMaKhachHang(get(orderInformationInstane, 'CONSIGNEE_ID', ''));
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
      setDetailSender(true);
      setProvinceIdSender(get(orderInformationInstane, 'PROVINCE_ID_SOURCE', ''));
      setDistrictIdSender(get(orderInformationInstane, 'DISTRICT_ID_SOURCE', ''));
      setWardIdSender(toString(get(orderInformationInstane, 'WARD_ID_SOURCE', '')));

      setDienThoaiReceiver(get(orderInformationInstane, 'MOBILE_PHONE_DES', ''));
      setHoTenReceiver(get(orderInformationInstane, 'CONSIGNEE_NAME', ''));
      setDiaChiReceiver(
        `${orderInformationInstane.HOUSE_NO_DES}${orderInformationInstane.STREET_ID_DES}${wardReceiverEdit}${districtReceiverEdit}${provinceReceiverEdit}`,
      );

      setSelectedCommodityPhone([{ id: dienThoaiReceiver, label: dienThoaiReceiver }]);

      setProvinceIdReceiver(get(orderInformationInstane, 'PROVINCE_ID_DES', ''));
      setDistrictIdReceiver(get(orderInformationInstane, 'DISTRICT_ID_DES', ''));
      setWardIdReceiver(toString(get(orderInformationInstane, 'WARD_ID_DES', '')));
      setQuocGia(toString(get(orderInformationInstane, 'COUNTRY_ID_DES', '')));
      setDetailAddressReceiver(
        get(orderInformationInstane, 'HOUSE_NO_DES', '') + ' ' + get(orderInformationInstane, 'STREET_ID_DES', ''),
      );
      setTenHang(get(orderInformationInstane, 'ITEM_DESCRIPTION', ''));
      setSoLuong(orderInformationInstane.Quantity ? parseFloat(orderInformationInstane.Quantity).toFixed(0) : '');
      setGiaTri(orderInformationInstane.GoodValue ? toString(parseInt(orderInformationInstane.GoodValue)) : '');
      if (tenHang === get(orderInformationInstane, 'ITEM_DESCRIPTION', '')) {
        setSelectedCommodity([{ id: tenHang, label: tenHang }]);
        setCommoditySuggest([
          {
            goodsValue: 0,
            weight: 0,
            name: tenHang,
            quantity: 0,
            commodityType: '',
          },
        ]);
      }
      setTrongLuong(
        orderInformationInstane.GROSS_WEIGHT ? parseFloat(orderInformationInstane.GROSS_WEIGHT).toFixed(0) : '',
      );
      setLoaiHangHoa(get(orderInformationInstane, 'COMMODITY_TYPE', 'V01'));
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
      setPhuongThucVanChuyen(join(thisTransportServiceType, ''));
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
            COD: '',
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
    // const servicePayload = find(
    //   transportMethodArr,
    //   (item: TransportMethodItem): boolean => item.SERVICE_TYPE === phuongThucVanChuyen,
    // );
    let newPackageItem011: PackageItemInputType = {
      COD: '',
      COMMODITY_CODE: 'V01', // Nhóm hàng hóa (tham chiếu trong bảng)
      COMMODITY_TYPE: 'V3', // Nhóm hàng hóa (tham chiếu trong bảng)
      Currency: '',
      GOODS_VALUE: '',
      GROSS_WEIGHT: '200',
      item_cat: 'PKG',
      SERVICE_TYPE: '',
      Length: '',
      Hight: '',
      Width: '',
      Weight_UoM: 'G',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newArr011: any = [];
    if (size(payloadPackageItemArr) >= 1) {
      forEach(payloadPackageItemArr, (item: PackageItemInputType): void => {
        newPackageItem011 = {
          COD: '',
          COMMODITY_CODE: item.COMMODITY_TYPE === 'V2' ? 'V04' : item.COMMODITY_CODE, // Nhóm hàng hóa (tham chiếu trong bảng)
          COMMODITY_TYPE: item.COMMODITY_TYPE, // Nhóm hàng hóa (tham chiếu trong bảng)
          Currency: '',
          GROSS_WEIGHT: item.GROSS_WEIGHT ? toString(parseInt(getValueOfNumberFormat(item.GROSS_WEIGHT))) : '',
          GOODS_VALUE: '',
          SERVICE_TYPE: '',
          Length: item.Length ? toString(parseFloat(getValueOfNumberFormat(item.Length)).toFixed(0)) : '',
          Hight: item.Hight ? toString(parseFloat(getValueOfNumberFormat(item.Hight)).toFixed(0)) : '',
          Width: item.Width ? toString(parseFloat(getValueOfNumberFormat(item.Width)).toFixed(0)) : '',
          item_cat: 'PKG',
          Weight_UoM: 'G',
        };
        newArr011.push(newPackageItem011);
      });
    }
    const api011Payload = {
      Destination_city: quocGia, //--- 40 kí tự
      Destination_country: quocGia, //- khi đơn quốc tế thì truyền city_des= country_des
      Destination_district: districtIdReceiver, //--- 40 kí tự
      Destination_Ward: wardIdReceiver,
      FWO_type: 'V003',
      loc_id: '',
      Movement_type: 'ZPD',
      Ordering_party: trim(maKhachHang) === '' ? '9999999999' : trim(maKhachHang),
      Item: newArr011,
      Service_group: 'V05',
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
          //______________temporary no additional amount
          const cuocCongThemAmount = reduce(
            data,
            (total: number, item: API.ItemMTZTMI011OUT): number => {
              return findIndex([], (itemDichVuCongThem: string): boolean => {
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
            // alert(error.messages);
          },
          onSuccess: (data: API.SIOAZTMI068Response): void => {
            if (!isMounted()) return;
            const thisTransportMethodArr = filter(
              get(data, 'MT_ZTMI068_OUT.Row', []),
              (item: TransportMethodItem): boolean => item.SERVICE_GROUP === 'V05',
            );
            setTransportMethodArr(thisTransportMethodArr);
            setPhuongThucVanChuyen(get(thisTransportMethodArr, '[0].SERVICE_TYPE', ''));
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
          Description: trim(item.Description),
          PACKAGE_TYPE: '',
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

  function triggerValidateAndPriceCalculate(): void {
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }

  function handleChangeTypeaheadInput(setValueFunction: Function) {
    return (input: string): void => {
      setValueFunction(input);
      triggerValidateAndPriceCalculate();
    };
  }

  function handleChangeTypeaheadValue(setValueFunction: Function): (items: TypeaheadOption[]) => void {
    return (items: TypeaheadOption[]): void => {
      setValueFunction(get(items, `0.id`, ''));
      triggerValidateAndPriceCalculate();
    };
  }

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      triggerValidateAndPriceCalculate();
    };
  }

  //_________________Location suggest event handle__________________________

  const [locationSuggestSender, setLocationSuggestSender] = useState<SuggestedItem[]>([]);

  const handleHideChooseLocationDropdown = (): void => {
    setLocationSuggestSender([]);
    setCommoditySuggest([]);
  };

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
            const dataComponents = get(data, 'components');
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
            setDetailAddressSender(trim(thisDetailAddress) ? thisDetailAddress : '.');
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
  }

  //_________________COMMODITY suggest event handle__________________________

  const [commoditySuggest, setCommoditySuggest] = useState<CommoditySuggestedItemInter[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<TypeaheadOption[]>([]);

  const [selectedCommodityPhone, setSelectedCommodityPhone] = useState<TypeaheadOption[]>([]);

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
    if (size(tenHang) > 0 && (size(selectedCommodity) === 0 || selectedCommodity[0].label !== tenHang)) {
      dispatch(
        action_COMMODITY_SUGGEST_INTER(
          { q: tenHang, postoffice: get(currentPostOfficeInStore, 'PostOfficeCode', ''), sender: maKhachHang },
          {
            onSuccess: (data: CommoditySuggestedItemInter[]): void => {
              if (!isMounted()) return;
              setCommoditySuggest(data);
            },
            onFailure: (error: HttpRequestErrorType): void => {
              if (!isMounted()) return;
              setCommoditySuggest([]);
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

  function handleChooseCommoditySuggest(items: TypeaheadOption[]): void {
    if (size(items)) {
      setTenHang(get(items, '0.label', ''));
      setGiaTri(toString(get(items, '0.goodsValue', '')));
      setSoLuong(toString(get(items, '0.quantity', '')));
      setNhomHang(get(items, '0.commodityType', nhomHang));
      setTrongLuong(get(items, '0.weight'));
      setTrongLuongTemplate(get(items, '0.weight', 0));
      setCommoditySuggest([]);
      setSelectedCommodity(items);
      triggerValidateAndPriceCalculate();
    }
  }

  function handleChooseCommoditySuggestPhone(items: TypeaheadOption[]): void {
    if (size(items)) {
      setDienThoaiReceiver(get(items, '0.label', ''));
      setHoTenReceiver(toString(get(items, '0.name', '')));
      const thisValue = get(items, '0.address');
      setDiaChiReceiver(thisValue);
      setDetailAddressReceiver(join(slice(thisValue, 0, 10), ''));
      setWardIdReceiver(join(slice(thisValue, 10, 70), ''));
      setDistrictIdReceiver(join(slice(thisValue, 70, 110), ''));
      setProvinceIdReceiver(join(slice(thisValue, 110, 150), ''));
      setDescription(join(slice(thisValue, 150, 190), ''));
      setReceiverSuggest([]);
      setSelectedCommodityPhone(items);
      // triggerValidateAndPriceCalculate();
    }
  }

  //___________________________________________________________________

  function handleChangeReceiverAddress(event: React.FormEvent<HTMLInputElement>): void {
    const thisValue = event.currentTarget.value;
    setDiaChiReceiver(thisValue);
    setDetailAddressReceiver(join(slice(thisValue, 0, 10), ''));
    setWardIdReceiver(join(slice(thisValue, 10, 70), ''));
    setDistrictIdReceiver(join(slice(thisValue, 70, 110), ''));
    setProvinceIdReceiver(join(slice(thisValue, 110, 150), ''));
    setDescription(join(slice(thisValue, 150, 190), ''));
    triggerValidateAndPriceCalculate();
  }

  React.useEffect((): void => {
    if (
      size(dienThoaiReceiver) > 0 &&
      (size(selectedCommodityPhone) === 0 || selectedCommodityPhone[0].label !== dienThoaiReceiver) &&
      currentPostOfficeInStore
    ) {
      dispatch(
        action_RECEIVER_SUGGEST(
          { q: dienThoaiReceiver, postoffice: currentPostOfficeInStore.PostOfficeCode, sender: maKhachHang },
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
  }, [dienThoaiReceiver, currentPostOfficeInStore]);

  // eslint-disable-next-line max-lines-per-function
  function handleSaveForwardingOrder(): void {
    const paramsPackageItem = {
      SERVICE_TYPE: phuongThucVanChuyen,
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
      CITY_DES: trim(quocGia), // khi đơn quốc tế thì truyền city_des= country_des
      CITY_NAME: trim(provinceIdReceiver),
      //CITY_NAME: 'Singapore', // tạm thời để là "Singapore" sau này sửa lại thì cho dòng trên vào
      CITY_SRC: trim(provinceIdSender), // trong trường hợp khách hàng vãng lai
      CONSIGNEE: '9999999999',
      COUNTRY_DES: trim(quocGia),
      COUNTRY_SRC: 'VN',
      CUS_ID: '', // Mã user trên hệ thống APP/Web
      DISTRICT_DES: trim(districtIdReceiver), // nhận trong trường hợp khách hàng vãng lai
      DISTRICT_NAME: trim(districtIdReceiver), // nhận trong trường hợp khách hàng vãng lai
      DISTRICT_SRC: trim(districtIdSender), // trong trường hợp khách hàng vãng lai
      DESCRIPTION: '', // Mô tả chương trình khuyến mại
      DES_NAME: trim(description), // Description cuối của chuỗi địa chỉ
      DISCTYPE: '', // Loại khuyến mại
      EMAIL_CONSIG: '',
      EMAIL_OP: '',
      EMAIL_SHIPPER: '',
      FREIGH_TERM: 'F1', // Điều khoàn gửi hàng  F1 : Trả bời người gửi, F2: trả bởi người nhận
      HOUSE_ID_SRC: '',
      HOUSE_ID_DES: trim(detailAddressReceiver),
      ITEM: payloadPackageItemArr,
      LOCATION_ID_SRC: '',
      LOCATION_ID_DES: '',
      // Vinh comment từ 27/9/2019
      MOVEMENT_TYPE: 'ZPD', // Loại hình gia nhận hàng hóa  ZDD: Điểm đến điểm,  ZDP: Điểm đến bưu cục, ZPD: Bưu cục đến điểm, ZPP: Bưu cục đến bưu cục
      NAME_CONSIG: trim(hoTenReceiver),
      NAME_OP: trim(hoTenSender),
      NAME_SHIPPER: trim(hoTenSender),
      NOTE: trim(ghiChu), // Ghi chú cho bưu gửi
      OLD_CAMPAIGN_ID: 0,
      ORDERING_PARTY: trim(maKhachHang) === '' ? '9999999999' : trim(maKhachHang), // Mã đối tác sử dụng dịch vụ
      ORDER_TYPE: 'V004', // Loại đơn gửi  V001 : Phiếu gửi nội địa, V002 : Phiếu gửi nội địa theo lô(hiện tại app không sử dụng), V003 : Phiều gửi quốc tế (tờ khai riêng, hiện tại app chưa có tính năng này), V004 : Phiếu gửi quốc tế (tờ khai chung)
      PHONE_CONSIG: trim(dienThoaiReceiver),
      PHONE_OP: trim(dienThoaiSender),
      PHONE_SHIPPER: trim(dienThoaiSender),
      POSTAL_CODE_DES: '', // Mã thánh phố nhận trong trường hợp khách hàng vãng lai
      POSTAL_CODE_SRC: '', // Mã thành phố trong trường hợp khách hàng vãng lai – nếu is null then default is 1000
      REQUEST_PICK_DATE: null,
      SALE_OFFICE: userMaBp, // mã bưu cục
      SHIPPER: trim(maKhachHang) === '' ? '9999999999' : trim(maKhachHang), // Người gửi hàng- mã BP
      SOURCE_TYPE: '03', // nguồn tạo từ APP/Web hoặc từ ecommerce
      STREET_NAME_DES: trim(wardIdReceiver), // Địa chỉ nhận trong trường hợp vãng lai
      STREET_NAME_SRC: trim(detailAddressSender), // trong trường hợp khách hàng vãng lai
      TEL_DES: trim(dienThoaiReceiver),
      TEL_SRC: trim(dienThoaiSender),
      TRANSPORTATION_MODE: '01', // Loại lịch trình 01: Lịch trình xe; 02: Lịch trình tàu bay; 03: Lịch trình tàu lửa; 04: Lịch trình tàu thủy
      WARD_DES: '', // Mã xã phường nhận trong trường hợp vãng lai
      WARD_SRC: trim(wardIdSender), // trong trường hợp khách hàng vãng lai
    };
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
          Description: trim(item.Description),
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

  function handleClearData(): void {
    // window.location.reload();
    setIsSubmit(false);
    setErrors([]);
    setMaPhieuGui('');
    setMaKhachHang('');
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
    setDetailAddressReceiver('');
    setTenHang('');
    setSoLuong('');
    setGiaTri('');
    setTrongLuong('');
    setPhuongThucVanChuyen('DHL');
    // setNhomHang('V3');
    // setNguoiThanhToan('PP');
    //setChoXemHang('');
    setGhiChu('');
    setActiveTab('1');
    setPackageItemArr([]);
    setPackageItemErrorsList([]);
    tabValid = true;
    setCuocChinh('0 đ');
    setCuocCongThem('0 đ');
    setTongCuoc('0 đ');
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
    setDetailSender(false);
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
  }, [provinceIdSender, districtIdSender, wardIdSender, detailAddressSender]);

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
    if (detailAddressSender === '') setDetailSender(!detailSender);
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
          <Row className="sipSendingCouponItem">
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
            <Col xs="5" xl={3}>
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
      setDienThoaiSender(get(selected, '0.phone', ''));
      setHoTenSender(get(selected, '0.name', ''));
      setMaKhachHang(get(selected, '0.code', '9999999999'));
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

  // function handleSelectedReceiver(selected: Person[]): void {
  //   if (size(selected)) {
  //     setDienThoaiReceiver(get(selected, '0.phone'));
  //     setHoTenReceiver(get(selected, '0.name'));
  //     const thisValue = get(selected, '0.addr.formattedAddress');
  //     setDiaChiReceiver(thisValue);
  //     setDetailAddressReceiver(join(slice(thisValue, 0, 10), ''));
  //     setWardIdReceiver(join(slice(thisValue, 10, 70), ''));
  //     setDistrictIdReceiver(join(slice(thisValue, 70, 110), ''));
  //     setProvinceIdReceiver(join(slice(thisValue, 110, 150), ''));
  //     setDescription(join(slice(thisValue, 150, 190), ''));
  //     //address
  //     // const dataComponents = get(selected, '0.addr.components', []);
  //     // const thisProvince = find(dataComponents, (item: Component): boolean => {
  //     //   return item.type === 'PROVINCE';
  //     // });
  //     // setProvinceIdReceiver(get(thisProvince, 'code', ''));
  //     // const thisDistrict = find(dataComponents, (item: Component): boolean => {
  //     //   return item.type === 'DISTRICT';
  //     // });
  //     // setDistrictIdReceiver(get(thisDistrict, 'code', ''));
  //     // const thisWard = find(dataComponents, (item: Component): boolean => {
  //     //   return item.type === 'WARD';
  //     // });
  //     // setWardIdReceiver(get(thisWard, 'code', ''));
  //     // const thisStreet = find(dataComponents, (item: Component): boolean => {
  //     //   return item.type === 'STREET';
  //     // });
  //     // setDetailAddressReceiver(get(thisStreet, 'name', ''));
  //     // toggleReceiverAddress();
  //     // setFocusAdress('receiver');
  //   }
  // }

  function labelKeyPerson(option: Person): string {
    return `${option.phone}`;
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
        {!detailSender ? (
          <Row className="sipInputItem">
            <Label xs="12" lg="4">
              {t('Địa chỉ')}
              <span className="color-red"> *</span>
            </Label>
            <Col lg="8">
              <Typeahead
                id="locationSender"
                onChange={handleChooseLocationSuggestSender}
                onInputChange={handleChangeTypeaheadInput(setDiaChiSender)}
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
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            {/* <Input
              type="text"
              placeholder={t('Nhập số điện thoại')}
              value={dienThoaiReceiver}
              onChange={handleChangeTextboxValue(setDienThoaiReceiver)}
            /> */}
            {/* <RootTypeahead
              id="receiverSuggest"
              labelKey={labelKeyPerson}
              onInputChange={setDienThoaiReceiver}
              options={receiverSuggest}
              selected={isEmpty(dienThoaiReceiver) ? [] : receiverSuggest.filter(item => {
                return item.phone === dienThoaiReceiver;
              })}
              onChange={handleSelectedReceiver}
              renderMenuItemChildren={renderTypeaheadPerson}
              placeholder={t('Nhập số điện thoại')}
            /> */}
            <TypeaheadPhone
              onChange={handleChooseCommoditySuggestPhone}
              onInputChange={handleChangeTypeaheadInput(onChangePhone)}
              selected={isEmpty(dienThoaiReceiver) ? [] : selectedCommodityPhone}
              suggestions={receiverSuggest}
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
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Quốc gia')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <RootTypeahead
              id="selectNations"
              onChange={handleChangeTypeaheadValue(setQuocGia)}
              options={map(sortedCountryList, (item: NationType) => ({
                id: item.NATIONAL_CODE,
                label: item.NATIONAL_NAME,
              }))}
              placeholder={t('Nhập nước đến')}
              filterBy={quocGia ? filterByCallback : filterByFields}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'quocGia')}</div>
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
              placeholder={t('Nhập địa chỉ')}
              value={diaChiReceiver ? diaChiReceiver : ''}
              onChange={handleChangeReceiverAddress}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiReceiver')}</div>
          </Col>
        </Row>
      </div>
    );
  }

  const loaiHinhDichVuListOptions: TypeaheadOption[] = React.useMemo(
    () =>
      map(transportMethodArr, (service: TransportMethodItem) => ({
        id: service.SERVICE_TYPE,
        label: service.SERVICE_TYPE_DES,
      })),
    [transportMethodArr],
  );

  const filterByFields = ['label'];

  const filterByCallback = (): boolean => {
    return true;
  };

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
              onChange={handleChangeTypeaheadValue(setPhuongThucVanChuyen)}
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

  function renderSendingCouponInfo(): JSX.Element {
    return (
      <Col className="sipOrderInputCol" xl="6" xs="12">
        <div className="sipContentContainer2">
          <Row className="sipInputBlock1">
            <Label xs="12" lg="4">
              <h3>{t('Mã phiếu gửi')}</h3>
            </Label>
            <Col lg="8">
              <Input type="text" value={maPhieuGui} onChange={handleChangeTextboxValue(setMaPhieuGui)} />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'maPhieuGui')}</div>
            </Col>
          </Row>
        </div>
        <div className="sipContentContainer2">{renderSenderInput()}</div>
        <div className="sipContentContainer2">{renderReceiverInput()}</div>
      </Col>
    );
  }

  function renderPackageType(): JSX.Element {
    return (
      <Row>
        <Col lg="5" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input
              type="radio"
              value="V03"
              name="packageType"
              defaultChecked
              onChange={handleChangeTextboxValue(setNhomHang)}
            />{' '}
            {t('Hàng hóa')}
          </Label>
        </Col>
        <Col lg="3" xs="12" className="pr-0">
          <Label check xs="12" className="pl-0 pr-0">
            <Input type="radio" value="V2" name="packageType" onChange={handleChangeTextboxValue(setNhomHang)} />{' '}
            {t('Thư')}
          </Label>
        </Col>
      </Row>
    );
  }

  function onChangeTenhang(input: string): void {
    setSelectedCommodity([]);
    setTenHang(input);
  }

  function onChangePhone(input: string): void {
    setSelectedCommodityPhone([]);
    setDienThoaiReceiver(input);
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInfoDetail(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Thông tin hàng hóa')}</h3>
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
            {/*<Input*/}
            {/*  type="text"*/}
            {/*  placeholder={t('Nội dung hàng hoá')}*/}
            {/*  value={tenHang}*/}
            {/*  onChange={handleChangeTextboxValue(setTenHang)}*/}
            {/*  onKeyUp={handleKeyPressHangHoa}*/}
            {/*/>*/}
            {/*<ListGroup className="sipInputAddressDropdown">*/}
            {/*  {map(*/}
            {/*    commoditySuggest,*/}
            {/*    (item: CommoditySuggestedItem, index: number): JSX.Element => {*/}
            {/*      return (*/}
            {/*        <ListGroupItem*/}
            {/*          tag="button"*/}
            {/*          key={index}*/}
            {/*          onClick={handleChooseCommoditySuggest(item.name, item.price)}*/}
            {/*        >*/}
            {/*          {get(item, 'name', '')} -{' '}*/}
            {/*          <NumberFormat*/}
            {/*            value={get(item, 'price', '')}*/}
            {/*            displayType={'text'}*/}
            {/*            thousandSeparator={true}*/}
            {/*            suffix={' đ'}*/}
            {/*          />*/}
            {/*        </ListGroupItem>*/}
            {/*      );*/}
            {/*    },*/}
            {/*  )}*/}
            {/*</ListGroup>*/}
            <TypeaheadTenHangInter
              onChange={handleChooseCommoditySuggest}
              onInputChange={handleChangeTypeaheadInput(onChangeTenhang)}
              suggestions={commoditySuggest}
              selected={isEmpty(tenHang) ? [] : selectedCommodity}
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
              loaiKienHang={nhomHang}
              onChange={handleChangeTypeaheadValue(setLoaiHangHoa)}
              value={loaiHangHoa}
            />
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
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderNote(): JSX.Element {
    return (
      <Row className="sipInputBlock1">
        <Label xs="12" lg="4">
          <h3>{t('Ghi chú khác')}</h3>
        </Label>
        <Col lg="8">
          <Input type="text" value={ghiChu} onChange={handleChangeTextboxValue(setGhiChu)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'maPhieuGui')}</div>
        </Col>
      </Row>
    );
  }

  function renderPackageInfo(): JSX.Element {
    return (
      <Col className="sipOrderInputCol" xl="6" xs="12">
        <div className="sipContentContainer2">
          <div className="sipInputBlock">
            {renderPackageInfoDetail()}
            <AdditionalPackageTabItemsInternational
              removePackageItem={removePackageItem}
              data={packageItemArr}
              onChangeValue={adjustPackageItemValue}
              onChangeCommodityType={adjustPackageItemCommodityType}
              onChangeSuggestCommodity={adjustPackageItemSuggestCommodity}
              isSubmit={isSubmit}
              packageItemErrorsList={packageItemErrorsList}
              activeTab={activeTab}
              setActiveTab={handleActiveTab}
              maKhachHang={maKhachHang}
            />
            <h3 style={{ minHeight: '25px' }}>
              <Button className="addNewPackageTabItemBtn" onClick={addNewPackageItem}>
                <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
                {t('Thêm hàng hóa')}
              </Button>
            </h3>
          </div>
        </div>
        <div className="sipContentContainer2">{renderSendingServices()}</div>
        <div className="sipContentContainer2">{renderNote()}</div>
      </Col>
    );
  }

  function handleChangeTab(event: React.MouseEvent): void {
    setTab(Number(event.currentTarget.getAttribute('value')));
    setListTemplates([]);
  }

  // eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (selectedTemplate && size(selectedTemplate)) {
      setDienThoaiSender(get(selectedTemplate, '0.sender.phone'));
      setHoTenSender(get(selectedTemplate, '0.sender.name'));
      setMaKhachHang(get(selectedTemplate, '0.sender.code', '9999999999'));
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

      const thisValue = get(selectedTemplate, '0.receiver.addr.formattedAddress');
      setDiaChiReceiver(thisValue);
      setDetailAddressReceiver(join(slice(thisValue, 0, 10), ''));
      setWardIdReceiver(join(slice(thisValue, 10, 70), ''));
      setDistrictIdReceiver(join(slice(thisValue, 70, 110), ''));
      setProvinceIdReceiver(join(slice(thisValue, 110, 150), ''));
      setDescription(join(slice(thisValue, 150, 190), ''));
      //address
      // const dataComponentsReceive = get(selectedTemplate, '0.receiver.addr.components', []);
      // const thisProvinceReceive = find(dataComponentsReceive, (item: Component): boolean => {
      //   return item.type === 'PROVINCE';
      // });
      // setProvinceIdReceiver(get(thisProvinceReceive, 'code', ''));
      // const thisDistrictReceive = find(dataComponentsReceive, (item: Component): boolean => {
      //   return item.type === 'DISTRICT';
      // });
      // setDistrictIdReceiver(get(thisDistrictReceive, 'code', ''));
      // const thisWardReceive = find(dataComponentsReceive, (item: Component): boolean => {
      //   return item.type === 'WARD';
      // });
      // setWardIdReceiver(get(thisWardReceive, 'code', ''));
      // const thisStreetReceive = find(dataComponentsReceive, (item: Component): boolean => {
      //   return item.type === 'STREET';
      // });
      // setDetailAddressReceiver(get(thisStreetReceive, 'name', ''));
      setTenHang(get(selectedTemplate, '0.packages.0.name', ''));
      // setCommoditySuggest([
      //   {
      //     name: get(selectedTemplate, '0.packages.0.name', ''),
      //     description: get(selectedTemplate, '0.packages.0.name', ''),
      //     price: 0,
      //   },
      // ]);
      setCommoditySuggest([
        {
          goodsValue: 0,
          weight: 0,
          name: tenHang,
          quantity: 0,
          commodityType: '',
        },
      ]);
      setSelectedCommodity([
        {
          id: get(selectedTemplate, '0.packages.0.name', ''),
          label: get(selectedTemplate, '0.packages.0.name', ''),
        },
      ]);
      setSelectedCommodityPhone([
        {
          id: get(selectedTemplate, '0.receiver.phone', ''),
          label: get(selectedTemplate, '0.receiver.phone', ''),
        },
      ]);
      setSoLuong(get(selectedTemplate, '0.packages.0.quantity', 0));
      setGiaTri(get(selectedTemplate, '0.packages.0.goodsValue', 0));

      setTrongLuong(get(selectedTemplate, '0.packages.0.weight', ''));
      setTrongLuongTemplate(get(selectedTemplate, '0.packages.0.weight', 0));
      setNhomHang(get(selectedTemplate, '0.packages.0.commodityType', 'V3'));
      // setKichThuocDai(get(selectedTemplate, '0.packages.0.length', '0'));
      // setKichThuocRong(get(selectedTemplate, '0.packages.0.width', '0'));
      // setKichThuocCao(get(selectedTemplate, '0.packages.0.height', '0'));
      setPhuongThucVanChuyen(get(selectedTemplate, '0.services.0'));
      // setDiemGiaoNhan(get(selectedTemplate, '0.movementType'));
      // setNguoiThanhToan(get(selectedTemplate, '0.freightTerm'));
      triggerValidateAndPriceCalculate();
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
              <span>{get(result, 'packages.0.name')}</span>
              <span
                style={{
                  right: 0,
                  position: 'absolute',
                  color: 'green',
                  marginRight: '10px',
                }}
              >
                {get(result, 'packages.0.weight', '0') + '' + get(result, 'packages.0.weightUnit')}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#a3a3a3' }}>
                {get(result, 'sender.name') + ' - ' + get(result, 'sender.phone')}
              </span>
            </Row>
          </MenuItem>
        ))}
      </Menu>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <Col lg="2" xs="3">
          <h1 className="sipTitle">{t('Phiếu gửi quốc tế')}</h1>
        </Col>
        <Col lg="4" xs="3">
          <RootTypeahead
            id="tet"
            labelKey={labelKeyTemplate}
            options={listTemplates}
            placeholder={'Tạo phiếu gửi theo biểu mẫu'}
            onInputChange={setKeywords}
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
      {size(locationSuggestSender) > 0 || size(commoditySuggest) > 0 ? (
        <button className="sipInputAddressDropdownOverlay hide" onClick={handleHideChooseLocationDropdown}></button>
      ) : (
        <></>
      )}
    </>
  );
};

export default PhieuGuiQuocTe;
