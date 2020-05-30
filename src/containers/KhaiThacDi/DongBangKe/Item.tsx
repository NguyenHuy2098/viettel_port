import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Badge, NavItem, NavLink } from 'reactstrap';
import { toString, size } from 'lodash';
import { SipDataState } from 'utils/enums';
import { today } from 'utils/timeHelper';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';

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
  updateNavTab: string;
}

function Item(props: ItemProps): JSX.Element {
  const { updateNavTab, child, tab, handleChangeTab, index, userMaBp, commLocGroup } = props;
  const dispatch = useDispatch();

  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    try {
      const payload = {
        IV_PACKAGE_ID: '',
        IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
        IV_LOC_ID: userMaBp,
        IV_COMMODITY_GROUP: commLocGroup,
        IV_DATE: today,
        IV_USER: child.USER,
        IV_PAGE_NO: '1',
        IV_NO_PER_PAGE: '10',
      };
      dispatch(
        action_ZTMI241(
          payload,
          {
            onSuccess: (res: API.MTZTMI241OUT): void => {
              setCount(size(res.Row));
            },
          },
          { stateless: true },
        ),
      );
    } catch (error) {}
  }, [updateNavTab, tab, userMaBp, commLocGroup, dispatch, child]);

  return (
    <NavItem key={child.USER}>
      <NavLink
        className={classNames({ active: tab === index })}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): void => handleChangeTab(index)}
      >
        {child.USER}
        <Badge color="primary">{count}</Badge>
      </NavLink>
    </NavItem>
  );
}

export default Item;
