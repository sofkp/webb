import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Inventory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const response = await fetch('https://example.com/inventory');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Inventorio</h1>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4">INVENTORIO AQUI XD</div>
      </div>
    </div>
  );
};

export default Inventory;