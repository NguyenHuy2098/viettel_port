import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Badge, NavItem, NavLink } from 'reactstrap';
import { select_ZTMI241TotalItem } from 'redux/ZTMI241/selectors';

interface ChildType {
  NO_ITEM: string;
  USER: string;
}
interface ItemProps {
  child: API.RowMTZTMI241OUT;
  tab: number;
  handleChangeTab: Function;
  index: number;
  userMaBp: string;
  commLocGroup: string;
}

function Item(props: ItemProps): JSX.Element {
  const child = props.child;
  const tab = props.tab;
  const handleChangeTab = props.handleChangeTab;
  const index = props.index;
  const totalItem = useSelector(select_ZTMI241TotalItem);

  return (
    <NavItem key={child.USER}>
      <NavLink
        className={classNames({ active: tab === index })}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): void => handleChangeTab(index)}
      >
        {child.USER}
        <Badge color="primary">{totalItem}</Badge>
      </NavLink>
    </NavItem>
  );
}

export default Item;
