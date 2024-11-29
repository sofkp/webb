import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import './LandingPage.css';

const LandingPage = () => {
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();
  const { setTenantInfo } = useTenant();

  // Fetch tenants from the API on component mount
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('https://s2yffs906g.execute-api.us-east-1.amazonaws.com/dev/customization/list-logos');
        const data = await response.json();
        
        const parsedData = typeof data.body === 'string' ? JSON.parse(data.body) : data;
        
        if (response.ok) {
          setTenants(parsedData);
        } else {
          throw new Error('Failed to fetch tenants');
        }
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  const handleTenantSelect = (tenantId, logoUrl) => {
    setTenantInfo({ tenantId, logoUrl });
    navigate('/inicio');
  };

  return (
    <div style={{ textAlign: 'center', paddingBottom: '80px' }}>
      <h1>Selecciona tu tienda</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {tenants.map((tenant) => (
          <button
            key={tenant.tenant_id}
            onClick={() => handleTenantSelect(tenant.tenant_id, tenant.logo_url)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '5px',
              background: 'transparent',
              textAlign: 'center',
              outline: 'none',
            }}
          >
            <img
              src={tenant.logo_url}
              alt={`${tenant.tenant_id} logo`}
              width={50}
              style={{
                filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.75))',
                transition: 'filter 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))';
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.5))';
              }}
            />
            <div>{tenant.tenant_id}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
