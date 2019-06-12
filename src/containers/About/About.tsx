import * as React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppState } from 'redux/store';

export interface Props {
  hello: string;
}

const schema = yup.object().shape({
  name: yup.string().required('name khong duoc de trong'),
  number: yup
    .number()
    .required('number khong duoc de trong')
    .typeError('khong phai la so')
    .min(2, 'min 2'),
});

const About: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();
  const [name, setName] = React.useState<string>('');
  const [number, setNumber] = React.useState<number | ''>('');
  const [error, setError] = React.useState<string>('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const validateData = async (): Promise<void> => {
    try {
      const valid = await schema.validate({ name, number });
      setError('');
      console.log(valid);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.value) return setNumber('');
    if (!isNaN(Number(event.target.value))) setNumber(Number(event.target.value));
  };

  return (
    <div>
      <h1>About</h1>
      {props.hello}
      {error ? <p>{error}</p> : null}
      <input type="text" onChange={handleChangeName} value={name} placeholder="Name" />
      <br />
      <input type="text" onChange={handleChangeNumber} value={number} placeholder="Number" />
      <button onClick={validateData}>Save Changes</button>
      <h3>{t('Welcome to React')}</h3>
    </div>
  );
};

const mapStateToProps = (state: AppState): Props => ({
  hello: state.hello.text,
});

export default connect(mapStateToProps)(About);
