import React from 'react';
import { get, map, isEmpty } from 'lodash';
import { Menu, MenuItem, MenuProps } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Row } from 'reactstrap';

interface Props {
  children?: JSX.Element;
  onChange: (selected: TypeaheadOption[]) => void;
  onInputChange: (input: string, event: Event) => void;
  selected?: TypeaheadOption[];
  suggestions: Person[];
}

// eslint-disable-next-line max-lines-per-function
const TypeaheadPhone = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  function filterByAll(): boolean {
    return true;
  }

  function renderMenu(results: TypeaheadOption[], menuProps: MenuProps): JSX.Element {
    return (
      <Menu {...menuProps}>
        {results.map((result: TypeaheadOption, index: number) => (
          <MenuItem key={get(result, 'id', '')} option={result} position={index}>
            <Row style={{ fontWeight: 'bold' }}>
              {get(result, 'label') +
                (isEmpty(get(result, 'code')) ? '' : ' * ' + get(result, 'code')) +
                ' * ' +
                get(result, 'name')}
            </Row>
            <Row>{get(result, 'address')}</Row>
          </MenuItem>
        ))}
      </Menu>
    );
  }

  return (
    <Typeahead
      id="inputPhoneDescription"
      filterBy={filterByAll}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      options={map(props.suggestions, item => ({
        id: get(item, 'name') + get(item, 'phone'),
        label: get(item, 'phone'),
        name: get(item, 'name'),
        address: get(item, 'addr.formattedAddress'),
      }))}
      placeholder={t('Nhập số điện thoại')}
      selected={props.selected}
      renderMenu={renderMenu}
    />
  );
};

export default TypeaheadPhone;
