import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';

const LandingPage = () => {
  const [tenants, setTenants] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null); 
  const [isSubPageVisible, setIsSubPageVisible] = useState(false); 

  const navigate = useNavigate();
  const { setTenantID, setTenantLogo} = useTenant();
  const {  setInventoryID } = useAuth();

  useEffect(() => {
    document.body.classList.add('landing-page-body'); 
    return () => {
      document.body.classList.remove('landing-page-body');
    };
  }, []);


  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('https://n7jtz56cdj.execute-api.us-east-1.amazonaws.com/prod/customization/list-logos');
        const data = await response.json();
        if (response.ok) {
          setTenants(data.body);  
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
        `https://oi5a9j62qi.execute-api.us-east-1.amazonaws.com/prod/inventory/names?tenant_id=${tenantId}`
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
    setTenantLogo(logoUrl);
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
        {Array.isArray(tenants) && tenants.map((tenant) => (
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
          <button className="close-button" onClick={() => setIsSubPageVisible(false)}>×</button>
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
