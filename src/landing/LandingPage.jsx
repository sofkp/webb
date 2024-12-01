import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../contexts/TenantContext';
import './LandingPage.css';

const LandingPage = () => {
  const [tenants, setTenants] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null); 
  const [isSubPageVisible, setIsSubPageVisible] = useState(false); 

  const navigate = useNavigate();
  const { setTenantID, setInventoryID } = useTenant();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('https://m0e5pa5e95.execute-api.us-east-1.amazonaws.com/test/customization/list-logos');
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

  const fetchInventory = async (tenantId) => {
    try {
      const response = await fetch(
        `https://y5q2ovlb9l.execute-api.us-east-1.amazonaws.com/dev/inventory/names?tenant_id=${tenantId}`
      );
      const data = await response.json();
      if (response.ok) {
        setInventory(data.body);
      } else {
        throw new Error('Failed to fetch inventory');
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleTenantSelect = async (tenantId, logoUrl) => {
    setTenantID(tenantId); 
    setSelectedTenant({ tenantId, logoUrl });
    await fetchInventory(tenantId);
    setIsSubPageVisible(true);
  };

  const handleInventorySelect = (inventoryId) => {
    setSelectedInventory(inventoryId);
  };

  const handleNavigateToInicio = () => {
    if (selectedInventory) {
      setInventoryID(selectedInventory);
      navigate('/inicio');
    } else {
      alert('Please select an inventory');
    }
  };

  return (
    <div className="landing-page">
      <h1>Selecciona tu tienda</h1>
      <div className="tenant-container">
        {tenants.map((tenant) => (
          <button
            key={tenant.tenant_id}
            onClick={() => handleTenantSelect(tenant.tenant_id, tenant.logo_url)}
            className="tenant-button"
          >
            <div>{tenant.tenant_id}</div>
            <img src={tenant.logo_url} alt={`${tenant.tenant_id} logo`} className="tenant-logo" />
          </button>
        ))}
      </div>

      {isSubPageVisible && (
        <div className="subpage">
          <div className="inventory-list">
            <h2>Sedes de {selectedTenant?.tenantId}</h2>
            {inventory.map((item) => (
              <button
                key={item.inventory_id}
                className={`inventory-button ${selectedInventory === item.inventory_id ? 'selected' : ''}`}
                onClick={() => handleInventorySelect(item.inventory_id)}
              >
                {item.inventory_name}
              </button>
            ))}
          </div>
          <button className="ok-button" onClick={handleNavigateToInicio}>OK</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
