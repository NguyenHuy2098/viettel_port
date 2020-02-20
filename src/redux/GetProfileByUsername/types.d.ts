interface GetProfileByUsernameStateType {
  response: SSOAPI.UserSapMappingGetByUsernameResponse;
  currentPostOffice: string;
}

interface PostOfficeType {
  PostOfficeCode: string;
  PostOfficeName: string;
}
