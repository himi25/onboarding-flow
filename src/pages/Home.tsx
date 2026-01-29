import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { resetOnboarding } from '../features/onboarding/onboardingSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/Snackbar';

export const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const snackbar = useSnackbar();
    const username = useAppSelector((state) => state.auth.username);
    const { personalProfile, favoriteSongs } = useAppSelector(
        (state) => state.onboarding
    );

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetOnboarding());
        snackbar.show('Signed out', 'neutral');
        navigate('/login');
    };

    const filteredSongs = favoriteSongs.filter((song: string) => song.trim());

    return (
        <div className="min-h-screen py-8 px-4 sm:py-12">
            <div className="max-w-2xl mx-auto">
                {/* Header Card */}
                <div className="card p-6 sm:p-8 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center overflow-hidden ring-4 ring-indigo-100 shadow-lg shadow-indigo-500/20">
                                {personalProfile.profilePicture ? (
                                    <img
                                        src={personalProfile.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl sm:text-2xl font-semibold text-white">
                                        {personalProfile.fullName?.charAt(0) || username?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                                    Welcome back, {personalProfile.fullName?.split(' ')[0] || username}!
                                </h1>
                                <p className="text-sm text-slate-500 mt-0.5">Great to see you again</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary px-4 py-2 text-sm"
                        >
                            Sign out
                        </button>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="card p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">Your Profile</h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                                <p className="text-sm font-medium text-slate-900">{personalProfile.fullName}</p>
                            </div>
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email</p>
                                <p className="text-sm font-medium text-slate-900">{personalProfile.email}</p>
                            </div>
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Age</p>
                                <p className="text-sm font-medium text-slate-900">{personalProfile.age} years old</p>
                            </div>
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <p className="text-sm font-medium text-emerald-600">Active</p>
                                </div>
                            </div>
                        </div>

                        {filteredSongs.length > 0 && (
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Favorite Songs</p>
                                <div className="flex flex-wrap gap-2">
                                    {filteredSongs.map((song: string, index: number) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                            </svg>
                                            {song}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
