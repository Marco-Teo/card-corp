import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Carta {
  id: number;
  nome: string;
  descrizione: string;
  urlImmagine: string;
  prezzo: number;
  rarita: string;
}

interface CartaState {
  carte: Carta[];
  favorites: number[];
}

const initialState: CartaState = {
  carte: [],
  favorites: [],
};

const cartaSlice = createSlice({
  name: "carta",
  initialState,
  reducers: {
    setCarte(state, action: PayloadAction<Carta[]>) {
      state.carte = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      state.favorites = action.payload;
    },
  },
});

export const { setCarte, toggleFavorite, setFavorites} = cartaSlice.actions;
export default cartaSlice.reducer;
