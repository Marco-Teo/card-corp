import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogInState {
  isLoggedIn: boolean;
  username: string;
  token: string;
}

const initialState: LogInState = {
  isLoggedIn: false,
  username: "",
  token: "",
};

const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.token = "";
    },
  },
});

export const { logIn, logOut } = logInSlice.actions;
export default logInSlice.reducer;
