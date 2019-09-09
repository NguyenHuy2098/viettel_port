interface MIOAZTMI055PayloadType {
  data: API.MIOAZTMI055Response;
  params: {
    iv_post: string;
    iv_position?: string;
  };
}

interface MIOAZTMI055StateType {
  response: API.MIOAZTMI055Response;
}
