interface MIOAZTMI035PayloadType {
  data: API.MIOAZTMI035Response;
  params: {
    FU_STATUS: string;
    Delivery_postman: string;
  };
}

interface MIOAZTMI035StateType {
  response?: API.MIOAZTMI035Response;
}
