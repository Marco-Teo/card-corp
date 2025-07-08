import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import menuReducer from './menuSlice';
import cartaReducer from './cartaSlice';
import logInReducer from './logInSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    carta: cartaReducer,
    logIn: logInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
