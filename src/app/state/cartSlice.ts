import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  nome: string;
  descrizione: string;
  urlImmagine: string;
  prezzo: number;
  quantita: number;
}

interface CartState {
  id: number | null;
  userId: number | null;
  items: CartItem[];
  favorites: number[];

}

const initialState: CartState = {
  id: null,
  userId: null,
  items: [],
  favorites: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state.id = action.payload.id;
      state.userId = action.payload.userId;
      state.items = action.payload.items;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantita += item.quantita;
      } else {
        state.items.push(item);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantita: number }>
    ) => {
      const { id, quantita } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.quantita = quantita;
    },
    clearCart: state => {
      state.items = [];
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      state.favorites = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { setCart, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
