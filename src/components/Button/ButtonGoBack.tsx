import React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ButtonProps {}

const ButtonGoBack = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const handleBack = (): void => {
    dispatch(goBack());
  };

  return (
    <Button color="link" onClick={handleBack} size="sm">
      <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
    </Button>
  );
};

export default ButtonGoBack;
