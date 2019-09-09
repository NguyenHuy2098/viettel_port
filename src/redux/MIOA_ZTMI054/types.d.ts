interface MIOAZTMI054PayloadType {
  data: API.MIOAZTMI054Response;
  params: {
    iv_post: string;
    iv_position?: string;
  };
}

interface MIOAZTMI054StateType {
  response: API.MIOAZTMI054Response;
}
