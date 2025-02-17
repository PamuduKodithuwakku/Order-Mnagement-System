import React, { useState } from 'react';

interface IngredientFormProps {
  onSubmit: (name: string, stock: number) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, stock);
    setName('');
    setStock(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Ingredient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Add Ingredient
      </button>
    </form>
  );
};

export default IngredientForm;