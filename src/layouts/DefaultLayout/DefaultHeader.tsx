import React from 'react';
import { NavLink } from 'react-router-dom';
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
// @ts-ignore
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/logo.png';

interface Props {
  onLogout: Function;
}

interface State {
  dropdownOpenMenu: boolean;
  dropdownOpenNoti: boolean;
}

class DefaultHeader extends React.PureComponent<Props, State> {
  private handleLogout = (): void => {
    this.props.onLogout();
  };

  public state = {
    dropdownOpenMenu: false,
    dropdownOpenNoti: false,
  };

  public renderNav = (): React.ReactElement => (
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
      <NavItem className="sipHeaderNoti">{this.renderHeaderNoti()}</NavItem>
      <NavItem>{this.renderHeaderUser()}</NavItem>
    </Nav>
  );

  public toggleDropdownOpenNoti = (): void => {
    this.setState({
      dropdownOpenNoti: !this.state.dropdownOpenNoti,
    });
  };

  public renderHeaderNoti = (): React.ReactElement => {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpenNoti} toggle={this.toggleDropdownOpenNoti}>
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

  public toggleDropdownOpenMenu = (): void => {
    this.setState({
      dropdownOpenMenu: !this.state.dropdownOpenMenu,
    });
  };

  public renderHeaderUser = (): React.ReactElement => (
    <ButtonDropdown isOpen={this.state.dropdownOpenMenu} toggle={this.toggleDropdownOpenMenu} className="sipHeaderUser">
      <DropdownToggle nav>
        <span>Kevin Tran</span>
        <i className="fa fa-caret-down fa-lg" />
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
        <DropdownItem onClick={this.handleLogout}>
          <i className="fa fa-lock" /> Logout
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );

  public render(): React.ReactElement {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'VTP' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'VTP' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <FormGroup className="sipHeaderSearch">
          <Input type="text" placeholder="Tra cứu đơn hàng" />
          <Button>
            <i className="fa fa-search fa-lg" />
          </Button>
        </FormGroup>
        {this.renderNav()}
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
