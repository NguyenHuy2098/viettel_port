/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import * as yup from 'yup';
import produce from 'immer';
import { match } from 'react-router-dom';
import { default as NumberFormat } from 'react-number-format';
import { Button, Col, Input, Label, Row, ListGroup, ListGroupItem } from 'reactstrap';
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
} from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { makeSelectorMaBP } from 'redux/auth/selectors';
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
import { action_COMMODITY_SUGGEST } from 'redux/CommoditySuggest/actions';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT, select_MT_ZTMI031_INSTANE } from 'redux/MIOA_ZTMI031/selectors';
// import { makeSelectProfile } from 'redux/auth/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { getAddressNameById, numberFormat, getValueOfNumberFormat } from 'utils/common';
import AdditionalPackageTabItemsInternational from 'components/AdditionalPackageTabItemsInternational';
import ModalAddNewSuccess from './ModalAddNewSuccess';
import { countryList } from './countryList';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhieuGuiQuocTe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);

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
  // const [provinceIdReceiver, setProvinceIdReceiver] = useState<string>(''); // temporary hide
  const [districtIdReceiver, setDistrictIdReceiver] = useState<string>('');
  const [wardIdReceiver, setWardIdReceiver] = useState<string>('');
  const [detailAddressReceiver, setDetailAddressReceiver] = useState<string>('');
  const [tenHang, setTenHang] = useState<string>('');
  const [soLuong, setSoLuong] = useState<string>('');
  const [giaTri, setGiaTri] = useState<string>('');
  const [trongLuong, setTrongLuong] = useState<string>('');
  //_____non-validated items
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState<string>('');
  const [quocGia, setQuocGia] = useState<string>(get(sortedCountryList, '[0].NATIONAL_NAME', 'VN'));
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('V3');
  const [choXemHang, setChoXemHang] = useState<string>('1');
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
    COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
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
    COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
    COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
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
    const newCommodityCode = value === 'V2' ? 'V04' : 'V99';
    const newArr = produce(packageItemArr, (draftState): void => {
      set(draftState[index], 'COMMODITY_TYPE', value);
      set(draftState[index], 'COMMODITY_CODE', newCommodityCode);
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
    tenHang: trim(tenHang),
    soLuong: trim(soLuong) === '' ? undefined : getValueOfNumberFormat(trim(soLuong)),
    giaTri: trim(giaTri) === '' ? undefined : getValueOfNumberFormat(trim(giaTri)),
    trongLuong: trim(trongLuong) === '' ? undefined : getValueOfNumberFormat(trim(trongLuong)),
    //_____non-validated items
    loaiHangHoa: trim(loaiHangHoa),
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
      setDienThoaiReceiver(get(orderInformationInstane, 'MOBILE_PHONE_DES', ''));
      setHoTenReceiver(get(orderInformationInstane, 'CONSIGNEE_NAME', ''));
      setDiaChiReceiver(
        `${orderInformationInstane.HOUSE_NO_SOURCE}${orderInformationInstane.STREET_ID_SOURCE}${wardReceiverEdit}${districtReceiverEdit}${provinceReceiverEdit}`,
      );
      // setProvinceIdReceiver(get(orderInformationInstane, 'PROVINCE_ID_DES', '')); // temporary hide
      setDistrictIdReceiver(get(orderInformationInstane, 'DISTRICT_ID_DES', ''));
      setWardIdReceiver(toString(get(orderInformationInstane, 'WARD_ID_DES', '')));
      setDetailAddressReceiver(
        get(orderInformationInstane, 'HOUSE_NO_DES', '') + ' ' + get(orderInformationInstane, 'STREET_ID_DES', ''),
      );
      setTenHang(get(orderInformationInstane, 'ITEM_DESCRIPTION', ''));
      setSoLuong(orderInformationInstane.Quantity ? parseFloat(orderInformationInstane.Quantity).toFixed(2) : '');
      setGiaTri('');
      setTrongLuong(
        orderInformationInstane.GROSS_WEIGHT ? parseFloat(orderInformationInstane.GROSS_WEIGHT).toFixed(2) : '',
      );
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
        COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
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
            COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
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
    let newPackageItem011 = {
      COD: '',
      COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
      COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
      Currency: '',
      Dimension_UoM: '',
      Goods_value: '',
      Gross_weight: '200',
      item_cat: 'PKG',
      Service_type: '',
      Weight_UoM: 'G',
      Length: '',
      Height: '',
      Width: '',
      quantity: '1',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newArr011: any = [];
    if (size(payloadPackageItemArr) >= 1) {
      forEach(payloadPackageItemArr, (item: PackageItemInputType): void => {
        newPackageItem011 = {
          COD: '',
          COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
          COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
          Currency: '',
          Dimension_UoM: '',
          Gross_weight: item.GROSS_WEIGHT ? toString(parseInt(getValueOfNumberFormat(item.GROSS_WEIGHT))) : '',
          Goods_value: '',
          Service_type: '',
          Length: item.Length ? toString(parseFloat(getValueOfNumberFormat(item.Length)).toFixed(2)) : '',
          Height: item.Hight ? toString(parseFloat(getValueOfNumberFormat(item.Hight)).toFixed(2)) : '',
          Width: item.Width ? toString(parseFloat(getValueOfNumberFormat(item.Width)).toFixed(2)) : '',
          item_cat: 'PKG',
          quantity: '1',
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
          COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
          COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
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

  function triggerValidateAndPriceCalculate(): void {
    //trigger get Summary information dispatch
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      triggerValidateAndPriceCalculate();
    };
  }

  //_________________Location suggest event handle__________________________

  const [countLocationSuggestSender, setCountLocationSuggestSender] = useState<number>(0);
  const [locationSuggestSender, setLocationSuggestSender] = useState<SuggestedItem[]>([]);
  const handleKeyPressDiaChiSender = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    setCountLocationSuggestSender(countLocationSuggestSender + 1);
  };

  const handleHideChooseLocationDropdown = (): void => {
    setLocationSuggestSender([]);
    setCommoditySuggest([]);
  };

  React.useEffect((): void => {
    if (countLocationSuggestSender > 0 && size(diaChiSender) > 0) {
      dispatch(
        action_LOCATIONSUGGEST(
          { q: diaChiSender },
          {
            onSuccess: (data: SuggestedLocation): void => {
              setLocationSuggestSender(get(data, 'items'));
            },
            onFailure: (error: HttpRequestErrorType): void => {
              setLocationSuggestSender([]);
            },
          },
        ),
      );
    } else {
      setLocationSuggestSender([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countLocationSuggestSender]);

  // eslint-disable-next-line max-lines-per-function
  function handleChooseLocationSuggestSender(id: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      const thisItem = find(locationSuggestSender, (item: SuggestedItem): boolean => {
        return item.id === id;
      });
      setDiaChiSender(get(thisItem, 'name', ''));
      dispatch(
        action_LOCATIONSUGGEST_DETAIL(
          { id: get(thisItem, 'id', '') },
          {
            onSuccess: (data: DetailSuggestedLocation): void => {
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
              const thisStreet = find(dataComponents, (item: Component): boolean => {
                return item.type === 'STREET';
              });
              const thisOther = find(dataComponents, (item: Component): boolean => {
                return item.type === 'OTHER';
              });
              const thisDetailAddress = `${get(thisOther, 'name', '')} ${get(thisStreet, 'name', '')}`;
              setDetailAddressSender(trim(thisDetailAddress) ? thisDetailAddress : '.');
              triggerValidateAndPriceCalculate();
            },
            onFailure: (error: HttpRequestErrorType): void => {
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
    };
  }

  //_________________COMMODITY suggest event handle__________________________

  const [countCommoditySuggest, setCountCommoditySuggest] = useState<number>(0);
  const [commoditySuggest, setCommoditySuggest] = useState<CommoditySuggestedItem[]>([]);
  const handleKeyPressHangHoa = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    setCountCommoditySuggest(countCommoditySuggest + 1);
  };

  React.useEffect((): void => {
    if (countCommoditySuggest > 0 && size(tenHang) > 0) {
      dispatch(
        action_COMMODITY_SUGGEST(
          { q: tenHang },
          {
            onSuccess: (data: SuggestedCommodity): void => {
              setCommoditySuggest(get(data, 'items'));
            },
            onFailure: (error: HttpRequestErrorType): void => {
              setCommoditySuggest([]);
            },
          },
        ),
      );
    } else {
      setCommoditySuggest([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countCommoditySuggest]);

  function handleChooseCommoditySuggest(
    name: string,
    price: number,
  ): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setTenHang(name);
      setGiaTri(toString(price));
      setCommoditySuggest([]);
      triggerValidateAndPriceCalculate();
    };
  }

  //___________________________________________________________________

  function handleChangeReceiverAddress(event: React.FormEvent<HTMLInputElement>): void {
    const thisValue = event.currentTarget.value;
    setDiaChiReceiver(thisValue);
    setDetailAddressReceiver(join(slice(thisValue, 0, 10), ''));
    setWardIdReceiver(join(slice(thisValue, 10, 70), ''));
    setDistrictIdReceiver(join(slice(thisValue, 70, 110), ''));
    // setProvinceIdReceiver(join(slice(thisValue, 110, 150), '')); // temporary hide
    setDescription(join(slice(thisValue, 150, 190), ''));
    triggerValidateAndPriceCalculate();
  }

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
      // CITY_NAME: trim(provinceIdReceiver),
      CITY_NAME: 'Singapore', // tạm thời để là "Singapore" sau này sửa lại thì cho dòng trên vào
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
      FREIGH_TERM: '', // Điều khoàn gửi hàng  PP : Trả bời người gửi, CC: trả bởi người nhận, Vinh bảo tạm thời để trống
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
      NOTE: choXemHang === '1' ? trim(ghiChu) + ' - Cho xem hàng' : trim(ghiChu) + ' - Không cho xem hàng', // Ghi chú cho bưu gửi
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
          COMMODITY_CODE: loaiHangHoa === 'V2' ? 'V04' : 'V99', // Nhóm hàng hóa (tham chiếu trong bảng)
          COMMODITY_TYPE: loaiHangHoa, // Nhóm hàng hóa (tham chiếu trong bảng)
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
    setPhuongThucVanChuyen('VCN');
    // setLoaiHangHoa('V3');
    // setNguoiThanhToan('PP');
    setChoXemHang('');
    setGhiChu('');
    setActiveTab('1');
    setPackageItemArr([]);
    setPackageItemErrorsList([]);
    tabValid = true;
    setCuocChinh('0 đ');
    setCuocCongThem('0 đ');
    setTongCuoc('0 đ');
    setCountGetSummaryInformation(countGetSummaryInformation + 1);
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
          setFilteredProvinceSender(get(data, 'LocationModels'));
        },
      }),
    );
    dispatch(
      action_GET_DISTRICT(payloadDistrictSender, {
        onSuccess: (data: VtpAddressResponse): void => {
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

  const handleChangeProvinceSender = (event: React.FormEvent<HTMLInputElement>): void => {
    setProvinceIdSender(event.currentTarget.value);
    setDistrictIdSender('');
    setWardIdSender('');
    if (event.currentTarget.value !== '') {
      setFilteredDistrictSender(filter(fullDistrict, { P: event.currentTarget.value }));
    } else {
      setFilteredDistrictSender([]);
    }
    setFilteredWardSender([]);
    triggerValidateAndPriceCalculate();
  };

  const handleChangeDistrictSender = (event: React.FormEvent<HTMLInputElement>): void => {
    setDistrictIdSender(event.currentTarget.value);
    if (event.currentTarget.value !== '') {
      payloadWardSender.ParentId = event.currentTarget.value;
      dispatch(
        action_GET_WARD(payloadWardSender, {
          onSuccess: (data: VtpAddressResponse): void => {
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

  const handleChangeWardSender = (event: React.FormEvent<HTMLInputElement>): void => {
    setWardIdSender(event.currentTarget.value);
    triggerValidateAndPriceCalculate();
  };

  //__________________ address popup events

  const [detailSender, setDetailSender] = useState<boolean>(false);
  function toggleSenderAddress(): void {
    setDetailSender(!detailSender);
  }

  // _____________________________________________________________________________

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
            <Col xs="5" xl={7}>
              {t('Cước cộng thêm')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" xl={5} className="text-semibold">
              <NumberFormat value={cuocCongThem} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </Col>
          </Row>
        </Row>
        <div className="sipLine row" />
        <Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="5">{t('Tổng cước')}</Col>
            <Col xs="7" className="color-orange text-semibold">
              <NumberFormat value={tongCuoc} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </Col>
          </Row>
        </Row>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderChoosingAddress(): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input type="select" id="provinceSelect" value={provinceIdSender} onChange={handleChangeProvinceSender}>
            <option value="0">{t('Chọn Thành phố/ Tỉnh')}</option>
            {map(
              filteredProvinceSender,
              (item: VtpAddress, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.I || undefined}>
                    {item.N}
                  </option>
                );
              },
            )}
          </Input>
          <div className="sipInputItemError">{handleErrorMessage(errors, 'provinceIdSender')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="select" id="districtSelect" value={districtIdSender} onChange={handleChangeDistrictSender}>
            <option value="0">{t('Quận / Huyện')}</option>
            {map(
              filteredDistrictSender,
              (item: VtpAddress, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.I || undefined}>
                    {item.N}
                  </option>
                );
              },
            )}
          </Input>
          <div className="sipInputItemError">{handleErrorMessage(errors, 'districtIdSender')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="select" id="wardSelect" value={wardIdSender} onChange={handleChangeWardSender}>
            <option value="0">{t('Chọn Phường/ Xã')}</option>
            {map(
              filteredWardSender,
              (item: VtpAddress, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.I || undefined}>
                    {item.N}
                  </option>
                );
              },
            )}
          </Input>
          <div className="sipInputItemError">{handleErrorMessage(errors, 'wardIdSender')}</div>
        </Col>
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
        {!detailSender ? (
          <Row className="sipInputItem">
            <Label xs="12" lg="4">
              {t('Địa chỉ')}
              <span className="color-red"> *</span>
            </Label>
            <Col lg="8">
              <Input
                type="text"
                placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
                value={diaChiSender}
                onChange={handleChangeTextboxValue(setDiaChiSender)}
                onKeyUp={handleKeyPressDiaChiSender}
              />
              <ListGroup className="sipInputAddressDropdown">
                {map(
                  locationSuggestSender,
                  (item: SuggestedItem, index: number): JSX.Element => {
                    return (
                      <ListGroupItem tag="button" key={index} onClick={handleChooseLocationSuggestSender(item.id)}>
                        {get(item, 'name', '')}
                      </ListGroupItem>
                    );
                  },
                )}
              </ListGroup>
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
              {renderChoosingAddress()}
              <Input
                type="text"
                placeholder={t('Nhập địa chỉ(tên đường, ngõ hẻm, số nhà)')}
                value={detailAddressSender}
                onChange={handleChangeTextboxValue(setDetailAddressSender)}
              />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'detailAddressSender')}</div>
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
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Quốc gia')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="select" value={quocGia} onChange={handleChangeTextboxValue(setQuocGia)}>
              {map(sortedCountryList, (item: NationType, index: number) => {
                return (
                  <option key={index} value={item.NATIONAL_CODE}>
                    {item.NATIONAL_NAME}
                  </option>
                );
              })}
            </Input>
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenSender')}</div>
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
              value={diaChiReceiver}
              onChange={handleChangeReceiverAddress}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiReceiver')}</div>
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
              onChange={handleChangeTextboxValue(setPhuongThucVanChuyen)}
            >
              {map(
                transportMethodArr,
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

  function renderSendingCouponInfo(): JSX.Element {
    return (
      <Col className="sipOrderInputCol" xl="6" xs="12">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3>{t('Thông tin phiếu gửi')}</h3>
            <Row className="sipInputItem">
              <Label xs="12" lg="4">
                {t('Mã phiếu gửi')}
              </Label>
              <Col lg="8">
                <Input type="text" value={maPhieuGui} onChange={handleChangeTextboxValue(setMaPhieuGui)} />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'maPhieuGui')}</div>
              </Col>
            </Row>
          </div>
          {renderSenderInput()}
          {renderReceiverInput()}
          {renderSendingServices()}
        </div>
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
            <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
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
              onKeyUp={handleKeyPressHangHoa}
            />
            <ListGroup className="sipInputAddressDropdown">
              {map(
                commoditySuggest,
                (item: CommoditySuggestedItem, index: number): JSX.Element => {
                  return (
                    <ListGroupItem
                      tag="button"
                      key={index}
                      onClick={handleChooseCommoditySuggest(item.name, item.price)}
                    >
                      {get(item, 'name', '')} -{' '}
                      <NumberFormat
                        value={get(item, 'price', '')}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' đ'}
                      />
                    </ListGroupItem>
                  );
                },
              )}
            </ListGroup>
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tenHang')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Giá trị')}
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
                value="1"
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
                value="2"
                onChange={handleChangeTextboxValue(setChoXemHang)}
              />{' '}
              {t('Không cho khách xem hàng')}
            </Label>
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

  function renderPackageInfo(): JSX.Element {
    return (
      <Col className="sipOrderInputCol" xl="6" xs="12">
        <div className="sipContentContainer">
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
          />
          {renderDeliveryRequirement()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Phiếu gửi quốc tế')}</h1>
      </Row>
      {renderSendingCoupon()}
      <Row className="mb-3 sipOrderInputRow">
        {renderSendingCouponInfo()}
        {renderPackageInfo()}
      </Row>
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
        <button className="sipInputAddressDropdownOverlay" onClick={handleHideChooseLocationDropdown}></button>
      ) : (
        <></>
      )}
    </>
  );
};

export default PhieuGuiQuocTe;
