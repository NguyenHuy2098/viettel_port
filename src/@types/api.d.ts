/* eslint-disable max-lines, @typescript-eslint/interface-name-prefix, @typescript-eslint/no-explicit-any */
declare namespace API {
  export interface BKINPUT {
    ID?: string;
  }

  export interface CHILD {
    USER?: string;
    NO_ITEM?: string;
  }

  export interface Child {
    TOR_ID?: string;
    TOR_TYPE?: string;
    PACKAGE_ID?: string;
    GRO_WEI_VAL?: string;
    GRO_WEI_UNI?: string;
    LIFECYCLE?: number; // int32
    SRC_LOC_IDTRQ?: string;
    DES_LOC_IDTRQ?: string;
    ITEM_TEXT?: string;
    DATETIME_CHLC?: string;
    ZONLO?: string;
    DESCRIPTION?: string;
    child_count?: string;
  }

  export interface Childs {
    TOR_ID?: string;
    TOR_TYPE?: string;
    PACKAGE_ID?: string;
    LIFECYCLE?: string;
    DESCRIPTION?: string;
  }

  export interface Collection {
    header?: HEADERMTDETAILRECEIVERM;
    list?: LISTMTDETAILRECEIVERM[];
    Paging?: PagingZTMI054;
  }

  export interface EVTRQIDERROR {
    TRQ_ID?: string;
  }

  export interface Execution {
    Event?: string;
    TIME_DATE?: string;
    Timezone?: string;
    EVENT_REASON_CODE?: string;
    EVENT_REASON?: string;
    Location?: string;
    LOCATION_DESCRIPTION?: string;
    CHANGED_BY?: string;
    NAME_CHANGED_BY?: string;
    MOB_CHANGED_BY?: string;
  }

  export interface GenUserRequest {
    Number?: number; // int32
  }

  export interface GenUserVoSoResponse {
    Users?: UserVoSoViewModel[];
  }

  export interface HEADER {
    MA_BUU_CUC?: string;
    USER_ID?: string;
    BK_MONTH?: string;
    BK_YEAR?: string;
  }

  export interface HEADERMTDETAILRECEIVER {
    BK_ID?: string;
    BK_YEAR?: string;
    BK_MONTH?: string;
    BK_STATUS?: number; // int32
    CRE_BY?: string;
    CRE_TIME?: string;
    UDP_TIME?: string;
  }

  export interface HEADERMTDETAILRECEIVERM {
    BK_ID?: string;
    BK_YEAR?: string;
    BK_MONTH?: string;
    BK_STATUS?: number; // int32
    CRE_BY?: string;
    CRE_TIME?: string;
    UDP_TIME?: string;
  }

  export interface ITEMBK {
    LINE_ITEM?: string;
    KHOAN_MUC?: string;
    TEN_KM?: string;
    MAU_HD?: string;
    KIHIEU_HD?: string;
    SO_HD?: string;
    NGAY_HD?: string;
    NGUOI_BAN?: string;
    MST?: string;
    DESCR?: string;
    AMOUNT?: string;
    PHU_PHI?: string;
    TAX?: string;
    TAX_AMOUNT?: string;
    SUM_AMOUNT?: string;
    URL?: string;
    STATUS_ITEM?: number; // int32
    AMOUNT_INIT?: string;
    PHU_PHI_INIT?: string;
    TAX_INIT?: string;
    TAX_AMOUNT_INIT?: string;
    SUM_AMOUNT_INIT?: string;
    NOTE?: string;
  }

  export interface ITEMDELBK {
    LINE?: string;
  }

  export interface ITEMMTZFII016OUT {
    ZUONR?: number; // int32
    BUDAT?: number; // int32
    AMT_A?: string;
    BUDAT_A?: number; // int32
    AMT_B?: string;
    BUDAT_B?: number; // int32
    AMT_C?: string;
    BUDAT_C?: number; // int32
    AMT_D?: string;
    BUDAT_D?: string;
  }

  export interface ITEMRequestZTMI028 {
    /**
     * M?? b??u g???i b??? l???p bi??n b???n
     */
    FU?: string;
    /**
     * M?? t??? chi ti???t l???i
     */
    CONTENT?: string;
  }

  export interface ITFDELIVERY {
    CODE?: string;
    DESCRIPTION?: string;
  }

  export interface ITFPICK {
    CODE?: string;
    DESCRIPTION?: string;
  }

  export interface ITSFU {
    CODE?: number; // int32
    DESCRIPTION?: string;
  }

  export interface ITSFWO {
    CODE?: number; // int32
    DESCRIPTION?: string;
  }

  export interface IVTRQID {
    /**
     * M?? ????n h??ng ???????c phan c??ng
     */
    TRQ_ID?: string;
  }

  export interface ItemMTZTMI011OUT {
    /**
     * S??? ti???n t????ng ???ng v???i m?? d???ch v???
     */
    AMOUNT_ITEM?: string;
    /**
     * Ti???n t???
     */
    CURRENCY_ITEM?: string;
    /**
     * M?? d???ch v??? viettel
     */
    CHARGE_TYPE?: string;
  }

  export interface ItemMTZTMI031OUT {
    AMOUNT_ITEM?: string;
    CURRENCY_ITEM?: string;
    CHARGE_TYPE?: string;
  }

  export interface ItemZTMI011 {
    item_cat?: string;
    Gross_weight?: string;
    Net_weight?: string;
    Height?: string;
    Length?: string;
    Width?: string;
    Currency?: string;
    COD?: string;
    Insurance_value?: string;
    Weight_UoM?: string;
    Dimension_UoM?: string;
    quantity?: string;
    Commodity_type?: string;
    Commodity_code?: string;
  }

  export interface ItemZTMI012 {
    Flag?: string;
    Packaging_material?: string;
    Description?: string;
    Package_type?: string;
    Quantity_of_package?: string;
    Quantity_of_unit?: string;
    Gross_weight?: string;
    Gross_weight_of_unit?: string;
    Net_weight?: string;
    Net_weight_of_unit?: string;
    Length?: string;
    Hight?: string;
    Width?: string;
    Note?: string;
    Goods_value?: string;
    Currency?: string;
    COD?: string;
    Service_type?: string;
    Commodity_type?: string;
    Commodity_code?: string;
  }

  export interface ItemZTMI094 {
    /**
     * M??  FU - FU(30 v?? 58) - Freight_Unit(31)
     */
    FU_ID?: string;
  }

  export interface LIST {
    km_id?: string;
    km_text?: string;
  }

  export interface LISTMTDETAILRECEIVER {
    LINE_ITEM?: string;
    KHOAN_MUC?: string;
    TEN_KM?: string;
    MAU_HD?: string;
    KIHIEU_HD?: string;
    SO_HD?: string;
    NGAY_HD?: string;
    NGUOI_BAN?: string;
    MST?: string;
    DESCR?: string;
    URL?: string;
    STATUS_ITEM?: number; // int32
    AMOUNT?: string;
    AMOUNT_INIT?: string;
    PHU_PHI?: string;
    PHU_PHI_INIT?: string;
    TAX?: string;
    TAX_INIT?: string;
    TAX_AMOUNT?: string;
    TAX_AMOUNT_INIT?: string;
    SUM_AMOUNT?: string;
    SUM_AMOUNT_INIT?: string;
    NOTE?: string;
  }

  export interface LISTMTDETAILRECEIVERM {
    LINE_ITEM?: string;
    KHOAN_MUC?: string;
    TEN_KM?: string;
    MAU_HD?: string;
    KIHIEU_HD?: string;
    SO_HD?: string;
    NGAY_HD?: string;
    NGUOI_BAN?: string;
    MST?: string;
    DESCR?: string;
    URL?: string;
    STATUS_ITEM?: number; // int32
    AMOUNT?: string;
    AMOUNT_INIT?: string;
    PHU_PHI?: string;
    PHU_PHI_INIT?: string;
    TAX?: string;
    TAX_INIT?: string;
    TAX_AMOUNT?: string;
    TAX_AMOUNT_INIT?: string;
    SUM_AMOUNT?: string;
    SUM_AMOUNT_INIT?: string;
    NOTE?: string;
  }

  export interface ListMTBKRECEIVER {
    BK_ID?: string;
    BK_YEAR?: string;
    BK_MONTH?: string;
    BK_STATUS?: number; // int32
    CRE_BY?: string;
    CRE_TIME?: string;
    UDP_TIME?: string;
    UPD_BY?: string;
  }

  export interface LocationAddEsRequest {
    I?: string;
    N?: string;
    P?: string;
    type?: 1 | 2 | 3; // int32
  }

  export interface LocationAddEsResponse {
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface LocationAutoAddEsRequest {
    /**
     * Loa??i ??i??a chi??: 1-Ti??nh, 2-Huy????n, 3-Xa??
     */
    typeLocation?: 1 | 2 | 3; // int32
  }

  export interface LocationEsModel {
    I?: string;
    N?: string;
    P?: string;
    type?: 1 | 2 | 3; // int32
  }

  export interface LocationGetsEsRequest {
    /**
     * Loa??i ??i??a chi??: 0: T???t c???, 1-Ti??nh, 2-Huy????n, 3-Xa??
     */
    TypeLocation?: 1 | 2 | 3; // int32
    Id?: string;
    ParentId?: string;
    PageIndex?: number; // int32
    PageSize?: number; // int32
  }

