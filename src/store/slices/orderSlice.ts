import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderItem } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

interface OrderState {
  orders: Order[];
  orderItems: OrderItem[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderItems: [
    {
      id: '1',
      name: 'Pepperoni Pizza',
      ingredients: [
        { id: '1', name: 'Cheese', quantity: 2 },
        { id: '2', name: 'Olives', quantity: 1 },
      ],
    },
    {
      id: '2',
      name: 'Cheese Pizza',
      ingredients: [
        { id: '1', name: 'Cheese', quantity: 2 },
        { id: '2', name: 'Olives', quantity: 1 },
      ],
    },
  ],
  status: 'idle',
  error: null,
};

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async ({ customerId, items }: { customerId: string; items: { itemId: string; quantity: number }[] }) => {
    return new Promise<{ referenceId: string }>((resolve) => {
      setTimeout(() => {
        resolve({ referenceId: uuidv4() });
      }, 1000); 
    });
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    addOrderItemType: (state, action: PayloadAction<{ name: string; ingredients: { id: string; name: string; quantity: number }[] }>) => {
      const newItem: OrderItem = {
        id: `${state.orderItems.length + 1}`,
        name: action.payload.name,
        ingredients: action.payload.ingredients,
      };
      state.orderItems.push(newItem);
    },
    removeOrderItemType: (state, action: PayloadAction<string>) => {
      state.orderItems = state.orderItems.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push({
          id: uuidv4(),
          referenceId: action.payload.referenceId,
          customerId: '2', 
          status: 'Placed', 
          items: [],
        });
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to place order';
      });
  },  
});

export const { updateOrderStatus, addOrderItemType, removeOrderItemType } = orderSlice.actions;
export default orderSlice.reducer;
