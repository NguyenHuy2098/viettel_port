import React from 'react';
import { get, map } from 'lodash';
import { Menu, MenuItem, MenuProps } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import { default as NumberFormat } from 'react-number-format';
import Typeahead from './Typeahead';

interface Props {
  children?: JSX.Element;
  onChange: (selected: TypeaheadOption[]) => void;
  onInputChange: (input: string, event: Event) => void;
  selected?: TypeaheadOption[];
  suggestions: CommoditySuggestedItem[];
}

// eslint-disable-next-line max-lines-per-function
const TypeaheadTenHang = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  function filterByAll(): boolean {
    return true;
  }

  function renderMenu(results: TypeaheadOption[], menuProps: MenuProps): JSX.Element {
    return (
      <Menu {...menuProps}>
        {results.map((result: TypeaheadOption, index: number) => (
          <MenuItem key={get(result, 'id', '')} option={result} position={index}>
            {get(result, 'label', '')} -{' '}
            <NumberFormat
              value={get(result, 'price', '')}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
            />
          </MenuItem>
        ))}
      </Menu>
    );
  }

  return (
    <Typeahead
      id="inputProductDescription"
      filterBy={filterByAll}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      options={map(props.suggestions, item => ({
        id: get(item, 'name') + get(item, 'price'),
        label: get(item, 'name'),
        price: get(item, 'price'),
      }))}
      placeholder={t('Nội dung hàng hoá')}
      selected={props.selected}
      renderMenu={renderMenu}
    />
  );
};

export default TypeaheadTenHang;
