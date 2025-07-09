import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Carta {
  id: number;
  nome: string;
  descrizione: string;
  urlImmagine: string;
  prezzo: number;
  preferita: boolean;
  inCollezione: boolean;
  rarita: string;
  collezioni: any[];
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
    setCarte: (state, action: PayloadAction<Carta[]>) => {
      state.carte = action.payload;
    },
    addCarta: (state, action: PayloadAction<Carta>) => {
      state.carte.push(action.payload);
    },
    removeCarta: (state, action: PayloadAction<{ nome: string }>) => {
      state.carte = state.carte.filter(
        (carta) => carta.nome !== action.payload.nome
      );
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { setCarte, addCarta, removeCarta, toggleFavorite } = cartaSlice.actions;
export default cartaSlice.reducer;
