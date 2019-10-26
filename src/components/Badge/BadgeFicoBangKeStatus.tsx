import React from 'react';
import { Button } from 'reactstrap';
import { get } from 'lodash';

interface Props {
  status: number;
}

const stateMap = ['Tạo mới', 'Chờ phê duyệt', 'Phê duyệt', 'Duyệt 1 phần'];

// eslint-disable-next-line max-lines-per-function
const BadgeFicoBangKeStatus: React.FC<Props> = (props: Props): JSX.Element => {
  const { status } = props;
  const statusText = get(stateMap, `[${status}]`);

  return <Button className={`sipTableBtnStatus sipTableBtnStatus${status}`}>{statusText}</Button>;
};

export default BadgeFicoBangKeStatus;
