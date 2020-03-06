import React, { CSSProperties } from 'react';
import { Typeahead as RootTypeahead, TypeaheadProps } from 'react-bootstrap-typeahead';

const CARET_STYLES: CSSProperties = {
  position: 'absolute',
  right: '8px',
  top: '12px',
};

interface Props {
  children?: JSX.Element;
}

const Typeahead = (props: Props & TypeaheadProps<TypeaheadOption>): JSX.Element => (
  <RootTypeahead {...props}>
    <span style={CARET_STYLES} className="fa fa-caret-down" />
    {props.children}
  </RootTypeahead>
);

export default Typeahead;
