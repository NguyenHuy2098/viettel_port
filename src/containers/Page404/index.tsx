import React from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const Page404: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  function renderInputGroup(): JSX.Element {
    return (
      <InputGroup className="input-prepend">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-search" />
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder="What are you looking for?" />
        <InputGroupAddon addonType="append">
          <Button color="info">{t('Search')}</Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">{t('404')}</h1>
              <h4 className="pt-3">{t("Oops! You're lost.")}</h4>
              <p className="text-muted float-left">{t('The page you are looking for was not found.')}</p>
            </div>
            {renderInputGroup()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Page404;
