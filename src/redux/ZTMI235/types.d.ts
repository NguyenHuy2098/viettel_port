interface ZTMI235Error {
  code: string;
  message: string;
}

interface ZTMI235Response {
  errors: ZTMI235Error[];
}
