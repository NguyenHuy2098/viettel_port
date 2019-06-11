import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Nav, NavItem } from 'reactstrap';
// @ts-ignore
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/logo.png';

interface Props {
  onLogout: Function;
}

class DefaultHeader extends React.PureComponent<Props> {
  private handleLogout = (): void => {
    this.props.onLogout();
  };

  public renderNav = (): React.ReactElement => (
    <Nav className="ml-auto" navbar>
      <NavItem className="d-md-down-none">
        <NavLink to="#" className="nav-link">
          <i className="fa fa-heart-o fa-lg"></i>
        </NavLink>
      </NavItem>
      <NavItem className="d-md-down-none">
        <NavLink to="#" className="nav-link">
          <i className="fa fa-clock-o fa-lg"></i>
        </NavLink>
      </NavItem>
      {this.renderHeaderNoti()}
      {this.renderHeaderUser()}
    </Nav>
  );

  public renderHeaderNoti = (): React.ReactElement => (
    <AppHeaderDropdown direction="down" className="sip-header-noti">
      <DropdownToggle nav>
        <i className="fa fa-bell-o fa-lg"></i>
        <Badge pill color="danger">
          5
        </Badge>
      </DropdownToggle>
      <DropdownMenu right style={{ right: 'auto' }}>
        <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
          <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          <span>Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin</span>
        </DropdownItem>
        <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
          <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          <span>Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin</span>
        </DropdownItem>
        <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
          <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          <span>Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin</span>
        </DropdownItem>
        <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
          <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          <span>Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin</span>
        </DropdownItem>
        <DropdownItem title="Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin">
          <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          <span>Bạn có 2 đơn hàng mới từ nhà cung cấp Ultimate Product Store, yêu cầu về việc cung cấp thông tin</span>
        </DropdownItem>
      </DropdownMenu>
    </AppHeaderDropdown>
  );

  public renderHeaderUser = (): React.ReactElement => (
    <AppHeaderDropdown direction="down" className="sip-header-user">
      <DropdownToggle nav>
        <span>Kevin Tran</span>
        <i className="fa fa-caret-down fa-lg"></i>
      </DropdownToggle>
      <DropdownMenu right style={{ right: 'auto' }}>
        <DropdownItem header tag="div" className="text-center">
          <strong>Account</strong>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge>
        </DropdownItem>
        <DropdownItem header tag="div" className="text-center">
          <strong>Settings</strong>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-user"></i> Profile
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-wrench"></i> Settings
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge>
        </DropdownItem>
        <DropdownItem>
          <i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <i className="fa fa-shield"></i> Lock Account
        </DropdownItem>
        <DropdownItem onClick={this.handleLogout}>
          <i className="fa fa-lock" /> Logout
        </DropdownItem>
      </DropdownMenu>
    </AppHeaderDropdown>
  );

  public render(): React.ReactElement {
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'VTP' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'VTP' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <FormGroup className="sip-header-search">
          <Input type="text" placeholder="Tra cứu đơn hàng" />
          <Button>
            <i className="fa fa-search fa-lg"></i>
          </Button>
        </FormGroup>
        {this.renderNav()}
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
