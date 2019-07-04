class BaseError {
  public constructor() {
    Error.apply(this);
  }
}

class HttpRequestError extends BaseError {
  // eslint-disable-next-line @typescript-eslint/no-parameter-properties
  public constructor(public status: string, public messages: []) {
    super();
  }
}

export interface HttpRequestErrorType {
  status: string;
  messages: [];
}

export default HttpRequestError;
