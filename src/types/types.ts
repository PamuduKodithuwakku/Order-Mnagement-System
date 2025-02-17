export interface User {
  id: string;
  username: string;
  role: 'owner' | 'customer';
  name?: string; // Make this optional
}
  
export interface OrderItem {
  id: string;
  name: string;
  ingredients: { id: string; name: string; quantity: number }[];
}
  
export interface Ingredient {
  id: string;
  name: string;
  stock: number;
}
  
export interface Order {
  id: string;
  customerId: string;
  items: { itemId: string; quantity: number }[];
  status: 'Placed' | 'Preparing' | 'Dispatched' | 'Delivered';
  referenceId: string;
}