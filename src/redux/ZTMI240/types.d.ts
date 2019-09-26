interface MTZTMI240Child {
  USER: string;
  NO_ITEM: string;
}

interface MTZTMI240Row {
  COMM_LOC_GROUP: string;
  TOTAL_ITEM: string;
  CHILD: MTZTMI240Child[];
}

interface MTZTMI240OUT {
  EV_ERROR: number;
  RETURN_MESSAGE?: API.RETURNMESSAGE;
  Row: MTZTMI240Row[];
}

interface MTZTMI240Response {
  MT_ZTMI240_OUT: MTZTMI240OUT;
  Status: boolean;
  ErrorCode: number;
  Messages?: string[];
  ObjectId?: string;
  Version: number;
}
