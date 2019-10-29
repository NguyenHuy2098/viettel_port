import React from 'react';

interface Props {
  handleClickOutside: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapperRef: any;
}

function useClickOutSide(props: Props): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClickOutside(event: any): void {
    if (props.wrapperRef && props.wrapperRef.current && !props.wrapperRef.current.contains(event.target)) {
      props.handleClickOutside();
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

export default useClickOutSide;
