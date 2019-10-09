import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, Input, Row, Label, Form } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { find, get, noop } from 'lodash';

// eslint-disable-next-line max-lines-per-function
const ComplainDetail: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    age: yup
      .number()
      .required(t('bat buoc'))
      .positive('so duong')
      .typeError('khong phai la so')
      .integer('so nguyen'),
    name: yup.string().required('name khong duoc de trong'),
  });

  const renderTopController = (): React.ReactElement => (
    <Button className="ml-2" color="primary" type="submit">
      <i className="fa fa-download mr-2" />
      {t('Ghi lại')}
    </Button>
  );

  function renderInternalRecordTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button className="sipTitleBtnBack">
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Chi tiết khiếu nại')}
        </h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>
    );
  }

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<yup.ValidationError[]>([]);

  function handleValidate(e: FormEvent): void {
    e.preventDefault();
    // check validate
    const data = {
      name,
      age,
    };
    schema
      .validate(data, { abortEarly: false })
      .then((data): void => noop(data))
      .catch((error: yup.ValidationError): void => {
        setErrors(error.inner);
      });
  }

  function handleErrorMessage(errors: yup.ValidationError[], errorName: string): string {
    return get(find(errors, (item: yup.ValidationError): boolean => item.path === errorName), 'message', '');
  }

  function handleChangeName(e: ChangeEvent<HTMLInputElement>): void {
    setName(e.currentTarget.value);
  }

  function handleChangeAge(e: ChangeEvent<HTMLInputElement>): void {
    setAge(e.currentTarget.value);
  }

  // eslint-disable-next-line max-lines-per-function
  function renderRecordDetail(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Nội dung')}
          </Label>
          <Col lg="6" md="7">
            <Input type="textarea" onChange={handleChangeName} value={name} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'name')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Gia hạn')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" onChange={handleChangeAge} value={age} placeholder="Chọn lý do gia hạn" />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'age')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Loại khiếu nại')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Khiếu nại khâu nhận" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Chọn khiếu nại')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Cập nhận sai trạng thái đơn hàng" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Đơn vị mắc lỗi')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Chọn đơn vị mắc lỗi" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Cá nhân mắc lỗi')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Nhập tên người mắc lỗi" />
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <Form onSubmit={handleValidate}>
      {renderInternalRecordTitle()}
      {renderRecordDetail()}
    </Form>
  );
};

export default ComplainDetail;
