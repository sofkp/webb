import React from 'react';
import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import {
  StyledNavbar,
  StyledNavLink,
  StyledContainer,
  StyledForm,
  StyledSearchInput
} from './Navbar-style.jsx';
import logo from "../assets/download.svg";

function NavScrollExample() {
  return (
    <StyledNavbar expand="lg" className="fixed-top">
      <StyledContainer fluid>

        <StyledNavbar.Brand href="#">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </StyledNavbar.Brand>

        <StyledForm>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <FaSearch
              onClick={() => window.location.href = '/product'}
              style={{
                position: 'absolute',
                left: '10px',
                cursor: 'pointer',
                color: '#558c8c'
              }}
            />
            <StyledSearchInput
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ paddingLeft: '40px' }} 
            />
          </div>
        </StyledForm>

        <StyledNavLink href="/inicio" style={{ marginRight: '30px' }}>
          <FaUser size={24} className="nav-icon" style={{ marginRight: '8px' }} />
          Inicio
        </StyledNavLink>


        <StyledNavLink href="/pedido" style={{ marginRight: '30px' }}> 
          <FaShoppingCart size={24} style={{ marginRight: '8px' }} />
          Pedido
        </StyledNavLink>
      </StyledContainer>
    </StyledNavbar>
  );
}

export default NavScrollExample;
