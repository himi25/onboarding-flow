import { useAppSelector } from '../app/hooks';
import { PersonalProfile } from '../components/onboarding/PersonalProfile';
import { FavoriteSongs } from '../components/onboarding/FavoriteSongs';
import { PaymentInfo } from '../components/onboarding/PaymentInfo';
import { Success } from '../components/onboarding/Success';

const steps = [
    { label: 'Profile', description: 'Your details' },
    { label: 'Music', description: 'Your taste' },
    { label: 'Payment', description: 'Billing info' },
    { label: 'Done', description: 'All set' },
];

const stepComponents: Record<number, React.ReactNode> = {
    1: <PersonalProfile />,
    2: <FavoriteSongs />,
    3: <PaymentInfo />,
    4: <Success />,
};

export const Onboarding = () => {
    const currentStep = useAppSelector((state) => state.onboarding.currentStep);

    return (
        <div className="min-h-screen py-8 px-4 sm:py-12">
            <div className="max-w-xl mx-auto">
                {/* Progress Header */}
                <div className="mb-8">
                    {/* Step counter */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-slate-500">
                            Step {currentStep} of {steps.length}
                        </span>
                        <span className="text-sm text-slate-400">
                            {Math.round((currentStep / steps.length) * 100)}% complete
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / steps.length) * 100}%` }}
                        />
                    </div>

                    {/* Step indicators */}
                    <div className="flex justify-between mt-6">
                        {steps.map((step, index) => {
                            const stepNum = index + 1;
                            const isCompleted = currentStep > stepNum;
                            const isCurrent = currentStep === stepNum;
                            const isPending = currentStep < stepNum;

                            return (
                                <div key={step.label} className="flex flex-col items-center">
                                    <div
                                        className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      transition-all duration-300 ease-out
                      ${isCompleted
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-100'
                                                : isCurrent
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-100'
                                                    : 'bg-slate-100 text-slate-400'
                                            }
                    `}
                                    >
                                        {isCompleted ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            stepNum
                                        )}
                                    </div>
                                    <span className={`
                    mt-2 text-xs font-medium transition-colors duration-200
                    ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-600' : 'text-slate-400'}
                  `}>
                                        {step.label}
                                    </span>
                                    <span className={`
                    text-[10px] transition-colors duration-200
                    ${isPending ? 'text-slate-300' : 'text-slate-400'}
                  `}>
                                        {step.description}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step Content Card */}
                <div className="card p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {stepComponents[currentStep]}
                </div>
            </div>
        </div>
    );
};
