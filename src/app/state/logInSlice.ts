import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogInState {
  isLoggedIn: boolean;
  username: string;
  token: string;
  role: string;
}

const readFromStorage = (key: string): string =>
  typeof window !== "undefined" ? localStorage.getItem(key) || "" : "";

const initialState: LogInState = {
  isLoggedIn: !!readFromStorage("token"),
  username: readFromStorage("username"),
  token: readFromStorage("token"),
  role: readFromStorage("role"),
};

const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{ username: string; token: string; role: string }>
    ) => {
      state.isLoggedIn = false;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.role = action.payload.role;
      if (typeof window !== "undefined") {
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("token", action.payload.token);
      }
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.token = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { logIn, logOut } = logInSlice.actions;
export default logInSlice.reducer;
