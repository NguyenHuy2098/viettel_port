import React from 'react';
import { Button } from 'reactstrap';

interface Props {
  error: boolean;
}

function Loading(props: Props): JSX.Element {
  function handleRefresh(): void {
    window.location.reload();
  }

  if (props.error) {
    return (
      <div className="text-center">
        <h4 className="mb-3">Vui lòng tải lại trang!</h4>
        <Button color="primary" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
    );
  } else {
    return (
      <div className="ant-skeleton ant-skeleton-active">
        <div className="ant-skeleton-content">
          <h3 className="ant-skeleton-title">Temp</h3>
          <ul className="ant-skeleton-paragraph">
            <li />
            <li />
            <li style={{ width: '61%' }} />
          </ul>
        </div>
      </div>
    );
  }
}

export default Loading;
