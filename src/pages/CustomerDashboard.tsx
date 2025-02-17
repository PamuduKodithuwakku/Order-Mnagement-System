import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { placeOrder } from '../store/slices/orderSlice'; // Use the async thunk
import OrderItemCard from '../components/OrderItemCard';
import OrderStatusModal from '../components/OrderStatusModal';

const CustomerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector((state: RootState) => state.orders.orderItems);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ itemId: string; quantity: number }[]>([]);

  const handleSelectItem = (itemId: string, quantity: number) => {
    const existingItem = selectedItems.find((item) => item.itemId === itemId);
    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.itemId === itemId ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { itemId, quantity }]);
    }
  };

  const handlePlaceOrder = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }
  
    try {
      const result = await (dispatch as AppDispatch)(
        placeOrder({
          customerId: '2',
          items: selectedItems,
        })
      ).unwrap();
  
      setReferenceId(result.referenceId);
      setSelectedItems([]);
      alert(`Order placed! Reference ID: ${result.referenceId}`);
    } catch (error) {
      alert(`Failed to place order: ${error.message}`);
    }
  };  

  const handleCheckOrderStatus = (referenceId: string) => {
    const order = orders.find((o) => o.referenceId === referenceId);
    if (order) {
      setSelectedOrder(order);
      setIsModalOpen(true);
    } else {
      alert('Order not found');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderItems.map((item) => (
            <OrderItemCard
              key={item.id}
              item={item}
              onSelectItem={handleSelectItem}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
        {selectedItems.length === 0 ? (
          <p className="text-gray-500">No items selected.</p>
        ) : (
          <ul className="space-y-2">
            {selectedItems.map((selectedItem) => {
              const item = orderItems.find((i) => i.id === selectedItem.itemId);
              return (
                <li key={selectedItem.itemId} className="flex justify-between items-center">
                  <span>
                    {item?.name} (x{selectedItem.quantity})
                  </span>
                  <button
                    onClick={() =>
                      handleSelectItem(selectedItem.itemId, -selectedItem.quantity)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Place Order
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Check Order Status</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter Reference ID"
            value={referenceId || ''}
            onChange={(e) => setReferenceId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => referenceId && handleCheckOrderStatus(referenceId)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Check Status
          </button>
        </div>
      </div>

      {selectedOrder && (
        <OrderStatusModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;