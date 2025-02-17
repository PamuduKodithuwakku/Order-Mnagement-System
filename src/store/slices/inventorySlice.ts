import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, OrderItem } from '../../types/types';

interface InventoryState {
  ingredients: Ingredient[];
  orderItems: OrderItem[];
}

const initialState: InventoryState = {
  ingredients: [
    { id: '1', name: 'Cheese', stock: 100 },
    { id: '2', name: 'Olives', stock: 50 },
  ],
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
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateIngredientStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const ingredient = state.ingredients.find((i) => i.id === action.payload.id);
      if (ingredient) {
        ingredient.stock -= action.payload.quantity;
      }
    },

    addIngredient: (state, action: PayloadAction<{ name: string; stock: number }>) => {
      const newIngredient: Ingredient = {
        id: `${state.ingredients.length + 1}`,
        name: action.payload.name,
        stock: action.payload.stock,
      };
      state.ingredients.push(newIngredient);
    },
    
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload);
    },
  },
});

export const { updateIngredientStock, addIngredient, removeIngredient } = inventorySlice.actions;
export default inventorySlice.reducer;