  export interface LocationSearchEsResponse {
    LocationModels?: LocationEsModel[];
    PageIndex?: number; // int32
    PageSize?: number; // int32
    TotalRow?: number; // int32
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI011Request {
    /**
     * M?? lo???i ????n h??ng: V001: ????n h??ng x?? ph?????ng/x?? c???a ??i???m nh???n h??ng
     */
    FWO_type?: string;
    /**
     * M?? t??? ch???c mua h??ng: T???m th???i s??? d???ng m?? 50000005 cho VTP, ch??? ch???t v??? c???u tr??c t??? ch???c c?? thay ?????i s??? b??o l???i
     */
    Sales_org?: string;
    Service_group?: string;
    /**
     * M?? kh??ch h??ng
     */
    Ordering_party?: string;
    /**
     * Lo???i giao nh???n: ZDD: nh???n tr??? t???i nh??, ZPD ??? nh???n bc tr??? t???i nh??
     */
    Movement_type?: string;
    /**
     * M?? qu???c gia c???a ??i???m nh???n h??ng
     */
    Source_country?: string;
    /**
     * M?? t???nh/th??nh c???a ??i???m nh???n h??ng
     */
    Source_city?: string;
    /**
     * M?? qu???n/huy???n c???a ??i???m nh???n h??ng
     */
    Source_district?: string;
    /**
     * M?? ph?????ng/x?? c???a ??i???m nh???n h??ng
     */
    Source_Ward?: string;
    /**
     * M?? qu???c gia c???a ??i???m giao h??ng
     */
    Destination_country?: string;
    /**
     * M?? t???nh/th??nh c???a ??i???m giao h??ng
     */
    Destination_city?: string;
    /**
     * M?? qu???n/huy???n c???a ??i???m giao h??ng
     */
    Destination_district?: string;
    /**
     * M?? ph?????ng/x?? c???a ??i???m giao h??ng
     */
    Destination_Ward?: string;
    Item?: ItemZTMI011[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI011Response {
    /**
     *
     */
    MT_ZTMI011_OUT?: MTZTMI011OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI012Request {
    Order_Type?: string;
    Buyers_Reference_Number?: string;
    Sale_org?: string;
    Sale_office?: string;
    Source_type?: string;
    FWO_no?: string;
    Ordering_party?: string;
    Name_OP?: string;
    Address_OP?: string;
    Phone_OP?: string;
    Email_OP?: string;
    Shipper?: string;
    Name_shipper?: string;
    Address_shipper?: string;
    Phone_shipper?: string;
    Email_shipper?: string;
    Consignee?: string;
    Name_consig?: string;
    Address_consig?: string;
    Phone_consig?: string;
    Email_consig?: string;
    VAT_No_payer?: string;
    Movement_type?: string;
    postal_code_src?: string;
    tel_src?: string;
    country_src?: string;
    city_src?: string;
    district_src?: string;
    ward_src?: string;
    street_name_src?: string;
    HOUSE_ID_SRC?: string;
    postal_code_des?: string;
    tel_des?: string;
    country_des?: string;
    city_des?: string;
    district_des?: string;
    flag_header?: string;
    Promocode?: string;
    Voucher_id?: string;
    Campaign?: string;
    Disctype?: string;
    Description?: string;
    ward_des?: string;
    street_name_des?: string;
    location_ID_src?: string;
    location_ID_des?: string;
    request_pick_date?: string;
    confirm_pick_date?: string;
    request_deliv_date?: string;
    confirm_deliv_date?: string;
    Freigh_term?: string;
    Cus_id?: string;
    item?: ItemZTMI012[];
    Note?: string;
    des_name?: string;
    Transportation_mode?: string;
    house_id_des?: string;
    city_name?: string;
    district_name?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI012Response {
    MT_ZTMI012_OUT?: MTZTMI012OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI016Request {
    /**
     * 1 = T???o
     */
    IV_FLAG?: string;
    /**
     * Lo???i b???ng k?? ZC1 = B???ng k??, ZC2 = T???i
     */
    IV_TOR_TYPE?: string;
    /**
     * M?? t???i, b???ng k??
     */
    IV_TOR_ID_CU?: string;
    /**
     * ??i???m ??i
     */
    IV_SLOCATION?: string;
    /**
     * ??i???m ?????n
     */
    IV_DLOCATION?: string;
    /**
     * M?? t???
     */
    IV_DESCRIPTION?: string;
    /**
     *
     */
    T_ITEM?: TITEM[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI016Response {
    /**
     *
     */
    MT_ZTMI016_OUT?: MTZTMI016OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI017Request {
    /**
     * C l?? t???o m???i, M l?? modify, D l?? deletion
     */
    IV_FLAG?: string;
    /**
     * T???m th???i m???c ?????nh V11 ??? L???nh ??i???u xe ???????ng b??? (xe c???a viettel); V12 ??? L???nh ??i???u xe (xe VTP thu?? ngo??i); V16: L???nh ??i???u xe (Xe VTL thu?? ngo??i)
     */
    IV_FREIO_TYPE?: string;
    /**
     * Lo???i t???i/b???ng k??
     */
    IV_TOR_TYPE?: string;
    /**
     * M?? t???i/b???ng k??
     */
    IV_TOR_ID_CU?: string;
    /**
     * M?? l???nh ??i???u xe
     */
    IV_FREIO_ID?: string;
    /**
     * ??i???m ??i (b??? tr???ng n???u l???y theo schedule; ??i???n n???u kh??ng c?? schedule)
     */
    IV_SLOCATION?: string;
    /**
     * ??i???m ?????n (b??? tr???ng n???u l???y theo schedule; ??i???n n???u kh??ng c?? schedule)
     */
    IV_DLOCATION?: string;
    /**
     * M?? t???
     */
    IV_DESCRIPTION?: string;
    /**
     * M?? h??nh tr??nh ???????ng th??
     */
    IV_SCHEDULE?: string;
    /**
     * Th???i gian xu???t ph??t theo h??nh tr??nh ???????ng th??
     */
    IV_DEPARTDATE?: string;
    /**
     * M?? l??i xe
     */
    IV_DRIVER?: string;
    /**
     * M?? xe
     */
    IV_VEHICLE?: string;
    /**
     * Ghi ch??
     */
    IV_TEXT?: string;
    /**
     * Th??ng tin m?? chuy???n th?? (?????i v???i t???o l???nh ??i???u xe th?? b??? tr???ng)
     */
    IT_ITEM?: TITEMRequestZTMI017;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI017Response {
    /**
     *
     */
    MT_ZTMI017_OUT?: MTZTMI017OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI018Request {
    /**
     *
     */
    Row?: RowRequestZTMI018;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI018Response {
    /**
     *
     */
    MT_ZTMI018_OUT?: MTZTMI018OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI019Request {
    /**
     * M?? l???nh ??i???u xe/ M?? chuy???n th??
     */
    IV_TOR_ID?: string;
    /**
     * Driver ID
     */
    IV_DRI_ID?: string;
    /**
     * Vehicle ID
     */
    IV_VH_NO?: string;
    /**
     * Ghi ch??
     */
    IV_NOTE?: string;
    /**
     * T??n l??i xe x?? h???i
     */
    IV_DRI_NAME_XH?: string;
    /**
     * S??T l??i xe x?? h??i
     */
    IV_DRI_PHON_XH?: string;
    /**
     * Bi???n s??? xe x?? h???i
     */
    IV_VH_NO_XH?: string;
    /**
     * Ghi ch??
     */
    IV_COM_XH?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI019Response {
    /**
     *
     */
    MT_ZTMI019_OUT?: MTZTMI019OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI022Request {
    /**
     *
     */
    row?: RowRequestZTMI022;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI022Response {
    /**
     *
     */
    MT_ZTMI022_OUT?: MTZTMI022OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI023Request {
    /**
     * M?? t???i/ki???n / b???ng k??/ chuy???n th??/ b??u g???i
     */
    IV_ID?: string;
    /**
     * M?? ??i???m ??i
     */
    IV_FR_LOG_ID?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI023Response {
    /**
     *
     */
    MT_ZTMI023_OUT?: MTZTMI023OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI024Request {
    /**
     * M?? chuy???n bay
     */
    IV_FLIGHT_NUMBER?: string;
    /**
     * Ng??y d??? ki???n bay ??i
     */
    IV_DE_DATE?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI024Response {
    /**
     *
     */
    MT_ZTMI024_1_OUT?: MTZTMI024OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI029Request {
    /**
     *
     */
    Row?: RowRequestZTMI029;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI029Response {
    /**
     * 01 : th??nh c??ng, 00 : l???i
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowResponseZTMI029;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI030Request {
    Row?: RowZTMI030;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI030Response {
    MT_ZTMI030_OUT?: MTZTMI030OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI031Request {
    /**
     * M?? ????n h??ng, t??? sinh c???a h?? th???ng
     */
    FWO_ID?: string;
    /**
     * M?? ????n c???a kh??ch h??ng
     */
    BUYER_REFERENCE_NUMBER?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI031Response {
    MT_ZTMI031_OUT?: MTZTMI031OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI035Request {
    /**
     *
     */
    row?: RowRequestZTMI035;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI035Response {
    MT_ZTMI035_OUT?: MTZTMI035OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI036Request {
    /**
     * M?? b??u t?? nh???n h??ng
     */
    IV_UNAME?: string;
    /**
     * S??? ng??y
     */
    IV_DAYS?: string;
    /**
     * Tr???ng th??i
     */
    IV_STATUS?: string;
    /**
     * S??? ki???n/trang
     */
    IV_PAGENO?: string;
    /**
     * S??? ki???n/trang
     */
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI036Response {
    /**
     *
     */
    MT_ZTMI036_OUT?: MTZTMI036OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI038Request {
    /**
     *
     */
    GET?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI038Response {
    MT_ZTMI038_OUT?: MTZTMI038OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI039Request {
    row?: RowMIOAZTMI039Request[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI039Response {
    /**
     *
     */
    MT_ZTMI039_OUT?: MTZTMI039OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI040Request {
    /**
     * M?? tr???ng th??i trong ???? 604 l?? ch??? giao; 818 l?? ch??? giao chuy???n ho??n; 607, 609, 610 l?? ch??a giao ???????c, 820 l?? ch??a giao chuy???n ho??n ???????c; 606 l?? ph??t th??nh c??ng; 819 l?? chuy???n ho??n th??nh c??ng
     */
    FU_STATUS?: string;
    /**
     * Username c???a b??u t?? giao h??ng
     */
    Delivery_postman?: string;
    /**
     * S??? trang
     */
    Position?: string;
    /**
     * S??? ki???n/trang
     */
    Size?: string;
    /**
     * Vourcher
     */
    Vourcher?: string;
    /**
     * Chuy???n ho??n
     */
    Return?: string;
    /**
     *
     */
    IV_PAGENO?: string;
    /**
     *
     */
    IV_NO_PER_PAGE?: string;
    /**
     * S??? ki???n/trang
     */
    SIZE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI040Response {
    /**
     *
     */
    MT_ZTMI040_OUT?: MTZTMI040OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI045Request {
    /**
     *
     */
    row?: RowRequestZTMI045[];
    IV_BP?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI045Response {
    /**
     *
     */
    MT_ZTMI045_OUT?: MTZTMI045OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI045V03Request {
    Row?: RowZTMI045[];
    /**
     * M?? kh??ch h??ng (BP)
     */
    IV_BP?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI045V03Response {
    MT_ZTMI045_OUT?: MTZTMI045V03OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI046Request {
    /**
     * M?? t???i/ t???i gom/ b???ng k??
     */
    IV_TOR_ID?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI046Response {
    MT_ZTMI046_OUT?: MTZTMI046OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI047Request {
    /**
     * M?? t???i/b???ng k??/ chuy???n th??
     */
    IV_TOR_ID?: string;
    /**
     * Lo???i (B???ng k??: ZC1, T???i: ZC2, chuy???n th??: ZC3)
     */
    IV_TOR_TYPE?: string;
    /**
     * M?? ??i???m ??i
     */
    IV_FR_LOC_ID?: string;
    /**
     * M?? ??i???m ?????n
     */
    IV_TO_LOC_ID?: string;
    /**
     * Tr???ng th??i t???i/b???ng k??/chuy???n th??
     */
    IV_CUST_STATUS?: string;
    /**
     * Khung th???i gian qu??t
     */
    IV_FR_DATE?: string;
    /**
     * Khung th???i gian qu??t
     */
    IV_TO_DATE?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI047Response {
    MT_ZTMI047_OUT?: MTZTMI047OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI048Request {
    /**
     *
     */
    IV_TOR_ID?: string;
    /**
     * trang th??i b???t bu???c truy???n
     */
    IV_STATUS?: string;
    /**
     * M?? l??i xe
     */
    IV_DRIVER?: string;
    /**
     * M?? location qu???n l?? xe
     */
    IV_LOCID?: string;
    /**
     * Ng??y kh???i h??nh b???t ?????u
     */
    IV_F_DEP?: string;
    /**
     * Ng??y k???t th??c kh???i h??ng
     */
    IV_T_DEP?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI048Response {
    MT_ZTMI048_OUT?: MTZTMI048OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI049Request {
    /**
     * N???u l?? null thi l???y h???t, n???u <> null thi l???y theo t???t c??? c??c xe co location nhap vao
     */
    IV_LOCNO?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI049Response {
    MT_ZTMI049_OUT?: MTZTMI049OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI051Request {
    row?: RowZTMI051;
  }

  export interface MIOAZTMI051Response {
    MT_ZTMI051_OUT?: MTZTMI051OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI054Request {
    /**
     * M?? ?????a ??i???m b??u c???c
     */
    iv_post?: string;
    row?: MIOAZTMI054Row[];
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
  }

  export interface MIOAZTMI054Response {
    MT_ZTMI054_OUT?: MTZTMI054OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI054Row {
    /**
     *
     */
    iv_position?: string;
  }

  export interface MIOAZTMI055Request {
    /**
     * Lo???i phan c??ng (ZTM001: Ph??n c??ng nh???n; ZTM002: Ph??n c??ng giao)
     */
    IV_PARTY_RCO?: string;
    /**
     * M?? c??c ????n h??ng ???????c phan c??ng (Li???t k?? d?????i ????y)
     */
    IV_TRQ_ID?: IVTRQID[];
    /**
     * M?? BP c???a b??u t?? ???????c phan c??ng
     */
    IV_PARTY_ID?: string;
    /**
     * User ID c???a ng?????i phan c??ng (Tr?????ng b??u c???c)
     */
    IV_UNAME?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI055Response {
    MT_ZTMI055_OUT?: MTZTMI055OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI058Request {
    /**
     * S??? ??i???n tho???i ng?????i nh???n
     */
    RECEIVER_PHONE?: string;
    /**
     *
     */
    SHIPER_PHONE?: string;
    /**
     *
     */
    SHIPPER_NAME?: string;
    /**
     * ????n t???o t??? ng??y
     */
    FROM_DATE?: string;
    /**
     * ????n t???o ?????n ng??y
     */
    TO_DATE?: string;
    /**
     * (Search ch??nh x??c)
     */
    PRODUCT_NAME?: string;
    /**
     * (ch??nh x??c)
     */
    FWO_STATUS?: string;
    /**
     * (Search theo *???)
     */
    BUYER_REFERENCE_NO?: string;
    /**
     * (Search theo *???)
     */
    FWO?: string;
    /**
     * Trang s???
     */
    IV_PAGENO?: string;
    /**
     * S??? b??u g???i / trang
     */
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI058Response {
    MT_ZTMI058_OUT?: MTZTMI058OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI062Request {
    /**
     * M?? kho (Required: SAP t??? sinh m??)
     */
    IV_LOCNO?: string;
    /**
     * T??n kho _ Required
     */
    IV_LOC_DES?: string;
    /**
     * M?? kh??ch h??ng_Required
     */
    IV_BP?: string;
    /**
     * Longtitude, theo ?????nh d???ng quy ?????i ra ?????
     */
    IV_LONGITUDE?: string;
    /**
     * Longtitude, theo ?????nh d???ng quy ?????i ra ?????
     */
    IV_LATITUDE?: string;
    /**
     * T??n ng?????i ph??? tr??ch kho
     */
    IV_PIC_NAME?: string;
    /**
     * T??? vi???t t???t c???a kho ????? t??m ki???m
     */
    IV_SEARCH_TERM?: string;
    /**
     * S??? nh??, ?????nh d??ng freetext (Option)
     */
    IV_HOUSE_NO?: string;
    /**
     * T??n ph???, ?????nh d??ng freetext (Option)
     */
    IV_STREET?: string;
    /**
     * M?? ph?????ng/x?? (Required)
     */
    IV_WARD_ID?: string;
    /**
     * M?? qu???n/huy???n (Required)
     */
    IV_DISTRICT_ID?: string;
    /**
     * M?? t???nh th??nh (Required)
     */
    IV_CITY_ID?: string;
    /**
     * M?? postal code Truy???n m?? default ???11111???
     */
    IV_POSTAL_CODE?: string;
    /**
     * M?? qu???c gia (Required)
     */
    IV_COUNTRY_ID?: string;
    /**
     * S??? ??i???n tho???i b??n ????? li??n h??? v???i kho  (Option)
     */
    IV_PHONE?: string;
    /**
     * S??? ??i???n tho???i di ?????ng ????? li??n h??? v???i kho (Option)
     */
    IV_MOBILE?: string;
    /**
     * Email ????? li??n h??? v???i kho (option)
     */
    IV_EMAIL?: string;
    IV_DEL_FLAG?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI062Response {
    MT_ZTMI062_OUT?: MTZTMI062OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI063Request {
    /**
     *
     */
    row?: RowRequestZTMI063[];
    /**
     * M?? b??u c???c
     */
    IV_LOC_ID?: string;
    /**
     * M?? user
     */
    IV_USER?: string;
  }

  export interface MIOAZTMI063Response {
    MT_ZTMI063_OUT?: ZTMI063OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI067Request {
    IV_DEPART_DATE?: string;
    IV_SCH_TYPE?: string;
    IV_LOCATION_ID?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
  }

  export interface MIOAZTMI067Response {
    MT_ZTMI067_OUT?: ZTMI067OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MIOAZTMI094Request {
    /**
     * S??? ????n h??ng
     */
    FWO_ID?: string;
    Item?: ItemZTMI094[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface MIOAZTMI094Response {
    EV_ERROR?: string;
    Row?: RowZTMI094OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MT205RECEIVER {
    EV_CODE?: string;
    EV_MESSAGE?: string;
    Row?: RowMT205RECEIVER[];
  }

  export interface MTBKRECEIVER {
    List?: ListMTBKRECEIVER[];
    /**
     * 0: L?? l???i, 1: l?? OK
     */
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
    Paging?: PagingZTMI054;
  }

  export interface MTCRBKRECEIVER {
    BK_ID?: string;
    /**
     * 0: L?? l???i, 1: l?? OK
     */
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
  }

  export interface MTDELRECEIVER {
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
  }

  export interface MTDETAILRECEIVER {
    header?: HEADERMTDETAILRECEIVER;
    list?: LISTMTDETAILRECEIVER[];
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
    Paging?: PagingZTMI054;
  }

  export interface MTDETAILRECEIVERM {
    collection?: Collection[];
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
  }

  export interface MTKMRECEIVER {
    list?: LIST[];
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
  }

  export interface MTSUBMITRECEIVER {
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
  }

  export interface MTUDPRECEIVER {
    EV_ERROR?: number; // int32
    EV_MESSAGE?: string;
  }

  export interface MTZFII016OUT {
    Row?: RowMTZFII016OUT;
    PAGING?: PagingZTMI054;
  }

  export interface MTZTMI011OUT {
    /**
     *
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowMTZTMI011OUT[];
  }

  export interface MTZTMI012OUT {
    EV_ERROR?: string;
    FWO_ID?: string;
    Amount?: number; // int32
    Currency?: string;
  }

  export interface MTZTMI016OUT {
    /**
     *
     */
    ev_error?: number; // int32
    /**
     *
     */
    IV_TOR_ID_CU?: number; // int64
    /**
     *
     */
    RETURN_MESSAGE?: RETURNMESSAGE[];
  }

  export interface MTZTMI017OUT {
    /**
     *
     */
    Ev_error?: number; // int32
    /**
     *
     */
    RETURN_MESSAGE?: RETURNMESSAGE[];
  }

  export interface MTZTMI018OUT {
    /**
     * N???u 00 th?? l?? l???i, 01 th?? OK
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowResponseZTMI018OUT;
  }

  export interface MTZTMI019OUT {
    /**
     *
     */
    EV_ERROR?: number; // int32
    /**
     *
     */
    RETURN_MESSAGE?: RETURNMESSAGE[];
  }

  export interface MTZTMI022OUT {
    /**
     * 0: L?? l???i, 1: l?? OK
     */
    EV_ERROR?: number; // int32
  }

  export interface MTZTMI023OUT {
    /**
     *
     */
    EV_ERROR?: number; // int32
    /**
     *
     */
    row?: RowResponseZTMI023OUT[];
  }

  export interface MTZTMI024OUT {
    /**
     * 01 : th??nh c??ng, 00 : l???i
     */
    EV_ERROR?: number; // int32
    /**
     *
     */
    Row?: RowResponseZTMI024[];
    Paging?: Paging;
  }

  export interface MTZTMI027OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE;
  }

  export interface MTZTMI028OUT {
    Error?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE;
  }

  export interface MTZTMI030OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI030OUT[];
    Paging?: PAGING;
  }

  export interface MTZTMI031OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI031OUT[];
  }

  export interface MTZTMI035OUT {
    EV_ERROR?: string;
    row?: RowResponseZTMI035[];
    PAGING?: Paging[];
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface MTZTMI036OUT {
    /**
     * 01 ??? Th??nh c??ng, 00 ??? L???i
     */
    ev_error?: number; // int32
    /**
     *
     */
    paging?: Paging[];
    /**
     *
     */
    row?: TDATAResponseZTMI036[];
  }

  export interface MTZTMI038OUT {
    EV_ERROR?: number; // int32
    Row?: RowResponseZTMI038[];
  }

  export interface MTZTMI039OUT {
    /**
     *
     */
    ev_error?: string;
    /**
     *
     */
    row?: RowResponseZTMI039[];
  }

  export interface MTZTMI040OUT {
    /**
     *
     */
    row?: RowResponseZTMI040[];
    /**
     *
     */
    ev_error?: string;
    Paging?: Paging[];
  }

  export interface MTZTMI045OUT {
    /**
     * 01 l?? th??nh c??ng, 00 l?? l???i
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowMTZTMI045OUT[];
    Paging?: Paging[];
  }

  export interface MTZTMI045V03OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI045V03OUT[];
  }

  export interface MTZTMI046OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI046OUT[];
    Paging?: PagingZTMI054;
  }

  export interface MTZTMI047OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI047OUT[];
    Paging?: Paging;
  }

  export interface MTZTMI048OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI048OUT[];
    Paging?: PagingZTMI054[];
  }

  export interface MTZTMI049OUT {
    Ev_error?: number; // int32
    Row?: RowMTZTMI049OUT[];
    Paging?: PagingZTMI054[];
  }

  export interface MTZTMI051OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
  }

  export interface MTZTMI054OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI054OUT[];
    PAGING?: PagingZTMI054[];
  }

  export interface MTZTMI055OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
    EV_TRQ_ID_ERROR?: EVTRQIDERROR[];
  }

  export interface MTZTMI058OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI058OUT[];
    Paging?: PAGING[];
  }

  export interface MTZTMI062OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE;
  }

  export interface MTZTMI068OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI068OUT[];
  }

  export interface MTZTMI213OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE;
    Row?: RowMTZTMI213OUT[];
  }

  export interface MTZTMI229OUT {
    EV_ERROR?: number; // int32
    DIMENSION_WEIGHT?: string;
    WEIGHT_UOM?: string;
    RETURN_MESSAGE?: RETURNMESSAGE;
  }

  export interface MTZTMI236OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
    Row?: RowMTZTMI236OUT[];
    PAGING?: PagingZTMI054;
  }

  export interface MTZTMI239OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
    PACKAGE_ID?: string;
    CONTENT?: string;
  }

  export interface MTZTMI240OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
    Row?: RowMTZTMI240OUT[];
  }

  export interface MTZTMI241OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
    row?: RowMTZTMI241OUT[];
    PAGING?: PagingZTMI054;
  }

  export interface PAGING {
    IV_PAGENO?: number; // int32
    IV_NO_PER_PAGE?: number; // int32
    EV_TOTAL_PAGE?: string;
    EV_TOTAL_ITEM?: string;
  }

  export interface Paging {
    /**
     *
     */
    IV_PAGENO?: string;
    /**
     *
     */
    IV_NO_PER_PAGE?: string;
    /**
     *
     */
    EV_TOTAL_PAGE?: string;
    /**
     *
     */
    EV_TOTAL_ITEM?: string;
  }

  export interface PagingZTMI054 {
    /**
     *
     */
    IV_PAGE_NO?: string;
    /**
     *
     */
    IV_NO_PER_PAGE?: string;
    /**
     *
     */
    EV_TOTAL_PAGE?: string;
    /**
     *
     */
    EV_TOTAL_ITEM?: string;
  }

  export interface RECEIVER {
    RECEIVER_NAME?: string;
    RECEIVER_PHONE?: string;
    RECEIVER_ADDRESS?: string;
  }

  export interface RETURNMESSAGE {
    /**
     * Lo???i l???i (E- Error; S-Success, W- Warning, I- Info, A- Abort)
     */
    TYPE?: string;
    /**
     * Nh??m l???i
     */
    ID?: string;
    /**
     * M?? l???i
     */
    NUMBER?: string;
    /**
     * N???i dung l???i
     */
    MESSAGE?: string;
    LOG_MSG_NO?: string;
    ROW?: string;
    /**
     * Tham s??? 1 c???a n???i dung l???i
     */
    MESSAGE_V1?: number; // int64
    /**
     * Tham s??? 2 c???a n???i dung l???i
     */
    MESSAGE_V2?: string;
    /**
     * Tham s??? 3 c???a n???i dung l???i
     */
    MESSAGE_V3?: string;
  }

  export interface RowMIOAZTMI039Request {
    FWO_no?: string;
    FU_NO?: string;
    Status?: string;
    Reason?: string;
    Note?: string;
    Link_URL?: string;
    COD_Amount?: string;
    Total_Amount?: string;
    USERID?: string;
    LOCID?: string;
  }

  export interface RowMT205RECEIVER {
    HUB?: string;
    LINE_CODE?: string;
    LINE_NAME?: string;
    PST_CODE?: string;
    PST_NAME?: string;
    USER?: string;
    PHONE?: string;
    TIMESTAMP?: string;
  }

  export interface RowMTZFII016OUT {
    KUNNR?: string;
    TOTAL_DATRA?: string;
    TOTAL_CHUA_TRA?: string;
    Item?: ITEMMTZFII016OUT[];
  }

  export interface RowMTZTMI011OUT {
    /**
     *
     */
    Item?: ItemMTZTMI011OUT[];
  }

  export interface RowMTZTMI030OUT {
    TRQ_TYPE?: string;
    TRQ_ID?: string;
    BASE_BTD_ID?: string;
    Status?: number; // int32
    ORDER_DATE?: number; // int32
    Name?: string;
    TEL_NUMBER_DEST?: string;
    SERVICE_TYPE?: string;
    ITEM_ID?: string;
    ITEM_DESCR?: string;
    QUA_PCS_VAL?: string;
    QUA_PCS_UNI?: string;
    Adress?: string;
    FU?: string;
    PACKAGE_ID?: string;
  }

  export interface RowMTZTMI031OUT {
    FWO?: string;
    ORDERING_PARTY?: string;
    SHIPER_ID?: string;
    SHIPER_NAME?: string;
    MOBILE_PHONE_SRC?: string;
    CONSIGNEE_ID?: string;
    CONSIGNEE_NAME?: string;
    MOBILE_PHONE_DES?: string;
    BUYER_REFERENCE_NUMBER?: string;
    SALES_GROUP?: string;
    SOURCE_LOCATION?: string;
    SOURCE_LOCATION_DESCRIPTION?: string;
    HOUSE_NO_SOURCE?: string;
    STREET_ID_SOURCE?: string;
    WARD_ID_SOURCE?: number; // int32
    DISTRICT_ID_SOURCE?: string;
    PROVINCE_ID_SOURCE?: string;
    COUNTRY_ID_SOURCE?: string;
    DESTINATION_LOCATION?: string;
    DESTINATION_LOCATION_NAME?: string;
    HOUSE_NO_DES?: string;
    STREET_ID_DES?: string;
    WARD_ID_DES?: number; // int32
    DISTRICT_ID_DES?: string;
    PROVINCE_ID_DES?: string;
    COUNTRY_ID_DES?: string;
    FREIGHT_UNIT?: string;
    PACKAGE_ID?: string;
    ITEM_DESCRIPTION?: string;
    GROSS_WEIGHT?: string;
    CHARGED_WEIGHT?: string;
    Quantity?: string;
    WEIGHT_UOM?: string;
    Length?: string;
    Width?: string;
    Height?: string;
    DIMENSION_UOM?: string;
    SERVICE_TYPE?: string;
    FREIGHT_TERM?: string;
    COD?: string;
    PICKUP_POSTMAN_ID?: string;
    PICKUP_POSTMAN_NAME?: string;
    PHONE_OF_PICKUP_POSTMAN?: string;
    DELIVERY_POSTMAN_ID?: string;
    DELIVERY_POSTMAN_NAME?: string;
    DELIVERY_POSTMAN_PHONE?: string;
    Execution?: Execution[];
    Item?: ItemMTZTMI031OUT[];
    CREATED_ON?: string;
    FU_STATUS?: string;
    DES_PO_ID?: string;
    SOURCE_PO_ID?: string;
    SOURCE_PO_DES?: string;
    DES_PO_DES?: string;
    MOVEMENT_TYPE?: string;
    PUB_FEE?: string;
    IMPORT_TAX?: string;
    HEADER_NOTE?: string;
    GoodValue?: string;
    CCode_type?: string;
    CCode?: string;
    CCode_des?: string;
    Trq_type?: string;
  }

  export interface RowMTZTMI045OUT {
    /**
     * Lo???i ?????a ??i???m
     */
    LOCTYPE?: string;
    /**
     * M?? ?????a ??i???m
     */
    LOCNO?: string;
    /**
     * T??n ?????a ??i???m
     */
    DESCR40?: string;
    /**
     * Longtitude
     */
    XPOS?: string;
    /**
     * Latitude
     */
    YPOS?: string;
    /**
     * S??? nh??
     */
    HOUSE_NUM1?: string;
    /**
     * S??? ??i???n tho???i
     */
    TEL_NUMBER?: string;
    /**
     *
     */
    TEL_NUMBER2?: string;
    /**
     *
     */
    FAX_NUMBER?: string;
    /**
     *
     */
    SMTP_ADDR?: string;
    /**
     * T??n ???????ng ph???
     */
    STREET?: string;
    /**
     * M?? ph?????ng/x??
     */
    REGIOGROUP?: string;
    /**
     * M?? t???nh/th??nh
     */
    CITY?: string;
    /**
     * M?? qu???n huy???n
     */
    DISTRICT?: string;
    /**
     * M?? qu???c gia
     */
    COUNTRY?: string;
    /**
     * M?? kh??ch h??ng
     */
    PARTNER?: string;
  }

  export interface RowMTZTMI045V03OUT {
    LOCTYPE?: string;
    LOCNO?: string;
    DESCR40?: string;
    XPOS?: string;
    YPOS?: string;
    HOUSE_NUM1?: number; // int32
    STREET?: string;
    REGIOGROUP?: number; // int32
    CITY?: string;
    DISTRICT?: string;
    COUNTRY?: string;
    PARTNER?: string;
    TEL_NUMBER?: string;
    CONTACT_PERSON?: string;
    TEL_NUMBER2?: string;
    FAX_NUMBER?: string;
    SMTP_ADDR?: string;
    NAME?: string;
  }

  export interface RowMTZTMI046OUT {
    TOR_ID?: string;
    LIFECYCLE?: number; // int32
    DATETIME_CHLC?: string;
    NET_WEI_VAL?: string;
    NET_WEI_UNI?: string;
    LOG_LOCID_SRC?: string;
    LOG_LOCID_DES?: string;
    EXEC_CONT?: string;
    NEXT_LOC?: string;
    ZONLO?: string;
    CHILDS?: Child[];
    TOR_TYPE?: string;
  }

  export interface RowMTZTMI047OUT {
    TOR_ID?: string;
    LIFECYCLE?: number; // int32
    DATETIME_CHLC?: string;
    NET_WEI_VAL?: string;
    NET_WEI_UNI?: string;
    LOG_LOCID_FR?: string;
    LOG_LOCID_TO?: string;
    EXEC_CONT?: string;
    ITEM_NO?: string;
    ZONLO?: string;
    EXT_LOC_ID?: string;
    CREATED_BY?: string;
    Childs?: Childs[];
    TOR_TYPE?: string;
  }

  export interface RowMTZTMI048OUT {
    TOR_ID?: string;
    STATUS_ID?: number; // int32
    STATUS_DES?: string;
    CHANGED_ON?: string;
    LOC_FROM?: string;
    LOC_FROM_DES?: string;
    LOC_TO?: string;
    LOC_TO_DES?: string;
    COUNTER?: string;
    SHEDULE_ID?: string;
    SCHEDULE_DES?: string;
    VEHICLE_ID?: string;
    DRIVER_CODE?: string;
    DRIVER_NAME?: string;
    TRANS_TIME?: string;
  }

  export interface RowMTZTMI049OUT {
    Name?: string;
    PlateNumber?: string;
    VALID_FROM?: string;
    VALID_TO?: string;
    OrgCentre?: number; // int32
    COUNTRY_VEHIC_ID?: string;
    OWNER?: string;
    LEASE_CONTRACT_REF?: string;
  }

  export interface RowMTZTMI054OUT {
    LOCNO?: string;
    UNAME?: string;
    NAME_TEXT?: string;
    POSITION?: string;
    BP?: string;
  }

  export interface RowMTZTMI058OUT {
    FWO_TYPE?: string;
    FWO?: string;
    BUYER_REFERENCE_NUMBER?: string;
    FWO_STATUS?: number; // int32
    CREATED_DATE?: string;
    SENDER_FULL_NAME?: string;
    SENDER_MOBILE_PHONE_NO?: string;
    SERVICE_TYPE?: string;
    ITEM_NO?: string;
    FU?: string;
    PACKAGE_ID?: string;
    ITEM_DESCRIPTION?: string;
    Quantity?: string;
    UOM?: string;
    SENDER_ADDRESS?: string;
  }

  export interface RowMTZTMI067OUT {
    DEPART_DATE?: string;
    SCH_TYPE?: string;
    SCH_ID?: string;
    DESCRIPTION?: string;
    T_ITEM?: TITEMZTMI067OUT[];
  }

  export interface RowMTZTMI068OUT {
    SERVICE_TYPE?: string;
    SERVICE_TYPE_DES?: string;
    SERVICE_GROUP?: string;
    SERVICE_GROUP_DES?: string;
    TARGET_TIME?: string;
  }

  export interface RowMTZTMI213OUT {
    FREIGHT_UNIT?: string;
    PACKAGE_ID?: string;
    QUANTITY?: string;
    QUANTITY_UOM?: string;
    GROSS_WEIGHT?: string;
    WEIGHT_UOM?: string;
  }

  export interface RowMTZTMI236OUT {
    PACKAGE_ID?: string;
    FREIGHT_UNIT?: string;
    FREIGHT_UNIT_STATUS?: string;
    FREIGHT_UNIT_TYPE?: string;
    QUANTITY?: string;
    QUANTITY_OF_UNIT?: string;
    GROSS_WEIGHT?: string;
    GROSS_WEIGHT_OF_UNIT?: string;
    CREATED_ON?: string;
    NEXT_LOC?: string;
    SENDER?: SENDER;
    RECEIVER?: RECEIVER;
  }

  export interface RowMTZTMI240OUT {
    COMM_LOC_GROUP?: string;
    TOTAL_ITEM?: string;
    CHILD?: CHILD[];
  }

  export interface RowMTZTMI241OUT {
    FREIGHT_UNIT?: string;
    PACKAGE_ID?: string;
    QUANTITY?: string;
    QUANTITY_OF_UNIT?: string;
    GROSS_WEIGHT?: string;
    GROSS_WEIGHT_OF_UNIT?: string;
    USER?: string;
    MANIFEST_LOC?: string;
    CREATED_ON?: string;
  }

  export interface RowRequestZTMI018 {
    /**
     * M?? chuy???n th??
     */
    FREIGH_NO?: string;
    /**
     * M?? t???i, ki???n, b??u g???i
     */
    ContainerId?: string;
    /**
     * Lo???i t???i ki???n (n???u ZC1???..ZC5 th?? l?? t???i ki???n, n???u l?? null th?? l?? b??u g???i)
     */
    BUSINESS_TYPE?: string;
    /**
     * Kh??ng d??ng
     */
    FREIGH_STATUS?: string;
  }

  export interface RowRequestZTMI022 {
    /**
     * S??? t???i, ki???n
     */
    CU_NO?: string;
    /**
     * S??? b??u g???i
     */
    FU_NO?: string;
    /**
     * C?? c??c trang th??i sau: 1 ??? nh???n, 2 ??? Thi???u, 3 ??? Th???a, 4 ??? Suy chuy???n, 5 ??? Th???a suy chuy???n
     */
    STATUS_ID?: string;
    /**
     *
     */
    USER_ID?: string;
    /**
     * M?? location
     */
    LOC_ID?: string;
  }

  export interface RowRequestZTMI027 {
    FU_NO?: string;
    TRANS_ACTIVITY?: string;
    LOC_ID?: string;
    USER_ID?: string;
  }

  export interface RowRequestZTMI029 {
    /**
     * M?? ????n h??ng
     */
    IV_TRQ_ID?: string;
    /**
     * M?? User
     */
    IV_UNAME?: string;
    /**
     *  M?? tr???ng th??i h???i quan, 160 l?? ch??? th??ng quan, 161 l?? T??? ch???i th??ng quan, 162 l?? ???? th??ng quan
     */
    IV_CUSTOMS_STATUS?: string;
    /**
     *  L?? do b??? t??? ch???i th??ng quan
     */
    IV_REASON?: string;
    /**
     * Link URL l??u ???????ng d???n c???a t??? khai h???i quan
     */
    IV_LINK?: string;
    /**
     * S??? ti???n thu??? thu h???
     */
    IV_TAX?: string;
  }

  export interface RowRequestZTMI035 {
    /**
     * M?? User
     */
    USER_ID?: string;
  }

  export interface RowRequestZTMI045 {
    /**
     * Lo???i ?????a ??i???m (V?? d??? V001 l?? b??u c???c, V002 l?? c???a h??ng???.), l??u ?? ch???n trong danh s??ch location type ???? ???????c ?????nh ngh??a t??? tr?????c
     */
    IV_LOCTYPE?: string;
  }

  export interface RowRequestZTMI063 {
    /**
     *
     */
    TOR_ID?: string;
  }

  export interface RowResponseZTMI018OUT {
    /**
     *
     */
    Message?: string;
    /**
     *
     */
    Id?: string;
    /**
     * M?? l???i
     */
    Number?: string;
  }

  export interface RowResponseZTMI023OUT {
    /**
     * M?? t???i/ki???n/b???ng k??/ chuy???n th??
     */
    TOR_ID?: string;
    /**
     * M?? b??u g???i
     */
    PACKAGE_ID?: string;
    /**
     * Lo???i t???i/ki???n / b???ng k??/ chuy???n th??/ b??u g???i
     */
    TOR_TYPE?: string;
    /**
     * Ph??n nh??m t???i ki???n
     */
    TOR_CAT?: string;
    /**
     * Kh??ng c???n quan t??m
     */
    ACTUAL_DATE?: string;
    /**
     * M?? ?????a ch??? hi???n t???i
     */
    EXT_LOG_ID?: string;
    /**
     * Kh???i l?????ng
     */
    GRO_WEI_VAL?: string;
    /**
     * ????n v??? kh???i l?????ng
     */
    GRO_WEI_UNI?: string;
    /**
     * M?? lo???i b??u g???i
     */
    CCODE_TYPE?: string;
    /**
     * Lo???i b??u g???i
     */
    CCODE_TYPE_DES?: string;
    /**
     * Nh??m h??ng h??a
     */
    CCODE_DES?: string;
    /**
     * M??i gi???
     */
    ZONLO?: string;
    /**
     * M?? ??i???m ??i
     */
    FR_LOG_ID?: string;
    /**
     * Chu???i m?? ??i???m ?????n
     */
    TO_LOG_ID?: string;
    /**
     * M?? Lo???i d???ch v??? ch??nh
     */
    TRANSSRVREQ_CODE?: string;
    /**
     * M?? t??? lo???i d???ch v??? ch??nh
     */
    TRANSSRVREQ_TXT?: string;
    /**
     * M?? nh??m d???ch v??? ch??nh
     */
    SERVGROUP?: string;
    /**
     * M?? t??? nh??m d???ch v??? ch??nh
     */
    SERVGROUP_TXT?: string;
    /**
     * Ng??y t???o
     */
    CREATED_ON?: string;
    /**
     * Tr???ng th??i
     */
    ZVTP_CUST_STATUS?: number; // int32
    /**
     * M?? b??u c???c g???c
     */
    SALES_OFF_ID?: number; // int32
    /**
     * H??ng gi?? tr??? cao
     */
    DEFINE_GTC?: string;
    /**
     * Parent
     */
    PARENT_TOR?: string;
    /**
     * Parent tor type
     */
    PARENT_TOR_TYPE?: string;
    /**
     * Exec location
     */
    RECENT_LOC?: string;
    /**
     * Destination location
     */
    DEST_LOC?: string;
    /**
     * Child count ( tr?????ng h???p FU ko ?????m child)
     */
    CHILD_COUNT?: string;
    /**
     * M?? FWO
     */
    FWO_ID?: string;
  }

  export interface RowResponseZTMI024 {
    /**
     * Tr???ng th??i air freight order
     */
    TOR_ID?: string;
    /**
     * Tr???ng th??i air freight order
     */
    TOR_STATUS?: number; // int32
    /**
     * M?? chuy???n bay
     */
    FLIGHT_NUMBER?: string;
    /**
     * Th???i gian d??? ki???n ??i
     */
    PLAN_TRANS_TIME_DSTF?: string;
    /**
     * Th???i gian d??? ki???n ?????n
     */
    PLAN_TRANS_TIME_DSTL?: string;
    /**
     * Th???i gian th???c t??? ??i
     */
    ACTUAL_DATE_DEXD?: string;
    /**
     * Th???i gian th???c t??? ?????n
     */
    ACTUAL_DATE_DEXA?: string;
    /**
     * S??n bay ??i
     */
    LOG_LOC_IDSTF?: string;
    /**
     * S??n bay ?????n
     */
    LOG_LOC_IDSTL?: string;
    T_ITEM?: TITEMResponseZTMI024[];
  }

  export interface RowResponseZTMI029 {
    /**
     *
     */
    Message?: string;
    /**
     *
     */
    Id?: string;
    /**
     *
     */
    Number?: number; // int32
    /**
     *
     */
    MSG?: string;
  }

  export interface RowResponseZTMI035 {
    SHIPPER_ID?: string;
    TEL_NUMBER_SRC?: string;
    ADD_SHIPPER?: string;
    COUNT?: string;
    TRQ_ID?: string;
    PICK_UP_PM_ASSIGNED_ON?: string;
    PIC_EAR_REQ?: string;
    TOR_ID?: string;
    PACKAGE_ID?: string;
    ITEM_DESCR?: string;
    GRO_WEI_VAL?: string;
    GRO_WEI_UNI?: string;
    LENGTH?: string;
    WIDTH?: string;
    HEIGHT?: string;
    MEASUOM?: string;
    TYPE_OF_GOODS?: string;
    TOTAL_AMOUNT?: string;
    COD?: string;
    STATUS?: string;
    VOURCHER?: string;
    TIMEZONE?: string;
    LOC_ID?: string;
  }

  export interface RowResponseZTMI038 {
    IT_FDELIVERY?: ITFDELIVERY[];
    IT_FPICK?: ITFPICK[];
    IT_SFWO?: ITSFWO[];
    IT_SFU?: ITSFU[];
  }

  export interface RowResponseZTMI039 {
    /**
     *
     */
    message?: string;
  }

  export interface RowResponseZTMI040 {
    /**
     * Username c???a b??u t?? giao h??ng
     */
    Delivery_Postman_ID?: string;
    /**
     * M?? ????n h??ng c???a h??? th???ng TM
     */
    FWO?: string;
    /**
     * M?? ????n h??ng c???a kh??ch h??ng
     */
    Buyer_reference_number?: string;
    /**
     * T??n ng?????i nh???n
     */
    Receiver_name?: string;
    /**
     * S??? ??i???n tho???i ng?????i nh???n
     */
    Receiver_mobile_phone?: string;
    /**
     * Th???i gian ph??n c??ng ph??t
     */
    Postman_assignment_date?: string;
    /**
     * Th???i gian d??? ki???n ph??t
     */
    Planned_delivery_date?: string;
    /**
     * ?????a ch??? giao h??ng h??ng
     */
    Receiver_address?: string;
    /**
     * M?? ki???n h??ng (m?? n??y l?? m?? t??? sinh c???a h??? th???ng)
     */
    Freight_unit_ID?: string;
    /**
     * M?? t??? ki???n
     */
    Item_description?: string;
    /**
     * Tr???ng l?????ng
     */
    Gross_weight?: string;
    /**
     * ????n v??? tr???ng l?????ng
     */
    Weight_UOM?: string;
    /**
     * D??i
     */
    Length?: string;
    /**
     * R???ng
     */
    Width?: string;
    /**
     * Cao
     */
    Height?: string;
    /**
     * ????n v??? k??ch th?????c 3 chi???u
     */
    Dimension_UOM?: string;
    /**
     * Lo???i
     */
    Category?: string;
    /**
     * M?? tr???ng th??i
     */
    Status?: string;
    /**
     * Ti???n c?????c ph??
     */
    Freight_charge?: string;
    /**
     * Ti???n thu h???
     */
    COD?: string;
    /**
     * ????n v??? ti???n t???
     */
    DVTT?: string;
    /**
     * Ghi ch?? ??? ki???n h??ng
     */
    NOTE?: string;
    /**
     * M?? ki???n h??ng, m?? n??y s??? in tr??n nh??n)
     */
    Package_ID?: string;
    /**
     * N???u Y l?? h??ng chuy???n ho??n, N th?? h??ng th??ng th?????ng
     */
    Return?: string;
    /**
     * N???u Y l?? vourcher, N l?? h??ng th??ng th?????ng
     */
    Vourcher?: string;
    /**
     * Ng??y giao h??ng th??nh c??ng
     */
    Actual_date?: string;
    /**
     * M??i gi???
     */
    Timezone?: string;
    /**
     * T???ng s??? ki???n
     */
    Total_entry?: string;
    /**
     * T???ng s??? trang
     */
    Total_page?: string;
    CREATED_ON?: string;
    SHIPPER_NAME?: string;
    SERVICE_TYPE?: string;
    SERVICE_TYPE_NAME?: string;
    LOC_ID?: string;
  }

  export interface RowSIOAZTMI068 {
    SERVICE_TYPE?: string;
    SRC_CITY?: string;
    DST_CITY?: string;
    SRC_DIST?: string;
    DST_DIST?: string;
    SRC_WARD?: string;
    DST_WARD?: string;
  }

  export interface RowZFII016 {
    KUNNR?: string;
    FROM_DATE?: string;
    TO_DATE?: string;
    ASSIGNMENT?: string;
    IV_PAGE_NO?: string;
    IV_NO_PER_PAGE?: string;
  }

  export interface RowZTMI030 {
    CUSID?: string;
    SENDER_PHONE?: string;
    FROM_DATE?: string;
    TO_DATE?: string;
    PRODUCT_NAME?: string;
    Status?: string;
    BUYER_REFERENCE_NO?: string;
    FWO_ID?: string;
    RECEIVER_PHONE?: string;
    RECEIVER_NAME?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
  }

  export interface RowZTMI045 {
    /**
     * Lo???i ?????a ??i???m(V001,V002,V003,V004,V005,V006,V007,V008,V009,V010)
     */
    IV_LOCTYPE?: string;
  }

  export interface RowZTMI051 {
    FO_NO?: string;
    CU_FU_NO?: string;
    DOC_TYPE?: string;
    STATUS_ID?: string;
    USER_ID?: string;
    LOC_ID?: string;
  }

  export interface RowZTMI094OUT {
    Message?: string;
    Id?: string;
    Number?: string;
  }

  export interface SENDER {
    SENDER_NAME?: string;
    SENDER_PHONE?: string;
    SENDER_ADDRESS?: string;
  }

  export interface SIOAZFII016Request {
    Row?: RowZFII016;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface SIOAZFII016Response {
    MT_ZFII016_OUT?: MTZFII016OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface SIOAZTMI027Request {
    Row?: RowRequestZTMI027;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface SIOAZTMI027Response {
    MT_ZTMI027_OUT?: MTZTMI027OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface SIOAZTMI068Request {
    /**
     * L???y to??n b??? m?? d???ch v???
     */
    GET?: string;
    row?: RowSIOAZTMI068[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface SIOAZTMI068Response {
    MT_ZTMI068_OUT?: MTZTMI068OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface SIOZTMI028Request {
    /**
     * C??c gi?? tr???: 01-T???o; 02 ??? Thay ?????i th??ng tin; 03 ??? Thuy???t minh; 04 ??? K???t lu???n
     */
    FLAG?: string;
    /**
     * ????? tr???ng ?????i v???i TH t???o
     */
    DOCUMENT_ID?: string;
    /**
     * M?? nh??n vi??n l???p bi??n b???n
     */
    CREATED_USER?: string;
    /**
     * M?? ????n v??? (b??u c???c, TTKT, TTbay??? L???y ??? API I045)
     */
    LOCATION_ID?: string;
    /**
     * M?? nh??n vi??n b??? l???p bi??n b???n (L???y ??? API I054)
     */
    VIOLATED_USER?: string;
    /**
     * M?? nh??m l???i (L???y ??? API I098)
     */
    ERROR_GROUP_CODE?: string;
    /**
     * M?? l???i (L???y ??? API I098)
     */
    ERROR_CODE?: string;
    ITEMS?: ITEMRequestZTMI028[];
    /**
     * M?? t??? gi???i ph??p kh???c ph???c
     */
    SOLUTION?: string;
    /**
     *
     */
    CORRECT_INCORRECT?: string;
    /**
     *
     */
    EXPLAINATION_TEXT?: string;
    /**
     *
     */
    CONCLUSION_TEXT?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface SIOZTMI028Response {
    MT_ZTMI028_OUT?: MTZTMI028OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface TDATAResponseZTMI036 {
    /**
     * M?? ng?????i g???i
     */
    SHIPER_ID?: string;
    /**
     * T??n ng?????i g???i
     */
    SHIPER_NAME?: string;
    /**
     * S??T ng?????i g???i
     */
    TEL_NUMBER_SRC?: string;
    /**
     * ?????a ch??? nh???n h??ng
     */
    SHIPER_ADD?: string;
    /**
     * STT ki???n
     */
    FWO_NO?: string;
    /**
     * M?? ????n h??ng
     */
    TRQ_ID?: string;
    /**
     * Ng??y ph??n c??ng nh???n
     */
    PICK_UP_PM_ASSIGNED_ON?: string;
    /**
     * Ng??y d??? ki???n nh???n h??ng
     */
    PIC_EAR_REQ?: string;
    /**
     * Ng??y nh???n h??ng th??nh c??ng
     */
    ACTUAL_DATE?: string;
    /**
     * M?? ki???n h??ng
     */
    PACKAGE_ID?: string;
    /**
     * M?? ki???n h??ng (H??? th???ng t??? sinh)
     */
    TOR_ID?: string;
    /**
     * M?? t??? ki???n
     */
    ITEM_DESCR?: string;
    /**
     * D??i
     */
    LENGTH?: string;
    /**
     * R???ng
     */
    WIDTH?: string;
    /**
     * Cao
     */
    HEIGHT?: string;
    /**
     * ????n v??? k??ch th?????c
     */
    MEASUOM?: string;
    /**
     * Lo???i (theo nh??m d???ch v??? h???a t???c, ????ng lanh???.)
     */
    TYPE_OF_GOOD?: string;
    /**
     * Time zone
     */
    ZONLO?: string;
    /**
     * C?????c ph?? ph???i thu
     */
    NET_AMOUNT_LCL?: string;
    /**
     * Vourcher
     */
    VOUCHER?: string;
    /**
     * Tr???ng th??i
     */
    ZVTP_CUST_STATUS?: number; // int32
    /**
     *
     */
    HDR_COD?: string;
    GRO_WEI_VAL?: string;
    GRO_WEI_UNI?: string;
  }

  export interface TITEM {
    /**
     * M?? item (b???ng k?? ho???c b??u g???i
     */
    ITEM_ID?: string;
    /**
     * N???u l?? b???ng k?? th?? g???i Type, n???u l?? b??u g???i th?? ????? blank
     */
    ITEM_TYPE?: string;
  }

  export interface TITEMRequestZTMI017 {
    /**
     * M?? item
     */
    ITEM_ID?: string;
    /**
     * Lo???i item
     */
    ITEM_TYPE?: string;
  }

  export interface TITEMResponseZTMI024 {
    /**
     * M?? air freight order
     */
    TOR_ID_ROOT?: string;
    /**
     * M?? ki???n
     */
    TOR_ID_REQ?: string;
    /**
     * M?? t??? ki???n
     */
    ITEM_DESCR?: string;
    /**
     * Tr???ng l?????ng
     */
    GRO_WEI_VAL?: string;
    /**
     * ????n v??? tr???ng l????ng
     */
    GRO_WEI_UNI?: string;
    /**
     * D??i
     */
    LENGTH?: string;
    /**
     * R???ng
     */
    WIDTH?: string;
    /**
     * Cao
     */
    HEIGHT?: string;
    /**
     * ????n v???
     */
    MEASUOM?: string;
    ITEM_STATUS?: number; // int32
  }

  export interface TITEMZTMI067OUT {
    LOC_SEQ?: string;
    LOCATION_ID?: string;
    LOCATION_ADDRESS?: string;
    DEPARTURE_TIME?: string;
    ARRIVAL_TIME?: string;
    ZONLO?: string;
    DISTANCE?: string;
    DISTANCE_UOM?: string;
  }

  export interface UserSapMappingGetRequest {
    UserName?: string;
    Email?: string;
    Phone?: string;
  }

  export interface UserSapMappingGetResponse {
    User?: UserViewModel;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface UserViewModel {
    UserId?: string;
    SapUserId?: string;
    BPCode?: string;
    RoleId?: string;
    BPRole?: string;
    OrgIds?: string;
    Email?: string;
    Phone?: string;
    Title?: string;
    LastName?: string;
    FirstName?: string;
    FullName?: string;
    Language?: string;
  }

  export interface UserVoSoAddOrChangeRequest {
    Check?: string;
    ProvinceId?: string;
    DistrictId?: string;
    WardId?: string;
    Igree?: string;
    Name?: string;
    Email?: string;
    Password?: string;
    Repassword?: string;
    Phone?: string;
    Address?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface UserVoSoAddOrChangeResponse {
    Message?: string;
    Success?: boolean;
    User?: UserVoSoViewModel;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface UserVoSoViewModel {
    Check?: string;
    ProvinceId?: string;
    DistrictId?: string;
    WardId?: string;
    Igree?: string;
    Name?: string;
    Email?: string;
    Password?: string;
    Repassword?: string;
    Phone?: string;
    Address?: string;
  }

  export interface UsersGetBPCodeRequest {
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface UsersGetBPCodeResponse {
    User?: UserViewModel;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI001Request {
    KM_FLAG?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI001Response {
    MT_KM_RECEIVER?: MTKMRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI002Request {
    TU_KY?: string;
    DEN_KY?: string;
    MA_BUU_CUC?: string;
    BK_ID?: string;
    BK_STATUS?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI002Response {
    /**
     *
     */
    MT_BK_RECEIVER?: MTBKRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI003Request {
    header?: HEADER;
    item?: ITEMBK[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI003Response {
    /**
     *
     */
    MT_CRBK_RECEIVER?: MTCRBKRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI004Request {
    BK_ID?: string;
    ITEM?: ITEMDELBK[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI004Response {
    MT_DEL_RECEIVER?: MTDELRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI005Request {
    BK_ID?: string;
    MA_BUU_CUC?: string;
    USER_ID?: string;
    item?: ITEMBK[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI005Response {
    MT_UDP_RECEIVER?: MTUDPRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI006Request {
    BK_ID?: string;
    MA_BUU_CUC?: string;
    USER_ID?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI006Response {
    MT_SUBMIT_RECEIVER?: MTSUBMITRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI007MRequest {
    MA_BUU_CUC?: string;
    BK_INPUT?: BKINPUT[];
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI007MResponse {
    MT_DETAIL_RECEIVER_M?: MTDETAILRECEIVERM;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZFI007Request {
    MA_BUU_CUC?: string;
    BK_ID?: string;
    IV_PAGENO?: string;
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZFI007Response {
    MT_DETAIL_RECEIVER?: MTDETAILRECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI063OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
  }

  export interface ZTMI067OUT {
    EV_ERROR?: number; // int32
    row?: RowMTZTMI067OUT[];
    RETURN_MESSAGE?: RETURNMESSAGE[];
    Paging?: Paging[];
  }

  export interface ZTMI205Request {
    HUB?: string;
    LINE_CODE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI205Response {
    MT_205_RECEIVER?: MT205RECEIVER;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI213Request {
    /**
     * M?? ki???n c???n t??ch
     */
    PACKAGE_ID?: string;
    row?: ZTMI213Row[];
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI213Response {
    MT_ZTMI213_OUT?: MTZTMI213OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI213Row {
    /**
     * S??? l?????ng 1 ki???n con c???n t??ch
     */
    QUANTITY?: string;
    /**
     * ????n v??? s??? l?????ng( m???c ?????nh EA)
     */
    QUANTITY_UOM?: string;
    /**
     * Tr???ng l?????ng 1 ki???n con c???n t??ch
     */
    GROSS_WEIGHT?: string;
    /**
     * ????n v??? tr???ng l?????ng ( m???c ?????nh G)
     */
    WEIGHT_UOM?: string;
  }

  export interface ZTMI229Request {
    /**
     * M?? t???nh/th??nh ph???
     */
    CityID?: string;
    /**
     * M?? huy???n/qu???n
     */
    DistrictID?: string;
    /**
     * M?? postal code ph?????ng/x??
     */
    Ward?: string;
    /**
     * M?? ?????i t??c s??? d???ng d???ch v???
     */
    OrderingParty?: string;
    /**
     * Chi???u d??i b??u g???i
     */
    Length?: string;
    /**
     * Chi???u r???ng b??u g???i
     */
    Width?: string;
    /**
     * Chi???u cao b??u g???i
     */
    Height?: string;
    /**
     * M?? d???ch v??? ch??nh
     */
    ServiceType?: string;
    /**
     * ????n v??? t??nh k??ch th?????c
     */
    Unit?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI229Response {
    MT_ZTMI229_OUT?: MTZTMI229OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI235Response {
    maBuuPham?: string;
    loaiHangHoa?: string;
    loaiDichVu?: string;
    line?: string;
    dongBangKe?: string;
    dongChuyenThu?: string;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI236Request {
    /**
     * M?? b??u g???i
     */
    IV_PACKAGE_ID?: string;
    /**
     * Lo???i b??u g???i
     */
    IV_FREIGHT_UNIT_TYPE?: string;
    /**
     * Tr???ng th??i b??u g???i
     */
    IV_FREIGHT_UNIT_STATUS?: string[];
    /**
     * Location hi???n t???i c???a b??u g???i
     */
    IV_LOC_ID?: string;
    /**
     * Khung th???i gian qu??t
     */
    IV_FR_DATE?: string;
    /**
     * Khung th???i gian qu??t
     */
    IV_TO_DATE?: string;
    /**
     * S??? trang c???n hi???n th???
     */
    IV_PAGE_NO?: string;
    /**
     * S??? record c???n hi???n th???
     */
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI236Response {
    MT_ZTMI236_OUT?: MTZTMI236OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI239Request {
    /**
     * M?? b??u g???i
     */
    IV_PACKAGE_ID?: string;
    /**
     * M?? nh??n vi??n qu??t b??u
     */
    IV_USER?: string;
    /**
     * Tr???ng th??i: 1 l?? Create
     */
    IV_FLAG?: string;
    /**
     * Lo???i h??ng h??a
     */
    IV_COMMODITY?: string;
    /**
     * Lo???i d???ch v???
     */
    IV_SERVICE?: string;
    /**
     * Th??ng tin line
     */
    IV_LINE?: string;
    /**
     * ??i???m ????ng b???ng k?? ?????n
     */
    IV_MANIFEST_LOC?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI239Response {
    MT_ZTMI239_OUT?: MTZTMI239OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI240Request {
    /**
     * Tr???ng th??i b??u g???i
     */
    IV_FREIGHT_UNIT_STATUS?: string[];
    /**
     * M?? location hi???n t???i
     */
    IV_LOC_ID?: string;
    /**
     * Th???i gian qu??t b??u ph???m
     */
    IV_DATE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI240Response {
    MT_ZTMI240_OUT?: MTZTMI240OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }

  export interface ZTMI241Request {
    /**
     * M?? b??u g???i
     */
    IV_PACKAGE_ID?: string;
    /**
     * Tr???ng th??i b??u g???i
     */
    IV_FREIGHT_UNIT_STATUS?: string[];
    /**
     * M?? location hi???n t???i
     */
    IV_LOC_ID?: string;
    /**
     * Nh??m h??ng h??a + location ????ng b???ng k?? ?????n
     */
    IV_COMMODITY_GROUP?: string;
    /**
     * Ng??y qu??t b??u g???i
     */
    IV_DATE?: string;
    /**
     * M?? nh??n vi??n qu??t b??u
     */
    IV_USER?: string;
    /**
     * S??? trang c???n hi???n th???
     */
    IV_PAGE_NO?: string;
    /**
     * S??? record c???n hi???n th???
     */
    IV_NO_PER_PAGE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }

  export interface ZTMI241Response {
    MT_ZTMI241_OUT?: MTZTMI241OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
}
declare namespace Paths {
  namespace AddIndexLocation {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.LocationAddEsRequest;
    }
    namespace Responses {
      export type $200 = Definitions.LocationAddEsResponse;
    }
  }
  namespace AutoGenUserVoSo {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.GenUserRequest;
    }
    namespace Responses {
      export type $200 = Definitions.GenUserVoSoResponse;
    }
  }
  namespace AutoIndexEsLocation {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.LocationAutoAddEsRequest;
    }
    namespace Responses {
      export type $200 = Definitions.LocationAddEsResponse;
    }
  }
  namespace GetBPCode {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.UsersGetBPCodeRequest;
    }
    namespace Responses {
      export type $200 = Definitions.UsersGetBPCodeResponse;
    }
  }
  namespace GetUser {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.UserSapMappingGetRequest;
    }
    namespace Responses {
      export type $200 = Definitions.UserSapMappingGetResponse;
    }
  }
  namespace MIOAZTMI011 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI011Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI011Response;
    }
  }
  namespace MIOAZTMI012 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI012Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI012Response;
    }
  }
  namespace MIOAZTMI016 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI016Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI016Response;
    }
  }
  namespace MIOAZTMI017 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI017Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI017Response;
    }
  }
  namespace MIOAZTMI018 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI018Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI018Response;
    }
  }
  namespace MIOAZTMI019 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI019Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI019Response;
    }
  }
  namespace MIOAZTMI022 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI022Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI022Response;
    }
  }
  namespace MIOAZTMI023 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI023Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI023Response;
    }
  }
  namespace MIOAZTMI024 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI024Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI024Response;
    }
  }
  namespace MIOAZTMI029 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI029Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI029Response;
    }
  }
  namespace MIOAZTMI030 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI030Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI030Response;
    }
  }
  namespace MIOAZTMI031 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI031Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI031Response;
    }
  }
  namespace MIOAZTMI035 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI035Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI035Response;
    }
  }
  namespace MIOAZTMI036 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI036Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI036Response;
    }
  }
  namespace MIOAZTMI038 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI038Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI038Response;
    }
  }
  namespace MIOAZTMI039 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI039Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI039Response;
    }
  }
  namespace MIOAZTMI040 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI040Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI040Response;
    }
  }
  namespace MIOAZTMI045 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI045Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI045Response;
    }
  }
  namespace MIOAZTMI045V03 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI045V03Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI045V03Response;
    }
  }
  namespace MIOAZTMI046 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI046Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI046Response;
    }
  }
  namespace MIOAZTMI047 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI047Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI047Response;
    }
  }
  namespace MIOAZTMI048 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI048Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI048Response;
    }
  }
  namespace MIOAZTMI049 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI049Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI049Response;
    }
  }
  namespace MIOAZTMI051 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI051Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI051Response;
    }
  }
  namespace MIOAZTMI054 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI054Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI054Response;
    }
  }
  namespace MIOAZTMI055 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI055Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI055Response;
    }
  }
  namespace MIOAZTMI058 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI058Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI058Response;
    }
  }
  namespace MIOAZTMI062 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI062Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI062Response;
    }
  }
  namespace MIOAZTMI063 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI063Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI063Response;
    }
  }
  namespace MIOAZTMI067 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI067Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI067Response;
    }
  }
  namespace MIOAZTMI094 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.MIOAZTMI094Request;
    }
    namespace Responses {
      export type $200 = Definitions.MIOAZTMI094Response;
    }
  }
  namespace SIOAZFII016 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.SIOAZFII016Request;
    }
    namespace Responses {
      export type $200 = Definitions.SIOAZFII016Response;
    }
  }
  namespace SIOAZTMI027 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.SIOAZTMI027Request;
    }
    namespace Responses {
      export type $200 = Definitions.SIOAZTMI027Response;
    }
  }
  namespace SIOAZTMI068 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.SIOAZTMI068Request;
    }
    namespace Responses {
      export type $200 = Definitions.SIOAZTMI068Response;
    }
  }
  namespace SIOZTMI028 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.SIOZTMI028Request;
    }
    namespace Responses {
      export type $200 = Definitions.SIOZTMI028Response;
    }
  }
  namespace SearchLocation {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.LocationGetsEsRequest;
    }
    namespace Responses {
      export type $200 = Definitions.LocationSearchEsResponse;
    }
  }
  namespace SignUpVoSo {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.UserVoSoAddOrChangeRequest;
    }
    namespace Responses {
      export type $200 = Definitions.UserVoSoAddOrChangeResponse;
    }
  }
  namespace ZFI001 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI001Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI001Response;
    }
  }
  namespace ZFI002 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI002Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI002Response;
    }
  }
  namespace ZFI003 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI003Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI003Response;
    }
  }
  namespace ZFI004 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI004Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI004Response;
    }
  }
  namespace ZFI005 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI005Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI005Response;
    }
  }
  namespace ZFI006 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI006Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI006Response;
    }
  }
  namespace ZFI007 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI007Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI007Response;
    }
  }
  namespace ZFI007M {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZFI007MRequest;
    }
    namespace Responses {
      export type $200 = Definitions.ZFI007MResponse;
    }
  }
  namespace ZTMI205 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI205Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI205Response;
    }
  }
  namespace ZTMI213 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI213Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI213Response;
    }
  }
  namespace ZTMI229 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI229Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI229Response;
    }
  }
  namespace ZTMI235 {
    namespace Responses {
      export type $200 = Definitions.ZTMI235Response;
    }
  }
  namespace ZTMI236 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI236Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI236Response;
    }
  }
  namespace ZTMI239 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI239Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI239Response;
    }
  }
  namespace ZTMI240 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI240Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI240Response;
    }
  }
  namespace ZTMI241 {
    export interface BodyParameters {
      request?: Parameters.Request;
    }

    namespace Parameters {
      export type Request = Definitions.ZTMI241Request;
    }
    namespace Responses {
      export type $200 = Definitions.ZTMI241Response;
    }
  }
}
