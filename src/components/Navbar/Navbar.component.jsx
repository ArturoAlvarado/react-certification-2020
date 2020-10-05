import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';

const Nav = styled('nav')`
  display: grid;
  grid-auto-flow: column;
  padding: 1rem 0;
  text-align: center;
`;
const Navbar = () => {
  const history = useHistory();
  const { logout } = useAuth();
  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/login');
  }
  return (
    <Nav>
      <Link to="/">
        <i className="fa fa-home" /> Home
      </Link>
      <Link to="/favorites">
        <i className="fa fa-star" /> Favorites
      </Link>
      <Link to="/" onClick={deAuthenticate}>
        ← logout
      </Link>
    </Nav>
  );
};

export default Navbar;
