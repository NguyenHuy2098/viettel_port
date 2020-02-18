/* eslint-disable max-lines, @typescript-eslint/interface-name-prefix, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-interface */
declare namespace SSOAPI {
  export interface ChangeBPRoleOrgIdRequest {
    RoleId?: string;
    OrgId?: string;
    OrgUnit?: string;
    Task?: string;
    BPOrg?: string;
  }
  export interface ChangeBPRoleRequest {
    BPCode?: string;
    OrgId?: ChangeBPRoleOrgIdRequest;
  }
  export interface ChangeBPRoleResponse {
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface ContentType {
    /**
     *
     */
    Type?: string;
    /**
     *
     */
    Subtype?: string;
    /**
     *
     */
    Parameters?: Parameters;
    /**
     *
     */
    WildcardType?: boolean;
    /**
     *
     */
    WildcardSubtype?: boolean;
  }
  export interface EmpKiProcessResponse {
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface Employee {
    /**
     * Id of employee
     */
    EmployeeId?: number; // int64
    /**
     * Id of manager
     */
    ManagerId?: number; // int64
    /**
     * Thời gian bắt đầu
     */
    EffectiveStartDate?: number; // int32
    /**
     * Thời gian kết thúc
     */
    EffectiveEndDate?: number; // int32
    /**
     * Ngày tạo
     */
    CreatedDate?: number; // int32
    /**
     * Người tạo
     */
    CreatedBy?: string;
    /**
     * Mã nhân viên
     */
    EmployeeCode?: string;
    /**
     * Tên nhân viên
     */
    FullName?: string;
    /**
     * Email nhân viên
     */
    Email?: string;
    /**
     * Số điện thoại nhân viên
     */
    MobileNumber?: number; // int64
  }
  export interface EmployeeAttachFileGetResponse {
    /**
     * Tên file
     */
    FileName?: string;
    /**
     * Loại hồ sơ
     */
    CategorProfileName?: string;
    /**
     * Ngày tạo
     */
    UploadDate?: number; // double
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface EmployeeCalendar {
    /**
     * Id employee_calendar
     */
    EmployeeCalendarId?: number; // int64
    /**
     * ID nhân viên
     */
    EmployeeId?: number; // int64
    /**
     * Tên nhân viên
     */
    FullName?: string;
    /**
     * Thời gian bắt đầu
     */
    StartTime?: number; // int64
    /**
     * Thời gian kết thúc
     */
    EndTime?: number; // int64
    /**
     * Mô tả
     */
    Description?: string;
    /**
     * Tiêu đề
     */
    Title?: string;
    /**
     * Địa điểm
     */
    Place?: string;
    /**
     * Thành phần
     */
    Participant?: string;
    /**
     * Nguồn dữ liệu
     */
    DataSource?: string;
    /**
     * Ngày tạo
     */
    CreatedDate?: number; // int64
    /**
     * Ngày sửa đổi
     */
    ModifiedDate?: number; // int64
    /**
     * Loại
     */
    DataType?: number; // int64
  }
  export interface EmployeeCalendarGetsResponse {
    /**
     *
     */
    Entity?: EmployeeCalendar[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface EmployeeGetByManagerResponse {
    /**
     *
     */
    Entity?: Employee[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface EmployeeGetListResponse {
    /**
     *
     */
    Entity?: Employee[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface EmployeeKiGetsByManagerResponse {
    Entity?: Employee[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface EmployeeKiGetsByOrganizationResponse {
    Entity?: Employee[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface EmployeeOffice {
    EmployeeId?: number; // int64
    Email?: string;
    FullName?: string;
    Address?: string;
    EmployeeCode?: string;
    DateOfBirth?: number; // int64
  }
  export interface EmployeeOfficeGetsResponse {
    Employees?: EmployeeOffice[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface Metadata {
    /**
     *
     */
    ContentType?: ContentType[];
  }
  export interface Parameters {}
  export interface Position {
    PositionId?: number; // int64
    Email?: string;
    Name?: string;
    PositionCode?: string;
  }
  export interface PositionGetResponse {
    /**
     * ID position
     */
    PositionId?: number; // double
    /**
     * Email of position
     */
    Email?: string;
    /**
     * Name of position
     */
    Name?: string;
    /**
     * Position code
     */
    PositionCode?: string;
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface PositionGetsResponse {
    /**
     *
     */
    Entity?: Position[];
    /**
     *
     */
    StatusType?: string;
    /**
     *
     */
    EntityType?: string;
    /**
     *
     */
    Metadata?: Metadata;
    /**
     *
     */
    Status?: string;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface PostOffice {
    PostOfficeCode?: string;
    PostOfficeName?: string;
  }
  export interface UserSapMappingGetByUsernameRequest {
    Username?: string;
    BPOrg?: string;
  }
  export interface UserSapMappingGetByUsernameResponse {
    BPCode?: string;
    BPOrg?: string;
    Roles?: string[];
    PostOffices?: PostOffice[];
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface UserViewModel {
    UserId?: string;
    BPCode?: string;
    OrgIds?: string;
    Email?: string;
    Phone?: string;
    Title?: string;
    IdNo?: string;
    LastName?: string;
    FirstName?: string;
    FullName?: string;
    Language?: string;
    Status?: 1 | 2; // int32
    readonly StatusName?: string;
    Type?: 0 | 1; // int32
    readonly TypeName?: string;
  }
  export interface UsersAddOrChangeRequest {
    UserId?: string;
    BPCode?: string;
    Email?: string;
    Phone?: string;
    Title?: string;
    LastName?: string;
    FirstName?: string;
    FullName?: string;
    IdNo?: string;
    Status?: 1 | 2; // int32
    Type?: 0 | 1; // int32
  }
  export interface UsersAddOrChangeResponse {
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
  export interface UsersGetsRequest {
    LanguageId?: string;
    LanguageDefaultId?: string;
    readonly LanguageCurrentId?: string;
  }
  export interface UsersGetsResponse {
    Users?: UserViewModel[];
    Status?: boolean;
    ErrorCode?: 0 | 1 | 2 | 3 | 4; // int32
    Messages?: string[];
    ObjectId?: string;
    Version?: number; // int32
  }
}
declare namespace Paths {
  namespace AddOrChange {
    export interface BodyParameters {
      request?: Parameters.Request;
    }
    namespace Parameters {
      export type Request = Definitions.UsersAddOrChangeRequest;
    }
    namespace Responses {
      export type $200 = Definitions.UsersAddOrChangeResponse;
    }
  }
  namespace ChangeBPRole {
    export interface BodyParameters {
      request?: Parameters.Request;
    }
    namespace Parameters {
      export type Request = Definitions.ChangeBPRoleRequest;
    }
    namespace Responses {
      export type $200 = Definitions.ChangeBPRoleResponse;
    }
  }
  namespace Get {
    namespace Responses {
      export type $200 = Definitions.PositionGetResponse;
    }
  }
  namespace GetEmpKiProcess {
    namespace Responses {
      export type $200 = Definitions.EmpKiProcessResponse;
    }
  }
  namespace GetEmployeeAttachFile {
    namespace Responses {
      export type $200 = Definitions.EmployeeAttachFileGetResponse;
    }
  }
  namespace GetEmployeeByManagerId {
    namespace Responses {
      export type $200 = Definitions.EmployeeGetByManagerResponse;
    }
  }
  namespace GetEmployeeCalendar {
    namespace Responses {
      export type $200 = Definitions.EmployeeCalendarGetsResponse;
    }
  }
  namespace GetEmployeeCalendarByOrganization {
    namespace Responses {
      export type $200 = Definitions.EmployeeCalendarGetsResponse;
    }
  }
  namespace GetListManagerEmployee {
    namespace Responses {
      export type $200 = Definitions.EmployeeGetListResponse;
    }
  }
  namespace GetProfileByUsername {
    export interface BodyParameters {
      request?: Parameters.Request;
    }
    namespace Parameters {
      export type Request = Definitions.UserSapMappingGetByUsernameRequest;
    }
    namespace Responses {
      export type $200 = Definitions.UserSapMappingGetByUsernameResponse;
    }
  }
  namespace Gets {
    export interface BodyParameters {
      request?: Parameters.Request;
    }
    namespace Parameters {
      export type Request = Definitions.UsersGetsRequest;
    }
    namespace Responses {
      export type $200 = Definitions.PositionGetsResponse;
    }
  }
  namespace GetsEmployeeKiByManager {
    namespace Responses {
      export type $200 = Definitions.EmployeeKiGetsByManagerResponse;
    }
  }
  namespace GetsEmployeeKiByOrganization {
    namespace Responses {
      export type $200 = Definitions.EmployeeKiGetsByOrganizationResponse;
    }
  }
  namespace GetsEmployeeOffice {
    namespace Responses {
      export type $200 = Definitions.EmployeeOfficeGetsResponse;
    }
  }
}
