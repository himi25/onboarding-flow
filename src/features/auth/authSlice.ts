import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.isAuthenticated = true;
            state.username = action.payload;
        },
        logout(state) {
            // Session logout only - clears auth state
            // User data and onboarding progress are preserved in localStorage
            state.isAuthenticated = false;
            state.username = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
