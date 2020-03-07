import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Typeahead from './Typeahead';

interface Props {
  children?: JSX.Element;
  loaiKienHang?: string;
  onChange?: (selected: TypeaheadOption[]) => void;
}

// eslint-disable-next-line max-lines-per-function
const TypeaheadLoaiHoang = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  const options = React.useMemo(() => {
    if (props.loaiKienHang === 'V2') {
      return [
        {
          id: 'V04',
          label: 'Thư / Tài liệu',
        },
      ];
    }

    return [
      {
        id: 'V01',
        label: 'Thực phẩm',
      },
      {
        id: 'V02',
        label: 'Đồ uống',
      },
      {
        id: 'V03',
        label: 'Thiết bị điện tử',
      },
      {
        id: 'V04',
        label: 'Thư / Tài liệu',
      },
      {
        id: 'V05',
        label: 'Vải, quần áo',
      },
      {
        id: 'V06',
        label: 'Vắc xin',
      },
      {
        id: 'V07',
        label: 'Hàng đông lạnh',
      },
      {
        id: 'V99',
        label: 'Khác',
      },
    ];
  }, [props.loaiKienHang]);

  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }

  return (
    <Typeahead
      id="selectProductType"
      // defaultSelected={[
      //   {
      //     id: 'V04',
      //     label: 'Thư / Tài liệu',
      //   },
      // ]}
      // filterBy={() => true}
      labelKey={renderLabelKey}
      options={options}
      placeholder={t('Chọn loại hàng')}
      {...props}
    />
  );
};

export default TypeaheadLoaiHoang;
