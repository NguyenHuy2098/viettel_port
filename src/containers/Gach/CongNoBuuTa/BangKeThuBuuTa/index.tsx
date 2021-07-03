/* eslint-disable import/imports-first */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import TabView from 'components/Tab/TabView';
import { get, isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Col, Input, Row } from 'reactstrap';
import Typeahead from 'components/Input/Typeahead';
import { action_CHECK_COD_CHUA_CHOT } from 'redux/CongNoBuuTa/actions';
import NoData from 'components/NoData';
import BangKeCOD from './BangKeCOD';
import BangKeThuCuocCPN from './BangKeThuCuocCPN';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';

import options from './data';

const Index: React.FC = (): JSX.Element => {
  const data = useSelector(select_COD_Chua_Chot);
  const { t } = useTranslation();
  const [typeSearch, setTypeSearch] = useState<string>('');
  const [selected, setSelected] = useState<TypeaheadOption[]>();
  const dispatch = useDispatch();
  // const [detailBangkeCod, setDetailBangkeCod] = React.useState<boolean>(false);

  useEffect((): void => {
    dispatch(action_CHECK_COD_CHUA_CHOT());
    // getdata();
  }, []);

  const data_input = useMemo(
    () => [
      {
        _id: 'a1G23e25vaus6DVa7Sv',
        volume: 'Nam Từ Liêm',
        name: 'huyaaa',
      },
      {
        _id: 'e1D23f25s6ASa7saA',
        volume: 'giảng võ',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaus6ASaaA',
        volume: 'đống đa',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaádus6ASaaA',
        volume: 'Cầu giấy',
        name: 'huyaaaádasds',
      },
    ],
    [],
  );

  const handleChangeTextboxValue = (
    setValueFunction: Function,
  ): ((event: React.FormEvent<HTMLInputElement>) => void) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      console.log(event.currentTarget.value);
    };
  };

  const setSelects = (selected: TypeaheadOption[]): void => {
    setSelected(selected);
  };

  const filterByFields = ['label'];

  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }

  return (
    <>
      <Row className="mb-3 sipContentContainer">
        <Col lg={3} xs={12} className="mr-2">
          <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
            <option value="">{t('Tất cả các bưu cục')}</option>
            {map(
              data_input,
              (item: CODCHUACHOT, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.volume || undefined}>
                    {item.volume}
                  </option>
                );
              },
            )}
          </Input>
        </Col>
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Typeahead
                id="selectService"
                filterBy={filterByFields}
                labelKey={renderLabelKey}
                onChange={setSelects}
                options={map(options)}
                placeholder="Nhập bưu tá cần tìm"
                selected={selected}
              />
            </div>
            <Button color="primary" className="ml-2 btn btn-primary">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>1</span>
          </p>
        </Col>
      </Row>
      <div className="mb-3" />

      <TabView
        tabKey={'ke_thu'}
        navs={[
          {
            children: (
              <>
                {t('Danh sách thu COD chưa chốt')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bảng kê thu cước CPN')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
        ]}
        tabs={[{ children: <BangKeCOD /> }, { children: <BangKeThuCuocCPN /> }]}
      />
      {/* <DetailBangKeCOD toggle={toggle} /> */}
      {isEmpty(data) && <NoData />}
    </>
  );
};

export default Index;
