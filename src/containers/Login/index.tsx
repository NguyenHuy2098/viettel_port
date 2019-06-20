import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from 'redux/auth/actions';
import useLoggedInUser from 'hooks/useLoggedInUser';
import routesMap from 'utils/routesMap';

interface Props {
  children: React.ReactElement;
}

// eslint-disable-next-line max-lines-per-function
const Login: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to={routesMap.home} />;
  }

  const handleClickLogin = (): void => {
    dispatch(login({}));
  };

  const renderInputGroup = (): React.ReactElement => (
    <React.Fragment>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user" />
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder="Username" autoComplete="username" />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock" />
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" placeholder="Password" autoComplete="current-password" />
      </InputGroup>
    </React.Fragment>
  );

  const renderTopContent = (): React.ReactElement => (
    <Card className="p-4">
      <CardBody>
        <Form>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          {renderInputGroup()}
          <Row>
            <Col xs="6">
              <Button color="primary" className="px-4" onClick={handleClickLogin}>
                Login
              </Button>
            </Col>
            <Col xs="6" className="text-right">
              <Button color="link" className="px-0">
                Forgot password?
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );

  const renderBottomContent = (): React.ReactElement => (
    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
      <CardBody className="text-center">
        <div>
          <h2>Sign up</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <Link to="/register">
            <Button color="primary" className="mt-3" active tabIndex={-1}>
              Register Now!
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              {renderTopContent()}
              {renderBottomContent()}
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
