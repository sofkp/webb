import React, { useState, useEffect } from 'react';
import { useTenant } from "../contexts/TenantContext";

const Inventory = ({tenant_id}) => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all inventories
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://anpldhtpsd.execute-api.us-east-1.amazonaws.com/prod/inventory/names?tenant_id=${tenantInfo.tenantId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch inventories');
        }
        const data = await response.json();

        const inventories = Array.isArray(data.body) ? data.body : JSON.parse(data.body);

        setInventories(inventories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInventories();
  }, [tenant_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inventarios Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventories.map((inventory) => (
          <div
            key={inventory.inventory_id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <h2 className="text-lg font-semibold">{inventory.name}</h2>
            <p className="text-gray-500">{inventory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
