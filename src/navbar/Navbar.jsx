import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
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
  const { setProductName } = useProduct();
  const { tenantID, tenantLogo } = useTenant();
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

        <StyledForm>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' , height:'40px', width:'750px',  size: '27px'}}>
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
              style={{ paddingLeft: '40px' , size: '27px'}}
            />
          </div>
        </StyledForm>

        <StyledNavLink onClick={() => navigate('/orders')}>
          <FaShoppingCart size={27} style={{ marginRight: '8px' }} />
          Orders
        </StyledNavLink>

        <StyledNavLink onClick={() => navigate('/payments')}>
          <FaCreditCard size={27} style={{ marginRight: '8px' }} />
          Payments
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
