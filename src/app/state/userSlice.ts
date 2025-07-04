import { createSlice } from "@reduxjs/toolkit";

interface UsersState{
    isLoggedIn: boolean;
}

const initialState: UsersState = {
    isLoggedIn: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        toggleLogin: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        } 
    }
});

export const { login, logout, toggleLogin } = userSlice.actions;

export default userSlice.reducer;