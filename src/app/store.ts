import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import onboardingReducer from '../features/onboarding/onboardingSlice';
import type { OnboardingState } from '../features/onboarding/onboardingSlice';
import { encryptPaymentInfo, decryptPaymentInfo } from '../utils/encryption';

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
        const parsed = JSON.parse(serialized) as RootState;

        // Validate state structure to handle corrupted data
        if (
            typeof parsed?.auth?.isAuthenticated !== 'boolean' ||
            typeof parsed?.onboarding?.currentStep !== 'number'
        ) {
            localStorage.removeItem(STORAGE_KEY);
            return undefined;
        }

        // Decrypt payment info when loading
        if (parsed.onboarding?.paymentInfo) {
            parsed.onboarding.paymentInfo = decryptPaymentInfo(parsed.onboarding.paymentInfo);
        }

        return parsed;
    } catch {
        // Clear corrupted state
        localStorage.removeItem(STORAGE_KEY);
        return undefined;
    }
};

const saveState = (state: RootState): void => {
    try {
        // Encrypt payment info before saving
        const stateToSave = {
            auth: state.auth,
            onboarding: {
                ...state.onboarding,
                paymentInfo: encryptPaymentInfo(state.onboarding.paymentInfo),
            },
        };
        const serialized = JSON.stringify(stateToSave);
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

// App initialization flag - synchronous since localStorage is sync
export const isAppInitialized = (): boolean => true;

export type AppDispatch = typeof store.dispatch;
