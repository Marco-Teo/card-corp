import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import menuReducer from './menuSlice';
import cartaReducer from './cartaSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    carta: cartaReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
