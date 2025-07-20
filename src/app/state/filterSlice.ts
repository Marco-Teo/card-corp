import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  nome: string;
  rarita: string;
  prezzoMin: number;
  prezzoMax: number;
  order: string;
}


const initialState: FiltersState = {
  nome: "",
  rarita: "",
  prezzoMin: 0,
  prezzoMax: 999999999,
  order: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FiltersState>) => {
        state.nome = action.payload.nome;
        state.rarita = action.payload.rarita;
        state.prezzoMin = action.payload.prezzoMin;
        state.prezzoMax = action.payload.prezzoMax;
        state.order = action.payload.order;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;