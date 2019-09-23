import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

import { connect } from 'react-redux';
import { userActions } from '../../_actions';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  // handleLogout() {
  //   // alert("ping");
  //   this.props.dispatch(userActions.logout());
  // }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
            {/* <NavLink href="/">Dashboard</NavLink> */}
          </NavItem>
          <NavItem className="px-3">
            <Link className="nav-link" to="/users">
              Users
            </Link>
            {/* <NavLink href="/users">Users</NavLink> */}
          </NavItem>
          <NavItem className="px-3">
            <Link className="nav-link" to="/reactTable">
              Table
            </Link>
            {/* <NavLink href="#">Settings</NavLink> */}
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell"></i>
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin"></i>
            </NavLink>
          </NavItem>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="nav-item">
            <DropdownToggle nav>
              <img
                src={"assets/img/avatars/6.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-bell-o"></i> Updates
                <Badge color="info">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o"></i> Messages
                <Badge color="success">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-tasks"></i> Tasks
                <Badge color="danger">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comments"></i> Comments
                <Badge color="warning">42</Badge>
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
                <i className="fa fa-usd"></i> Payments
                <Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file"></i> Projects
                <Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-shield"></i> Lock Account
              </DropdownItem>
              <DropdownItem onClick={this.props.onClickLogout}>
                {/* <Link to="/login"> */}
                  <i className="fa fa-lock"></i> Logout
                {/* </Link> */}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch(userActions.logout())
});

//export default DefaultHeader;
export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
