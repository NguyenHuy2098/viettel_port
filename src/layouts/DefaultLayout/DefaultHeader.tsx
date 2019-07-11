import React, { useState } from 'react';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Nav,
  NavItem,
  ButtonDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from 'assets/img/logo.png';
import { logout } from 'redux/auth/actions';
import { makeSelectProfile } from 'redux/auth/selectors';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const DefaultHeader: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const profile = useSelector(makeSelectProfile);
  const [dropdownOpenMenu, setDropdownOpenMenu] = useState<boolean>(false);
  const [dropdownOpenNotifications, setDropdownOpenNotifications] = useState<boolean>(false);

  const handleLogout = (): void => {
    dispatch(logout({}));
  };

  const toggleDropdownOpenNotifications = (): void => {
    setDropdownOpenNotifications(!dropdownOpenNotifications);
  };

  const toggleDropdownOpenMenu = (): void => {
    setDropdownOpenMenu(!dropdownOpenMenu);
  };

  const renderHeaderNotifications = (): JSX.Element => {
    return (
      <ButtonDropdown isOpen={dropdownOpenNotifications} toggle={toggleDropdownOpenNotifications}>
        <DropdownToggle nav>
          <i className="fa fa-bell-o fa-lg" />
          <Badge pill color="danger">
            5
          </Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  };

  const renderHeaderUser = (): JSX.Element => (
    <ButtonDropdown isOpen={dropdownOpenMenu} toggle={toggleDropdownOpenMenu} className="sipHeaderUser">
      <DropdownToggle nav>
        <span className="hide-xs">{profile && profile.name}</span>
        <i className="fa fa-caret-down fa-lg hide-xs" />
        <i className="fa fa-user-o fa-lg show-xs" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header tag="div" className="text-center">
          <strong>Account</strong>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-envelope-o" /> Messages<Badge color="success">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge>
        </DropdownItem>
        <DropdownItem header tag="div" className="text-center">
          <strong>Settings</strong>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-user" /> Profile
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-wrench" /> Settings
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-file" /> Projects<Badge color="primary">42</Badge>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <i className="fa fa-shield" /> Lock Account
        </DropdownItem>
        <DropdownItem onClick={handleLogout}>
          <i className="fa fa-lock" /> Logout
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );

  const renderNav = (): JSX.Element => (
    <Nav className="ml-auto" navbar>
      <NavItem className="d-md-down-none">
        <NavLink to="#" className="nav-link">
          <i className="fa fa-heart-o fa-lg" />
        </NavLink>
      </NavItem>
      <NavItem className="d-md-down-none">
        <NavLink to="#" className="nav-link">
          <i className="fa fa-clock-o fa-lg" />
        </NavLink>
      </NavItem>
      <NavItem className="sipHeaderNoti">{renderHeaderNotifications()}</NavItem>
      <NavItem>{renderHeaderUser()}</NavItem>
    </Nav>
  );

  return (
    <>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 150, alt: 'VTP' }}
        minimized={{ src: logo, width: 30, height: 30, alt: 'VTP' }}
        href={routesMap.home}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <FormGroup className="sipHeaderSearch">
        <Input type="text" placeholder="Tra cứu đơn hàng" />
        <Button>
          <i className="fa fa-search fa-lg" />
        </Button>
      </FormGroup>
      {renderNav()}
    </>
  );
};

export default DefaultHeader;
