import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, ButtonDropdown } from 'reactstrap';
// @ts-ignore
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { get } from 'lodash';

import logo from 'assets/img/logo.png';
import HeaderSearch from 'components/HeaderSearch';
import { logout } from 'redux/auth/actions';
import { makeSelectorProfile } from 'redux/auth/selectors';
import routesMap from 'utils/routesMap';
import ModalAbout from '../../components/Modal/ModalAbout';

interface Props {
  url: string;
}

// eslint-disable-next-line max-lines-per-function
const DefaultHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const profile = useSelector(makeSelectorProfile);
  const [showModalAbout, setShowModalAbout] = useState<boolean>(false);
  const [dropdownOpenMenu, setDropdownOpenMenu] = useState<boolean>(false);
  const [dropdownOpenNotifications, setDropdownOpenNotifications] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const handleLogout = (): void => {
    dispatch(logout({}));
  };

  const toggleDropdownOpenNotifications = (): void => {
    setDropdownOpenNotifications(!dropdownOpenNotifications);
  };

  const toggleDropdownOpenMenu = (): void => {
    setDropdownOpenMenu(!dropdownOpenMenu);
  };

  const toggleModalAbout = (): void => {
    setShowModalAbout(!showModalAbout);
  };

  const renderHeaderNotifications = (): JSX.Element => {
    return (
      <ButtonDropdown isOpen={dropdownOpenNotifications} toggle={toggleDropdownOpenNotifications}>
        <DropdownToggle nav>
          <img src={'../../assets/img/icon/iconBell.svg'} alt="VTPostek" />
          <Badge pill color="danger">
            5
          </Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="VTPostek" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="VTPostek" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="VTPostek" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="VTPostek" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
          <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="VTPostek" />
            <span>
              Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin
            </span>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const renderHeaderUser = (): JSX.Element => (
    <ButtonDropdown isOpen={dropdownOpenMenu} toggle={toggleDropdownOpenMenu} className="sipHeaderUser">
      <DropdownToggle nav>
        <span className="hide-xs">{get(profile, 'preferred_username') || get(profile, 'email')}</span>
        <i className="fa fa-caret-down fa-lg hide-xs" />
        <i className="fa fa-user-o fa-lg show-xs" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header tag="div" className="text-center">
          <strong>{t('Account')}</strong>
        </DropdownItem>
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-envelope-o" /> Messages<Badge color="success">42</Badge>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem header tag="div" className="text-center">*/}
        {/*  <strong>Settings</strong>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-user" /> Profile*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-wrench" /> Settings*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-file" /> Projects<Badge color="primary">42</Badge>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem divider />*/}
        {/*<DropdownItem>*/}
        {/*  <i className="fa fa-shield" /> Lock Account*/}
        {/*</DropdownItem>*/}
        <DropdownItem onClick={toggleModalAbout}>
          <i className="fa fa-info-circle" /> {t('Giới thiệu')}
        </DropdownItem>
        <DropdownItem onClick={handleLogout}>
          <i className="fa fa-lock" /> {t('Đăng xuất')}
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );

  function handleChangeLanguage(lang: string): void {
    i18n.changeLanguage(lang);
  }

  const lang = i18n.language === 'vi' ? 'en' : 'vi';

  const renderNav = (): JSX.Element => (
    <Nav className="ml-auto" navbar>
      <NavItem className="d-md-down-none hide">
        <NavLink to="#" className="nav-link">
          <img src={'../../assets/img/icon/iconHeart.svg'} alt="VTPostek" />
        </NavLink>
      </NavItem>
      <NavItem className="d-md-down-none hide">
        <NavLink to="#" className="nav-link">
          <img src={'../../assets/img/icon/iconClock.svg'} alt="VTPostek" />
        </NavLink>
      </NavItem>
      <NavItem className="sipHeaderNoti hide">{renderHeaderNotifications()}</NavItem>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <NavItem style={{ cursor: 'pointer' }} onClick={(): void => handleChangeLanguage(lang)}>
        {lang === 'vi' ? 'EN' : 'VI'}
      </NavItem>
      <NavItem>{renderHeaderUser()}</NavItem>
    </Nav>
  );

  return (
    <>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 150, alt: 'VTP' }}
        minimized={{ src: logo, width: 30, height: 30, alt: 'VTP' }}
        href={routesMap.HOME}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
      <ModalAbout toggle={toggleModalAbout} visible={showModalAbout} />

      <HeaderSearch url={props.url} />
      {renderNav()}
    </>
  );
};

export default DefaultHeader;
