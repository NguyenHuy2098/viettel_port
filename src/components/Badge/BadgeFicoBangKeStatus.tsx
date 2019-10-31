import React from 'react';
import { Button } from 'reactstrap';
import { get } from 'lodash';

import { badgeFicoStateMap } from 'utils/common';

interface Props {
  status: number;
}

// eslint-disable-next-line max-lines-per-function
const BadgeFicoBangKeStatus: React.FC<Props> = (props: Props): JSX.Element => {
  const { status } = props;
  const statusText = get(badgeFicoStateMap, `[${status}]`);

  return <Button className={`sipTableBtnStatus sipTableBtnStatus${status}`}>{statusText}</Button>;
};

export default BadgeFicoBangKeStatus;
