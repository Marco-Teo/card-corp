import { createSlice } from "@reduxjs/toolkit";
import Carta from "../components/Carta";

interface Carta {
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
}

const initialState: CartaState = {
  carte:[],
};

const cartaSlice = createSlice({
  name: "carta",
  initialState,
  reducers: {
    setCarte: (state, action) => {
      state.carte = action.payload;
    },
    addCarta: (state, action) => {
      state.carte.push(action.payload);
    },
    removeCarta: (state, action) => {
      state.carte = state.carte.filter((carta) => carta.nome !== action.payload.nome);
    },
  },
});

export const { setCarte, addCarta, removeCarta } = cartaSlice.actions;
export default cartaSlice.reducer;