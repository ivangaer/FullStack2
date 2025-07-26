import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaGamepad } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #1a1a2e;
  color: #f9f871;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  box-sizing: border-box;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

const Logo = styled.h1`
  font-size: 1.8em;
  font-family: 'Roboto Condensed', sans-serif;
  color: #f9f871;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  & > svg {
    color: #f9f871;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 25px;
`;

const NavLink = styled(Link)`
  color: #f9f871;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <FaGamepad /> <NavLink to="/">GameHub</NavLink>
      </Logo>
      <Nav>
        <NavLink to="/"><FaHome /> Inicio</NavLink>
        <NavLink to="/cart"><FaShoppingCart /> Carrito</NavLink>
        <NavLink to="/login">Admin</NavLink> {/* Enlace a /login */}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
