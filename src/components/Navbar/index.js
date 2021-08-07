import React from 'react';

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          BLAZE
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/orders' activeStyle>
            Orders
          </NavLink>
          <NavLink to='/products' activeStyle>
            Products
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
