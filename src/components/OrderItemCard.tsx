import React, { useState } from 'react';

interface OrderItemCardProps {
  item: any;
  onSelectItem: (itemId: string, quantity: number) => void;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, onSelectItem }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">
        Ingredients: {item.ingredients.map((ing: any) => ing.name).join(', ')}
      </p>
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-16 p-1 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => onSelectItem(item.id, quantity)}
          className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default OrderItemCard;