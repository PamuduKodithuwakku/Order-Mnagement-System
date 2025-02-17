import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateOrderStatus, addOrderItemType, removeOrderItemType } from '../store/slices/orderSlice';
import { updateIngredientStock, addIngredient, removeIngredient } from '../store/slices/inventorySlice';
import InventoryTable from '../components/InventoryTable';
import OrderTable from '../components/OrderTable';
import OrderItemForm from '../components/OrderItemForm';
import IngredientForm from '../components/IngredientForm';

const OwnerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const inventory = useSelector((state: RootState) => state.inventory.ingredients);
  const orderItems = useSelector((state: RootState) => state.inventory.orderItems);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(null);

  //Update order status
  const handleUpdateOrderStatus = (orderId: string, status: "Placed" | "Preparing" | "Dispatched" | "Delivered") => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };  

  //Update inventory stock
  const handleUpdateStock = (ingredientId: string, quantity: number) => {
    dispatch(updateIngredientStock({ id: ingredientId, quantity }));
  };

  //Add order item type
  const handleAddOrderItemType = (name: string, ingredients: { id: string; name: string; quantity: number }[]) => {
    dispatch(addOrderItemType({ name, ingredients }));
  };

  //Remove order item type
  const handleRemoveOrderItemType = (id: string) => {
    dispatch(removeOrderItemType(id));
  };

  //Add new ingredient
  const handleAddIngredient = (name: string, stock: number) => {
    dispatch(addIngredient({ name, stock }));
  };

  //Remove ingredient
  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <OrderTable
          orders={orders}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      </div>


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <InventoryTable
          inventory={inventory}
          onUpdateStock={handleUpdateStock}
          onRemoveIngredient={handleRemoveIngredient}
        />
        <IngredientForm onSubmit={handleAddIngredient} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Item Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Add New Order Item Type</h3>
            <OrderItemForm
              ingredients={inventory}
              onSubmit={handleAddOrderItemType}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Remove Order Item Type</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setSelectedOrderId(e.target.value)}
            >
              <option value="">Select an item type</option>
              {orderItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              className="mt-2 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => selectedOrderId && handleRemoveOrderItemType(selectedOrderId)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;