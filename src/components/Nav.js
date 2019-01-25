import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, NavItem, MenuItem, NavDropdown, Nav as NAVT } from 'react-bootstrap'

class Nav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect className={this.props.classparam}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">RUDDY CASTRO</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          <NAVT pullRight>
            <li><Link  to="/home">Mis votos</Link></li>
            <li><Link  to="/persons">Registrar</Link></li>
            <li><Link  to="/schools">Colegios</Link></li>
            <li><Link  to="/reports">Reportes</Link></li>
          </NAVT>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Nav;