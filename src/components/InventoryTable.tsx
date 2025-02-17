// InventoryTable.tsx
import React from 'react';
import { Ingredient } from '../types/types';

interface InventoryTableProps {
  inventory: Ingredient[];
  onUpdateStock: (ingredientId: string, quantity: number) => void;
  onRemoveIngredient: (id: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onUpdateStock, onRemoveIngredient }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Ingredient Name</th>
          <th className="px-4 py-2">Stock</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((ingredient) => (
          <tr key={ingredient.id}>
            <td className="px-4 py-2">{ingredient.name}</td>
            <td className="px-4 py-2 text-center">{ingredient.stock}</td>
            <td className="px-4 py-2 text-center">
              <button className='mr-8 text-blue-500' onClick={() => onUpdateStock(ingredient.id, 1)}>Update Stock</button>
              <button className='text-red-500' onClick={() => onRemoveIngredient(ingredient.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;