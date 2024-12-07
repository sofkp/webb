import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaCreditCard, FaComment } from 'react-icons/fa';
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext.jsx';
import {
  StyledNavbar,
  StyledNavLink,
  StyledContainer,
  StyledForm,
  StyledSearchInput
} from './Navbar-style.jsx';
import { useProduct } from '../contexts/ProductContext';

function Navbarr() {
  const { tenantID, tenantLogo } = useTenant();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim()) {
      setproductName(searchInput); 
      navigate(`/product`);
    }
  };

  return (
    <StyledNavbar expand="lg" className="fixed-top">
      <StyledContainer fluid>
        <StyledNavbar.Brand onClick={() => navigate('/products')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {tenantLogo ? (
              <img
                src={tenantLogo}
                alt={`${tenantID} logo`}
                style={{ height: '70px', marginRight: '10px' }}
              />
            ) : (
              <img src={tenantLogo} alt={`${tenantID} logo`} style={{ height: '40px', marginRight: '10px' }} />
            )}
          </div>
        </StyledNavbar.Brand>

        <StyledNavLink onClick={() => navigate('/orders')}>
          <FaShoppingCart size={27} style={{ marginRight: '8px' }} />
          Orders
        </StyledNavLink>

        <StyledNavLink onClick={() => navigate('/payments')}>
          <FaCreditCard size={27} style={{ marginRight: '8px' }} />
          Payments
        </StyledNavLink>

        <StyledNavLink onClick={() => navigate('/reviews')}>
          <FaComment size={27} style={{ marginRight: '8px' }} />
          Reviews
        </StyledNavLink>

        <StyledNavLink onClick={() => navigate('/')}>
          <IoMdExit size={27} style={{ marginRight: '8px' }} />
          Logout
        </StyledNavLink>
      </StyledContainer>
    </StyledNavbar>
  );
}

export default Navbarr;