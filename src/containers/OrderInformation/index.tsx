import * as React from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const OrderInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderTable(): JSX.Element {
    return (
      <div className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Mã bưu cục')}</th>
              <th>{t('Thời gian')}</th>
              <th>{t('Trạng thái')}</th>
              <th>{t('Thông tin bảng kê')}</th>
              <th>{t('Người tác động')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LHA - Hà Nội</td>
              <td>11:12 ∙ 19/05/2019</td>
              <td>Giao cho bưu cục (103)</td>
              <td>CT_335_DHNI TAT_194_DTHNI</td>
              <td>NV: Huy PV ∙ 0988753468</td>
            </tr>
            <tr>
              <td>LHA - Hà Nội</td>
              <td>11:12 ∙ 19/05/2019</td>
              <td>Giao cho bưu cục (103)</td>
              <td>CT_335_DHNI TAT_194_DTHNI</td>
              <td>NV: Huy PV ∙ 0988753468</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  function renderOrderInformation(): JSX.Element {
    return (
      <Col md="4" xs="12" className="mb-4">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3>Thông tin đơn hàng</h3>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                Trạng thái:
              </Col>
              <Col xs="12" lg="7">
                Giao bưu tá phát
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                Trọng lượng:
              </Col>
              <Col xs="12" lg="7">
                900 g
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                Tổng cước:
              </Col>
              <Col xs="12" lg="7">
                15.000 đ
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Tiền thu hộ')}:
              </Col>
              <Col xs="12" lg="7">
                0 đ
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderSenderCustomer(): JSX.Element {
    return (
      <Col md="4" xs="12" className="mb-4">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" lg="7">
                {t('Nguyễn Văn An')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" lg="7">
                {t('0987654314')}:
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Email')}:
              </Col>
              <Col xs="12" lg="7">
                {t('hiepsiden@gmail.com')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" lg="7">
                {t('Số 10, ngõ 2 phố Quần Ngựa, Văn Cao, Ba Đình, Hà Nội')}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderReceiveCustomer(): JSX.Element {
    return (
      <Col md="4" xs="12" className="mb-4">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" lg="7">
                {t('Trần Văn Thao')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" lg="7">
                {t('0987654314')}:
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Email')}:
              </Col>
              <Col xs="12" lg="7">
                {t('hiepsimu@gmail.com')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" lg="7">
                {t('Số 10, ngõ 2 phố Quần Ngựa, Văn Cao, Ba Đình, Hà Nội')}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderInformationContact(): JSX.Element {
    return (
      <Col xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Bưu cục phát')}:
              </Col>
              <Col xs="12" lg="7">
                {t('TN2')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Bưu tá phát')}:
              </Col>
              <Col xs="12" lg="7">
                {t('Huy NT・098843700')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Bưu cục gốc')}:
              </Col>
              <Col xs="12" lg="7">
                {t('DTHNI')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="5">
                {t('Giám đốc gốc')}:
              </Col>
              <Col xs="12" lg="7">
                {t('Nga PT・098800982')}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <div>
      <Row className="sipInputItem">
        <Col xs="12" lg="8" className="color-bluegreen">
          {t('Mã vận đơn')}: 157 194 840720
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin đơn hàng')}</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-eye" />
            Xem phiếu gửi
          </Button>
          <Button>
            <i className="fa fa-pencil" />
            Sửa phiếu gửi
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            In mã vạch
          </Button>
          <Button>
            <i className="fa fa-print" />
            In mã phiếu
          </Button>
        </div>
      </Row>
      <Row>
        {renderOrderInformation()}
        {renderSenderCustomer()}
        {renderReceiveCustomer()}
      </Row>
      <h1 className="sipTitle">{t('Thông tin liên hệ')}</h1>
      <Row>{renderInformationContact()}</Row>
      <div className="row mt-3" />
      <div className="mt-3" />
      <h1 className="sipTitle">{t('Hành trình')}</h1>
      {renderTable()}
    </div>
  );
};

export default OrderInformation;
