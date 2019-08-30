interface MIOAZTMI040PayloadType {
  data: API.MIOAZTMI040Response;
  params: {
    FU_STATUS: string;
    Delivery_postman: string;
  };
}

interface MIOAZTMI040StateType {
  response?: API.MIOAZTMI040Response;
}
