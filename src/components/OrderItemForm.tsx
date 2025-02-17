import React, { useState } from 'react';

interface OrderItemFormProps {
  ingredients: any[];
  onSubmit: (name: string, ingredients: { id: string; quantity: number }[]) => void;
}

const OrderItemForm: React.FC<OrderItemFormProps> = ({ ingredients, onSubmit }) => {
  const [name, setName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<{ id: string; quantity: number }[]>([]);

  const handleAddIngredient = (ingredientId: string, quantity: number) => {
    setSelectedIngredients([...selectedIngredients, { id: ingredientId, quantity }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, selectedIngredients);
    setName('');
    setSelectedIngredients([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <div>
        <h4 className="text-sm font-medium mb-2">Add Ingredients</h4>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex items-center space-x-2">
            <span>{ingredient.name}</span>
            <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => handleAddIngredient(ingredient.id, parseInt(e.target.value))}
              className="w-24 p-1 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Item Type
      </button>
    </form>
  );
};

export default OrderItemForm;