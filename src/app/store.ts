import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import onboardingReducer from '../features/onboarding/onboardingSlice';
import type { OnboardingState } from '../features/onboarding/onboardingSlice';

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
}

export interface RootState {
    auth: AuthState;
    onboarding: OnboardingState;
}

const STORAGE_KEY = 'onboarding_app_state';

const loadState = (): RootState | undefined => {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (!serialized) return undefined;
        return JSON.parse(serialized) as RootState;
    } catch {
        return undefined;
    }
};

const saveState = (state: RootState): void => {
    try {
        const serialized = JSON.stringify({
            auth: state.auth,
            onboarding: state.onboarding,
        });
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch {
        // Ignore write errors
    }
};

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        onboarding: onboardingReducer,
    },
    ...(preloadedState && { preloadedState }),
});

store.subscribe(() => {
    saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
