import { Order, OrderItem } from '../types/types';

const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Pepperoni Pizza',
    ingredients: [
      { id: '1', name: 'Cheese', quantity: 2 }, 
      { id: '2', name: 'Olives', quantity: 1 }, 
    ],
  },
];

export const fetchOrderItems = async (): Promise<OrderItem[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockOrderItems), 1000));
};

export const placeOrder = async (order: Order): Promise<{ success: boolean; referenceId: string }> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true, referenceId: 'REF123' }), 1000)
  );
};