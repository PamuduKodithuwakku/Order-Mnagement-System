import React from 'react';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Order Status</h2>
        <p><strong>Reference ID:</strong> {order.referenceId}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderStatusModal;