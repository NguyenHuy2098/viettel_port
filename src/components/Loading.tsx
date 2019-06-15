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
    return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  }
}

export default Loading;
