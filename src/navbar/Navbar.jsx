import React, { useState } from 'react';
import { FaUser, FaSearch, FaShoppingCart, FaList, FaCreditCard, FaImage } from 'react-icons/fa';
import {
  StyledNavbar,
  StyledNavLink,
  StyledContainer,
  StyledForm,
  StyledSearchInput
} from './Navbar-style.jsx';
import { useAuth } from '../auth/Auth';

function NavScrollExample() {
  const { isAuthenticated, logout } = useAuth();
  const [selectedLogo, setSelectedLogo] = useState('/placeholder.svg');
  const [logos] = useState([
    { id: 1, url: '/placeholder.svg' },
    { id: 2, url: '/placeholder.svg' },
  ]);

  return (
    <StyledNavbar expand="lg" className="fixed-top">
      <StyledContainer fluid>
        <StyledNavbar.Brand href="#">
          <img src={selectedLogo} alt="Logo" style={{ height: '40px' }} />
          {isAuthenticated && (
            <select
              onChange={(e) => setSelectedLogo(e.target.value)}
              className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              style={{ marginLeft: '10px' }}
            >
              {logos.map((logo) => (
                <option key={logo.id} value={logo.url}>
                  Logo {logo.id}
                </option>
              ))}
            </select>
          )}
        </StyledNavbar.Brand>

        <StyledForm>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <FaSearch
              onClick={() => window.location.href = '/products'}
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

        {isAuthenticated && (
          <>
            <StyledNavLink href="/orders" style={{ marginRight: '30px' }}>
              <FaShoppingCart size={24} style={{ marginRight: '8px' }} />
              Orders
            </StyledNavLink>

            <StyledNavLink href="/payments" style={{ marginRight: '30px' }}>
              <FaCreditCard size={24} style={{ marginRight: '8px' }} />
              Payments
            </StyledNavLink>

            <StyledNavLink href="/inventory" style={{ marginRight: '30px' }}>
              <FaList size={24} style={{ marginRight: '8px' }} />
              Inventory
            </StyledNavLink>

            <StyledNavLink onClick={logout} style={{ marginRight: '30px' }}>
              <FaUser size={24} style={{ marginRight: '8px' }} />
              Logout
            </StyledNavLink>
          </>
        )}
      </StyledContainer>
    </StyledNavbar>
  );
}

export default NavScrollExample;