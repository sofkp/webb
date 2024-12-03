import React, { useState } from 'react';
import { FaUser, FaSearch, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext.jsx';
import {
  StyledNavbar,
  StyledNavLink,
  StyledContainer,
  StyledForm,
  StyledSearchInput
} from './Navbar-style.jsx';

function Navbarr() {
  const { tenantID, tenantLogo} = useTenant();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/product`, {
        state: {product_name: searchInput },
      });
    }
  };

  return (
    <StyledNavbar expand="lg" className="fixed-top">
      <StyledContainer fluid>
        <StyledNavbar.Brand href="#">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {tenantLogo ? (
              <img
                src={tenantLogo}
                alt={`${tenantID} logo`}
                style={{ height: '40px', marginRight: '10px' }}
              />
            ) : (
              <img src={tenantLogo} alt={`${tenantID} logo`} style={{ height: '40px', marginRight: '10px' }} />
            )}
          </div>
        </StyledNavbar.Brand>

        <StyledForm>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <FaSearch
              onClick={handleSearch}
              style={{
                position: 'absolute',
                left: '10px',
                cursor: 'pointer',
                color: '#558c8c',
              }}
            />
            <StyledSearchInput
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </StyledForm>

        <StyledNavLink href="/orders">
          <FaShoppingCart size={22} style={{ marginRight: '8px' }} />
          Orders
        </StyledNavLink>

        <StyledNavLink href="/payments">
          <FaCreditCard size={22} style={{ marginRight: '8px' }} />
          Payments
        </StyledNavLink>

        <StyledNavLink href="/">
          <FaUser size={22} style={{ marginRight: '8px' }} />
          Logout
        </StyledNavLink>
      </StyledContainer>
    </StyledNavbar>
  );
}

export default Navbarr;
