import React from 'react';
import { get, map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import Typeahead from './Typeahead';

interface Props {
  children?: JSX.Element;
  value?: string;
  postOfficeList?: API.RowMTZTMI045OUT[];
  onChange?: (selected: TypeaheadOption[]) => void;
}

// eslint-disable-next-line max-lines-per-function
const TypeaheadDiemDen = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  const options = React.useMemo(() => {
    return map(props.postOfficeList, (item, index) => ({
      id: item.LOCNO || String(index),
      label: item.DESCR40 || '-',
    }));
  }, [props.postOfficeList]);

  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'label')}`;
  }

  const filterByFields = ['label'];

  const filterByCallback = (): boolean => {
    return true;
  };

  return (
    <Typeahead
      id="chonDiemDen"
      filterBy={props.value ? filterByCallback : filterByFields}
      defaultSelected={options.filter(item => {
        return item.id === props.value;
      })}
      // filterBy={() => true}
      labelKey={renderLabelKey}
      options={options}
      placeholder={t('Chọn điểm đến')}
      isLoading={size(props.postOfficeList) === 0}
      paginate={false}
      clearButton={true}
      {...props}
    />
  );
};

export default TypeaheadDiemDen;
