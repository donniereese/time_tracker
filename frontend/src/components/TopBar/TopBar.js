import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <StyledNavbar dark expand="md">
          <NavbarBrand href="/">Time Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Pricing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">SignUp/Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </StyledNavbar>
      </div>
    );
  }
}

const StyledNavbar = styled(Navbar)`
  background: transparent;
  background-color: transparent;
  border-color: transparent;
  color: white;
`;

export default TopBar;