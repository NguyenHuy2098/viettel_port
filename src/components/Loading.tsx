import * as React from 'react';

interface Props {
  error: boolean;
}

function Loading(props: Props): JSX.Element {
  if (props.error) {
    setTimeout((): void => {
      window.location.reload();
    }, 0);
    return <div></div>;
  } else {
    return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  }
}

export default Loading;
