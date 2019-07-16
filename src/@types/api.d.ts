/* eslint-disable max-lines, @typescript-eslint/interface-name-prefix */
declare namespace API {
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
  }
  export interface GenUserRequest {
    Number?: number; // int32
  }
  export interface GenUserVoSoResponse {
    Users?: UserVoSoViewModel[];
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
     * Mã bưu gửi bị lập biên bản
     */
    FU?: string;
    /**
     * Mô tả chi tiết lỗi
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
     * Mã đơn hàng được phan công
     */
    TRQ_ID?: string;
  }
  export interface ItemMTZTMI011OUT {
    /**
     * Số tiền tương ứng với mã dịch vụ
     */
    AMOUNT_ITEM?: string;
    /**
     * Tiền tệ
     */
    CURRENCY_ITEM?: string;
    /**
     * Mã dịch vụ viettel
     */
    CHARGE_TYPE?: string;
  }
  export interface ItemMTZTMI031OUT {
    AMOUNT_ITEM?: string;
    CURRENCY_ITEM?: string;
    CHARGE_TYPE?: string;
  }
  export interface ItemZTMI011 {
    ITEM_CAT?: string;
    GROSS_WEIGHT?: string;
    NET_WEIGHT?: string;
    Height?: string;
    Length?: string;
    Width?: string;
    Currency?: string;
    COD?: string;
    INSURANCE_VALUE?: string;
    WEIGHT_UOM?: string;
    DIMENSION_UOM?: string;
    Quantity?: string;
    COMMODITY_TYPE?: string;
  }
  export interface ItemZTMI012 {
    Flag?: string;
    PACKAGING_MATERIAL?: string;
    Description?: string;
    PACKAGE_TYPE?: string;
    QUANTITY_OF_PACKAGE?: string;
    QUANTITY_OF_UNIT?: string;
    GROSS_WEIGHT?: string;
    GROSS_WEIGHT_OF_UNIT?: string;
    NET_WEIGHT?: string;
    NET_WEIGHT_OF_UNIT?: string;
    Length?: string;
    Hight?: string;
    Width?: string;
    Note?: string;
    GOODS_VALUE?: string;
    Currency?: string;
    COMODITY_CODE?: string;
    COD?: string;
    SERVICE_TYPE?: string;
  }
  export interface ItemZTMI094 {
    /**
     * Mã  FU - FU(30 và 58) - Freight_Unit(31)
     */
    FU_ID?: string;
  }
  export interface MIOAZTMI011Request {
    /**
     * Mã loại đơn hàng: V001: Đơn hàng xã phường/xã của điểm nhận hàng
     */
    FWO_TYPE?: string;
    /**
     * Mã tổ chức mua hàng: Tạm thời sử dụng mã 50000005 cho VTP, chờ chốt về cấu trúc tổ chức có thay đổi sẽ báo lại
     */
    SALES_ORG?: string;
    SERVICE_GROUP?: string;
    /**
     * Mã khách hàng
     */
    ORDERING_PARTY?: string;
    /**
     * Loại giao nhận: ZDD: nhận trả tại nhà, ZPD – nhận bc trả tại nhà
     */
    MOVEMENT_TYPE?: string;
    /**
     * Mã quốc gia của điểm nhận hàng
     */
    SOURCE_COUNTRY?: string;
    /**
     * Mã tỉnh/thành của điểm nhận hàng
     */
    SOURCE_CITY?: string;
    /**
     * Mã quận/huyện của điểm nhận hàng
     */
    SOURCE_DISTRICT?: string;
    /**
     * Mã phường/xã của điểm nhận hàng
     */
    SOURCE_WARD?: string;
    /**
     * Mã quốc gia của điểm giao hàng
     */
    DESTINATION_COUNTRY?: string;
    /**
     * Mã tỉnh/thành của điểm giao hàng
     */
    DESTINATION_CITY?: string;
    /**
     * Mã quận/huyện của điểm giao hàng
     */
    DESTINATION_DISTRICT?: string;
    /**
     * Mã phường/xã của điểm giao hàng
     */
    DESTINATION_WARD?: string;
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
    ORDER_TYPE?: string;
    BUYERS_REFERENCE_NUMBER?: string;
    SALE_ORG?: string;
    SALE_OFFICE?: string;
    SOURCE_TYPE?: string;
    FWO_NO?: string;
    ORDERING_PARTY?: string;
    NAME_OP?: string;
    ADDRESS_OP?: string;
    PHONE_OP?: string;
    EMAIL_OP?: string;
    Shipper?: string;
    NAME_SHIPPER?: string;
    ADDRESS_SHIPPER?: string;
    PHONE_SHIPPER?: string;
    EMAIL_SHIPPER?: string;
    Consignee?: string;
    NAME_CONSIG?: string;
    ADDRESS_CONSIG?: string;
    PHONE_CONSIG?: string;
    EMAIL_CONSIG?: string;
    VAT_NO_PAYER?: string;
    MOVEMENT_TYPE?: string;
    POSTAL_CODE_SRC?: string;
    TEL_SRC?: string;
    COUNTRY_SRC?: string;
    CITY_SRC?: string;
    DISTRICT_SRC?: string;
    WARD_SRC?: string;
    STREET_NAME_SRC?: string;
    HOUSE_ID_SRC?: string;
    POSTAL_CODE_DES?: string;
    TEL_DES?: string;
    COUNTRY_DES?: string;
    CITY_DES?: string;
    DISTRICT_DES?: string;
    FLAG_HEADER?: string;
    PromoCode?: string;
    VOUCHER_ID?: string;
    Campaign?: string;
    Disctype?: string;
    Description?: string;
    WARD_DES?: string;
    STREET_NAME_DES?: string;
    LOCATION_ID_SRC?: string;
    LOCATION_ID_DES?: string;
    REQUEST_PICK_DATE?: string;
    CONFIRM_PICK_DATE?: string;
    REQUEST_DELIV_DATE?: string;
    CONFIRM_DELIV_DATE?: string;
    FREIGH_TERM?: string;
    CUS_ID?: string;
    Item?: ItemZTMI012[];
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
     * 1 = Tạo
     */
    IV_FLAG?: string;
    /**
     * Loại bảng kê ZC1 = Bảng kê, ZC2 = Tải
     */
    IV_TOR_TYPE?: string;
    /**
     * Mã tải, bảng kê
     */
    IV_TOR_ID_CU?: string;
    /**
     * Điểm đi
     */
    IV_SLOCATION?: string;
    /**
     * Điểm đến
     */
    IV_DLOCATION?: string;
    /**
     * Mô tả
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
     * C là tạo mới, M là modify, D là deletion
     */
    IV_FLAG?: string;
    /**
     * Tạm thời mặc định V11 – Lệnh điều xe đường bộ (xe của viettel); V12 – Lệnh điều xe (xe VTP thuê ngoài); V16: Lệnh điều xe (Xe VTL thuê ngoài)
     */
    IV_FREIO_TYPE?: string;
    /**
     * Loại tải/bảng kê
     */
    IV_TOR_TYPE?: string;
    /**
     * Mã tải/bảng kê
     */
    IV_TOR_ID_CU?: string;
    /**
     * Mã lệnh điều xe
     */
    IV_FREIO_ID?: string;
    /**
     * Điểm đi (bỏ trống nếu lấy theo schedule; điền nếu không có schedule)
     */
    IV_SLOCATION?: string;
    /**
     * Điểm đến (bỏ trống nếu lấy theo schedule; điền nếu không có schedule)
     */
    IV_DLOCATION?: string;
    /**
     * Mô tả
     */
    IV_DESCRIPTION?: string;
    /**
     * Mã hành trình đường thư
     */
    IV_SCHEDULE?: string;
    /**
     * Thời gian xuất phát theo hành trình đường thư
     */
    IV_DEPARTDATE?: string;
    /**
     * Mã lái xe
     */
    IV_DRIVER?: string;
    /**
     * Mã xe
     */
    IV_VEHICLE?: string;
    /**
     * Ghi chú
     */
    IV_TEXT?: string;
    /**
     * Thông tin mã chuyến thư (Đối với tạo lệnh điều xe thì bỏ trống)
     */
    T_ITEM?: TITEMRequestZTMI017;
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
     * Mã lệnh điều xe/ Mã chuyến thư
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
     * Ghi chú
     */
    IV_NOTE?: string;
    /**
     * Tên lái xe xã hội
     */
    IV_DRI_NAME_XH?: string;
    /**
     * SĐT lái xe xã hôi
     */
    IV_DRI_PHON_XH?: string;
    /**
     * Biển số xe xã hội
     */
    IV_VH_NO_XH?: string;
    /**
     * Ghi chú
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
     * Mã tải/kiện / bảng kê/ chuyến thư/ bưu gửi
     */
    IV_ID?: string;
    /**
     * Mã điểm đi
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
     * Mã chuyến bay
     */
    IV_FLIGHT_NUMBER?: string;
    /**
     * Ngày dự kiến bay đi
     */
    IV_DE_DATE?: string;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }
  export interface MIOAZTMI024Response {
    /**
     *
     */
    MT_ZTMI024_OUT?: MTZTMI024OUT;
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
     * 01 : thành công, 00 : lỗi
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
     * Mã đơn hàng, tự sinh của hê thống
     */
    FWO_ID?: string;
    /**
     * Mã đơn của khách hàng
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
    Row?: RowRequestZTMI035;
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }
  export interface MIOAZTMI035Response {
    /**
     *
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowResponseZTMI035[];
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface MIOAZTMI036Request {
    /**
     * Mã bưu tá nhận hàng
     */
    IV_UNAME?: string;
    /**
     * Số ngày
     */
    IV_DAYS?: string;
    /**
     * Trạng thái
     */
    IV_STATUS?: string;
    /**
     * Số kiện/trang
     */
    IV_PAGENO?: string;
    /**
     * Số kiện/trang
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
     * Mã trạng thái trong đó 604 là chờ giao; 818 là chờ giao chuyển hoàn; 607, 609, 610 là chưa giao được, 820 là chưa giao chuyển hoàn được; 606 là phát thành công; 819 là chuyển hoàn thành công
     */
    FU_STATUS?: string;
    /**
     * Username của bưu tá giao hàng
     */
    Delivery_postman?: string;
    /**
     * Số trang
     */
    Position?: string;
    /**
     * Số kiện/trang
     */
    Size?: string;
    /**
     * Vourcher
     */
    Vourcher?: string;
    /**
     * Chuyển hoàn
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
     * Mã khách hàng (BP)
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
     * Mã tải/ tải gom/ bảng kê
     */
    IV_TOR_ID?: string;
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
     * Mã tải/bảng kê/ chuyến thư
     */
    IV_TOR_ID?: string;
    /**
     * Loại (Bảng kê: ZC1, Tải: ZC2, chuyến thư: ZC3)
     */
    IV_TOR_TYPE?: string;
    /**
     * Mã điểm đi
     */
    IV_FR_LOC_ID?: string;
    /**
     * Mã điểm đến
     */
    IV_TO_LOC_ID?: string;
    /**
     * Trạng thái tải/bảng kê/chuyến thư
     */
    IV_CUST_STATUS?: string;
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
     * trang thái bắt buộc truyển
     */
    IV_STATUS?: string;
    /**
     * Mã lái xe
     */
    IV_DRIVER?: string;
    /**
     * Mã location quản lý xe
     */
    IV_LOCID?: string;
    /**
     * Ngày khởi hành bắt đầu
     */
    IV_F_DEP?: string;
    /**
     * Ngày kết thúc khởi hàng
     */
    IV_T_DEP?: string;
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
     * Nếu là null thi lấy hết, nếu <> null thi lấy theo tất cả các xe co location nhap vao
     */
    IV_LOCNO?: string;
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
     * Mã địa điểm bưu cục
     */
    iv_post?: string;
    /**
     *
     */
    iv_position?: string;
  }
  export interface MIOAZTMI054Response {
    MT_ZTMI045_OUT?: MTZTMI054OUT;
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface MIOAZTMI055Request {
    /**
     * Loại phan công (ZTM001: Phân công nhận; ZTM002: Phân công giao)
     */
    IV_PARTY_RCO?: string;
    /**
     * Mã các đơn hàng được phan công (Liệt kê dưới đây)
     */
    IV_TRQ_ID?: IVTRQID[];
    /**
     * Mã BP của bưu tá được phan công
     */
    IV_PARTY_ID?: string;
    /**
     * User ID của người phan công (Trưởng bưu cục)
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
     * Số điện thoại người nhận
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
     * Đơn tạo từ ngày
     */
    FROM_DATE?: string;
    /**
     * Đơn tạo đến ngày
     */
    TO_DATE?: string;
    /**
     * (Search chính xác)
     */
    PRODUCT_NAME?: string;
    /**
     * (chính xác)
     */
    FWO_STATUS?: string;
    /**
     * (Search theo *…)
     */
    BUYER_REFERENCE_NO?: string;
    /**
     * (Search theo *…)
     */
    FWO?: string;
    /**
     * Trang số
     */
    IV_PAGENO?: string;
    /**
     * Số bưu gửi / trang
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
     * Mã kho (Required: SAP tự sinh mã)
     */
    IV_LOCNO?: string;
    /**
     * Tên kho _ Required
     */
    IV_LOC_DES?: string;
    /**
     * Mã khách hàng_Required
     */
    IV_BP?: string;
    /**
     * Longtitude, theo định dạng quy đổi ra độ
     */
    IV_LONGITUDE?: string;
    /**
     * Longtitude, theo định dạng quy đổi ra độ
     */
    IV_LATITUDE?: string;
    /**
     * Tên người phụ trách kho
     */
    IV_PIC_NAME?: string;
    /**
     * Từ viết tắt của kho để tìm kiếm
     */
    IV_SEARCH_TERM?: string;
    /**
     * Số nhà, định dàng freetext (Option)
     */
    IV_HOUSE_NO?: string;
    /**
     * Tên phố, định dàng freetext (Option)
     */
    IV_STREET?: string;
    /**
     * Mã phường/xã (Required)
     */
    IV_WARD_ID?: string;
    /**
     * Mã quận/huyện (Required)
     */
    IV_DISTRICT_ID?: string;
    /**
     * Mã tỉnh thành (Required)
     */
    IV_CITY_ID?: string;
    /**
     * Mã postal code Truyền mã default “11111”
     */
    IV_POSTAL_CODE?: string;
    /**
     * Mã quốc gia (Required)
     */
    IV_COUNTRY_ID?: string;
    /**
     * Số điện thoại bàn để liên hệ với kho  (Option)
     */
    IV_PHONE?: string;
    /**
     * Số điện thoại di động để liên hệ với kho (Option)
     */
    IV_MOBILE?: string;
    /**
     * Email để liên hệ với kho (option)
     */
    IV_EMAIL?: string;
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
    row?: RowRequestZTMI063;
    /**
     * Mã bưu cục
     */
    IV_LOC_ID?: string;
    /**
     * Mã user
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
  export interface MIOAZTMI094Request {
    /**
     * Số đơn hàng
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
  export interface MTZFII016OUT {
    Row?: RowMTZFII016OUT;
  }
  export interface MTZTMI011OUT {
    /**
     *
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowMTZTMI011OUT;
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
    RETURN_MESSAGE?: RETURNMESSAGE;
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
     * Nếu 00 thì là lỗi, 01 thì OK
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
    RETURN_MESSAGE?: RETURNMESSAGE;
  }
  export interface MTZTMI022OUT {
    /**
     * 0: Là lỗi, 1: là OK
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
    row?: RowResponseZTMI023OUT;
  }
  export interface MTZTMI024OUT {
    /**
     * 01 : thành công, 00 : lỗi
     */
    EV_ERROR?: number; // int32
    /**
     *
     */
    Row?: RowResponseZTMI024;
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
  export interface MTZTMI036OUT {
    /**
     * 01 – Thành công, 00 – Lỗi
     */
    ev_error?: number; // int32
    /**
     *
     */
    paging?: Paging;
    /**
     *
     */
    T_DATA?: TDATAResponseZTMI036[];
  }
  export interface MTZTMI038OUT {
    EV_ERROR?: number; // int32
    Row?: RowResponseZTMI038;
  }
  export interface MTZTMI039OUT {
    /**
     *
     */
    ev_error?: string;
    /**
     *
     */
    row?: RowResponseZTMI039;
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
  }
  export interface MTZTMI045OUT {
    /**
     * 01 là thành công, 00 là lỗi
     */
    EV_ERROR?: string;
    /**
     *
     */
    Row?: RowMTZTMI045OUT[];
  }
  export interface MTZTMI045V03OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI045V03OUT[];
  }
  export interface MTZTMI046OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI046OUT;
  }
  export interface MTZTMI047OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI047OUT[];
  }
  export interface MTZTMI048OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI048OUT[];
  }
  export interface MTZTMI049OUT {
    Row?: RowMTZTMI049OUT[];
  }
  export interface MTZTMI051OUT {
    EV_ERROR?: number; // int32
  }
  export interface MTZTMI054OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI054OUT[];
  }
  export interface MTZTMI055OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE[];
    EV_TRQ_ID_ERROR?: EVTRQIDERROR[];
  }
  export interface MTZTMI058OUT {
    EV_ERROR?: string;
    Row?: RowMTZTMI058OUT[];
    Paging?: PAGING;
  }
  export interface MTZTMI062OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE;
  }
  export interface MTZTMI068OUT {
    EV_ERROR?: number; // int32
    Row?: RowMTZTMI068OUT[];
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
  export interface RETURNMESSAGE {
    /**
     * Loại lỗi (E- Error; S-Success, W- Warning, I- Info, A- Abort)
     */
    TYPE?: string;
    /**
     * Nhóm lỗi
     */
    ID?: string;
    /**
     * Mã lỗi
     */
    NUMBER?: string;
    /**
     * Nội dung lỗi
     */
    MESSAGE?: string;
    LOG_MSG_NO?: string;
    ROW?: string;
    /**
     * Tham số 1 của nội dung lỗi
     */
    MESSAGE_V1?: number; // int64
    /**
     * Tham số 2 của nội dung lỗi
     */
    MESSAGE_V2?: string;
    /**
     * Tham số 3 của nội dung lỗi
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
    MOBILE_PHONE_SRT?: string;
    CONSIGNEE_ID?: string;
    CONSIGNEE_NAME?: string;
    MOBILE_PHONE_DES?: string;
    BUYER_REFERENCE_NUMBER?: string;
    SALES_GROUP?: string;
    SOURCE_LOCATION?: string;
    SOURCE_LOCATION_DESCRIPTION?: string;
    HOUSE_NO_SOURCE?: number; // int32
    STREET_ID_SOURCE?: string;
    WARD_ID_SOURCE?: number; // int32
    DISTRICT_ID_SOURCE?: string;
    PROVINCE_ID_SOURCE?: string;
    COUNTRY_ID_SOURCE?: string;
    DESTINATION_LOCATION?: string;
    DESTINATION_LOCATION_NAME?: string;
    HOUSE_NO_DES?: number; // int32
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
    PICKUP_POSTMAN_PHONE?: string;
    DELIVERY_POSTMAN_ID?: string;
    DELIVERY_POSTMAN_NAME?: string;
    DELIVERY_POSTMAN_PHONE?: string;
    Execution?: Execution[];
    Item?: ItemMTZTMI031OUT[];
  }
  export interface RowMTZTMI045OUT {
    /**
     * Loại địa điểm
     */
    LOCTYPE?: string;
    /**
     * Mã địa điểm
     */
    LOCNO?: string;
    /**
     * Tên địa điểm
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
     * Số nhà
     */
    HOUSE_NUM1?: string;
    /**
     * Số điện thoại
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
     * Tên đường phố
     */
    STREET?: string;
    /**
     * Mã phường/xã
     */
    REGIOGROUP?: string;
    /**
     * Mã tỉnh/thành
     */
    CITY?: string;
    /**
     * Mã quận huyện
     */
    DISTRICT?: string;
    /**
     * Mã quốc gia
     */
    COUNTRY?: string;
    /**
     * Mã khách hàng
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
    ZONLO?: string;
    CHILDS?: Child[];
  }
  export interface RowMTZTMI047OUT {
    TOR_ID?: string;
    LIFECYCLE?: number; // int32
    DATETIME_CHLC?: string;
    NET_WEI_VAL?: string;
    NET_WEI_UNI?: string;
    LOG_LOCID_SRC?: number; // int32
    LOG_LOCID_DES?: number; // int32
    EXEC_CONT?: string;
    ITEM_NO?: string;
    ZONLO?: string;
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
  }
  export interface RowMTZTMI049OUT {
    Name?: string;
    PlateNumber?: string;
    VALID_FROM?: string;
    VALID_TO?: string;
    OrgCentre?: number; // int32
    COUNTRY_VEHIC_ID?: string;
  }
  export interface RowMTZTMI054OUT {
    LOCNO?: string;
    UNAME?: string;
    NAME_TEXT?: string;
    POSITION?: string;
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
  export interface RowMTZTMI068OUT {
    SERVICE_TYPE?: string;
    SERVICE_TYPE_DES?: string;
    SERVICE_GROUP?: string;
    SERVICE_GROUP_DES?: string;
    TARGET_TIME?: string;
  }
  export interface RowRequestZTMI018 {
    /**
     * Mã chuyển thư
     */
    FREIGH_NO?: string;
    /**
     * Mã tải, kiện, bưu gửi
     */
    ContainerId?: string;
    /**
     * Loại tải kiện (nếu ZC1…..ZC5 thì là tải kiện, nếu là null thì là bưu gửi)
     */
    BUSINESS_TYPE?: string;
    /**
     * Không dùng
     */
    FREIGH_STATUS?: string;
  }
  export interface RowRequestZTMI022 {
    /**
     * Số tải, kiện
     */
    CU_NO?: string;
    /**
     * Số bưu gửi
     */
    FU_NO?: string;
    /**
     * Có các trang thái sau: 1 – nhận, 2 – Thiếu, 3 – Thừa, 4 – Suy chuyển, 5 – Thừa suy chuyển
     */
    STATUS_ID?: string;
    /**
     *
     */
    USER_ID?: string;
    /**
     * Mã location
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
     * Mã đơn hàng
     */
    IV_TRQ_ID?: string;
    /**
     * Mã User
     */
    IV_UNAME?: string;
    /**
     *  Mã trạng thái hải quan, 160 là chờ thông quan, 161 là Từ chối thông quan, 162 là đã thông quan
     */
    IV_CUSTOMS_STATUS?: string;
    /**
     *  Lý do bị từ chối thông quan
     */
    IV_REASON?: string;
    /**
     * Link URL lưu đường dẫn của tờ khai hải quan
     */
    IV_LINK?: string;
    /**
     * Số tiền thuế thu hộ
     */
    IV_TAX?: string;
  }
  export interface RowRequestZTMI035 {
    /**
     * Mã User
     */
    USER_ID?: string;
  }
  export interface RowRequestZTMI045 {
    /**
     * Loại địa điểm (Ví dụ V001 là bưu cục, V002 là cửa hàng….), lưu ý chọn trong danh sách location type đã được định nghĩa từ trước
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
     * Mã lỗi
     */
    Number?: string;
  }
  export interface RowResponseZTMI023OUT {
    /**
     * Mã tải/kiện/bảng kê/ chuyến thư
     */
    TOR_ID?: string;
    /**
     * Mã bưu gửi
     */
    PACKAGE_ID?: string;
    /**
     * Loại tải/kiện / bảng kê/ chuyến thư/ bưu gửi
     */
    TOR_TYPE?: string;
    /**
     * Phân nhóm tải kiện
     */
    TOR_CAT?: string;
    /**
     * Không cần quan tâm
     */
    ACTUAL_DATE?: string;
    /**
     * Mã địa chỉ hiện tại
     */
    EXT_LOG_ID?: string;
    /**
     * Khối lượng
     */
    GRO_WEI_VAL?: string;
    /**
     * Đơn vị khối lượng
     */
    GRO_WEI_UNI?: string;
    /**
     * Loại bưu gửi
     */
    CCODE_TYPE_DES?: string;
    /**
     * Nhóm hàng hóa
     */
    CCODE_DES?: string;
    /**
     * Múi giờ
     */
    ZONLO?: string;
    /**
     * Mã điểm đi
     */
    FR_LOG_ID?: string;
    /**
     * Chuỗi mã điểm đến
     */
    TO_LOG_ID?: string;
    /**
     * Mã Loại dịch vụ chính
     */
    TRANSSRVREQ_CODE?: string;
    /**
     * Mô tả loại dịch vụ chính
     */
    TRANSSRVREQ_TXT?: string;
    /**
     * Mã nhóm dịch vụ chính
     */
    SERVGROUP?: string;
    /**
     * Mô tả nhóm dịch vụ chính
     */
    SERVGROUP_TXT?: string;
    /**
     * Ngày tạo
     */
    CREATED_ON?: string;
    /**
     * Trạng thái
     */
    ZVTP_CUST_STATUS?: number; // int32
    /**
     * Mã bưu cục gốc
     */
    SALES_OFF_ID?: number; // int32
  }
  export interface RowResponseZTMI024 {
    /**
     * Trạng thái air freight order
     */
    TOR_ID?: string;
    /**
     * Trạng thái air freight order
     */
    TOR_STATUS?: number; // int32
    /**
     * Mã chuyến bay
     */
    FLIGHT_NUMBER?: string;
    /**
     * Thời gian dự kiến đi
     */
    PLAN_TRANS_TIME_DSTF?: string;
    /**
     * Thời gian dự kiến đến
     */
    PLAN_TRANS_TIME_DSTL?: string;
    /**
     * Thời gian thực tế đi
     */
    ACTUAL_DATE_DEXD?: string;
    /**
     * Thời gian thực tế đến
     */
    ACTUAL_DATE_DEXA?: string;
    /**
     * Sân bay đi
     */
    LOG_LOC_IDSTF?: string;
    /**
     * Sân bay đến
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
    /**
     * Tên người gửi hàng
     */
    SHIPPER_ID?: string;
    /**
     * Số điện thoại người gửi
     */
    TEL_NUMBER_SRC?: string;
    /**
     * Địa chỉ ngưởi gửi
     */
    ADD_SHIPPER?: string;
    /**
     * Tổng số bản ghi
     */
    Count?: string;
    /**
     * Số phiếu gửi
     */
    TRQ_ID?: string;
    /**
     * Ngày assigned
     */
    PICK_UP_PM_ASSIGNED_ON?: string;
    /**
     * Ngày dự kiến pick hàng
     */
    PIC_EAR_REQ?: string;
    /**
     * Số bưu gửi
     */
    TOR_ID?: string;
    /**
     * Mã bưu gửi
     */
    PACKET_ID?: string;
    /**
     * Mô tả
     */
    ITEM_DESCR?: string;
    /**
     * Gross weigh
     */
    GRO_WEI_VAL?: string;
    /**
     * Đơn vị
     */
    GRO_WEI_UNI?: string;
    /**
     * Dài
     */
    LENGTH?: string;
    /**
     * Rộng
     */
    WIDTH?: string;
    /**
     * Cao
     */
    HEIGHT?: string;
    /**
     * Đơn vị tính
     */
    MEASUOM?: string;
    /**
     * Loại hàng hóa
     */
    TYPE_OF_GOODS?: string;
    /**
     * Tiền cước
     */
    TOTAL_AMOUNT?: string;
    /**
     * Tiền COD
     */
    COD?: string;
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
     * Username của bưu tá giao hàng
     */
    Delivery_Postman_ID?: string;
    /**
     * Mã đơn hàng của hệ thống TM
     */
    FWO?: string;
    /**
     * Mã đơn hàng của khách hàng
     */
    Buyer_reference_number?: string;
    /**
     * Tên người nhận
     */
    Receiver_name?: string;
    /**
     * Số điện thoại người nhận
     */
    Receiver_mobile_phone?: string;
    /**
     * Thời gian phân công phát
     */
    Postman_assignment_date?: string;
    /**
     * Thời gian dự kiến phát
     */
    Planned_delivery_date?: string;
    /**
     * Địa chỉ giao hàng hàng
     */
    Receiver_address?: string;
    /**
     * Mã kiện hàng (mã này là mã tự sinh của hệ thống)
     */
    Freight_unit_ID?: string;
    /**
     * Mô tả kiện
     */
    Item_description?: string;
    /**
     * Trọng lượng
     */
    Gross_weight?: string;
    /**
     * Đơn vị trọng lượng
     */
    Weight_UOM?: string;
    /**
     * Dài
     */
    Length?: string;
    /**
     * Rộng
     */
    Width?: string;
    /**
     * Cao
     */
    Height?: string;
    /**
     * Đơn vị kích thước 3 chiều
     */
    Dimension_UOM?: string;
    /**
     * Loại
     */
    Category?: string;
    /**
     * Mã trạng thái
     */
    Status?: string;
    /**
     * Tiền cước phí
     */
    Freight_charge?: string;
    /**
     * Tiền thu hộ
     */
    COD?: string;
    /**
     * Đơn vị tiền tệ
     */
    DVTT?: string;
    /**
     * Ghi chú ở kiện hàng
     */
    NOTE?: string;
    /**
     * Mã kiện hàng, mã này sẽ in trên nhãn)
     */
    Package_ID?: string;
    /**
     * Nếu Y là hàng chuyển hoàn, N thì hàng thông thường
     */
    Return?: string;
    /**
     * Nếu Y là vourcher, N là hàng thông thường
     */
    Vourcher?: string;
    /**
     * Ngày giao hàng thành công
     */
    Actual_date?: string;
    /**
     * Múi giờ
     */
    Timezone?: string;
    /**
     * Tổng số kiện
     */
    Total_entry?: string;
    /**
     * Tổng số trang
     */
    Total_page?: string;
  }
  export interface RowZFII016 {
    KUNNR?: string;
    FROM_DATE?: string;
    TO_DATE?: string;
    ASSIGNMENT?: string;
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
     * Loại địa điểm(V001,V002,V003,V004,V005,V006,V007,V008,V009,V010)
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
     * Lấy toàn bộ mã dịch vụ
     */
    GET?: {};
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
     * Các giá trị: 01-Tạo; 02 – Thay đổi thông tin; 03 – Thuyết minh; 04 – Kết luận
     */
    FLAG?: string;
    /**
     * Để trống đối với TH tạo
     */
    DOCUMENT_ID?: string;
    /**
     * Mã nhân viên lập biên bản
     */
    CREATED_USER?: string;
    /**
     * Mã đơn vị (bưu cục, TTKT, TTbay… Lấy ở API I045)
     */
    LOCATION_ID?: string;
    /**
     * Mã nhân viên bị lập biên bản (Lấy ở API I054)
     */
    VIOLATED_USER?: string;
    /**
     * Mã nhóm lỗi (Lấy ở API I098)
     */
    ERROR_GROUP_CODE?: string;
    /**
     * Mã lỗi (Lấy ở API I098)
     */
    ERROR_CODE?: string;
    ITEMS?: ITEMRequestZTMI028[];
    /**
     * Mô tả giải pháp khắc phục
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
     * Mã người gửi
     */
    SHIPER_ID?: string;
    /**
     * Tên người gửi
     */
    SHIPER_NAME?: string;
    /**
     * SĐT người gửi
     */
    TEL_NUMBER_SRC?: string;
    /**
     * Địa chỉ nhận hàng
     */
    SHIPER_ADD?: string;
    /**
     * STT kiện
     */
    FWO_NO?: string;
    /**
     * Mã đơn hàng
     */
    TRQ_ID?: string;
    /**
     * Ngày phân công nhận
     */
    PICK_UP_PM_ASSIGNED_ON?: string;
    /**
     * Ngày dự kiến nhận hàng
     */
    PIC_EAR_REQ?: string;
    /**
     * Ngày nhận hàng thành công
     */
    ACTUAL_DATE?: string;
    /**
     * Mã kiện hàng
     */
    PACKAGE_ID?: string;
    /**
     * Mã kiện hàng (Hệ thống tự sinh)
     */
    TOR_ID?: string;
    /**
     * Mô tả kiện
     */
    ITEM_DESCR?: string;
    /**
     * Dài
     */
    LENGTH?: string;
    /**
     * Rộng
     */
    WIDTH?: string;
    /**
     * Cao
     */
    HEIGHT?: string;
    /**
     * Đơn vị kích thước
     */
    MEASUOM?: string;
    /**
     * Loại (theo nhóm dịch vụ hỏa tốc, đông lanh….)
     */
    TYPE_OF_GOOD?: string;
    /**
     * Time zone
     */
    ZONLO?: string;
    /**
     * Cước phí phải thu
     */
    NET_AMOUNT_LCL?: string;
    /**
     * Vourcher
     */
    VOUCHER?: string;
    /**
     * Trạng thái
     */
    ZVTP_CUST_STATS?: number; // int32
    /**
     *
     */
    HDR_COD?: string;
  }
  export interface TITEM {
    /**
     * Mã item (bảng kê hoặc bưu gửi
     */
    ITEM_ID?: string;
    /**
     * Nếu là bảng kê thì gửi Type, nếu là bưu gửi thì để blank
     */
    ITEM_TYPE?: string;
  }
  export interface TITEMRequestZTMI017 {
    /**
     * Mã item
     */
    ITEM_ID?: string;
    /**
     * Loại item
     */
    ITEM_TYPE?: string;
  }
  export interface TITEMResponseZTMI024 {
    /**
     * Mã air freight order
     */
    TOR_ID_ROOT?: string;
    /**
     * Mã kiện
     */
    TOR_ID_REQ?: string;
    /**
     * Mô tả kiện
     */
    ITEM_DESCR?: string;
    /**
     * Trọng lượng
     */
    GRO_WEI_VAL?: string;
    /**
     * Đơn vị trọng lương
     */
    GRO_WEI_UNI?: string;
    /**
     * Dài
     */
    LENGTH?: string;
    /**
     * Rộng
     */
    WIDTH?: string;
    /**
     * Cao
     */
    HEIGHT?: string;
    /**
     * Đơn vị
     */
    MEASUOM?: string;
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
  export interface ZTMI063OUT {
    EV_ERROR?: number; // int32
    RETURN_MESSAGE?: RETURNMESSAGE;
  }
}
declare namespace Paths {
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
}