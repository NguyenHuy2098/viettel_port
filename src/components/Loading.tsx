import * as React from 'react';

interface Props {
  error: boolean;
}

function Loading(props: Props): JSX.Element {
  function handleRefresh(): void {
    window.location.reload();
  }

  if (props.error) {
    return (
      <div>
        <button onClick={handleRefresh}>Refresh</button>
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
