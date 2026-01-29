import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { completeOnboarding } from '../../features/onboarding/onboardingSlice';
import { useSnackbar } from '../Snackbar';

export const Success = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const snackbar = useSnackbar();

    const handleContinue = () => {
        dispatch(completeOnboarding());
        snackbar.show('Onboarding complete!', 'success');
        navigate('/home');
    };

    return (
        <div className="py-6 text-center">
            <div className="flex flex-col items-center space-y-5">
                {/* Success icon with animation */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-in zoom-in duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Heading */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-slate-900">You're all set!</h2>
                    <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Your profile is complete. Welcome aboard — we're excited to have you.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="flex items-center gap-1.5 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>

                {/* CTA */}
                <button
                    onClick={handleContinue}
                    className="btn btn-primary px-8 py-2.5 text-sm mt-2"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};
