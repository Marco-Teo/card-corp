import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import cartaReducer from './cartaSlice';
import logInReducer from './logInSlice';
import cartReducer from './cartSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    carta: cartaReducer,
    logIn: logInReducer,
    cart: cartReducer,
    filters : filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
